"use client";

import Image from "next/image";
import styles from "../../../styles/groupSave.module.css";
import { Navbar } from "@/components/Navbar";
import {
  GROUP_SAVE_ABI,
  GROUP_SAVE_CONTRACT_ADDRESS,
  MOCK_GROUP_LIST,
} from "@/utils/groupSave";
import Link from "next/link";
import { useAccount, useReadContract } from "wagmi";
import { useState } from "react";
import { OngoingProposals } from "@/components/OngoingProposals";
import { CompletedProposals } from "@/components/CompletedProposals";
import { CreateProposal } from "@/components/CreateProposal";
import { TopUpGroupBalance } from "@/components/TopUpGroupBalance";
import { Members } from "@/components/Members";

export default function SingleGroupSave({ params }) {
  const [selectView, setSelectView] = useState(1);

  const selectedGroupSave = useReadContract({
    abi: GROUP_SAVE_ABI,
    address: GROUP_SAVE_CONTRACT_ADDRESS,
    functionName: "getGroupSavings",
    args: [params && params.id],
  });

  const allGroupProposals = useReadContract({
    abi: GROUP_SAVE_ABI,
    address: GROUP_SAVE_CONTRACT_ADDRESS,
    functionName: "getAllProposalsForGroup",
    args: [params && params.id],
  });

  if (selectedGroupSave.isFetched) console.log(selectedGroupSave.data);

  return (
    <main>
      <Navbar />
      <div className={styles.singleGroupSave}>
        <div className="special-header">
          <h3>Group Save: #{params.id}</h3>
          <div></div>
        </div>

        <div className={styles.groupDetails}>
          <div className={styles.singleGroupSaveBox}>
            <h4>Members</h4>
            <p>
              {selectedGroupSave.isFetched &&
                selectedGroupSave.data.members.length}
            </p>
          </div>

          <div className={styles.singleGroupSaveBox}>
            <h4>Tx's Made </h4>
            <p>
              {selectedGroupSave.isFetched &&
                selectedGroupSave.data.proposalCount.toString()}
            </p>
          </div>

          <div className={styles.singleGroupSaveBox}>
            <h4>Group Save Name</h4>
            <p>{selectedGroupSave.isFetched && selectedGroupSave.data.name}</p>
          </div>

          <div className={styles.singleGroupSaveBox}>
            <h4>Balance</h4>
            <div>
              <Image src="/meter.png" width="25" height="25" />
              <p>
                {selectedGroupSave.isFetched &&
                  selectedGroupSave.data.amount.toString() / 1e18}
              </p>
            </div>
          </div>

          <div className={styles.singleGroupSaveBox}>
            <h4>Remaining Balance</h4>
            <div>
              <Image src="/meter.png" width="25" height="25" />
              <p>
                {selectedGroupSave.isFetched &&
                  (selectedGroupSave.data.amount.toString() -
                    selectedGroupSave.data.pendingAmount.toString()) /
                    1e18}
              </p>
            </div>
          </div>
        </div>

        <div className={styles.selectView}>
          <p
            onClick={() => setSelectView(1)}
            className={
              selectView == 1
                ? styles.selectedSection
                : styles.notselectedSection
            }
          >
            Ongoing Proposals
          </p>
          <p
            onClick={() => setSelectView(2)}
            className={
              selectView == 2
                ? styles.selectedSection
                : styles.notselectedSection
            }
          >
            Completed Proposals
          </p>
          <p
            onClick={() => setSelectView(3)}
            className={
              selectView == 3
                ? styles.selectedSection
                : styles.notselectedSection
            }
          >
            Create Proposal
          </p>
          <p
            onClick={() => setSelectView(4)}
            className={
              selectView == 4
                ? styles.selectedSection
                : styles.notselectedSection
            }
          >
            Top Up Group Balance
          </p>
          <p
            onClick={() => setSelectView(5)}
            className={
              selectView == 5
                ? styles.selectedSection
                : styles.notselectedSection
            }
          >
            Members
          </p>
        </div>

        {selectView == 1 && <OngoingProposals groupId={params.id} />}
        {selectView == 2 && <CompletedProposals groupId={params.id} />}
        {selectView == 3 && <CreateProposal groupId={params.id} />}
        {selectView == 4 && <TopUpGroupBalance groupId={params.id} />}
        {selectView == 5 && <Members groupId={params.id} />}
      </div>
    </main>
  );
}
