"use client";

import { Customer } from "admin/customers";
import { useEffect, useState } from "react";
import { fetchLatestCustomers } from "@/lib/customer_api";
import { useRouter } from "next/navigation";

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
            <tr key={customer.customerId}>
                <td>{customer.lastName}, {customer.firstName}</td>
                <td>
                    <button onClick={() => editCustomer(customer.customerId)}>Edit</button>
                </td>
            </tr>
        ))}
        </tbody>
    </table>
    </>);
}