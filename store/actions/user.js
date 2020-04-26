import { USER_DETAIL, FETCH_USER_DETAIL } from "./index";
import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("user.db");
export const userDetialsHandler = (userName, currency) => {
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS DATATABLE (ID INTEGER PRIMARY KEY NOT NULL , USERNAME TEXT NOT NULL , CURRENCY TEXT NOT NULL)",
      [],
      () => {
        console.log("success");
      },
      (_, err) => console.log(err)
    );
    tx.executeSql(
      "INSERT INTO DATATABLE (USERNAME,CURRENCY) VALUES (?,?)",
      [userName, currency],
      () => console.log("success"),
      (_, err) => console.log(err)
    );
    tx.executeSql(
      "SELECT * FROM DATATABLE  ",
      [],
      (_, { rows: _array }) => console.log(_array),
      (_, err) => console.log(err)
    );
  });
  return {
    type: USER_DETAIL,
    userName: userName,
    currency: currency,
  };
};

export const fetchUserDetail = () => {
  console.log("inside");
  let a;
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM DATATABLE",
      [],
      (_, { rows: { _array } }) => {
        a = _array;
      },
      (_, err) => console.log(err, "!")
    );
  });
  console.log(a, "af");
  return {
    type: FETCH_USER_DETAIL,
    userName: "userName",
    currency: "currency",
  };
};
