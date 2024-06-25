const TARGET_DRIVEN_SAVE_ABI = [
  {
    type: "constructor",
    inputs: [{ name: "_mtrg", type: "address", internalType: "address" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "createTargetDrivenSave",
    inputs: [
      { name: "_reason", type: "string", internalType: "string" },
      { name: "_amount", type: "uint256", internalType: "uint256" },
      {
        name: "_targetAmount",
        type: "uint256",
        internalType: "uint256",
      },
      { name: "_time", type: "uint256", internalType: "uint256" },
    ],
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
    name: "getUserAllTargetDrivenSaving",
    inputs: [{ name: "_user", type: "address", internalType: "address" }],
    outputs: [
      {
        name: "",
        type: "tuple[]",
        internalType: "struct TargetDrivenSave.TargetDrivenSavings[]",
        components: [
          { name: "saveId", type: "uint256", internalType: "uint256" },
          { name: "reason", type: "string", internalType: "string" },
          { name: "amount", type: "uint256", internalType: "uint256" },
          {
            name: "targetAmount",
            type: "uint256",
            internalType: "uint256",
          },
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
          { name: "completed", type: "bool", internalType: "bool" },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getUserTargetDrivenSaving",
    inputs: [
      { name: "_user", type: "address", internalType: "address" },
      { name: "_saveId", type: "uint256", internalType: "uint256" },
    ],
    outputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct TargetDrivenSave.TargetDrivenSavings",
        components: [
          { name: "saveId", type: "uint256", internalType: "uint256" },
          { name: "reason", type: "string", internalType: "string" },
          { name: "amount", type: "uint256", internalType: "uint256" },
          {
            name: "targetAmount",
            type: "uint256",
            internalType: "uint256",
          },
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
          { name: "completed", type: "bool", internalType: "bool" },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getUsersTargetDrivenSaveCount",
    inputs: [{ name: "_user", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "topUpTargetDrivenSave",
    inputs: [
      { name: "_saveId", type: "uint256", internalType: "uint256" },
      { name: "_amount", type: "uint256", internalType: "uint256" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "unlockTargetDrivenSave",
    inputs: [{ name: "_saveId", type: "uint256", internalType: "uint256" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "TargetDrivenSaveCreated",
    inputs: [
      {
        name: "user",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "saveId",
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
      {
        name: "amount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "targetAmount",
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
        name: "completed",
        type: "bool",
        indexed: false,
        internalType: "bool",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "TargetDrivenSaveToppedUp",
    inputs: [
      {
        name: "user",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "saveId",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "topUpAmount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "TargetDrivenSaveUnlocked",
    inputs: [
      {
        name: "user",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "saveId",
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
  { type: "error", name: "ReentrancyGuardReentrantCall", inputs: [] },
  {
    type: "error",
    name: "SafeERC20FailedOperation",
    inputs: [{ name: "token", type: "address", internalType: "address" }],
  },
  {
    type: "error",
    name: "TargetDrivenSave__AmountCannnotBeZero",
    inputs: [],
  },
  {
    type: "error",
    name: "TargetDrivenSave__AmountTargetConditionNotSatisfied",
    inputs: [],
  },
  {
    type: "error",
    name: "TargetDrivenSave__AtLeastOneConditionMustBeSet",
    inputs: [],
  },
  {
    type: "error",
    name: "TargetDrivenSave__SaveAlreadyUnlocked",
    inputs: [],
  },
  {
    type: "error",
    name: "TargetDrivenSave__SaveDoesNotExist",
    inputs: [],
  },
  {
    type: "error",
    name: "TargetDrivenSave__TargetAmountMustBeGreaterThanStartAmount",
    inputs: [],
  },
  {
    type: "error",
    name: "TargetDrivenSave__TimeConditionNotSatisfied",
    inputs: [],
  },
  {
    type: "error",
    name: "TargetDrivenSave__TopUpMustIncludeTimeOrAmount",
    inputs: [],
  },
];

const TARGET_DRIVEN_SAVE_FAKE_DATA = [
  {
    saveId: 1,
    reason: "I love eggs",
    amount: 20 * 1e18,
    targetAmount: 0,
    startTime: 3600,
    stopTime: 7200,
    completed: false,
  },
  {
    saveId: 2,
    reason: "To get groceries for next monmth",
    amount: 1 * 1e18,
    targetAmount: 15 * 1e18,
    startTime: Date.now(),
    stopTime: Date.now() + 7200,
    completed: false,
  },
  {
    saveId: 3,
    reason: "I'll fid you in the dark forest",
    amount: 30 * 1e18,
    targetAmount: 24 * 1e18,
    startTime: Date.now(),
    stopTime: Date.now() + 2333,
    completed: true,
  },

  {
    saveId: 4,
    reason:
      "phendste concert is about to sup, different girls with the same isssue",
    amount: 10 * 1e18,
    targetAmount: 20 * 1e18,
    startTime: 0,
    stopTime: 0,
    completed: false,
  },
];

const TARGET_DRIVEN_SAVE_CONTRACT_ADDRESS =
  "0x36f7c8875836f3C18d188Cb6AE7cFe253218EcA6";

const handleTypeDisplay = (targetDrivenSave) => {
  if (targetDrivenSave.targetAmount != 0 && targetDrivenSave.stopTime == 0) {
    return "Amount Driven";
  }
  if (targetDrivenSave.targetAmount == 0 && targetDrivenSave.stopTime != 0) {
    return "Time Driven";
  }
  if (targetDrivenSave.targetAmount != 0 && targetDrivenSave.stopTime != 0) {
    return "Both";
  }
};

const calcProgress = (selectedSave, typeString, currentTimeStamp) => {
  if (typeString == "Amount Driven") {
    return (
      (selectedSave.amount.toString() / selectedSave.targetAmount.toString()) *
      100
    );
  }
  if (typeString == "Time Driven") {
    const totalDuration =
      selectedSave.stopTime.toString() - selectedSave.startTime.toString();
    const elapsedTime = currentTimeStamp - selectedSave.startTime.toString();

    return (elapsedTime / totalDuration) * 100 > 100
      ? 100
      : (elapsedTime / totalDuration) * 100;
  }
  if (typeString == "Both") {
    const amountPercent =
      (selectedSave.amount.toString() / selectedSave.targetAmount.toString()) *
        100 >
      100
        ? 100
        : (selectedSave.amount.toString() /
            selectedSave.targetAmount.toString()) *
          100;

    const totalDuration =
      selectedSave.stopTime.toString() - selectedSave.startTime.toString();
    const elapsedTime = currentTimeStamp - selectedSave.startTime.toString();
    const timePercent =
      (elapsedTime / totalDuration) * 100 >= 100
        ? 100
        : (elapsedTime / totalDuration) * 100;

    console.log(timePercent, "laaa");

    return (amountPercent + timePercent) / 2;
  }
};

const progressBarStyle = (progressPercent) => {
  if (progressPercent > 0 && progressPercent < 35) {
    return "red-progress";
  }
  if (progressPercent > 35 && progressPercent < 70) {
    return "brown-progress";
  }
  if (progressPercent > 70 && progressPercent < 99) {
    return "yellow-progress";
  }
  if (progressPercent > 100) {
    return "green-progress";
  }
};

module.exports = {
  TARGET_DRIVEN_SAVE_FAKE_DATA,
  TARGET_DRIVEN_SAVE_ABI,
  TARGET_DRIVEN_SAVE_CONTRACT_ADDRESS,
  handleTypeDisplay,
  calcProgress,
  progressBarStyle,
};
