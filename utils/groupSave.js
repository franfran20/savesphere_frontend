const GROUP_SAVE_ABI = [
  {
    type: "constructor",
    inputs: [{ name: "_mtrg", type: "address", internalType: "address" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "acceptOrRejectGroupSaveProposal",
    inputs: [
      { name: "_groupId", type: "uint256", internalType: "uint256" },
      { name: "_proposalId", type: "uint256", internalType: "uint256" },
      { name: "_decision", type: "bool", internalType: "bool" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "createGroupSave",
    inputs: [
      {
        name: "_groupSaveName",
        type: "string",
        internalType: "string",
      },
      {
        name: "_startingAmount",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_members",
        type: "address[]",
        internalType: "address[]",
      },
      { name: "_quorum", type: "uint256", internalType: "uint256" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "createGroupSaveProposal",
    inputs: [
      { name: "_groupId", type: "uint256", internalType: "uint256" },
      { name: "_reason", type: "string", internalType: "string" },
      {
        name: "_amounts",
        type: "uint256[]",
        internalType: "uint256[]",
      },
      {
        name: "_recipients",
        type: "address[]",
        internalType: "address[]",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getAllGroupSavings",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "tuple[]",
        internalType: "struct GroupSave.GroupSavings[]",
        components: [
          { name: "groupId", type: "uint256", internalType: "uint256" },
          { name: "name", type: "string", internalType: "string" },
          {
            name: "members",
            type: "address[]",
            internalType: "address[]",
          },
          { name: "quorum", type: "uint256", internalType: "uint256" },
          { name: "amount", type: "uint256", internalType: "uint256" },
          {
            name: "proposalCount",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "pendingAmount",
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
    name: "getAllProposalsForGroup",
    inputs: [{ name: "_groupId", type: "uint256", internalType: "uint256" }],
    outputs: [
      {
        name: "",
        type: "tuple[]",
        internalType: "struct GroupSave.Proposal[]",
        components: [
          {
            name: "proposalId",
            type: "uint256",
            internalType: "uint256",
          },
          { name: "reason", type: "string", internalType: "string" },
          {
            name: "accepted",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "rejected",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "amounts",
            type: "uint256[]",
            internalType: "uint256[]",
          },
          {
            name: "recipients",
            type: "address[]",
            internalType: "address[]",
          },
          {
            name: "completed",
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
    name: "getCurrentTimestamp",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getGroupProposal",
    inputs: [
      { name: "_groupId", type: "uint256", internalType: "uint256" },
      { name: "_proposalId", type: "uint256", internalType: "uint256" },
    ],
    outputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct GroupSave.Proposal",
        components: [
          {
            name: "proposalId",
            type: "uint256",
            internalType: "uint256",
          },
          { name: "reason", type: "string", internalType: "string" },
          {
            name: "accepted",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "rejected",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "amounts",
            type: "uint256[]",
            internalType: "uint256[]",
          },
          {
            name: "recipients",
            type: "address[]",
            internalType: "address[]",
          },
          {
            name: "completed",
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
    name: "getGroupSavings",
    inputs: [{ name: "_groupId", type: "uint256", internalType: "uint256" }],
    outputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct GroupSave.GroupSavings",
        components: [
          { name: "groupId", type: "uint256", internalType: "uint256" },
          { name: "name", type: "string", internalType: "string" },
          {
            name: "members",
            type: "address[]",
            internalType: "address[]",
          },
          { name: "quorum", type: "uint256", internalType: "uint256" },
          { name: "amount", type: "uint256", internalType: "uint256" },
          {
            name: "proposalCount",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "pendingAmount",
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
    name: "getRecipientsAndAmountsList",
    inputs: [
      { name: "_groupId", type: "uint256", internalType: "uint256" },
      { name: "_proposalId", type: "uint256", internalType: "uint256" },
    ],
    outputs: [
      { name: "", type: "address[]", internalType: "address[]" },
      { name: "", type: "uint256[]", internalType: "uint256[]" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getUserProposalParticipation",
    inputs: [
      { name: "_user", type: "address", internalType: "address" },
      { name: "_groupId", type: "uint256", internalType: "uint256" },
      { name: "_proposalId", type: "uint256", internalType: "uint256" },
    ],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "topUpGroupSave",
    inputs: [
      { name: "_groupId", type: "uint256", internalType: "uint256" },
      { name: "_amount", type: "uint256", internalType: "uint256" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "GroupMemberPartipated",
    inputs: [
      {
        name: "groupId",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "proposalId",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "decision",
        type: "bool",
        indexed: false,
        internalType: "bool",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "GroupProposalCompleted",
    inputs: [
      {
        name: "groupId",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "proposalId",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "proposalAmount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "completed",
        type: "uint8",
        indexed: false,
        internalType: "uint8",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "GroupSaveCreated",
    inputs: [
      {
        name: "groupId",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "groupName",
        type: "string",
        indexed: false,
        internalType: "string",
      },
      {
        name: "members",
        type: "address[]",
        indexed: false,
        internalType: "address[]",
      },
      {
        name: "quorum",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "amount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "proposalCount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "pendingAmount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "GroupSaveTopUp",
    inputs: [
      {
        name: "groupId",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "amount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "ProposalCreated",
    inputs: [
      {
        name: "groupId",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "proposalId",
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
        name: "accepted",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "rejected",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "amounts",
        type: "uint256[]",
        indexed: false,
        internalType: "uint256[]",
      },
      {
        name: "recipients",
        type: "address[]",
        indexed: false,
        internalType: "address[]",
      },
      {
        name: "completed",
        type: "uint8",
        indexed: false,
        internalType: "uint8",
      },
      {
        name: "groupPendingAmount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
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
    name: "GroupSave_StartingAmountCannotBeZero",
    inputs: [],
  },
  { type: "error", name: "GroupSave__GroupDoesNotExist", inputs: [] },
  {
    type: "error",
    name: "GroupSave__GroupMemberCannotBeZeroAddress",
    inputs: [],
  },
  {
    type: "error",
    name: "GroupSave__MemberAlreadyParticipated",
    inputs: [],
  },
  {
    type: "error",
    name: "GroupSave__MinimumOfTwoMembersRequired",
    inputs: [],
  },
  {
    type: "error",
    name: "GroupSave__MsgSenderShouldNotBeInMembersList",
    inputs: [],
  },
  {
    type: "error",
    name: "GroupSave__NoIndividualAmountCanBeZero",
    inputs: [],
  },
  {
    type: "error",
    name: "GroupSave__NonMemberCannotAcceptOrRejectProposal",
    inputs: [],
  },
  {
    type: "error",
    name: "GroupSave__NonMemberCannotCreateProposal",
    inputs: [],
  },
  {
    type: "error",
    name: "GroupSave__ProposalAlreadyCompleted",
    inputs: [],
  },
  {
    type: "error",
    name: "GroupSave__ProposalAmountGreaterThanPendingGroupBalance",
    inputs: [],
  },
  {
    type: "error",
    name: "GroupSave__ProposalDoesNotExist",
    inputs: [],
  },
  {
    type: "error",
    name: "GroupSave__QuorumCantBeGreaterThanMembers",
    inputs: [],
  },
  {
    type: "error",
    name: "GroupSave__QurumMustBeGreaterThanOne",
    inputs: [],
  },
  {
    type: "error",
    name: "GroupSave__RecipientCannotBeZeroAddress",
    inputs: [],
  },
  {
    type: "error",
    name: "GroupSave__RecipientsAndAmountsDoNotMatch",
    inputs: [],
  },
  {
    type: "error",
    name: "GroupSave__TopUpAmountCannotBeZero",
    inputs: [],
  },
  { type: "error", name: "ReentrancyGuardReentrantCall", inputs: [] },
  {
    type: "error",
    name: "SafeERC20FailedOperation",
    inputs: [{ name: "token", type: "address", internalType: "address" }],
  },
];

const GROUP_SAVE_CONTRACT_ADDRESS =
  "0xca19D52603977Aff02E3dF9d6844ABDED270dDf4";

const MOCK_GROUP_LIST = [
  {
    groupId: 1,
    name: "Peanut Butter Loves Egg",
    members: [
      "0x5F7FbE4bf8987FA77Ec6C22FD3f3d558B3b68D4e",
      "0x52047DE4458AfaaFF7C6B954C63033A21EfCD2E6",
      "0x79f85f6C4C926277Ef97370d6f89ab1D78F6A4f8",
      "0x41185495Bc8297a65DC46f94001DC7233775EbEe",
    ],
    quorum: 3,
    amount: 10 * 10e18,
    proposalCount: 4,
    pendingAmount: 6 * 10e18,
  },
  {
    groupId: 2,
    name: "Joker Lover Loves Egg",
    members: [
      "0x41185495Bc8297a65DC46f94001DC7233775EbEe",
      "0x52047DE4458AfaaFF7C6B954C63033A21EfCD2E6",
      "0x79f85f6C4C926277Ef97370d6f89ab1D78F6A4f8",
      "0x0A77230d17318075983913bC2145DB16C7366156",
    ],
    quorum: 3,
    amount: 40 * 10e18,
    proposalCount: 4,
    pendingAmount: 29.6 * 10e18,
  },
  {
    groupId: 3,
    name: "Jelly Bean Loves Egg",
    members: [
      "0x5F7FbE4bf8987FA77Ec6C22FD3f3d558B3b68D4e",
      "0x52047DE4458AfaaFF7C6B954C63033A21EfCD2E6",
      "0x79f85f6C4C926277Ef97370d6f89ab1D78F6A4f8",
      "0x79f85f6C4C926277Ef97370d6f89ab1D78F6A4f8",
      "0x79f85f6C4C926277Ef97370d6f89ab1D78F6A4f8",
    ],
    quorum: 2,
    amount: 10 * 10e18,
    proposalCount: 0,
    pendingAmount: 0,
  },
  {
    groupId: 4,
    name: "Egg Man & Sonic Loves Egg",
    members: [
      "0x52047DE4458AfaaFF7C6B954C63033A21EfCD2E6",
      "0x79f85f6C4C926277Ef97370d6f89ab1D78F6A4f8",
    ],
    quorum: 2,
    amount: 20 * 10e18,
    proposalCount: 8,
    pendingAmount: 6 * 10e18,
  },
];

const MOCK_PROPOSALS_FOR_GROUP_ONE = [
  {
    proposalId: 1,
    reason: "I love creating proposalsss",
    accepted: 2,
    rejected: 0,
    amounts: [1e18, 4e18, 50e18, 22.9e18],
    recipients: [
      "0x79f85f6C4C926277Ef97370d6f89ab1D78F6A4f4",
      "0x79f85f6C4C926277Ef97370d6f89ab1D78F6A4e2",
      "0x79f85f6C4C926277E5ef3112abc33b1D78F6A4f3",
      "0x79f85C4ed21ccd121117370d6f89ab1D78F6A4f8",
    ],
    completed: false,
  },
  {
    proposalId: 2,
    reason: "I love eating pie and milk",
    accepted: 1,
    rejected: 4,
    amounts: [33.4e18],
    recipients: ["0x79f85f6C4C926277Ef97370d6f89ab1D78F6A4f4"],
    completed: false,
  },
  {
    proposalId: 3,
    reason:
      "To payout hackathon winner for the HackMeter  2024 Hackathon hosted on buidlbox platform",
    accepted: 5,
    rejected: 0,
    amounts: [4e18, 22.9e18],
    recipients: [
      "0x79f85f6C4C926277Ef97370d6f89ab1D78F6A4f4",
      "0x79f85f6C4C926277Ef97370d6f89ab1D78F6A4e2",
    ],
    completed: true,
  },
  {
    proposalId: 4,
    reason: "Baby Girl you de",
    accepted: 3,
    rejected: 3,
    amounts: [1e18, 4e18, 50e18, 22.9e18],
    recipients: [
      "0x79f85f6C4C926277Ef97370d6f89ab1D78F6A4f4",
      "0x79f85f6C4C926277Ef97370d6f89ab1D78F6A4e2",
      "0x79f85f6C4C926277E5ef3112abc33b1D78F6A4f3",
      "0x79f85C4ed21ccd121117370d6f89ab1D78F6A4f8",
    ],
    completed: false,
  },
  {
    proposalId: 5,
    reason: "To make sure that our f1 tickets and accomadation is readyyyy",
    accepted: 3,
    rejected: 3,
    amounts: [1e18, 4e18, 50e18, 22.9e18],
    recipients: [
      "0x79f85f6C4C926277Ef97370d6f89ab1D78F6A4f4",
      "0x79f85f6C4C926277Ef97370d6f89ab1D78F6A4e2",
      "0x79f85f6C4C926277E5ef3112abc33b1D78F6A4f3",
      "0x79f85C4ed21ccd121117370d6f89ab1D78F6A4f8",
    ],
    completed: false,
  },
];

// struct Proposal {
//     uint256 proposalId;
//     string reason;
//     uint256 accepted;
//     uint256 rejected;
//     uint256[] amounts;
//     address[] recipients;
//     uint256 completed;
// }

module.exports = {
  GROUP_SAVE_ABI,
  GROUP_SAVE_CONTRACT_ADDRESS,
  MOCK_GROUP_LIST,
  MOCK_PROPOSALS_FOR_GROUP_ONE,
};
