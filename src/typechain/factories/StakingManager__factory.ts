/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  StakingManager,
  StakingManagerInterface,
} from "../StakingManager";

const _abi = [
  {
    type: "constructor",
    payable: false,
    inputs: [
      {
        type: "address",
        name: "_rewardToken",
      },
      {
        type: "address",
        name: "_fundManager",
      },
    ],
  },
  {
    type: "error",
    name: "FundTransferFailed",
    inputs: [],
  },
  {
    type: "error",
    name: "InsufficientBalance",
    inputs: [],
  },
  {
    type: "event",
    anonymous: false,
    name: "OwnershipTransferred",
    inputs: [
      {
        type: "address",
        name: "previousOwner",
        indexed: true,
      },
      {
        type: "address",
        name: "newOwner",
        indexed: true,
      },
    ],
  },
  {
    type: "function",
    name: "checkUnclaimedBalance",
    constant: true,
    stateMutability: "view",
    payable: false,
    gas: 29000000,
    inputs: [
      {
        type: "address",
        name: "user",
      },
    ],
    outputs: [
      {
        type: "uint256",
      },
    ],
  },
  {
    type: "function",
    name: "claimReward",
    constant: false,
    payable: false,
    gas: 29000000,
    inputs: [],
    outputs: [],
  },
  {
    type: "function",
    name: "owner",
    constant: true,
    stateMutability: "view",
    payable: false,
    gas: 29000000,
    inputs: [],
    outputs: [
      {
        type: "address",
      },
    ],
  },
  {
    type: "function",
    name: "renounceOwnership",
    constant: false,
    payable: false,
    gas: 29000000,
    inputs: [],
    outputs: [],
  },
  {
    type: "function",
    name: "setTotalRewardRate",
    constant: false,
    payable: false,
    gas: 29000000,
    inputs: [
      {
        type: "uint256",
        name: "_totalRewardRate",
      },
    ],
    outputs: [],
  },
  {
    type: "function",
    name: "stake",
    constant: false,
    stateMutability: "payable",
    payable: true,
    gas: 29000000,
    inputs: [],
    outputs: [],
  },
  {
    type: "function",
    name: "stakes",
    constant: true,
    stateMutability: "view",
    payable: false,
    gas: 29000000,
    inputs: [
      {
        type: "address",
      },
    ],
    outputs: [
      {
        type: "uint256",
        name: "amount",
      },
      {
        type: "uint256",
        name: "startTime",
      },
      {
        type: "uint256",
        name: "initialRewardRate",
      },
    ],
  },
  {
    type: "function",
    name: "transferOwnership",
    constant: false,
    payable: false,
    gas: 29000000,
    inputs: [
      {
        type: "address",
        name: "newOwner",
      },
    ],
    outputs: [],
  },
  {
    type: "function",
    name: "unclaimedBalance",
    constant: true,
    stateMutability: "view",
    payable: false,
    gas: 29000000,
    inputs: [
      {
        type: "address",
      },
    ],
    outputs: [
      {
        type: "uint256",
      },
    ],
  },
  {
    type: "function",
    name: "unstake",
    constant: false,
    payable: false,
    gas: 29000000,
    inputs: [],
    outputs: [],
  },
] as const;

export class StakingManager__factory {
  static readonly abi = _abi;
  static createInterface(): StakingManagerInterface {
    return new utils.Interface(_abi) as StakingManagerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): StakingManager {
    return new Contract(address, _abi, signerOrProvider) as StakingManager;
  }
}