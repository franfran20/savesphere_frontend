"use client";

import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import styles from "../styles/components/Navbar.module.css";
import Link from "next/link";
import { useAccount } from "wagmi";

export const Navbar = () => {
  const account = useAccount();
  return (
    <div className={styles.navbar}>
      <Link href="/" className={styles.logo}>
        SaveSphere.
      </Link>
      {account.isConnected && (
        <div className={styles.navLinks}>
          <Link href="/targetDrivenSave">Target-Driven Save</Link>
          <Link href="/flexSave">Flex Save</Link>
          <Link href="/groupSave">Group Save</Link>
        </div>
      )}
      <ConnectButton />
    </div>
  );
};
