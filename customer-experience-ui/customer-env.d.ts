declare module "customer-experience" {
    interface Customer {
        CustomerId: numeric;
        FirstName: string;
        LastName: string;
    };

    interface Account {
        AccountId: numeric;
        AccountNumber: string;
        AccountType: string;
        AccountBalance: numeric;
    };
}