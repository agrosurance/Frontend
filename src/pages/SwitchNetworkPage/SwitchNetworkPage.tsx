import { networkConfig } from "../../config";
import { useAuthContext } from "../../contexts/AuthContext";

export default function SwitchNetworkPage() {
  const { provider } = useAuthContext();

  async function switchChain() {
    if (!provider) return;
    if (!provider.provider.request)
      throw new Error("This wallet provider does not support request method");
    try {
      await provider.provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: networkConfig.chainId }],
      });
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask.
      if ((switchError as any).code === 4902) {
        const params = [networkConfig];
        try {
          await provider.provider.request({
            method: "wallet_addEthereumChain",
            params,
          });
        } catch (addError) {
          alert(
            "Could not add chain to MetaMask: " + (addError as any).message
          );
        }
      }
      throw switchError;
    }
  }

  return (
    <>
      <section className="flex min-h-screen   flex-col items-center">
        <div className="my-auto">
          <div className="">
            <img src="/brand.png" className="mb-10 w-[30vw]" />
            <img
              src="/images/sad-farmer.png"
              alt="udaas kisaan"
              className="mx-auto h-[50vh]"
            />
            <p
              onClick={switchChain}
              className="my-8 block cursor-pointer rounded-xl bg-red-500 bg-opacity-90 p-5 text-center font-raleway text-lg font-semibold tracking-tight text-white hover:bg-red-600"
            >
              Switch to {networkConfig.chainName} Network
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
