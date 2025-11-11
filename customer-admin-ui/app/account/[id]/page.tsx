"use client";

import { useParams } from "next/navigation"
import { fetchAccountById } from "@/lib/account_api";
import { useEffect, useState } from "react";
import { Account } from "admin/accounts";
import { useRouter } from "next/navigation";
import AccountView from "./AccountView";
import AccountEdit from "./AccountEdit";

export default function AccountById() {
    const router = useRouter();
    const params = useParams<{id: string}>();
    const [accountName, setAccountName] = useState<string>("");
    const [accountType, setAccountType] = useState<string>("");
    const [accountBalance, setAccountBalance] = useState<number>(0);
    const [accountId, setAccountId] = useState<number>(0);
    const [account, setAccount] = useState<Account>();

    const list = () => {
        router.push("/account")
    };

    useEffect(() => {
        const getAccountById = async(accountId: string) => {
            const account = await fetchAccountById(accountId as unknown as number);
            setAccountName(account.accountName);
            setAccountType(account.accountType?.displayName);
            
            setAccountBalance(account.accountBalance);
            setAccount(account);
            setAccountId(account.accountId);
        }

        getAccountById(params.id);
    }, [params]);

    return (
        <div>
            <div>
                <AccountView accountName={accountName} accountType={accountType} accountBalance={accountBalance} />
                <AccountEdit accountName={accountName} accountId={accountId} accountType={accountType} accountBalance={accountBalance}/>

            </div>

            <div className="bg-white divide-y divide-gray-200">
                <p className="px-6 py-4 whitespace-nowrap text-black">{accountName}</p>
                <p className="px-6 py-4 whitespace-nowrap text-black">{accountType}</p>
                <p className="px-6 py-4 whitespace-nowrap text-black">${accountBalance}</p>
                <button 
                    onClick={() => list()}
                    className="py-2 px-4 rounded-md font-medium transition duration-300 ease-in-out bg-blue-500 text-white hover:bg-blue-600"
                >Back</button>
            </div>
        </div>
    )
}