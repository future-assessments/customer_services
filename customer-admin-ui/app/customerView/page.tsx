"use client";

import { getCustomerById } from "@/lib/customer_api";
import { Customer } from "admin/customers";
import { FormEvent, useEffect, useState } from "react";

interface CustomerViewProps {
    customerId: number;
}

export default function CustomerView({customerId} : CustomerViewProps) {
    const [customer, setCustomer] = useState<Customer>();

    const handleSubmit = (e: FormEvent) => {

    }

    useEffect(() => {

        const fetch_customer = async(custId: number) => {
            getCustomerById(custId).then(customer => setCustomer(customer));
        }


        fetch_customer(customerId);

    }, []);
    return (<>
        <form onSubmit={handleSubmit}>
            <table>
                <tr>
                    <td>Last Name</td>
                    <td>
                        <input value={customer?.LastName} />
                    </td>
                </tr>
                <tr>
                    <td>First Name</td>
                    <td>
                        <input value={customer?.FirstName} />
                    </td>
                </tr>
                <tr>
                    <td colSpan={2}><button type="submit">Save</button></td>
                </tr>
            </table>
        </form>
    </>)
}