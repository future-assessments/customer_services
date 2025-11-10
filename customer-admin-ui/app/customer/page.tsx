"use client";

import { fetchLatestCustomers } from "@/lib/customer_api";
import { Customer } from "admin/customers";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CustomerList() {
    const [customers, setCustomers] = useState<Array<Customer>>([]);
    const router = useRouter();

    const editCustomer = (customerId: number) => {
        console.log(`Editing customer ${customerId}`);
        // Implement navigation to edit page if needed
        router.push(`/customer/${customerId}?mode=edit`);
    };

    useEffect(() => {
        const getCustomers = async() => {
            const customers = await fetchLatestCustomers();
            setCustomers(customers);
        };
        
        getCustomers();
    }, []);

    return (
        <div>
            <h1>Customer List Page</h1>
            <table>
                <thead>
                    <tr>
                        <th>Customer Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer) => (
                        <tr key={customer.customerId}>
                            <td>{customer.firstName} {customer.lastName}</td>
                            <td>
                                <button onClick={() => editCustomer(customer.customerId)}>Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}