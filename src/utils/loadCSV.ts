import Papa from "papaparse";

export interface DataRow {
  "Customer ID": string;
  "Gender": string;
  "Age": string;
  "Account Type": string;
  "Branch Code": string;
  "Date Of Account Opening": string;
  "Transaction ID": string;
  "Transaction Type": string;
  "Transaction Date": string;
  "Transaction Amount": string;
  "Account Balance": string;
}

export function loadCSV(path: string): Promise<DataRow[]> {
  return new Promise((resolve, reject) => {
    Papa.parse<DataRow>(path, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (result) => resolve(result.data),
      error: (err) => reject(err),
    });
  });
}
