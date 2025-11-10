"use client";

interface CustomerViewProps {
    lastName: string;
    firstName: string;
};

export default function CustomerView({lastName, firstName}: CustomerViewProps) {
    return (
    <div>
        <h1>Customer By Id Page</h1>
            <div className="bg-white divide-y divide-gray-200">
                <p className="px-6 py-4 whitespace-nowrap text-black">{lastName}, {firstName}</p>
            </div>
        </div>
    );
}