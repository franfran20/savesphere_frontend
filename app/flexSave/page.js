"use client";

import Image from "next/image";
import styles from "../../styles/flexSave.module.css";
import { Navbar } from "@/components/Navbar";
import { FLEX_SAVE_ABI, FLEX_SAVE_CONTRACT_ADDRESS } from "@/utils/flexSave";
import { useAccount, useReadContract, useWriteContract } from "wagmi";

export default function FlexSave() {
  // it works use fake data to builddd!!!

  const account = useAccount();
  const { writeContract: createTargetDrivenSave } = useWriteContract();

  const topLevelSavingsDetails = useReadContract({
    abi: FLEX_SAVE_ABI,
    address: FLEX_SAVE_CONTRACT_ADDRESS,
    functionName: "getTopLevelSavingsDetails",
  });

  //   if (topLevelSavingsDetails.isFetched) {
  //     console.log(topLevelSavingsDetails.data);
  //   }

  return (
    <main>
      <Navbar />

      <div className={styles.flexSave}>
        <div className="special-header">
          <h3>Flex Save</h3>
          <div></div>
        </div>

        <div className={styles.saveDetails}>
          <div className={styles.protocolDetails}>
            <div className={styles.saveBoxes}>
              <p>Total Amount Saved</p>
              <div>
                <Image src="/meter.png" height="30" width="30" />
                <h2>121.000</h2>
              </div>
            </div>

            <div className={styles.saveBoxes}>
              <p>Total Savers</p>
              <div>
                <h2>4</h2>
              </div>
            </div>

            <div className={styles.saveBoxes}>
              <p>Current InterestPool</p>
              <div>
                <Image src="/meter.png" height="30" width="30" />
                <h2>12.045</h2>
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
                  <h2>121.000</h2>
                </div>
              </div>

              <div className={styles.savingReason}>
                <p>Your Saving Reason</p>
                <h4>Some fummy save reason</h4>
              </div>
            </div>

            <div className={styles.bottom}>
              <div className={styles.saveBoxes}>
                <p>Your Amount Saved</p>
                <div>
                  <Image src="/meter.png" height="30" width="30" />
                  <h2>12.045</h2>
                </div>
              </div>

              <div className={styles.saveBoxes}>
                <p>Time Saved</p>
                <div>
                  <h3>4 hours 30 mins 4 sec</h3>
                </div>
              </div>

              <div className={styles.saveBoxes}>
                <p>Expected Save Time</p>
                <div>
                  <h3>3 days 4 hours 30 mins 4 sec</h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.saveInteractions}>
          {true && (
            <div className={styles.startSavings}>
              <div className="special-header">
                <h3>Start Flex Save</h3>
                <div></div>
              </div>

              <input placeholder="Amount" />

              <div className={styles.amountAndBalance}>
                <textarea placeholder="Saving Reason" />

                <div className={styles.mtrgBalance}>
                  <h4>Your Balance</h4>
                  <div>
                    <Image src="/meter.png" height="30" width="30" />
                    <p>12.089</p>
                  </div>
                </div>
              </div>

              <button className="action-btn">Start Save &gt;</button>
            </div>
          )}

          {false && (
            <div className={styles.breakSavings}>
              <div className="special-header">
                <h3>Break Savings</h3>
                <div></div>
              </div>

              <p className={styles.warningText}>
                Breaking this save earlier than you anticipated to save for will
                incur a fee. Are you sure you want to break this save ?
              </p>

              <div className={styles.breakDetails}>
                <div className={styles.breakDetailsBox}>
                  <h4>Current Fee</h4>
                  <div>
                    <p>10%</p>
                  </div>
                </div>

                <div className={styles.breakDetailsBox}>
                  <h4>You'll Receive</h4>
                  <div>
                    <Image src="/meter.png" height="30" width="30" />
                    <p>12.089</p>
                  </div>
                </div>

                <div className={styles.breakDetailsBox}>
                  <h4>Time Left</h4>
                  <div>
                    <p>2 days 18 hours 45 mins 30 sec</p>
                  </div>
                </div>
              </div>

              <button className="action-btn">Break Save &gt;</button>
            </div>
          )}

          {false && (
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

                <input placeholder="Amount" />
                <input placeholder="Time In Seconds" />
              </div>

              <button className="action-btn">Top Up Save &gt;</button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
