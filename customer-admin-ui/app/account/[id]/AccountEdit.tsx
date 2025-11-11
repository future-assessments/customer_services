"use client";

import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { NumberInput } from "@heroui/react";
import { useEffect, useState } from "react";

interface AccountEditProps {
    accountId: number;
    accountName: string;
    accountType: string;
    accountBalance: number;
};

export default function AccountEdit({accountId, accountName, accountType, accountBalance}: AccountEditProps) {
    const [balance, setBalance] = useState<number>(accountBalance);
    const [type, setType] = useState<string>(accountType);
    const [name, setName] = useState<string>(accountName);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const updatedAccount = {
            accountId: formData.get("accountId"),
            accountName: formData.get("accountName"),
            accountType: formData.get("accountType"),
            accountBalance: formData.get("accountBalance"),
        };
        console.log("Updated Account:", updatedAccount);
    };
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(`Changed ${event.target.name} to ${event.target.value}`);
    };

    const handleNumberChange = (event: number) => {
        console.log(`Changed account balance to ${event}`);
    };
    
    useEffect(() => {
        
    }, [accountBalance, accountType]);

    return (
    <div>
        <h1>Account Edit</h1>
            <div className="bg-white divide-y divide-gray-200">
                <Form onSubmit={handleSubmit}>
                Account ID: {accountId}
                <Input type="text" label="Account Name" value={name} onChange={handleChange}/>
                <Input type="text" label="Account Type" value={type} onChange={handleChange}/>
                <NumberInput label="Account Balance" value={balance} onValueChange={handleNumberChange} formatOptions={{ style: 'currency', currency: 'USD', maximumFractionDigits: 2 }}
                />
                <Button color="primary">Save</Button>
                </Form>
            </div>
        </div>
    );

}