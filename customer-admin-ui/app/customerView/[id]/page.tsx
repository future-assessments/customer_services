"use client";

import { getCustomerById } from "@/lib/customer_api";
import { Customer } from "admin/customers";
import { useParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

export default function CustomerView() {
    const [customer, setCustomer] = useState<Customer>();
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");

    const params = useParams<{id: string}>();

    const handleSubmit = (e: FormEvent) => {

    }

    useEffect(() => {

        const fetch_customer = async(custId: number) => {
            getCustomerById(custId).then(customer => {
                setLastName(customer.lastName);
                setFirstName(customer.firstName);
                setCustomer(customer);
            });
        }


        fetch_customer(params.id as unknown as number);

    }, []);
    return (<>
        <form onSubmit={handleSubmit}>
            <table className="min-w-full divide-y divide-gray-200">
                <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                    <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Name</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <input value={lastName}
                        onChange={e => setLastName(e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </td>
                </tr>
                <tr>
                    <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">First Name</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <input value={firstName} 
                        onChange={e => setFirstName(e.target.value)} 
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </td>
                </tr>
                <tr>
                    <td colSpan={2}><button type="submit" className="py-2 px-4 rounded-md font-medium transition duration-300 ease-in-out bg-blue-500 text-white hover:bg-blue-600">Save</button></td>
                </tr>
                </tbody>
            </table>
            <input type="hidden" value={params.id} />
        </form>
    </>)
}