import type { CleanedTransaction } from "../../types/transaction";

/** 
This function calculates the customer lifetime value
by assessing the overall transaction value of each
customer to predict the revenue they will likely generate
in the future
*/
export function calculateCLV(
    transactions: CleanedTransaction[]): Record<string, number> {
  return transactions.reduce((acc, tx) => {
    //groups each customer by id
    if (!acc[tx.customerId]) acc[tx.customerId] = 0;
    // Adds up each customer's transactionAmount
    acc[tx.customerId] += tx.transactionAmount ?? 0;
    return acc;
  }, {} as Record<string, number>);
}

/** This function analyses monthly transactions per branch
 */
export function monthlyBranchTransactions(
    transactions: CleanedTransaction[]) {
  const result: Record<string, Record<string, number>> = {};
  for (const tx of transactions) {
    if (!tx.transactionDate || !tx.branchCode) continue;
    const monthKey = `${tx.transactionDate.getFullYear()}-${tx.transactionDate.getMonth() + 1}`;
    // groups transactions first by branchcode
    if (!result[tx.branchCode]) result[tx.branchCode] = {};
    // Then groups them by month
    if (!result[tx.branchCode][monthKey]) result[tx.branchCode][monthKey] = 0;
    result[tx.branchCode][monthKey] += 1;
  }
  return result;
}

/**
The fucntion is used to detect potential anomalies
in transactions. It uses a simple check that assess
if a transaction exceeds 3x the average transaction amount 
per customer, basically standard deviation
 */
export function detectAnomalies(transactions: CleanedTransaction[], threshold = 3) {
  const amounts = transactions.map(tx => tx.transactionAmount ?? 0);
   // calculation of mean and standard deviation
  const mean = amounts.reduce((a, b) => a + b, 0) / amounts.length;
  const std = Math.sqrt(amounts.reduce((sum, a) => sum + Math.pow(a - mean, 2), 0) / amounts.length);

  return transactions.filter(tx => {
    // flags any transaction where the z score is 
    // higher than threshold (3)
    const z_score = ((tx.transactionAmount ?? 0) - mean) / std;
    return Math.abs(z_score) > threshold;
  });
}
