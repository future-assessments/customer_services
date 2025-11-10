"use client";

import { Account } from "admin/accounts";

export async function fetchAccountById(accountId: number) {
    const account = await fetch(`http://localhost:3030/account/${accountId}`);
    const result = account.json() as Promise<Account>;
    return result;
}

export async function fetchAccounts(startIndex: number = 0, maxResults: number = 10) {
    const accounts = await fetch(`http://localhost:3030/account?offset=${startIndex}&limit=${maxResults}`);
    const result = accounts.json() as Promise<Account[]>;
    return result;
}