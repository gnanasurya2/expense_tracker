import * as SQLite from "expo-sqlite";
import Currency from "../Components/Currency";

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
export const addUser = (userName, Currency) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM DATATABLE WHERE ID = 1",
        [],
        () => {
          tx.executeSql(
            "INSERT INTO DATATABLE (USERNAME , CURRENCY) VALUES( ? , ?)",
            [userName, Currency],
            () => {
              resolve("added user");
            },
            (_, err) => {
              reject(err);
            }
          );
        },
        (_, err) => reject(err)
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

export const updateNotebook = (notebookName, totalAmount, type) => {
  let queryString =
    "UPDATE NOTEBOOKS SET INCOME = " +
    totalAmount +
    " WHERE NAME = '" +
    notebookName +
    "'";
  if (type === "expense") {
    queryString =
      "UPDATE NOTEBOOKS SET EXPENSE = " +
      totalAmount +
      " WHERE NAME = '" +
      notebookName +
      "'";
  }
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        queryString,
        [],
        () => {
          resolve("success");
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

export const fetchNotebookAmount = (type, name) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT " +
          type.toUpperCase() +
          " FROM NOTEBOOKS WHERE NAME = '" +
          name +
          "'",
        [],
        (_, result) => {
          if (type === "expense") {
            resolve(result.rows._array[0].EXPENSE);
          } else {
            resolve(result.rows._array[0].INCOME);
          }
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};
export const deleteNotebook = (name) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM NOTEBOOKS WHERE NAME = '" + name + "'",
        [],
        () => {
          resolve(deleteNotebookTransactions(name));
        },
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
  transactionType,
  date
) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS TRANSACTIONS (id INTEGER PRIMARY KEY NOT NULL , transactionType TEXT NOT NULL , notebookName TEXT NOT NULL , title TEXT NOT NULL , amount INTEGER NOT NULL ,category TEXT NOT NULL , date TEXT NOT NULL)",
        [],
        () => {
          tx.executeSql(
            "INSERT INTO TRANSACTIONS (transactionType , notebookName , title , amount , category , date) VALUES( ?, ? , ? , ? , ? , ?)",
            [transactionType, notebookName, title, amount, category, date],
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
        "SELECT * FROM TRANSACTIONS WHERE notebookName = '" +
          notebookName +
          "'",
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

export const deleteTransaction = (id) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM TRANSACTIONS WHERE id = " + id,
        [],
        () => {
          resolve("deleted");
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const deleteNotebookTransactions = (name) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM TRANSACTIONS WHERE notebookName = '" + name + "'",
        [],
        () => {
          resolve("success");
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};
