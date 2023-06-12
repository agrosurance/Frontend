import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuthContext } from "./AuthContext";
import { InsuranceManager } from "../typechain";
import { ethers } from "ethers";

interface DataContextType {
  crops: Record<number, { name: string; image: string }>;
  lands: Land[];
  balance: ethers.BigNumber;
  agroCoinBalance: ethers.BigNumber;
  unclaimedBalance: ethers.BigNumber;
}

export const DataContext = createContext<DataContextType>(
  {} as DataContextType
);

async function checkInsuranceStatus(
  insuranceManagerContract: InsuranceManager,
  landId: ethers.BigNumber
) {
  const totalInsuranceRequests = await insuranceManagerContract.totalInsurances(
    landId
  );
  if (totalInsuranceRequests.eq(0)) return null;
  const lastInsuranceRequestId =
    await insuranceManagerContract.insuranceHistory(
      landId,
      totalInsuranceRequests.sub(1)
    );
  const lastInsuranceRequest = await insuranceManagerContract.quoteRequests(
    lastInsuranceRequestId
  );
  return {
    requestId: lastInsuranceRequestId,
    requestFulfilled: lastInsuranceRequest.isRequestFulfilled,
    isInsured: lastInsuranceRequest.isInsured,
    insuredFrom: new Date(Number(lastInsuranceRequest.insuranceFrom) * 1000),
    insuredTill: new Date(Number(lastInsuranceRequest.insuranceTo) * 1000),
    claimRequestFulfilled: false,
    claimed: lastInsuranceRequest.isInsuranceClaimed,
    coverage: lastInsuranceRequest.coverage,
    premium: lastInsuranceRequest.premium,
  };
}

