/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { FundManager, FundManagerInterface } from "../FundManager";

const _abi = [
  {
    type: "constructor",
    payable: false,
    inputs: [],
  },
  {
    type: "error",
    name: "TransferFailed",
    inputs: [],
  },
  {
    type: "event",
    anonymous: false,
    name: "Paused",
    inputs: [
      {
        type: "address",
        name: "account",
        indexed: false,
      },
    ],
  },
  {
    type: "event",
    anonymous: false,
    name: "RoleAdminChanged",
    inputs: [
      {
        type: "bytes32",
        name: "role",
        indexed: true,
      },
      {
        type: "bytes32",
        name: "previousAdminRole",
        indexed: true,
      },
      {
        type: "bytes32",
        name: "newAdminRole",
        indexed: true,
      },
    ],
  },
  {
    type: "event",
    anonymous: false,
    name: "RoleGranted",
    inputs: [
      {
        type: "bytes32",
        name: "role",
        indexed: true,
      },
      {
        type: "address",
        name: "account",
        indexed: true,
      },
      {
        type: "address",
        name: "sender",
        indexed: true,
      },
    ],
  },
  {
    type: "event",
    anonymous: false,
    name: "RoleRevoked",
    inputs: [
      {
        type: "bytes32",
        name: "role",
        indexed: true,
      },
      {
        type: "address",
        name: "account",
        indexed: true,
      },
      {
        type: "address",
        name: "sender",
        indexed: true,
      },
    ],
  },
  {
    type: "event",
    anonymous: false,
    name: "Unpaused",
    inputs: [
      {
        type: "address",
        name: "account",
        indexed: false,
      },
    ],
  },
  {
    type: "function",
    name: "DEFAULT_ADMIN_ROLE",
    constant: true,
    stateMutability: "view",
    payable: false,
    gas: 29000000,
    inputs: [],
    outputs: [
      {
        type: "bytes32",
      },
    ],
  },
  {
    type: "function",
    name: "PAUSER_ROLE",
    constant: true,
    stateMutability: "view",
    payable: false,
    gas: 29000000,
    inputs: [],
    outputs: [
      {
        type: "bytes32",
      },
    ],
  },
  {
    type: "function",
    name: "TRUSTED_CONTRACT_ROLE",
    constant: true,
    stateMutability: "view",
    payable: false,
    gas: 29000000,
    inputs: [],
    outputs: [
      {
        type: "bytes32",
      },
    ],
  },
  {
    type: "function",
    name: "getRoleAdmin",
    constant: true,
    stateMutability: "view",
    payable: false,
    gas: 29000000,
    inputs: [
      {
        type: "bytes32",
        name: "role",
      },
    ],
    outputs: [
      {
        type: "bytes32",
      },
    ],
  },
  {
    type: "function",
    name: "grantRole",
    constant: false,
    payable: false,
    gas: 29000000,
    inputs: [
      {
        type: "bytes32",
        name: "role",
      },
      {
        type: "address",
        name: "account",
      },
    ],
    outputs: [],
  },
  {
    type: "function",
    name: "hasRole",
    constant: true,
    stateMutability: "view",
    payable: false,
    gas: 29000000,
    inputs: [
      {
        type: "bytes32",
        name: "role",
      },
      {
        type: "address",
        name: "account",
      },
    ],
    outputs: [
      {
        type: "bool",
      },
    ],
  },
  {
    type: "function",
    name: "pause",
    constant: false,
    payable: false,
    gas: 29000000,
    inputs: [],
    outputs: [],
  },
  {
    type: "function",
    name: "paused",
    constant: true,
    stateMutability: "view",
    payable: false,
    gas: 29000000,
    inputs: [],
    outputs: [
      {
        type: "bool",
      },
    ],
  },
  {
    type: "function",
    name: "renounceRole",
    constant: false,
    payable: false,
    gas: 29000000,
    inputs: [
      {
        type: "bytes32",
        name: "role",
      },
      {
        type: "address",
        name: "account",
      },
    ],
    outputs: [],
  },
  {
    type: "function",
    name: "revokeRole",
    constant: false,
    payable: false,
    gas: 29000000,
    inputs: [
      {
        type: "bytes32",
        name: "role",
      },
      {
        type: "address",
        name: "account",
      },
    ],
    outputs: [],
  },
  {
    type: "function",
    name: "supportsInterface",
    constant: true,
    stateMutability: "view",
    payable: false,
    gas: 29000000,
    inputs: [
      {
        type: "bytes4",
        name: "interfaceId",
      },
    ],
    outputs: [
      {
        type: "bool",
      },
    ],
  },
  {
    type: "function",
    name: "transferEth",
    constant: false,
    payable: false,
    gas: 29000000,
    inputs: [
      {
        type: "address",
        name: "to",
      },
      {
        type: "uint256",
        name: "amount",
      },
    ],
    outputs: [],
  },
  {
    type: "function",
    name: "unpause",
    constant: false,
    payable: false,
    gas: 29000000,
    inputs: [],
    outputs: [],
  },
] as const;

export class FundManager__factory {
  static readonly abi = _abi;
  static createInterface(): FundManagerInterface {
    return new utils.Interface(_abi) as FundManagerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): FundManager {
    return new Contract(address, _abi, signerOrProvider) as FundManager;
  }
}
