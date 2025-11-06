"use client";

import { useRouter } from 'next/navigation';

export default function Home() {

  const router = useRouter();

  const navCustomers = () => {
    router.push("/customers");
  };

  const navAccounts = () => {
    router.push("/accounts")
  }

  return (
    <div>
      <button
        onClick={navCustomers}>Customers</button>
      <br/>
      <button
        onClick={navAccounts}>Accounts</button>
    </div>
  );
}
