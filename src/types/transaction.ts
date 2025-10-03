/*
The RawTransaction interface is 
meant to refernce raw data straight from
the csv that isnt yet parsed
*/
export interface RawTransaction{
    customerId: string;
    transactionDate: string;
    transactionType: string;
    transactionAmount: string;
    accountBalance: string;
    accountBalanceAfterTransaction: string;
    gender: string;
    customerAge: string;
    accountType: string;
    branchcode: string;
    lastTransactionDate: string;
    accountOpeningDate: string;
}

/*
The cleanedTransaction interface is 
meant to reference data that is parsed, 
normalized and cleaned
*/
export interface CleanedTransaction{
    customerId: string;
    transactionDate: Date | null;
    transactionType: "Deposit" | "Withdrawal" | "Transfer";
    transactionAmount: number;
    accountBalance: number;
    accountBalanceAfterTransaction: number;
    customerAge: number;
    gender: "Male" | "Female" | "Other";
    accountType: string;
    branchCode: string;
    lastTransactionDate: Date | null;
    accountOpeningDate: Date | null;

}