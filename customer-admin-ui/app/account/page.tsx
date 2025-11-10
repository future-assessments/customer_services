"use client";

import { fetchAccounts } from "@/lib/account_api";
import { Account } from "admin/accounts";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function AccountPage() {
    const [accounts, setAccounts] = useState<Account[]>([]);
    const searchParams = useSearchParams();
    const router = useRouter();

    const offset = searchParams.get("offset") ? parseInt(searchParams.get("offset") as string) : 0;
    const limit = searchParams.get("limit") ? parseInt(searchParams.get("limit") as string) : 10;

    const viewAccount = (accountId: number) => {
        router.push(`/account/${accountId}`);
    }

    useEffect(() => {
        const getAccounts = async (offsetVal: number, limitVal: number) => {
            const accounts = await fetchAccounts(offsetVal, limitVal);
            setAccounts(accounts);
        }

        getAccounts(offset, limit);
    }, []);
    return (
    <div>
        <p>Account Page</p>
        {accounts && accounts.map( (acc) => (
            <p key={acc.accountId}>{acc.accountName}, $ {acc.accountBalance} <button onClick={() => viewAccount(acc.accountId)}>View</button></p>
        ))}
    </div>
    )
}