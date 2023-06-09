import { Signer, ethers, providers } from "ethers";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  AgroCoin,
  AgroSuranceLand,
  FundManager,
  InsuranceManager,
  StakingManager,
} from "../typechain";
import agroCoinABI from "../abi/AgroCoin.json";
import agroSuranceLandABI from "../abi/AgroSuranceLand.json";
import fundManagerABI from "../abi/FundManager.json";
import insuranceManagerABI from "../abi/InsuranceManager.json";
import stakingManagerABI from "../abi/StakingManager.json";
import useError from "../hooks/useError";
import { networkConfig } from "../config";
import SwitchNetworkPage from "../pages/SwitchNetworkPage/SwitchNetworkPage";

interface AuthContextType {
  signer: Signer | null;
  setSigner: (newSigner: Signer | null) => void;
  provider: providers.Web3Provider | null;
  agroCoinContract: AgroCoin | null;
  agroSuranceLandContract: AgroSuranceLand | null;
  fundManagerContract: FundManager | null;
  insuranceManagerContract: InsuranceManager | null;
  stakingManagerContract: StakingManager | null;
  address: string | null;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [provider, setProvider] =
    useState<ethers.providers.Web3Provider | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [agroCoinContract, setAgroCoinContract] = useState<AgroCoin | null>(
    null
  );
  const [agroSuranceLandContract, setAgroSuranceLandContract] =
    useState<AgroSuranceLand | null>(null);
  const [fundManagerContract, setFundManagerContract] =
    useState<FundManager | null>(null);
  const [insuranceManagerContract, setInsuranceManagerContract] =
    useState<InsuranceManager | null>(null);
  const [stakingManagerContract, setStakingManagerContract] =
    useState<StakingManager | null>(null);
  const [showSwitchNetworkPage, setShowSwitchNetworkPage] = useState(false);
  const [address, setAddress] = useState<string | null>(null);

  const { throwErr } = useError();

  useEffect(() => {
    if (!(window as any).ethereum) {
      throwErr("Please install/upgrade Metamask");
      return;
    }

    const _provider = new ethers.providers.Web3Provider(
      (window as any).ethereum
    );
    setProvider(_provider);

    (window as any).ethereum.on("chainChanged", (_chain: any) => {
      window.location.reload();
    });

    // reload if logged in and account changed
    (window as any).ethereum.on("accountsChanged", (_account: any) => {
      if (signer) window.location.reload();
    });

    (async () => {
      const { chainId } = await _provider.getNetwork();
      if (chainId != parseInt(networkConfig.chainId)) {
        setShowSwitchNetworkPage(true);
      }
    })();
  }, []);

  useEffect(() => {
    if (!signer) {
      setAgroCoinContract(null);
      setAgroSuranceLandContract(null);
      setFundManagerContract(null);
      setInsuranceManagerContract(null);
      setStakingManagerContract(null);
      return;
    }

    const _agroCoinContract = new ethers.Contract(
      import.meta.env.VITE_AGROCOIN_CONTRACT_ADDRESS || "",
      agroCoinABI as any,
      signer
    ) as AgroCoin;
    setAgroCoinContract(_agroCoinContract);
    const _agroSuranceLandContract = new ethers.Contract(
      import.meta.env.VITE_AGROSURANCE_LAND_CONTRACT_ADDRESS || "",
      agroSuranceLandABI as any,
      signer
    ) as AgroSuranceLand;
    setAgroSuranceLandContract(_agroSuranceLandContract);
    const _fundManagerContract = new ethers.Contract(
      import.meta.env.VITE_FUND_MANAGER_CONTRACT_ADDRESS || "",
      fundManagerABI as any,
      signer
    ) as FundManager;
    setFundManagerContract(_fundManagerContract);
    const _insuranceManagerContract = new ethers.Contract(
      import.meta.env.VITE_INSURANCE_MANAGER_CONTRACT_ADDRESS || "",
      insuranceManagerABI as any,
      signer
    ) as InsuranceManager;
    setInsuranceManagerContract(_insuranceManagerContract);
    const _stakingManagerContract = new ethers.Contract(
      import.meta.env.VITE_STAKING_MANAGER_CONTRACT_ADDRESS || "",
      stakingManagerABI as any,
      signer
    ) as StakingManager;
    setStakingManagerContract(_stakingManagerContract);

    (async () => {
      const _address = await signer.getAddress();
      setAddress(_address);
    })();
  }, [signer]);

  return (
    <AuthContext.Provider
      value={{
        signer,
        setSigner,
        provider,
        agroCoinContract,
        agroSuranceLandContract,
        fundManagerContract,
        insuranceManagerContract,
        stakingManagerContract,
        address,
      }}
    >
      {showSwitchNetworkPage ? <SwitchNetworkPage /> : children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
