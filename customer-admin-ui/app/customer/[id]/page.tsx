"use client";

import { fetchCustomerById } from "@/lib/customer_api";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import CustomerView from "./CustomerView";
import CustomerEdit from "./CustomerEdit";
import { Divider } from "@heroui/divider";

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
    <div style={{ width: "70%", marginLeft: "auto", marginRight: "auto" }}>
        <CustomerView lastName={lastName} firstName={firstName} />
        <Divider />
        <CustomerEdit customerId={params.id as unknown as number} firstName={firstName} lastName={lastName} />
    </div>
    );
}
