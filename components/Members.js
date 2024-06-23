import { MOCK_GROUP_LIST } from "@/utils/groupSave";
import styles from "../styles/groupSave.module.css";

export const Members = () => {
  return (
    <div className={styles.members}>
      <div className={styles.membersList}>
        {MOCK_GROUP_LIST[0].members.map((member, index) => {
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
