"use client";
import { Input } from "@heroui/input";
import { Form } from "@heroui/form";
import { Button } from "@heroui/button";
import { useState } from "react";

interface CustomerEditProps {
    customerId: number;
    firstName: string;
    lastName: string;
};

export default function CustomerEdit({firstName, lastName, customerId}: CustomerEditProps) {
    const [custFirstName, setCustFirstName] = useState(firstName);
    const [custLastName, setCustLastName] = useState(lastName);

    console.log("CustomerEdit Props:", {customerId, firstName, lastName});
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(`Changed ${event.target.name} to ${event.target.value}`);
        if (event.target.name === "lastName") setCustLastName(event.target.value);
        if( event.target.name === "firstName") setCustFirstName(event.target.value);
        console.log(`Value of lastname input: ${custLastName}`);
        console.log(`Value of firstname input: ${custFirstName}`);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const updatedCustomer = {
            customerId: formData.get("customerId"),
            firstName: formData.get("firstName"),
            lastName: formData.get("lastName"),
        };
        console.log("Updated Customer:", updatedCustomer);
    }

    return (
        <div className="overflow-x-auto">
            <h1>Customer Edit Page</h1>
            <Form onSubmit={handleSubmit}>
                <table className="min-w-full divide-y divide-gray-200">
                    <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-black">
                                <Input type="text" label="First Name" name="firstName" value={custFirstName} onChange={handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-black">
                                <Input type="text" label="Last Name" name="lastName" value={custLastName} onChange={handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-black">
                                <Button color="primary"
                                    type="submit">Save</Button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <input type="hidden" name="customerId" value={customerId} />
            </Form>
        </div>
    );
}
