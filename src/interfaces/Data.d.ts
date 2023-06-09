interface Land {
  id: number;
  name: string;
  cropId: number;
  area: number;
  lat: number;
  long: number;
  cycleFrom: Date;
  cycleTo: Date;
  totalCycles: number;
  insurance: {
    requestId: string;
    requestFulfilled: boolean;
    isInsured: boolean;
    insuredTill: Date;
    claimRequestFulfilled: boolean;
    claimed: boolean;
    coverage: ethers.BigNumber;
    premium: ethers.BigNumber;
  } | null;
}
