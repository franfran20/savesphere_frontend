"use client";

import Image from "next/image";
import styles from "../../styles/targetDrivenSave.module.css";
import { Navbar } from "@/components/Navbar";
import {
  calcProgress,
  handleTypeDisplay,
  progressBarStyle,
  TARGET_DRIVEN_SAVE_ABI,
  TARGET_DRIVEN_SAVE_CONTRACT_ADDRESS,
  TARGET_DRIVEN_SAVE_FAKE_DATA,
} from "@/utils/targetDrivenSave";
import { useState } from "react";
import Link from "next/link";
import {
  useAccount,
  useBalance,
  useReadContract,
  useWriteContract,
} from "wagmi";
import { formatTime, MTRG_TOKEN_ADDRESS } from "@/utils";

export default function TargetDrivenSave() {
  const [selectedOption, setSelectedOption] = useState(false);
  const [selectedSave, setSelectedSave] = useState();
  const [topUpAmount, setTopUpAmount] = useState(0);

  const account = useAccount();

  const { writeContract: topUpTargetDrivenSave, error: topUpError } =
    useWriteContract();
  const { writeContract: unlockTargetDrivenSave } = useWriteContract();

  const userMTRGBalance = useBalance({
    address: account && account.address,
    token: MTRG_TOKEN_ADDRESS,
  });

  const currentTimeStamp = useReadContract({
    abi: TARGET_DRIVEN_SAVE_ABI,
    address: TARGET_DRIVEN_SAVE_CONTRACT_ADDRESS,
    functionName: "getCurrentTimestamp",
  });

  const userTargetDrivenSavings = useReadContract({
    abi: TARGET_DRIVEN_SAVE_ABI,
    address: TARGET_DRIVEN_SAVE_CONTRACT_ADDRESS,
    functionName: "getUserAllTargetDrivenSaving",
    args: [account && account.address],
  });

  if (topUpError) {
    console.log(topUpError.message);
  }

  return (
    <main>
      <Navbar />

      <div className={styles.targetDrivenSave}>
        <div className="headerAndCreate">
          <div className="special-header">
            <h3>Target Driven Save</h3>
            <div></div>
          </div>

          <Link href="/targetDrivenSave/create">
            <Image src="/add.png" width="30" height="30" />
          </Link>
        </div>

        <div className={styles.savingsContainer}>
          <div className={styles.left}>
            <div className={styles.selectOption}>
              <button
                onClick={() => {
                  setSelectedOption(false);
                  setSelectedSave(false);
                }}
                className={
                  selectedOption == false
                    ? styles.selectedOptionButton
                    : styles.nonSelectedOptionButton
                }
              >
                Active
              </button>
              <button
                onClick={() => {
                  setSelectedOption(true);
                  setSelectedSave(false);
                }}
                className={
                  selectedOption == true
                    ? styles.selectedOptionButton
                    : styles.nonSelectedOptionButton
                }
              >
                Completed
              </button>
            </div>

            {/* userTargetDrivenSavings.data.filter(task => task.completed === false); */}

            {userTargetDrivenSavings.isFetched && (
              <div className={styles.savingsList}>
                {userTargetDrivenSavings.data.filter(
                  (save) => save.completed == selectedOption
                ).length > 0 ? (
                  userTargetDrivenSavings.data.map((targetDrivenSave) => {
                    if (targetDrivenSave.completed == selectedOption)
                      return (
                        <div
                          className={
                            selectedSave &&
                            selectedSave.saveId == targetDrivenSave.saveId
                              ? styles.selectedTargetDrivenSaveBox
                              : styles.taregtDrivenSaveBox
                          }
                          onClick={() => setSelectedSave(targetDrivenSave)}
                        >
                          <div className={styles.topBox}>
                            <div className={styles.boxDetails}>
                              <h4>Savings ID</h4>
                              <p># {targetDrivenSave.saveId.toString()}</p>
                            </div>

                            <div className={styles.boxDetails}>
                              <h4>Type</h4>
                              <p>{handleTypeDisplay(targetDrivenSave)}</p>
                            </div>
                          </div>

                          <div className={styles.boxDetails}>
                            <h4>Reason</h4>
                            <p className={styles.boxReason}>
                              {targetDrivenSave.reason}
                            </p>
                          </div>
                        </div>
                      );
                  })
                ) : (
                  <p>
                    No {selectedOption ? "Completed" : "Active"} Target Driven
                    Save
                  </p>
                )}
              </div>
            )}
          </div>

          {selectedSave && (
            <div className={styles.right}>
              <h3>Savings Details</h3>

              <div className={styles.idAndType}>
                <div className={styles.selectedSaveDetail}>
                  <h4>Savings ID</h4>
                  <p># {selectedSave.saveId.toString()}</p>
                </div>

                <div className={styles.selectedSaveDetail}>
                  <h4>Savings Type</h4>
                  <p>{handleTypeDisplay(selectedSave)}</p>
                </div>
              </div>

              <div className={styles.amountTargetAndTime}>
                <div className={styles.selectedSaveDetail}>
                  <h4>Amount Saved</h4>
                  <div>
                    <Image src="/meter.png" width="25" height="25" />
                    <p>{(selectedSave.amount.toString() / 1e18).toFixed(3)}</p>
                  </div>
                </div>

                <div className={styles.selectedSaveDetail}>
                  <h4>Target Amount</h4>
                  <div>
                    <Image src="/meter.png" width="25" height="25" />
                    <p>
                      {(selectedSave.targetAmount.toString() / 1e18).toFixed(3)}
                    </p>
                  </div>
                </div>

                <div className={styles.selectedSaveDetail}>
                  <h4>Time Remaining</h4>
                  <p>
                    {currentTimeStamp.isFetched &&
                    selectedSave.stopTime.toString() -
                      currentTimeStamp.data.toString() >
                      0
                      ? formatTime(
                          selectedSave.stopTime.toString() -
                            currentTimeStamp.data.toString()
                        )
                      : 0}{" "}
                  </p>
                </div>
              </div>

              <div className={styles.selectedSaveDetail}>
                <h4>Reason</h4>
                <p>{selectedSave.reason}</p>
              </div>

              <div className={styles.progressBalanceAndTopUp}>
                <div className={styles.selectedSaveDetail}>
                  <h4>Progress</h4>
                  {currentTimeStamp.isFetched && (
                    <p>
                      {calcProgress(
                        selectedSave,
                        handleTypeDisplay(selectedSave),
                        currentTimeStamp.data.toString()
                      ).toFixed(2)}
                      %
                    </p>
                  )}

                  <div
                    className={progressBarStyle(
                      calcProgress(
                        selectedSave,
                        handleTypeDisplay(selectedSave)
                      )
                    )}
                  ></div>
                </div>

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

                {selectedSave.completed == false && (
                  <div className={styles.selectedSaveDetail}>
                    <h4>Top Up</h4>
                    <div>
                      <input
                        placeholder="Amount"
                        type="number"
                        onChange={(e) => setTopUpAmount(e.target.value * 1e18)}
                      />
                      <button
                        className="action-btn"
                        onClick={() => {
                          topUpTargetDrivenSave({
                            abi: TARGET_DRIVEN_SAVE_ABI,
                            address: TARGET_DRIVEN_SAVE_CONTRACT_ADDRESS,
                            functionName: "topUpTargetDrivenSave",
                            args: [
                              selectedSave && selectedSave.saveId,
                              topUpAmount,
                            ],
                          });
                        }}
                      >
                        Top Up
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {selectedSave.completed == false && (
                <button
                  className="action-btn"
                  onClick={() =>
                    unlockTargetDrivenSave({
                      abi: TARGET_DRIVEN_SAVE_ABI,
                      address: TARGET_DRIVEN_SAVE_CONTRACT_ADDRESS,
                      functionName: "unlockTargetDrivenSave",
                      args: [selectedSave && selectedSave.saveId],
                    })
                  }
                >
                  Unlock Savings &gt;
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
