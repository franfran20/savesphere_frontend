"use client";

import React, { useState } from "react";
import styles from "../styles/groupSave.module.css";

import Image from "next/image";
import { useWriteContract } from "wagmi";
import { GROUP_SAVE_ABI, GROUP_SAVE_CONTRACT_ADDRESS } from "@/utils/groupSave";

export const CreateProposal = ({ groupId }) => {
  const [selectedRecipients, setSelectedRecipients] = useState([]);
  const [selectedAmounts, setSelectedAmounts] = useState([]);
  const [currentRecipient, setCurrentRecipient] = useState();
  const [currentAmount, setCurrentAmount] = useState();
  const [pageError, setPageError] = useState();
  const [errorMsg, setErrorMsg] = useState();
  const [proposalReason, setProposalReason] = useState();

  const { writeContract: createProposal } = useWriteContract();

  const handlePageErr = () => {
    if (!pageError) {
      return;
    }

    if (pageError.includes("insufficient allowance")) {
      return "Insufficient Token Allowance";
    }
    if (
      pageError.includes(
        "GroupSave__ProposalAmountGreaterThanPendingGroupBalance"
      )
    ) {
      return "Current Proposal Amount > Group Balance Including Pending Proposal";
    }

    console.log(pageError);
  };

  const handleAddRecipientAndAmount = () => {
    if (!currentRecipient || !currentAmount) {
      setErrorMsg("Every Recipient Must Have An Amount");
      return;
    }

    setSelectedRecipients((prevRecipients) => [
      ...prevRecipients,
      currentRecipient,
    ]);
    setSelectedAmounts((prevAmounts) => [...prevAmounts, currentAmount]);

    setErrorMsg(false);
  };

  return (
    <div className={styles.createProposal}>
      <div className={styles.createProposalInput}>
        <input
          placeholder="Recipient"
          onChange={(e) => {
            setCurrentRecipient(e.target.value);
            setErrorMsg(false);
            setPageError(false);
          }}
        />
        <div className={styles.addAmount}>
          <input
            placeholder="Amount"
            type="number"
            onChange={(e) => {
              setCurrentAmount(e.target.value * 1e18);
              setErrorMsg(false);
              setPageError(false);
            }}
          />
          <button onClick={handleAddRecipientAndAmount}>Add</button>
          <button
            onClick={() => {
              setSelectedRecipients([]);
              setSelectedAmounts([]);
              setErrorMsg(false);
            }}
          >
            Clear
          </button>
        </div>

        <textarea
          placeholder="Proposal Reason"
          onChange={(e) => setProposalReason(e.target.value)}
        />

        {errorMsg && <p className="errorMsg">{errorMsg}</p>}
        {pageError && <p className="errorMsg">{handlePageErr()}</p>}

        <button
          className={styles.createProposalButton}
          onClick={() => {
            createProposal(
              {
                abi: GROUP_SAVE_ABI,
                address: GROUP_SAVE_CONTRACT_ADDRESS,
                functionName: "createGroupSaveProposal",
                args: [
                  groupId,
                  proposalReason,
                  selectedAmounts,
                  selectedRecipients,
                ],
              },
              {
                onError(err) {
                  setPageError(err.message);
                },
              }
            );
          }}
        >
          Create Proposal &gt;
        </button>
        <div className={styles.proposeUnderline}></div>
      </div>

      {selectedRecipients.length >= 1 &&
        selectedRecipients.length == selectedAmounts.length && (
          <div className={styles.recipientsInfo}>
            <div className={styles.recipientsInfoHeader}>
              <h3>Recipients</h3>
              <div className={styles.recipientTotalAmount}>
                <p>Total: </p>
                <Image src="/meter.png" width="30" height="30" />
                <p>
                  {selectedAmounts.reduce(
                    (accumulator, currentValue) => accumulator + currentValue,
                    0
                  ) / 1e18}
                </p>
              </div>
            </div>

            <div className={styles.recipientsAndAmount}>
              <div className={styles.recipients}>
                {selectedRecipients.map((recipient, index) => {
                  return (
                    <p>
                      {index + 1}. {recipient}
                    </p>
                  );
                })}
              </div>

              <div className={styles.amounts}>
                {selectedAmounts.map((amount) => {
                  return <p>{amount / 1e18}</p>;
                })}
              </div>
            </div>
          </div>
        )}
    </div>
  );
};
