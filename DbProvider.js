import * as React from "react";
import * as SQLite from "expo-sqlite";

const DBContext = React.createContext();

function DBProvider({ children }) {
  const [db, setDb] = React.useState(SQLite.openDatabase("example.db"));
  const [plants, setPlants] = React.useState([]);

  React.useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS plants (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, species TEXT, days INTEGER)",
        null,
        () => console.log("success!"),
        (txObj, error) => console.log(error),
      );
    });

    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM plants",
        null,
        (txObj, resultSet) => setPlants(resultSet.rows._array),
        (txObj, error) => console.log(error),
      );
    });
  }, [db]);

  const addPlant = React.useCallback(
    ({ name, species, days }) => {
      db.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO plants (name, species, days) values (?, ?, ?)",
          [name, species, days],
          (txObj, resultSet) => {
            let existingPlants = [...plants];
            existingPlants.push({
              id: resultSet.insertId,
              name,
              species,
              days,
            });
            setPlants(existingPlants);
          },
          (txObj, error) => console.log(error),
        );
      });
    },
    [plants],
  );

  const deletePlant = React.useCallback(
    (id) => {
      db.transaction((tx) => {
        tx.executeSql(
          "DELETE FROM plants WHERE id = ?",
          [id],
          (txObj, resultSet) => {
            if (resultSet.rowsAffected > 0) {
              let existingPlants = [...plants].filter(
                (plant) => plant.id !== id,
              );
              setPlants(existingPlants);
            }
          },
          (txObj, error) => console.log(error),
        );
      });
    },
    [plants],
  );

  const value = {
    plants,
    addPlant,
    deletePlant,
  };

  return <DBContext.Provider value={value}>{children}</DBContext.Provider>;
}

export { DBProvider, DBContext };
