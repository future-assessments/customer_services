"use client";

import { fetchAccounts } from "@/lib/account_api";
import { Account } from "admin/accounts";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function AccountList() {
    const [accounts, setAccounts] = useState<Account[]>([]);
    const searchParams = useSearchParams()
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
    }, [limit, offset]);

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account Balance</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>                
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {accounts && accounts.map( (acct) => (
                        <tr key={acct.accountId}>
                            <td className="px-6 py-4 whitespace-nowrap text-black">{acct.accountName}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-black">{acct.accountType.displayName}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-black">{acct.accountBalance}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <button onClick={() => viewAccount(acct.accountId)}
                                    className="py-2 px-4 rounded-md font-medium transition duration-300 ease-in-out bg-blue-500 text-white hover:bg-blue-600"
                                >View</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
