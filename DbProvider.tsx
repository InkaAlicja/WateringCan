import * as React from "react";
import * as SQLite from "expo-sqlite";

export type BasePlantInfo = {
  name: string;
  species: string;
  days: number;
};

type PlantInfo = BasePlantInfo & {
  id: number;
};

type DBContextType = {
  plants: PlantInfo[];
  addPlant: (plant: BasePlantInfo) => void;
  deletePlant: (id: number) => void;
};

const defaultContext: DBContextType = {
  plants: [],
  addPlant: () => {},
  deletePlant: () => {},
};

const DBContext = React.createContext(defaultContext);

type Props = {
  children?: React.ReactNode;
};

function DBProvider({ children }: Props) {
  const [db, setDb] = React.useState(SQLite.openDatabase("example.db"));
  const [plants, setPlants] = React.useState<PlantInfo[]>([]);

  React.useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS plants (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, species TEXT, days INTEGER)",
        undefined,
        () => console.log("success!"),
        (txObj, error) => {
          console.log(error);
          return true;
        },
      );
    });

    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM plants",
        undefined,
        (txObj, resultSet) => setPlants(resultSet.rows._array),
        (txObj, error) => {
          console.log(error);
          return true;
        },
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
            if (resultSet.insertId) {
              existingPlants.push({
                id: resultSet.insertId,
                name,
                species,
                days,
              });
              setPlants(existingPlants);
            }
          },
          (txObj, error) => {
            console.log(error);
            return true;
          },
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
              let existingPlants = plants.filter((plant) => plant.id !== id);
              setPlants(existingPlants);
            }
          },
          (txObj, error) => {
            console.log(error);
            return true;
          },
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
