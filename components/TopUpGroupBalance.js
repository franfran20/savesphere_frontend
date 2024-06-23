"use client";

import React, { useState } from "react";
import styles from "../styles/groupSave.module.css";

import Image from "next/image";

export const TopUpGroupBalance = () => {
  const [topUpAmount, setTopUpAmount] = useState([]);

  const [errorMsg, setErrorMsg] = useState();

  return (
    <div className={styles.topupGroupBalance}>
      <div className={styles.detailsBox}>
        <h5>My Balance</h5>

        <div>
          <Image src="/meter.png" width="30" height="30" />
          <p>121.08</p>
        </div>
      </div>

      <div className={styles.topUpInput}>
        <input placeholder="Top Up Amount" type="number" />
        <button>Top Up &gt;</button>
      </div>
    </div>
  );
};
