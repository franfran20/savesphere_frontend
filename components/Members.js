"use client";

import {
  GROUP_SAVE_ABI,
  GROUP_SAVE_CONTRACT_ADDRESS,
  MOCK_GROUP_LIST,
} from "@/utils/groupSave";
import styles from "../styles/groupSave.module.css";
import { useReadContract } from "wagmi";

export const Members = ({ groupId }) => {
  const selectedGroupSave = useReadContract({
    abi: GROUP_SAVE_ABI,
    address: GROUP_SAVE_CONTRACT_ADDRESS,
    functionName: "getGroupSavings",
    args: [groupId && groupId],
  });

  return (
    <div className={styles.members}>
      <div className={styles.membersList}>
        {selectedGroupSave.isFetched &&
          selectedGroupSave.data.members.map((member, index) => {
            return (
              <div className={styles.singleMember}>
                <span>{index + 1}.</span>
                <p>{member}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};
