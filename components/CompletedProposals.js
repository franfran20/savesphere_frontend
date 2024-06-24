"use client";

import React, { useState } from "react";
import styles from "../styles/groupSave.module.css";
import {
  GROUP_SAVE_ABI,
  GROUP_SAVE_CONTRACT_ADDRESS,
  MOCK_GROUP_LIST,
  MOCK_PROPOSALS_FOR_GROUP_ONE,
} from "@/utils/groupSave";
import Image from "next/image";
import { useAccount, useReadContract } from "wagmi";

export const CompletedProposals = ({ groupId }) => {
  const [selectedProposal, setSelectedProposal] = useState(false);
  const [showRecipients, setShowRecipients] = useState(false);
  const account = useAccount();

  const allGroupProposals = useReadContract({
    abi: GROUP_SAVE_ABI,
    address: GROUP_SAVE_CONTRACT_ADDRESS,
    functionName: "getAllProposalsForGroup",
    args: [groupId],
  });

  const selectedGroupSave = useReadContract({
    abi: GROUP_SAVE_ABI,
    address: GROUP_SAVE_CONTRACT_ADDRESS,
    functionName: "getGroupSavings",
    args: [groupId],
  });

  const userParticpated = useReadContract({
    abi: GROUP_SAVE_ABI,
    address: GROUP_SAVE_CONTRACT_ADDRESS,
    functionName: "getUserProposalParticipation",
    args: [
      account && account.address,
      groupId,
      selectedProposal && selectedProposal.proposalId,
    ],
  });

  if (allGroupProposals.isFetched) console.log(allGroupProposals.data);

  return (
    <div className={styles.proposalContainer}>
      <div className={styles.proposalList}>
        {allGroupProposals.isFetched &&
        allGroupProposals.data.filter(
          (proposal) => proposal.completed.toString() != "0"
        ).length > 0 ? (
          allGroupProposals.data.map((proposal) => {
            if (
              proposal.completed.toString() == "1" ||
              proposal.completed.toString() == "2"
            )
              return (
                <div
                  onClick={() => setSelectedProposal(proposal)}
                  className={
                    selectedProposal &&
                    selectedProposal.proposalId == proposal.proposalId
                      ? styles.selectedProposalBox
                      : styles.proposalBox
                  }
                >
                  <div className={styles.proposalBoxDetails}>
                    <h4>ID</h4>
                    <p>{proposal.proposalId.toString()}</p>
                  </div>

                  <div className={styles.proposalBoxDetails}>
                    <h4>Proposal Reason</h4>
                    <p>{proposal.reason}</p>
                  </div>
                </div>
              );
          })
        ) : (
          <p>No Completed Proposal For This Group</p>
        )}
      </div>

      {selectedProposal && !showRecipients && (
        <div className={styles.proposalDetails}>
          <div className={styles.multipleDetails}>
            <div className={styles.detailsBox}>
              <h5>Proposal ID</h5>
              <p>{selectedProposal.proposalId.toString()}</p>
            </div>

            <div className={styles.detailsBox}>
              <h5>Total Members</h5>
              <p>
                {selectedGroupSave.isFetched &&
                  selectedGroupSave.data.members.length}
              </p>
            </div>
          </div>

          <div className={styles.detailsBox}>
            <h5>Reason</h5>
            <p>{selectedProposal.reason}</p>
          </div>

          <div className={styles.multipleDetails}>
            <div className={styles.detailsBox}>
              <h5>Group Requirement</h5>
              <p>
                {(
                  (selectedGroupSave.isFetched &&
                    selectedGroupSave.data.quorum.toString() /
                      selectedGroupSave.data.members.length) * 100
                ).toFixed(2)}{" "}
                %
              </p>
            </div>

            <div className={styles.detailsBox}>
              <h5>Members Progress</h5>
              <p>
                {selectedGroupSave.isFetched &&
                  (
                    ((parseInt(selectedProposal.accepted.toString()) +
                      parseInt(selectedProposal.rejected.toString())) /
                      selectedGroupSave.data.members.length) *
                    100
                  ).toFixed(2)}{" "}
                %
              </p>
            </div>

            <div className={styles.detailsBox}>
              <h5>Accepted</h5>
              <p>
                {selectedGroupSave.isFetched &&
                  parseInt(selectedProposal.accepted.toString())}{" "}
                / {selectedGroupSave.data.members.length}
              </p>
            </div>

            <div className={styles.detailsBox}>
              <h5>Rejected</h5>
              <p>
                {selectedProposal.rejected.toString()} /{" "}
                {selectedGroupSave.isFetched &&
                  selectedGroupSave.data.members.length}
              </p>
            </div>
          </div>

          <div className={styles.multipleDetails}>
            <div className={styles.detailsBox}>
              <h5>Total Amount</h5>

              <div>
                <Image src="/meter.png" width="30" height="30" />
                <p>
                  {selectedProposal.amounts.reduce(
                    (accumulator, currentValue) =>
                      parseInt(accumulator.toString()) +
                      parseInt(currentValue.toString()),
                    0
                  ) / 1e18}
                </p>
              </div>
            </div>

            <div className={styles.detailsBox}>
              <h5>Participated</h5>
              <p>
                {userParticpated.isFetched && userParticpated.data == true
                  ? "YES"
                  : "NO"}
              </p>
            </div>

            <div className={styles.detailsBox}>
              <h5>Recipient</h5>
              <p>
                {selectedProposal.recipients.length > 1
                  ? "Multiple Recipient"
                  : selectedProposal.recipients[0]}
              </p>
            </div>
          </div>

          <div className={styles.detailsBox}>
            <button onClick={() => setShowRecipients(true)}>
              View Recipients &gt;
            </button>
          </div>
        </div>
      )}

      {selectedProposal && showRecipients && (
        <div className={styles.recipientsInfo}>
          <button onClick={() => setShowRecipients(false)}> &lt;</button>

          <div className={styles.recipientsInfoHeader}>
            <h3>Recipients</h3>
            <div className={styles.recipientTotalAmount}>
              <p>Total: </p>
              <Image src="/meter.png" width="30" height="30" />
              <p>
                {selectedProposal.amounts.reduce(
                  (accumulator, currentValue) =>
                    parseInt(accumulator.toString()) +
                    parseInt(currentValue.toString()),
                  0
                ) / 1e18}
              </p>
            </div>
          </div>

          <div className={styles.recipientsAndAmount}>
            <div className={styles.recipients}>
              {selectedProposal.recipients.map((recipient, index) => {
                return (
                  <p>
                    {index + 1}. {recipient}
                  </p>
                );
              })}
            </div>

            <div className={styles.amounts}>
              {selectedProposal.amounts.map((amount) => {
                return <p>{amount.toString() / 1e18}</p>;
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
