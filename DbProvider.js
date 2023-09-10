import * as React from "react";
import * as SQLite from "expo-sqlite";

const DBContext = React.createContext();

function DBProvider({ children }) {
  const [db, setDb] = useState(SQLite.openDatabase("example.db"));
  const [plants, setPlants] = useState([]);

  const [currentID, setCurrentID] = React.useState(0);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS plants (id INTEGER PRIMARY KEY, name TEXT, species TEXT, days INTEGER)"
      );
    });

    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM plants",
        null,
        (txObj, resultSet) => setPlants(resultSet.rows._array),
        (txObj, error) => console.log(error)
      );
    });
  }, [db]);

  const addPlant = React.useCallback(
    (name, species, days) => {
      db.transaction((tx) => {
        setCurrentID(currentID + 1);
        tx.executeSql(
          "INSERT INTO plants (id, name, species, days) values (?, ?, ?, ?)",
          [currentID, name, species, days],
          (txObj, resultSet) => {
            let existingNames = [...names];
            existingNames.push({ id: resultSet.insertId, name: currentName });
            setNames(existingNames);
            setCurrentName(undefined);
          },
          (txObj, error) => console.log(error)
        );
      });
      return currentID;
    },
    [currentID, setCurrentID]
  );

  const deletePlant = React.useCallback((id) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM names WHERE id = ?",
        [id],
        (txObj, resultSet) => {
          if (resultSet.rowsAffected > 0) {
            let existingNames = [...names].filter((name) => name.id !== id);
            setNames(existingNames);
          }
        },
        (txObj, error) => console.log(error)
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
