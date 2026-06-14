"use client";

import Link from "next/link";
import styles from "./BackToDashboard.module.css";

export default function BackToDashboard() {
  return (
    <Link href="/" className={styles.backBtn}>
      ← DASHBOARD
    </Link>
  );
}