export function DataContextProvider({ children }: { children: ReactNode }) {
  const {
    address,
    agroCoinContract,
    agroSuranceLandContract,
    insuranceManagerContract,
    stakingManagerContract,
    provider,
  } = useAuthContext();

  const [crops, setCrops] = useState<
    Record<number, { name: string; image: string }>
  >({});
  const [lands, setLands] = useState<Land[]>([]);
  const [balance, setBalance] = useState<ethers.BigNumber>(
    ethers.BigNumber.from("0")
  );
  const [agroCoinBalance, setAgroCoinBalance] = useState<ethers.BigNumber>(
    ethers.BigNumber.from("0")
  );
  const [unclaimedBalance, setUnclaimedBalance] = useState<ethers.BigNumber>(
    ethers.BigNumber.from("0")
  );

  async function updateBalance() {
    if (!address || !agroCoinContract) return;

    const _balance = await agroCoinContract.balanceOf(address);
    setAgroCoinBalance(_balance);
  }

  useEffect(() => {
    if (!address || !agroSuranceLandContract || !insuranceManagerContract)
      return;

    (async () => {
      const _crops: Record<number, { name: string; image: string }> = {};
      let index = 0;
      while (true) {
        const crop = await agroSuranceLandContract.cropDetails(index);
        if (crop.name === "") break;
        index++;
        _crops[Number(crop.cropId)] = {
          name: crop.name,
          image: crop.image,
        };
      }
      setCrops(_crops);
    })();

    (async () => {
      const _lands: Land[] = [];
      let totalLands = Number(await agroSuranceLandContract.balanceOf(address));
      for (let index = 0; index < totalLands; index++) {
        const landId = await agroSuranceLandContract.tokenOfOwnerByIndex(
          address,
          index
        );
        const landDetail = await agroSuranceLandContract.landDetails(landId);
        const land = {
          id: Number(landId),
          name: landDetail.name,
          cropId: Number(landDetail.currentCycleCropId),
          area: Number(landDetail.area),
          lat: landDetail.lat,
          long: landDetail.long,
          cycleFrom: new Date(Number(landDetail.currentCycleFrom) * 1000),
          cycleTo: new Date(Number(landDetail.currentCycleTo) * 1000),
          totalCycles: Number(landDetail.totalCycles),
          insurance: await checkInsuranceStatus(
            insuranceManagerContract,
            landId
          ),
        };
        _lands.push(land);
      }
      setLands(_lands);
    })();
  }, [address, agroSuranceLandContract, insuranceManagerContract]);

  useEffect(() => {
    if (!agroSuranceLandContract) return;

    const cropAddedFilter = agroSuranceLandContract.filters.CropAdded();
    const cropUpdatedFilter = agroSuranceLandContract.filters.CropUpdated();

    const listener = (
      id: ethers.BigNumber,
      name: string,
      image: string,
      _event: any
    ) => {
      setCrops({ ...crops, [Number(id)]: { name, image } });
    };

    agroSuranceLandContract.on(cropAddedFilter, listener);
    agroSuranceLandContract.on(cropUpdatedFilter, listener);

    return () => {
      agroSuranceLandContract.removeListener(cropAddedFilter, listener);
      agroSuranceLandContract.removeListener(cropUpdatedFilter, listener);
    };
  }, [agroSuranceLandContract, crops]);

  useEffect(() => {
    if (!agroSuranceLandContract || !address) return;
    const landAddedFilter = agroSuranceLandContract.filters.LandAdded(address);
    const CycleAddedFilter =
      agroSuranceLandContract.filters.CycleAdded(address);

    const addLand = (
      _owner: string,
      landId: ethers.BigNumber,
      name: string,
      lat: number,
      long: number,
      area: ethers.BigNumber,
      _event: any
    ) => {
      setLands([
        ...lands,
        {
          id: Number(landId),
          name,
          area: Number(area),
          lat,
          long,
          cropId: 0,
          cycleFrom: new Date(0),
          cycleTo: new Date(0),
          totalCycles: 0,
          insurance: null,
        },
      ]);
    };

    agroSuranceLandContract.on(landAddedFilter, addLand);

    const addCycle = (
      _owner: string,
      landId: ethers.BigNumber,
      cropId: ethers.BigNumber,
      cycleFrom: ethers.BigNumber,
      cycleTo: ethers.BigNumber,
      _event: any
    ) => {
      const _lands = lands.map((land) => {
        if (!landId.eq(land.id)) return land;
        return {
          ...land,
          cropId: Number(cropId),
          cycleFrom: new Date(Number(cycleFrom) * 1000),
          cycleTo: new Date(Number(cycleTo) * 1000),
        };
      });
      setLands(_lands);
    };

    agroSuranceLandContract.on(CycleAddedFilter, addCycle);

    return () => {
      agroSuranceLandContract.removeListener(landAddedFilter, addLand);
      agroSuranceLandContract.removeListener(CycleAddedFilter, addCycle);
    };
  }, [agroSuranceLandContract, lands, address]);

  useEffect(() => {
    if (!insuranceManagerContract || !address) return;

    const quotesRequestMadeFilter =
      insuranceManagerContract.filters.QuotesRequestMade(address);
    const quotesRequestFulfilledFilter =
      insuranceManagerContract.filters.QuotesRequestFulfilled(address);
    const insuredFilter = insuranceManagerContract.filters.Insured(address);

    const addQuoteRequest = (
      _owner: string,
      landId: ethers.BigNumber,
      requestId: string,
      _cropId: ethers.BigNumber,
      insuranceFrom: ethers.BigNumber,
      insuranceTo: ethers.BigNumber,
      coverage: ethers.BigNumber,
      _event: any
    ) => {
      const _lands = lands.map((land) => {
        if (!landId.eq(land.id)) return land;
        return {
          ...land,
          insurance: {
            requestId,
            requestFulfilled: false,
            isInsured: false,
            insuredFrom: new Date(Number(insuranceFrom) * 1000),
            insuredTill: new Date(Number(insuranceTo) * 1000),
            claimRequestFulfilled: false,
            claimed: false,
            coverage,
            premium: ethers.BigNumber.from("0"),
          },
        };
      });
      setLands(_lands);
    };

    const fulfillQuoteRequest = (
      _owner: string,
      landId: ethers.BigNumber,
      requestId: string,
      premium: ethers.BigNumber,
      _event: any
    ) => {
      const _lands = lands.map((land) => {
        if (
          landId.eq(land.id) &&
          land.insurance &&
          land.insurance.requestId == requestId
        ) {
          land.insurance.requestFulfilled = true;
          land.insurance.premium = premium;
        }
        return land;
      });
      setLands(_lands);
    };

    const insure = (
      _owner: string,
      landId: ethers.BigNumber,
      requestId: string,
      _event: any
    ) => {
      const _lands = lands.map((land) => {
        if (
          landId.eq(land.id) &&
          land.insurance &&
          land.insurance.requestId == requestId
        ) {
          land.insurance.isInsured = true;
        }
        return land;
      });
      setLands(_lands);
    };

    insuranceManagerContract.on(quotesRequestMadeFilter, addQuoteRequest);

    insuranceManagerContract.on(
      quotesRequestFulfilledFilter,
      fulfillQuoteRequest
    );

    insuranceManagerContract.on(insuredFilter, insure);

    () => {
      insuranceManagerContract.removeListener(
        quotesRequestMadeFilter,
        addQuoteRequest
      );
      insuranceManagerContract.removeListener(
        quotesRequestFulfilledFilter,
        fulfillQuoteRequest
      );
      insuranceManagerContract.removeListener(insuredFilter, insure);
    };
  }, [insuranceManagerContract, address, lands]);

  useEffect(() => {
    if (!provider || !address || !stakingManagerContract) return;

    let oldBalance = ethers.BigNumber.from("0");
    let oldUnclaimedBalance = ethers.BigNumber.from("0");

    provider.on("block", async () => {
      const _balance = await provider.getBalance(address);
      if (!_balance.eq(oldBalance)) {
        oldBalance = _balance;
        setBalance(_balance);
      }

      const _unclaimedBalance =
        await stakingManagerContract.checkUnclaimedBalance(address);
      if (!_unclaimedBalance.eq(oldUnclaimedBalance)) {
        oldUnclaimedBalance = _unclaimedBalance;
        setUnclaimedBalance(oldUnclaimedBalance);
      }
    });
  }, [stakingManagerContract, provider, address]);

  useEffect(() => {
    if (!agroCoinContract || !address) return;

    updateBalance();

    const transferFromFilter = agroCoinContract.filters.Transfer(address);
    const transferToFilter = agroCoinContract.filters.Transfer(null, address);

    const transferHandler = (
      _from: string,
      _to: string,
      _value: ethers.BigNumber,
      _event: any
    ) => {
      updateBalance();
    };

    agroCoinContract.on(transferFromFilter, transferHandler);
    agroCoinContract.on(transferToFilter, transferHandler);

    return () => {
      agroCoinContract.removeListener(transferFromFilter, transferHandler);
      agroCoinContract.removeListener(transferToFilter, transferHandler);
    };
  }, [agroCoinContract, address]);

  return (
    <DataContext.Provider
      value={{ crops, lands, balance, agroCoinBalance, unclaimedBalance }}
    >
      {children}
    </DataContext.Provider>
  );
}

export const useDataContext = () => useContext(DataContext);
