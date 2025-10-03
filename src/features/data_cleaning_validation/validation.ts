import type { CleanedTransaction } from "../../types/transaction";
/**
The code contains functions that will be used to validate transactions
to ensure things like age consistency, accurate balance reconciliation
and correct age range for customers
 */

//Used to track customer state changes in age and balances
const customerAges = new Map<string, number>();  
const customerBalances = new Map<string, number>();  

export function validateTransaction(
    tx: CleanedTransaction): string[] {
  const errors: string[] = [];

  // To ensure that deposits are positive values
  if (tx.transactionType === "Deposit" 
    && (tx.transactionAmount === null || tx.transactionAmount <= 0)) {
    errors.push("Deposit transactions must have a positive amount.");
  }

  // To ensure that customer age is within range
  if (tx.customerAge !== null) {
    if (tx.customerAge < 18 || tx.customerAge > 120) {
      errors.push("Customer age must be between 18 and 120.");
    }
  }

  /**
   This is to ensure that there is consistent ages within the data set
   Assumption for this case is that first age encountered is the accurate one
   */
  if (tx.customerAge !== null) {
  const prevAge = customerAges.get(tx.customerId);

  // Case 1: We’ve seen this customer before, and the age is different
  if (prevAge !== undefined && prevAge !== tx.customerAge) {
    errors.push(
      `Customer ${tx.customerId} has inconsistent age: was ${prevAge}, now ${tx.customerAge}`
    );
  } 
  // Case 2: This is the first time we’re seeing this customer and age will be set & stored
  else if (prevAge === undefined) {
    customerAges.set(tx.customerId, tx.customerAge);
  }
}

  /**
   This is to ensure consistency within transactionDates to ensure is not:
   1. Before the account opening date.
   2. After the current date and time
   */
  if (tx.transactionDate) {
    const today = new Date();

    if (tx.accountOpeningDate && tx.transactionDate < tx.accountOpeningDate) {
      errors.push("Transaction date cannot be before account opening date.");
    }
    if (tx.transactionDate > today) {
      errors.push("Transaction date cannot be in the future.");
    }
  }

  /**
   This is to ensure accurate balance reconciliation after a transaction.
   Whether it is a transfer, withdrawal,and deposit
   */
  if (tx.accountBalance !== null && tx.transactionAmount !== null) {
    if (customerBalances.has(tx.customerId)) {
      const prevBalance = customerBalances.get(tx.customerId)!;

      // The reported balance should equal what we expected from last transaction
      if (prevBalance !== tx.accountBalance) {
        errors.push(
          `Customer ${tx.customerId}: Balance mismatch. 
          Expected starting balance ${prevBalance.toFixed(2)}, but found ${tx.accountBalance.toFixed(2)}.`
        );
      }
    }

    // Calculate new balance after this transaction
    let newBalance = tx.accountBalance;
    switch (tx.transactionType) {
      case "Deposit":
        newBalance += tx.transactionAmount;
        break;
      case "Withdrawal":
        newBalance -= tx.transactionAmount;
        // to indicate that balance is negative or there is an overdraft
        if (newBalance < 0) {
          errors.push(`Customer ${tx.customerId}: Balance went negative after withdrawal.`);
        }
        break;
      case "Transfer":
        // assumption is that it will be the same calculation as withdrawals
        newBalance -= tx.transactionAmount;
        break;
    }

    // Store new balance for next transaction validation
    customerBalances.set(tx.customerId, newBalance);
  }

  return errors;
}

/**
 * Reset tracking maps.
 * Useful before validating a new dataset.
 */
export function resetCustomerTracking(): void {
  customerAges.clear();
  customerBalances.clear();
}