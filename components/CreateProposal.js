"use client";

import React, { useState } from "react";
import styles from "../styles/groupSave.module.css";

import Image from "next/image";

export const CreateProposal = () => {
  const [selectedRecipients, setSelectedRecipients] = useState([]);
  const [selectedAmounts, setSelectedAmounts] = useState([]);
  const [currentRecipient, setCurrentRecipient] = useState();
  const [currentAmount, setCurrentAmount] = useState();

  const [errorMsg, setErrorMsg] = useState();

  const handleAddRecipientAndAmount = () => {
    // there must be a corresponding amount for the user
    // check that it doesnt exceed pending balance of group
    // all other error handlers in here too

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
          onChange={(e) => setCurrentRecipient(e.target.value)}
        />
        <div className={styles.addAmount}>
          <input
            placeholder="Amount"
            type="number"
            onChange={(e) => setCurrentAmount(e.target.value * 1e18)}
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

        <textarea placeholder="Proposal Reason" />

        {errorMsg && <p className="errorMsg">{errorMsg}</p>}

        <button className={styles.createProposalButton}>
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
