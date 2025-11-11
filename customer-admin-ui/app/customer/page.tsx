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
        <div className="overflow-x-auto">
            <h1>Customer List Page</h1>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {customers.map((customer) => (
                        <tr key={customer.customerId}>
                            <td className="px-6 py-4 whitespace-nowrap text-black">{customer.firstName} {customer.lastName}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-black">
                                <button onClick={() => editCustomer(customer.customerId)}
                                    className="py-2 px-4 rounded-md font-medium transition duration-300 ease-in-out bg-blue-500 text-white hover:bg-blue-600"
                                    >Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}