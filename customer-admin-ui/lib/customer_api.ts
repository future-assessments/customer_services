"use client";

import { Customer } from "admin/customers";

export async function fetchLatestCustomers() {
    const customers = await fetch(`http://localhost:3030/customer?sort=latest`);
    const results = customers.json() as Promise<Customer[]>;
    return results;
}

export async function fetchCustomerById(customerId: number) {
    const customer = await fetch(`http://localhost:3030/customer/${customerId}`);
    const result = customer.json() as Promise<Customer>;
    return result;
}