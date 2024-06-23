"use client";

import Link from "next/link";
import styles from "../styles/page.module.css";
import { Navbar } from "@/components/Navbar";
import { useAccount } from "wagmi";

export default function Home() {
  const account = useAccount();
  return (
    <main>
      <Navbar />

      <div className={styles.home}>
        <div className={styles.headerImg}></div>
        <h2>Save For Different Reasons, In Your Very Own Saving-Sphere.</h2>
        <p>
          Start saving today with our flex savings, target-driven savings or as
          a group with group svaings.
        </p>
        {account.isConnected ? (
          <Link href="/flexSave">Start Saving &gt;</Link>
        ) : (
          <Link href="/">Learn More &gt;</Link>
        )}
      </div>
    </main>
  );
}
