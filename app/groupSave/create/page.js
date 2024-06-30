"use client";

import Image from "next/image";
import styles from "../../../styles/groupSave.module.css";
import { Navbar } from "@/components/Navbar";

import { useState } from "react";
import {
  useAccount,
  useBalance,
  useReadContract,
  useWriteContract,
} from "wagmi";
import { APPROVAL_VALUE, MTRG_TOKEN_ADDRESS } from "@/utils";
import { erc20Abi, maxUint256 } from "viem";
import { GROUP_SAVE_ABI, GROUP_SAVE_CONTRACT_ADDRESS } from "@/utils/groupSave";

export default function CreateGroupSave() {
  const account = useAccount();

  const [groupSaveName, setGroupSaveName] = useState();
  const [startAmount, setStartAmount] = useState();
  const [singleMember, setSingleMember] = useState();
  const [quorum, setQuorum] = useState();
  const [members, setMembers] = useState([]);
  const [pageError, setPageError] = useState(false);

  const { writeContract: createGroupSave } = useWriteContract();
  const { writeContract: approveToken } = useWriteContract();

  const userMTRGBalance = useBalance({
    address: account && account.address,
    token: MTRG_TOKEN_ADDRESS,
  });

  const allowance = useReadContract({
    abi: erc20Abi,
    address: MTRG_TOKEN_ADDRESS,
    functionName: "allowance",
    args: [account && account.address, GROUP_SAVE_CONTRACT_ADDRESS],
  });

  console.log(members);

  const handleAddMember = () => {
    if (members.includes(singleMember)) {
      return;
    }

    if (account) {
      if (singleMember == account.address) {
        return;
      }

      setMembers([...members, singleMember]);
    }
  };

  const handlePageErr = () => {
    if (!pageError) {
      return;
    }

    if (pageError.includes("insufficient allowance")) {
      return "Insufficient Token Allowance";
    }
    if (pageError.includes("GroupSave__QuorumCantBeGreaterThanMembers")) {
      return "Quorum has to be less than or equal to total members";
    }
    if (pageError.includes("GroupSave__QurumMustBeGreaterThanOne")) {
      return "Quorum has to be greater than one";
    }

    console.log(pageError);
  };

  return (
    <main>
      <Navbar />

      <div className={styles.createGroupSave}>
        <div className={styles.approveAll}>
          <div className="special-header">
            <h3>Create Group Save</h3>
            <div></div>
          </div>

          {allowance.isFetched &&
            allowance.data.toString() < APPROVAL_VALUE && (
              <div className="approve">
                <button
                  onClick={() => {
                    approveToken({
                      abi: erc20Abi,
                      address: MTRG_TOKEN_ADDRESS,
                      functionName: "approve",
                      args: [GROUP_SAVE_CONTRACT_ADDRESS, maxUint256],
                    });
                  }}
                >
                  Approve All &gt;
                </button>
                <p>Please Approve Tokens Once For Smooth Interactions</p>
              </div>
            )}
        </div>

        <div className={styles.createDetailContainer}>
          <div className={styles.createInputSection}>
            <div className={styles.userBal}>
              <h5>Your Balance</h5>
              <div>
                <Image src="/meter.png" width="25" height="25" />
                <p>
                  {userMTRGBalance.isFetched && userMTRGBalance.data.formatted}
                </p>
              </div>
            </div>

            <input
              placeholder="GroupSave Name"
              style={{ width: "250px" }}
              onChange={(e) => setGroupSaveName(e.target.value)}
            />
            <input
              placeholder="Starting Amount"
              type="number"
              onChange={(e) => setStartAmount(e.target.value * 1e18)}
            />

            <span>Members</span>
            <div className={styles.addMember}>
              <input
                placeholder="Address"
                style={{ width: "250px" }}
                onChange={(e) => setSingleMember(e.target.value)}
              />
              <button onClick={handleAddMember}>Add</button>
              <button onClick={() => setMembers([])}>Clear</button>
            </div>

            <input
              placeholder="Required Signers"
              type="number"
              onChange={(e) => {
                setQuorum(e.target.value);
                setPageError(false);
              }}
            />

            {quorum && members.length > 0 && (
              <p style={{ marginBottom: "10px" }}>
                {(quorum / (members.length + 1)) * 100 > 100
                  ? 100
                  : ((quorum / (members.length + 1)) * 100).toFixed(2)}
                %
              </p>
            )}

            {pageError && <p className="errorMsg">{handlePageErr()}</p>}

            <button
              className={styles.createGroupSaveBtn}
              onClick={() => {
                createGroupSave(
                  {
                    abi: GROUP_SAVE_ABI,
                    address: GROUP_SAVE_CONTRACT_ADDRESS,
                    functionName: "createGroupSave",
                    args: [groupSaveName, startAmount, members, quorum],
                  },
                  {
                    onError(err) {
                      setPageError(err.message);
                    },
                  }
                );
              }}
            >
              Create Group Save &gt;
            </button>
            <div className={styles.btnUnderline}></div>
          </div>

          <div className={styles.membersSection}>
            <div className={styles.membersHeader}>
              <h4>Members</h4>
              <h5>Total: {members && members.length + 1} </h5>
            </div>

            <div className={styles.addedMembers}>
              {account && <p>1. {account.address}</p>}
              {members.map((member, index) => {
                return (
                  <p className={styles.oneMember}>
                    {index + 2}. {member}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
