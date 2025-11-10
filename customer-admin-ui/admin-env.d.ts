declare module "admin/customers" {
    interface Customer {
        customerId: number;
        firstName: string;
        lastName: string;
    }
}

declare module "admin/accounts" {
    interface AccountType {
        accountTypeId: number;
        displayName: string;
    };

    interface Account {
        accountId: number;
        accountName: string;
        accountType: AccountType;
        accountBalance: number;
    }
}