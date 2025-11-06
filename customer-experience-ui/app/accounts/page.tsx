'use client';

import { fetchAccounts } from "@/lib/webservices";
import { Account } from "customer-experience";
import { useState } from "react";

export default function Accounts() {
    const [account, setAccounts] = useState<Account[]>([]);

    const fetchAllAccounts = async() => {
        fetchAccounts().then(data => setAccounts(data));
    };

    useState()
    return (<>
    <h1>Accounts</h1>
    </>);
}