import XLSX from "xlsx";
import * as file from "expo-file-system";

import { fetchTransactions } from "./database";
const sheer = (notebookName) => {
  const promise = new Promise((resolve, reject) => {
    fetchTransactions(notebookName)
      .then((data) => {
        let ws = XLSX.utils.json_to_sheet(data.rows._array);
        let wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "datasheet");
        const wbout = XLSX.write(wb, { type: "string", bookType: "csv" });
        file.writeAsStringAsync(file.documentDirectory + "/data.csv", wbout);
        resolve(file.documentDirectory + "/data.csv");
      })
      .catch((err) => reject(err));
  });
  return promise;
};

export default sheer;
