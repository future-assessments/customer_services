"use client";

interface AccountViewProps {
    accountName: string;
    accountType: string;
    accountBalance: number;
};

export default function AccountView({accountName, accountType, accountBalance}: AccountViewProps) {
    return (
        <div>
            <h1>Account View</h1>
            <div className="bg-white divide-y divide-gray-200">
                <p className="px-6 py-4 whitespace-nowrap text-black">{accountName}</p>
                <p className="px-6 py-4 whitespace-nowrap text-black">{accountType}</p>
                <p className="px-6 py-4 whitespace-nowrap text-black">$ {accountBalance}</p>
            </div>
        </div>
    );
}
