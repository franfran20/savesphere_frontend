"use client";

import Link from "next/link";
import styles from "../styles/page.module.css";
import { Navbar } from "@/components/Navbar";
import { useAccount } from "wagmi";
import { motion } from "framer-motion";

export default function Home() {
  const account = useAccount();
  return (
    <main>
      <Navbar />

      <div className={styles.home}>
        <motion.div
          whileHover={{ scale: 1.2, rotate: 80 }}
          whileTap={{
            scale: 0.8,
            rotate: -90,
            borderRadius: "100%",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={styles.headerImg}
        ></motion.div>

        <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          Save For Different Reasons, In Your Very Own Saving-Sphere.
        </motion.h2>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          Start saving today with our flex savings, target-driven savings or as
          a group with group svaings.
        </motion.p>

        {account.isConnected ? (
          <Link href="/flexSave">Start Saving &gt;</Link>
        ) : (
          <Link href="/">Learn More &gt;</Link>
        )}
      </div>
    </main>
  );
}
