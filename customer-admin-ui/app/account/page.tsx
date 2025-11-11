"use client";
import { Suspense } from "react";
import AccountList from "./account_list";

export default function AccountPage() {

    return (
    <div>
        <p>Account Page</p>
        <Suspense>
            <AccountList />
        </Suspense>
    </div>
    )
}