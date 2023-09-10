import * as React from "react";
import * as SQLite from "expo-sqlite";

const DBContext = React.createContext();

function DBProvider({ children }) {
  const [db, setDb] = useState(SQLite.openDatabase("example.db"));
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS plants (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, species TEXT, days INTEGER)",
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
    (name, species, days) => {
      db.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO plants (name, species, days) values (?, ?, ?)",
          [name, species, days],
          (txObj, resultSet) => {
            let existingPlants = [...plants];
            existingPlants.push({ id: resultSet.insertId, name });
            setPlants(existingPlants);
          },
          (txObj, error) => console.log(error),
        );
      });
    },
    [currentID, setCurrentID],
  );

  const deletePlant = React.useCallback((id) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM plants WHERE id = ?",
        [id],
        (txObj, resultSet) => {
          if (resultSet.rowsAffected > 0) {
            let existingPlants = [...plants].filter(
              (plants) => plant.id !== id,
            );
            setPlants(existingPlants);
          }
        },
        (txObj, error) => console.log(error),
      );
    });
  }, []);

  const value = {
    plants,
    addPlant,
    deletePlant,
  };

  return <DBContext.Provider value={value}>{children}</DBContext.Provider>;
}

export { DBProvider };
