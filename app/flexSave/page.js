"use client";

import Image from "next/image";
import styles from "../../styles/flexSave.module.css";
import { Navbar } from "@/components/Navbar";
import {
  FLEX_SAVE_ABI,
  FLEX_SAVE_CONTRACT_ADDRESS,
  getTimeLeft,
  getTimeSaved,
} from "@/utils/flexSave";
import {
  useAccount,
  useBalance,
  useReadContract,
  useWriteContract,
} from "wagmi";
import { useState } from "react";
import {
  APPROVAL_VALUE,
  CURRENT_FEE,
  formatTime,
  MTRG_TOKEN_ADDRESS,
} from "@/utils";
import { erc20Abi, maxUint256 } from "viem";

export default function FlexSave() {
  const [amount, setAmount] = useState();
  const [time, setTime] = useState();
  const [reason, setReason] = useState();
  const [topUpAmount, setTopUpAmount] = useState();
  const [topUpTime, setTopUpTime] = useState();
  const [pageError, setPageError] = useState();
  const account = useAccount();

  // Write Contract

  const { writeContract: startSave } = useWriteContract();
  const { writeContract: approveToken } = useWriteContract();
  const { writeContract: breakOrWithdrawSave } = useWriteContract();
  const { writeContract: topUpSavings } = useWriteContract();

  // Read Contract

  const userMTRGBalance = useBalance({
    address: account && account.address,
    token: MTRG_TOKEN_ADDRESS,
  });

  const currentTimeStamp = useReadContract({
    abi: FLEX_SAVE_ABI,
    address: FLEX_SAVE_CONTRACT_ADDRESS,
    functionName: "getCurrentTimestamp",
  });

  const topLevelSavingsDetails = useReadContract({
    abi: FLEX_SAVE_ABI,
    address: FLEX_SAVE_CONTRACT_ADDRESS,
    functionName: "getTopLevelSavingsDetails",
  });

  const userInterestAccrued = useReadContract({
    abi: FLEX_SAVE_ABI,
    address: FLEX_SAVE_CONTRACT_ADDRESS,
    functionName: "getUserCurrentInterestAccrued", //getUserEndInterest, getUserCurrentInterestAccrued
    args: [account && account.address],
  });

  if (userInterestAccrued) {
    console.log("User Int", userInterestAccrued.data);
  }

  const userSavingDetails = useReadContract({
    abi: FLEX_SAVE_ABI,
    address: FLEX_SAVE_CONTRACT_ADDRESS,
    functionName: "getUserSavings",
    args: [account && account.address],
  });

  const allowance = useReadContract({
    abi: erc20Abi,
    address: MTRG_TOKEN_ADDRESS,
    functionName: "allowance",
    args: [account && account.address, FLEX_SAVE_CONTRACT_ADDRESS],
  });

  if (userSavingDetails) console.log(userSavingDetails.data);

  const handlePageError = () => {
    if (!pageError) {
      return;
    }

    if (pageError.includes("insufficient allowance")) {
      return "Insufficient Token Allowance";
    }

    console.log(pageError);
  };

  return (
    <main>
      <Navbar />

      <div className={styles.flexSave}>
        <div className={styles.approveAll}>
          <div className="special-header">
            <h3>Flex Save</h3>
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
                      args: [FLEX_SAVE_CONTRACT_ADDRESS, maxUint256],
                    });
                  }}
                >
                  Approve All &gt;
                </button>
                <p>Please Approve Tokens Once For Smooth Interactions</p>
              </div>
            )}
        </div>

        <div className={styles.saveDetails}>
          <div className={styles.protocolDetails}>
            <div className={styles.saveBoxes}>
              <p>Total Amount Saved</p>
              <div>
                <Image src="/meter.png" height="30" width="30" />
                <h2>
                  {topLevelSavingsDetails.isFetched &&
                    topLevelSavingsDetails.data.totalAmountSaved.toString() /
                      1e18}
                </h2>
              </div>
            </div>

            <div className={styles.saveBoxes}>
              <p>Total Savers</p>
              <div>
                <h2>
                  {topLevelSavingsDetails.isFetched &&
                    topLevelSavingsDetails.data.totalSavers.toString()}
                </h2>
              </div>
            </div>

            <div className={styles.saveBoxes}>
              <p>Current Interest Pool</p>
              <div>
                <Image src="/meter.png" height="30" width="30" />
                <h2>
                  {topLevelSavingsDetails.isFetched &&
                    topLevelSavingsDetails.data.defaultPool.toString() / 1e18}
                </h2>
              </div>
            </div>
          </div>

          <div className="divider"></div>

          <div className={styles.userDetails}>
            <div className={styles.top}>
              <div className={styles.saveBoxes}>
                <p>Your Interest Earned</p>
                <div>
                  <Image src="/meter.png" height="30" width="30" />
                  <h2>
                    {userInterestAccrued.isFetched &&
                      userInterestAccrued.data.toString() / 1e18}
                  </h2>
                </div>
              </div>

              <div className={styles.savingReason}>
                <p>Your Saving Reason</p>
                <h4>
                  {userSavingDetails.isFetched && userSavingDetails.data.reason}
                </h4>
              </div>
            </div>

            <div className={styles.bottom}>
              <div className={styles.saveBoxes}>
                <p>Your Amount Saved</p>
                <div>
                  <Image src="/meter.png" height="30" width="30" />
                  <h2>
                    {userSavingDetails.isFetched &&
                      userSavingDetails.data.amount.toString() / 1e18}
                  </h2>
                </div>
              </div>

              <div className={styles.saveBoxes}>
                <p>Time Saved</p>
                <div>
                  <h3>
                    {userSavingDetails.isFetched &&
                      currentTimeStamp.isFetched &&
                      formatTime(
                        getTimeSaved(
                          userSavingDetails.data.startTime.toString(),
                          userSavingDetails.data.stopTime.toString(),
                          currentTimeStamp.data.toString()
                        )
                      )}
                  </h3>
                </div>
              </div>

              <div className={styles.saveBoxes}>
                <p>Expected Save Time</p>
                <div>
                  <h3>
                    {userSavingDetails.isFetched &&
                      formatTime(
                        userSavingDetails.data.stopTime.toString() -
                          userSavingDetails.data.startTime.toString()
                      )}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.saveInteractions}>
          {userSavingDetails.isFetched &&
            userSavingDetails.data.status == false && (
              <div className={styles.startSavings}>
                <div className="special-header">
                  <h3>Start Flex Save</h3>
                  <div></div>
                </div>

                <input
                  placeholder="Amount"
                  type="number"
                  onChange={(e) => {
                    setAmount(e.target.value * 1e18);
                    setPageError(false);
                  }}
                />

                <div className={styles.amountAndBalance}>
                  <textarea
                    placeholder="Saving Reason"
                    onChange={(e) => setReason(e.target.value)}
                  />

                  <div className={styles.mtrgBalance}>
                    <h4>Your Balance</h4>
                    <div>
                      <Image src="/meter.png" height="30" width="30" />
                      <p>
                        {userMTRGBalance.isFetched &&
                          userMTRGBalance.data.formatted}
                      </p>
                    </div>
                  </div>
                </div>

                <input
                  placeholder="Time"
                  type="number"
                  onChange={(e) => {
                    setTime(e.target.value);
                    setPageError(false);
                  }}
                />

                {time && <p>{formatTime(time)}</p>}

                <p className="errorMsg">{handlePageError()}</p>

                <button
                  className="action-btn"
                  onClick={() => {
                    startSave(
                      {
                        abi: FLEX_SAVE_ABI,
                        address: FLEX_SAVE_CONTRACT_ADDRESS,
                        functionName: "startSave",
                        args: [amount, time, reason],
                      },
                      {
                        onError(err) {
                          setPageError(err.message);
                        },
                      }
                    );
                  }}
                >
                  Start Save &gt;
                </button>
              </div>
            )}

          {userSavingDetails.isFetched &&
            userSavingDetails.data.status == true &&
            currentTimeStamp.isFetched &&
            userSavingDetails.isFetched &&
            (currentTimeStamp.data.toString() <
            userSavingDetails.data.stopTime.toString() ? (
              <div className={styles.breakSavings}>
                <div className="special-header">
                  <h3>Break Savings</h3>
                  <div></div>
                </div>

                <p className={styles.warningText}>
                  Breaking this save earlier than you anticipated to save for
                  will incur a fee. Are you sure you want to break this save ?
                </p>

                <div className={styles.breakDetails}>
                  <div className={styles.breakDetailsBox}>
                    <h4>Current Fee</h4>
                    <div>
                      <p>{CURRENT_FEE}%</p>
                    </div>
                  </div>

                  <div className={styles.breakDetailsBox}>
                    <h4>You'll Receive</h4>
                    <div>
                      <Image src="/meter.png" height="30" width="30" />
                      <p>
                        {(userSavingDetails.data.amount.toString() *
                          ((100 - CURRENT_FEE) / 100)) /
                          1e18}
                      </p>
                    </div>
                  </div>

                  <div className={styles.breakDetailsBox}>
                    <h4>Time Left</h4>
                    <div>
                      <p>
                        {formatTime(
                          getTimeLeft(
                            userSavingDetails.data.startTime.toString(),
                            userSavingDetails.data.stopTime.toString(),
                            currentTimeStamp.data.toString()
                          )
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  className="action-btn"
                  onClick={() => {
                    breakOrWithdrawSave(
                      {
                        abi: FLEX_SAVE_ABI,
                        address: FLEX_SAVE_CONTRACT_ADDRESS,
                        functionName: "claimSavings",
                      },
                      {
                        onError(err) {
                          setPageError(err.message);
                        },
                      }
                    );
                  }}
                >
                  Break Save &gt;
                </button>
              </div>
            ) : (
              <div className={styles.breakSavings}>
                <div className="special-header">
                  <h3>Withdraw Savings</h3>
                  <div></div>
                </div>

                <p className={styles.warningText}>
                  You have successfuly acheived your desired saving time.
                  Withdraw your savings with your interest accrued. You're
                  Welcome!! Looking forward to seeing you again
                </p>

                <div className={styles.breakDetails}>
                  <div className={styles.breakDetailsBox}>
                    <h4>Interest Earned</h4>
                    <div>
                      <p>
                        {userInterestAccrued.isFetched &&
                          userInterestAccrued.data.toString() / 1e18}
                      </p>
                    </div>
                  </div>

                  <div className={styles.breakDetailsBox}>
                    <h4>You'll Receive</h4>
                    <div>
                      <Image src="/meter.png" height="30" width="30" />
                      <p>
                        {userInterestAccrued.isFetched &&
                          (parseInt(userSavingDetails.data.amount.toString()) +
                            parseInt(userInterestAccrued.data.toString())) /
                            1e18}
                      </p>
                    </div>
                  </div>

                  <div className={styles.breakDetailsBox}>
                    <h4>Time Left</h4>
                    <div>
                      <p>
                        {formatTime(
                          getTimeLeft(
                            userSavingDetails.data.startTime.toString(),
                            userSavingDetails.data.stopTime.toString(),
                            currentTimeStamp.data.toString()
                          )
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  className="action-btn"
                  onClick={() => {
                    breakOrWithdrawSave(
                      {
                        abi: FLEX_SAVE_ABI,
                        address: FLEX_SAVE_CONTRACT_ADDRESS,
                        functionName: "claimSavings",
                      },
                      {
                        onError(err) {
                          setPageError(err.message);
                        },
                      }
                    );
                  }}
                >
                  Withdraw Save &gt;
                </button>
              </div>
            ))}

          {userSavingDetails.isFetched &&
            userSavingDetails.data.status == true &&
            currentTimeStamp.isFetched &&
            userSavingDetails.isFetched &&
            currentTimeStamp.data.toString() <
              userSavingDetails.data.stopTime.toString() && (
              <div className={styles.topUpSavings}>
                <div className="special-header">
                  <h3>Top Up Savings</h3>
                  <div></div>
                </div>

                <div className={styles.amountTimeAndBalance}>
                  <div className={styles.mtrgBalance}>
                    <h4>Your Balance</h4>
                    <div>
                      <Image src="/meter.png" height="30" width="30" />
                      <p>12.089</p>
                    </div>
                  </div>

                  <input
                    placeholder="Amount"
                    onChange={(e) => setTopUpAmount(e.target.value * 1e18)}
                  />
                  <input
                    placeholder="Time In Seconds"
                    onChange={(e) => setTopUpTime(e.target.value)}
                  />

                  {topUpTime && <p>{formatTime(time)}</p>}
                </div>

                <button
                  className="action-btn"
                  onClick={() => {
                    topUpSavings(
                      {
                        abi: FLEX_SAVE_ABI,
                        address: FLEX_SAVE_CONTRACT_ADDRESS,
                        functionName: "topUpSave",
                        args: [topUpAmount, topUpTime],
                      },
                      {
                        onError(err) {
                          setPageError(err.message);
                        },
                      }
                    );
                  }}
                >
                  Top Up Save &gt;
                </button>
              </div>
            )}
        </div>
      </div>
    </main>
  );
}
