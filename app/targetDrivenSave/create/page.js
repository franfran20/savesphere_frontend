"use client";

import Image from "next/image";
import styles from "../../../styles/targetDrivenSave.module.css";
import { Navbar } from "@/components/Navbar";
import {
  TARGET_DRIVEN_SAVE_ABI,
  TARGET_DRIVEN_SAVE_CONTRACT_ADDRESS,
} from "@/utils/targetDrivenSave";
import { useState } from "react";
import {
  useAccount,
  useBalance,
  useReadContract,
  useWriteContract,
} from "wagmi";
import { APPROVAL_VALUE, MTRG_TOKEN_ADDRESS } from "@/utils";
import { erc20Abi, maxUint256 } from "viem";
import { motion } from "framer-motion";

export default function CreateTargetDrivenSave() {
  const [selectedType, setSelectedType] = useState(3);
  const [savingTime, setSavingTime] = useState(0);
  const [reason, setReason] = useState();
  const [amount, setAmount] = useState(0);
  const [targetAmount, setTargetAmount] = useState(0);
  const [pageError, setPageError] = useState(false);

  const account = useAccount();
  const { writeContract: createTargetDrivenSave } = useWriteContract();
  const { writeContract: approveToken } = useWriteContract();

  const userMTRGBalance = useBalance({
    address: account && account.address,
    token: MTRG_TOKEN_ADDRESS,
  });

  const allowance = useReadContract({
    abi: erc20Abi,
    address: MTRG_TOKEN_ADDRESS,
    functionName: "allowance",
    args: [account && account.address, TARGET_DRIVEN_SAVE_CONTRACT_ADDRESS],
  });

  console.log(allowance.isFetched && allowance.data);

  const handlePageErr = () => {
    if (!pageError) {
      return;
    }

    if (pageError.includes("insufficient allowance")) {
      return "Insufficient Token Allowance";
    }
    if (pageError.includes("TargetDrivenSave__AtLeastOneConditionMustBeSet")) {
      return "A time or amount target or both must be set";
    }

    console.log(pageError);
  };

  console.log(savingTime, reason, amount, targetAmount);

  return (
    <main>
      <Navbar />

      <div className={styles.createTargetDrivenSave}>
        <div className={styles.approveAll}>
          <div className="special-header">
            <h3>Target Driven Save</h3>
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
                      args: [TARGET_DRIVEN_SAVE_CONTRACT_ADDRESS, maxUint256],
                    });
                  }}
                >
                  Approve All &gt;
                </button>
                <p>Please Approve Tokens Once For Smooth Interactions</p>
              </div>
            )}
        </div>

        <div className={styles.createContainer}>
          <div className={styles.createInputContainer}>
            <textarea
              placeholder="Saving Reason"
              onChange={(e) => setReason(e.target.value)}
            />

            <div className={styles.inputAmountAndBalance}>
              <input
                placeholder="Amount"
                type="number"
                onChange={(e) => {
                  setAmount(e.target.value * 1e18);
                  setPageError(false);
                }}
              />

              <div className={styles.selectedSaveDetail}>
                <h4>Your Balance</h4>
                <div>
                  <Image src="/meter.png" width="25" height="25" />
                  <p>
                    {userMTRGBalance.isFetched &&
                      userMTRGBalance.data.formatted}
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.saveType}>
              <button
                onClick={() => {
                  setSelectedType(1);
                  setSavingTime(0);
                }}
                className={
                  selectedType == 1
                    ? styles.selectedType
                    : styles.notSelectedType
                }
              >
                Amount
              </button>
              <button
                onClick={() => {
                  setSelectedType(2);
                  setTargetAmount(0);
                }}
                className={
                  selectedType == 2
                    ? styles.selectedType
                    : styles.notSelectedType
                }
              >
                Time
              </button>
              <button
                onClick={() => setSelectedType(3)}
                className={
                  selectedType == 3
                    ? styles.selectedType
                    : styles.notSelectedType
                }
              >
                Both
              </button>
            </div>

            {(selectedType == 1 || selectedType == 3) && (
              <input
                placeholder="Target Amount"
                type="number"
                onChange={(e) => setTargetAmount(e.target.value * 1e18)}
              />
            )}

            {(selectedType == 2 || selectedType == 3) && (
              <input
                placeholder="Time In Seconds"
                type="number"
                onChange={(e) => setSavingTime(e.target.value)}
              />
            )}

            {(selectedType == 2 || selectedType == 3) && (
              <div className={styles.someTimeOptions}>
                <button
                  onClick={() => setSavingTime(1200)}
                  className={
                    savingTime == 1200
                      ? styles.selectedType
                      : styles.notSelectedType
                  }
                >
                  20 mins
                </button>
                <button
                  onClick={() => setSavingTime(3600)}
                  className={
                    savingTime == 3600
                      ? styles.selectedType
                      : styles.notSelectedType
                  }
                >
                  1 hour
                </button>
                <button
                  onClick={() => setSavingTime(86400)}
                  className={
                    savingTime == 86400
                      ? styles.selectedType
                      : styles.notSelectedType
                  }
                >
                  24 hrs
                </button>
                <button
                  onClick={() => setSavingTime(604800)}
                  className={
                    savingTime == 604800
                      ? styles.selectedType
                      : styles.notSelectedType
                  }
                >
                  1 week
                </button>
              </div>
            )}

            {pageError && <p className="errorMsg">{handlePageErr()}</p>}

            <button
              className="action-btn"
              disabled={
                (selectedType == 1 || selectedType == 3) &&
                targetAmount <= amount
              }
              onClick={() => {
                createTargetDrivenSave(
                  {
                    abi: TARGET_DRIVEN_SAVE_ABI,
                    address: TARGET_DRIVEN_SAVE_CONTRACT_ADDRESS,
                    functionName: "createTargetDrivenSave",
                    args: [reason, amount, targetAmount, savingTime],
                  },
                  {
                    onError(err) {
                      setPageError(err.message);
                    },
                  }
                );
              }}
            >
              Create Savings &gt;
            </button>
          </div>

          <motion.div
            className={styles.createDesignContainer}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Image src="/3-box.png" width="100" height="100" />
            <h3>We're glad to see you starting a target-driven saving!</h3>
            <p>
              Target-oriented savings enable you to designate funds for a
              specific goal of your choosing, whether it's for your upcoming
              business venture, purchasing a bicycle, covering next month's
              groceries, or setting aside money for future staff training at
              your company.
            </p>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
