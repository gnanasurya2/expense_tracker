import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("user.db");

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS DATATABLE (ID INTEGER PRIMARY KEY NOT NULL, USERNAME TEXT NOT NULL ,CURRENCY TEXT NOT NULL);",
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const getData = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM DATATABLE",
        [],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const createNotebook = (name, income, expense) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS NOTEBOOKS (ID INTEGER PRIMARY KEY NOT NULL , NAME TEXT NOT NULL ,INCOME INTEGER NOT NULL , EXPENSE INTEGER NOT NULL);",
        [],
        (_, result) => {
          tx.executeSql(
            "INSERT INTO NOTEBOOKS (NAME,INCOME,EXPENSE) VALUES(?,?,?)",
            [name, income, expense],
            (_, res) => {
              resolve(res);
            },
            (_, error) => {
              reject(error);
            }
          );
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const fetchNotebook = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM NOTEBOOKS",
        [],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const deleteNotebooks = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DROP TABLE IF EXISTS NOTEBOOKS",
        [],
        () => resolve("success"),
        (_, err) => reject(err)
      );
    });
  });
  return promise;
};

export const createTransactions = (
  notebookName,
  title,
  amount,
  category,
  transactionType
) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS TRANSACTIONS (id INTEGER PRIMARY KEY NOT NULL , transactionType TEXT NOT NULL , notebookName TEXT NOT NULL , title TEXT NOT NULL , amount INTEGER NOT NULL ,category TEXT NOT NULL)",
        [],
        () => {
          tx.executeSql(
            "INSERT INTO TRANSACTIONS (transactionType , notebookName , title , amount , category) VALUES( ?,? , ? , ? , ?)",
            [transactionType, notebookName, title, amount, category],
            (_, result) => {
              resolve(result);
            },
            (_, err) => {
              reject(err);
            }
          );
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const fetchTransactions = (notebookName) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM TRANSACTIONS ",
        [],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const deleteTable = () => {
  db.transaction((tx) => {
    tx.executeSql("DROP TABLE IF EXISTS TRANSACTIONS"),
      () => console.log("dropped"),
      (_, err) => console.log(err);
  });
};
