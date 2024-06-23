import React, { useState } from "react";
import styles from "../styles/groupSave.module.css";
import {
  MOCK_GROUP_LIST,
  MOCK_PROPOSALS_FOR_GROUP_ONE,
} from "@/utils/groupSave";
import Image from "next/image";

export const OngoingProposals = () => {
  const [selectedProposal, setSelectedProposal] = useState(false);
  const [showRecipients, setShowRecipients] = useState(false);

  return (
    <div className={styles.proposalContainer}>
      <div className={styles.proposalList}>
        {MOCK_PROPOSALS_FOR_GROUP_ONE.length > 0 ? (
          MOCK_PROPOSALS_FOR_GROUP_ONE.map((proposal) => {
            if (proposal.completed == false)
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
                    <p>{proposal.proposalId}</p>
                  </div>

                  <div className={styles.proposalBoxDetails}>
                    <h4>Proposal Reason</h4>
                    <p>{proposal.reason}</p>
                  </div>
                </div>
              );
          })
        ) : (
          <p>No Proposal For This Group</p>
        )}
      </div>

      {selectedProposal && !showRecipients && (
        <div className={styles.proposalDetails}>
          <div className={styles.multipleDetails}>
            <div className={styles.detailsBox}>
              <h5>Proposal ID</h5>
              <p>{selectedProposal.proposalId}</p>
            </div>

            <div className={styles.detailsBox}>
              <h5>Total Members</h5>
              <p>{MOCK_GROUP_LIST[0].members.length}</p>
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
                {(MOCK_GROUP_LIST[0].quorum /
                  MOCK_GROUP_LIST[0].members.length) *
                  100}{" "}
                %
              </p>
            </div>

            <div className={styles.detailsBox}>
              <h5>Members Progress</h5>
              <p>
                {((selectedProposal.accepted + selectedProposal.rejected) /
                  MOCK_GROUP_LIST[0].members.length) *
                  100}{" "}
                %
              </p>
            </div>

            <div className={styles.detailsBox}>
              <h5>Accepted</h5>
              <p>
                {selectedProposal.accepted} /{" "}
                {MOCK_GROUP_LIST[0].members.length}
              </p>
            </div>

            <div className={styles.detailsBox}>
              <h5>Rejected</h5>
              <p>
                {" "}
                {selectedProposal.rejected} /{" "}
                {MOCK_GROUP_LIST[0].members.length}
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
                    (accumulator, currentValue) => accumulator + currentValue,
                    0
                  ) / 1e18}
                </p>
              </div>
            </div>

            <div className={styles.detailsBox}>
              <h5>Participated</h5>
              <p>YES</p>
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

          <div className={styles.acceptOrReject}>
            <button className={styles.acceptButton}>Accept</button>
            <button className={styles.rejectButton}>Reject</button>
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
                  (accumulator, currentValue) => accumulator + currentValue,
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
                return <p>{amount / 1e18}</p>;
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
