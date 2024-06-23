//  // link token balance
//  const linkTokenBalance = useReadContract({
//     abi: erc20Abi,
//     address: TOKEN_NAME_TO_ADDRESS.LinkToken,
//     functionName: "balanceOf",
//     args: [account?.address],
//   });
// console.log(account?.address);
//   console.log(safeSpaceTokenBalance?.toString() / 1e18);
//   console.log(linkTokenBalance?.toString() / 1e18);

const FLEX_SAVE_ABI = [
  {
    type: "constructor",
    inputs: [
      { name: "_mtrg", type: "address", internalType: "address" },
      { name: "_defaultFee", type: "uint256", internalType: "uint256" },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "MTRG",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "contract IERC20" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "claimSavings",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getCurrentTimestamp",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getTimeSaved",
    inputs: [{ name: "_user", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getTopLevelSavingsDetails",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct FlexSave.TopLevelSavingsDetails",
        components: [
          {
            name: "totalAmountSaved",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "completedTimeSaved",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "possibleSavingTime",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "totalSavers",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "defaultPool",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "defaultFee",
            type: "uint256",
            internalType: "uint256",
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getUserCurrentInterestAccrued",
    inputs: [{ name: "_user", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getUserEndInterest",
    inputs: [{ name: "_user", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getUserSavings",
    inputs: [{ name: "_user", type: "address", internalType: "address" }],
    outputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct FlexSave.UserSavings",
        components: [
          { name: "reason", type: "string", internalType: "string" },
          { name: "amount", type: "uint256", internalType: "uint256" },
          {
            name: "startTime",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "stopTime",
            type: "uint256",
            internalType: "uint256",
          },
          { name: "status", type: "bool", internalType: "bool" },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "startSave",
    inputs: [
      { name: "_amount", type: "uint256", internalType: "uint256" },
      { name: "_time", type: "uint256", internalType: "uint256" },
      { name: "_reason", type: "string", internalType: "string" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "topUpSave",
    inputs: [
      { name: "_amount", type: "uint256", internalType: "uint256" },
      { name: "_time", type: "uint256", internalType: "uint256" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "FlexSaveStarted",
    inputs: [
      {
        name: "user",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "amount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "startTime",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "stopTime",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "reason",
        type: "string",
        indexed: false,
        internalType: "string",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "FlexSaveToppedUp",
    inputs: [
      {
        name: "user",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "topUpAmount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "topUpTime",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "SavingsClaimed",
    inputs: [
      {
        name: "user",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "amountClaimed",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "completed",
        type: "bool",
        indexed: false,
        internalType: "bool",
      },
    ],
    anonymous: false,
  },
  {
    type: "error",
    name: "AddressEmptyCode",
    inputs: [{ name: "target", type: "address", internalType: "address" }],
  },
  {
    type: "error",
    name: "AddressInsufficientBalance",
    inputs: [{ name: "account", type: "address", internalType: "address" }],
  },
  { type: "error", name: "FailedInnerCall", inputs: [] },
  {
    type: "error",
    name: "FlexSave__AlreadyHasActiveSavings",
    inputs: [],
  },
  { type: "error", name: "FlexSave__AmountCannotBeZero", inputs: [] },
  { type: "error", name: "FlexSave__NoActiveSavings", inputs: [] },
  {
    type: "error",
    name: "FlexSave__SavingTimeCompletedAlready",
    inputs: [],
  },
  { type: "error", name: "FlexSave__TimeCannotBeZero", inputs: [] },
  { type: "error", name: "ReentrancyGuardReentrantCall", inputs: [] },
  {
    type: "error",
    name: "SafeERC20FailedOperation",
    inputs: [{ name: "token", type: "address", internalType: "address" }],
  },
];

const FLEX_SAVE_CONTRACT_ADDRESS = "0x9FAA0978666B45bACD623E1abD24EbC456bD018b";

const getTimeSaved = (startTime, stopTime, currentTime) => {
  const interval = stopTime - startTime;
  const savedTime = currentTime - startTime;

  const result = savedTime > interval ? interval : savedTime;
  return result;
};

const getTimeLeft = (startTime, stopTime, currentTime) => {
  const interval = stopTime - startTime;
  const timeLeft = stopTime - currentTime;

  const result = timeLeft > 0 ? timeLeft : 0;
  return result;
};

module.exports = {
  FLEX_SAVE_ABI,
  FLEX_SAVE_CONTRACT_ADDRESS,
  getTimeSaved,
  getTimeLeft,
};
