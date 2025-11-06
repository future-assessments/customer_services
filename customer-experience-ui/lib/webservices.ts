"use server";

import { Account } from "customer-experience";

export async function fetchAccounts() {
    const accounts = await fetch(`http://localhost:3000/account`);
    const results = accounts.json() as Promise<Account[]>
    return results;
}