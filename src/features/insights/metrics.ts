import type { CleanedTransaction } from "../../types/transaction";

/** 
 * This function analyses monthly transactions per branch
 */
export function getMonthlyVolumeByBranch(
  data: CleanedTransaction[]
): Map<string, Map<string, number>> {
  const result = new Map<string, Map<string, number>>();

  for (const tx of data) {
    if (!tx.branchCode || !tx.transactionDate) continue;

    const monthKey = `${tx.transactionDate.getFullYear()}-${String(
      tx.transactionDate.getMonth() + 1
    )}`;

    if (!result.has(tx.branchCode)) {
      result.set(tx.branchCode, new Map());
    }
    
    const branchMap = result.get(tx.branchCode)!;
    branchMap.set(monthKey, (branchMap.get(monthKey) || 0) + 1);
  }

  return result;
}

/**
The fucntion is used to detect potential anomalies
in transactions. It uses a simple check that assess
if a transaction exceeds 3x the average transaction amount 
per customer, basically standard deviation
 */
export function detectAnomalousTransactions(
  data: CleanedTransaction[]
): CleanedTransaction[] {
  const amounts = data.map((tx) => tx.transactionAmount ?? 0);
  const threshold: number = 3;
    // calculates the mean and standrad deviation
  const mean = amounts.reduce((a, b) => a + b, 0) / amounts.length;
  const std = Math.sqrt(
    amounts.reduce((sum, a) => sum + Math.pow(a - mean, 2), 0) /
      amounts.length
  );
  // flags and filters any transaction with a z score
  //is higher than 3
  return data.filter((tx) => {
    const z = ((tx.transactionAmount ?? 0) - mean) / std;
    return Math.abs(z) > threshold;
  });
}

/** 
This function calculates the customer lifetime value
by assessing the overall transaction value of a
customer to predict the revenue they will likely generate
in the future
*/
export function calculateCustomerLTV(
  customerId: number,
  data: CleanedTransaction[]
): number {
    // filters customer by id and sums up their transactions
  return data
    .filter((tx) => Number(tx.customerId) === customerId)
    .reduce((sum, tx) => sum + (tx.transactionAmount ?? 0), 0);
}
