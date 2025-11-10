"use client";

import { useParams } from "next/navigation"
import { fetchAccountById } from "@/lib/account_api";
import { useEffect, useState } from "react";
import { Account } from "admin/accounts";

export default function AccountById() {
    const params = useParams<{id: string}>();
    const [accountName, setAccountName] = useState<string>("");
    const [accountType, setAccountType] = useState<string>("");
    const [accountBalance, setAccountBalance] = useState<number>(0);
    const [account, setAccount] = useState<Account>();

    useEffect(() => {
        const getAccountById = async(accountId: string) => {
            const account = await fetchAccountById(accountId as unknown as number);
            console.log(account);
            setAccountName(account.accountName);
            setAccountType(account.accountType?.displayName);
            
            setAccountBalance(account.accountBalance);
            setAccount(account);
        }

        getAccountById(params.id);
    }, [params]);

    return (
    <div>
        <p>{accountName}</p>
        <p>{accountType}</p>
        <p>${accountBalance}</p>
    </div>)
}