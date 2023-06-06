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

interface AuthContextType {
  signer: Signer | null;
  setSigner: (newSigner: Signer | null) => void;
  provider: providers.Web3Provider | null;
  agroCoinContract: AgroCoin | null;
  agroSuranceLandContract: AgroSuranceLand | null;
  fundManagerContract: FundManager | null;
  insuranceManagerContract: InsuranceManager | null;
  stakingManagerContract: StakingManager | null;
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

  useEffect(() => {
    if (!(window as any).ethereum) {
      // TODO: Show Error
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

    (async () => {})();
  });

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
      "",
      agroCoinABI as any
    ) as AgroCoin;
    setAgroCoinContract(_agroCoinContract);
    const _agroSuranceLandContract = new ethers.Contract(
      "",
      agroSuranceLandABI as any
    ) as AgroSuranceLand;
    setAgroSuranceLandContract(_agroSuranceLandContract);
    const _fundManagerContract = new ethers.Contract(
      "",
      fundManagerABI as any
    ) as FundManager;
    setFundManagerContract(_fundManagerContract);
    const _insuranceManagerContract = new ethers.Contract(
      "",
      insuranceManagerABI as any
    ) as InsuranceManager;
    setInsuranceManagerContract(_insuranceManagerContract);
    const _stakingManagerContract = new ethers.Contract(
      "",
      stakingManagerABI as any
    ) as StakingManager;
    setStakingManagerContract(_stakingManagerContract);
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
