"use client";

import { fetchCustomerById } from "@/lib/customer_api";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import CustomerView from "./CustomerView";
import CustomerEdit from "./CustomerEdit";

export default function CustomerById() {
    const params = useParams<{id: string}>();
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");

    useEffect(() => {
        const getCustomerById = async(customerId: string) => {
            const customer = await fetchCustomerById(customerId as unknown as number);
            setFirstName(customer.firstName);
            setLastName(customer.lastName);
        };

        getCustomerById(params.id);
    }, [params.id]);

    return (
    <div>
        <h1>Customer By Id Page</h1>
        <CustomerView lastName={lastName} firstName={firstName} />
        <hr/>
        <CustomerEdit customerId={params.id as unknown as number} firstName={firstName} lastName={lastName} />
    </div>
    );
}
