"use client";

interface CustomerEditProps {
    customerId: number;
    firstName: string;
    lastName: string;
};

export default function CustomerView({firstName, lastName, customerId}: CustomerEditProps) {
    return (
        <div>
            <h1>Customer View Page</h1>
            <form>
                <table>
                    <tbody>
                        <tr>
                            <td>First Name:</td>
                            <td>
                                <input type="text" name="firstName" defaultValue={firstName} />
                            </td>
                        </tr>
                        <tr>
                            <td>Last Name:</td>
                            <td>
                                <input type="text" name="lastName" defaultValue={lastName} />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <button type="submit">Save</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <input type="hidden" name="customerId" value={customerId} />
            </form>
        </div>
    );
}
