"use client";

import { Account } from "admin/accounts";

export async function fetchAccountById(accountId: number) {
    const account = await fetch(`http://localhost:3030/account/${accountId}`);
    const result = account.json() as Promise<Account>;
    return result;
}