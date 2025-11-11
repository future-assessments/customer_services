"use client";

import { Customer } from "admin/customers";
import { useEffect, useState } from "react";
import { fetchLatestCustomers } from "@/lib/customer_api";
import { useRouter } from "next/navigation";

import { Card, CardHeader, CardBody } from "@heroui/card";
import { Divider } from "@heroui/divider";
import CustomerList from "../customer/page";
import AccountList from "../account/account_list";

export default function Dashboard() {
    const router = useRouter();
    const [customers, setCustomers] = useState<Customer[]>([]);

    const editCustomer = (customerId: number) => {
        console.log(`Editing customer ${customerId}`);
        router.push(`/customer/${customerId}`);
    }

    useEffect(() => {
        const get_recent_customers = async() => {
            fetchLatestCustomers().then(data => setCustomers(data))
            .catch(error => console.error("Error fetching customers:", error));
        }

        get_recent_customers()
    }, []);

    return (
    <div style={{ textAlign: "center" }}>
        <h1>Dashboard</h1>
        <div style={{width: "40%", marginLeft: "auto", marginRight: "auto"}}>
            <CustomerList />
            <AccountList />
        </div>
    </div>
    );
}