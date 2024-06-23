"use client";

import Image from "next/image";
import styles from "../../styles/groupSave.module.css";
import { Navbar } from "@/components/Navbar";
import {
  GROUP_SAVE_ABI,
  GROUP_SAVE_CONTRACT_ADDRESS,
  MOCK_GROUP_LIST,
} from "@/utils/groupSave";
import Link from "next/link";
import { useAccount, useReadContract, useWriteContract } from "wagmi";

export default function GroupSave() {
  const account = useAccount();

  const allGroupSavings = useReadContract({
    abi: GROUP_SAVE_ABI,
    address: GROUP_SAVE_CONTRACT_ADDRESS,
    functionName: "getAllGroupSavings",
  });

  if (allGroupSavings.isFetched) {
    console.log(allGroupSavings.data);
  }
  return (
    <main>
      <Navbar />

      <div className={styles.groupSave}>
        <div className="headerAndCreate">
          <div className="special-header">
            <h3>Active Group Savings</h3>
            <div></div>
          </div>

          <Link href="/groupSave/create">
            <Image src="/add.png" width="30" height="30" />
          </Link>
        </div>

        <div className={styles.activeGroupSavings}>
          {account &&
            allGroupSavings.isFetched &&
            allGroupSavings.data.map((groupSaving) => {
              if (groupSaving.members.includes(account.address)) {
                return (
                  <Link
                    href={`/groupSave/${groupSaving.groupId}`}
                    className={styles.groupSaveBox}
                  >
                    <Image src="/group.png" width="30" height="30" />

                    <div className={styles.groupIdAndMembers}>
                      <div className={styles.subDetails}>
                        <h4>Group Id</h4>
                        <p>{groupSaving.groupId.toString()}</p>
                      </div>

                      <div className={styles.subDetails}>
                        <h4>Members</h4>
                        <p>{groupSaving.members.length}</p>
                      </div>
                    </div>

                    <div className={styles.subDetails}>
                      <h4>Group Save Name</h4>
                      <p>{groupSaving.name}</p>
                    </div>
                  </Link>
                );
              }
            })}
        </div>
      </div>
    </main>
  );
}
