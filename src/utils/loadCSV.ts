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
    Papa.parse(path, {
      download: true,
      header: true,
      dynamicTyping: false, // keep all as strings
      skipEmptyLines: true,
      complete: (result) => {
        if (result.errors.length > 0) {
          console.error("PapaParse errors:", result.errors);
          reject(result.errors);
        } else {
          console.log("CSV parsed successfully:", result.data.length, "rows");
          resolve(result.data as DataRow[]);
        }
      },
      error: (err) => {
        console.error("PapaParse failed:", err);
        reject(err);
      },
    });
  });
}
