"use client";

import { Customer } from "admin/customers";
import { useEffect, useState } from "react";
import { fetchLatestCustomers } from "@/lib/customer_api";
import { useRouter } from "next/router";

export default function Dashboard() {
    const router = useRouter();
    const [customers, setCustomers] = useState<Customer[]>([]);

    const editCustomer = (customerId: number) => {
        router.push(`/customerView/${customerId}`);
    }

    useEffect(() => {
        const get_recent_customers = async() => {
            fetchLatestCustomers().then(data => setCustomers(data));
        }

        get_recent_customers()
    }, []);

    return (<>
    <h1>Recently Created Customers</h1>
    <table>
        <thead>
            <tr>
                <th>Customer name</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
        {customers && customers.map( (customer) => (
            <tr key={customer.CustomerId}>
                <td>{customer.LastName}. {customer.FirstName}</td>
                <td>
                    <button onClick={() => editCustomer(customer.CustomerId)}>Edit</button>
                </td>
            </tr>
        ))};
        </tbody>
    </table>
    </>);
}