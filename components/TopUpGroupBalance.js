"use client";

import React, { useState } from "react";
import styles from "../styles/groupSave.module.css";
import Image from "next/image";
import { useAccount, useBalance, useWriteContract } from "wagmi";
import { MTRG_TOKEN_ADDRESS } from "@/utils";
import { GROUP_SAVE_ABI, GROUP_SAVE_CONTRACT_ADDRESS } from "@/utils/groupSave";
import { erc20Abi, maxUint256 } from "viem";

export const TopUpGroupBalance = ({ groupId }) => {
  const [topUpAmount, setTopUpAmount] = useState();
  const [pageError, setPageError] = useState();
  const account = useAccount();

  const { writeContract: topUpGroupBalance } = useWriteContract();
  const { writeContract: approveToken } = useWriteContract();

  const userMTRGBalance = useBalance({
    address: account && account.address,
    token: MTRG_TOKEN_ADDRESS,
  });

  const handlePageErr = () => {
    if (!pageError) {
      return;
    }

    if (pageError.includes("insufficient allowance")) {
      return "Insufficient Token Allowance Or Balance";
    }

    console.log(pageError);
  };

  return (
    <div className={styles.topupGroupBalance}>
      <div className={styles.detailsBox}>
        <h5>My Balance</h5>

        <div>
          <Image src="/meter.png" width="30" height="30" />
          <p>{userMTRGBalance.isFetched && userMTRGBalance.data.formatted}</p>
        </div>
      </div>

      <div className={styles.approveAll}>
        <button
          onClick={() => {
            approveToken({
              abi: erc20Abi,
              address: MTRG_TOKEN_ADDRESS,
              functionName: "approve",
              args: [GROUP_SAVE_CONTRACT_ADDRESS, maxUint256],
            });
          }}
          style={{ marginLeft: "0px", marginBottom: "20px" }}
        >
          Approve All &gt;
        </button>
      </div>

      {pageError && (
        <p className="errorMsg" style={{ marginBottom: "20px" }}>
          {handlePageErr()}
        </p>
      )}

      <div className={styles.topUpInput}>
        <input
          placeholder="Top Up Amount"
          type="number"
          onChange={(e) => {
            setTopUpAmount(e.target.value * 1e18);
            setPageError(false);
          }}
        />

        <button
          onClick={() => {
            topUpGroupBalance(
              {
                abi: GROUP_SAVE_ABI,
                address: GROUP_SAVE_CONTRACT_ADDRESS,
                functionName: "topUpGroupSave",
                args: [groupId, topUpAmount],
              },
              {
                onError(err) {
                  setPageError(err.message);
                },
              }
            );
          }}
        >
          Top Up &gt;
        </button>
      </div>
    </div>
  );
};
