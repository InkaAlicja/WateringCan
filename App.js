import { PlantList } from "./PlantList";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AddPlant } from "./AddPlant";
import { Plant } from "./Plant";

const Stack = createNativeStackNavigator();

const datas = [
  {
    name: "plant1 with a very long name",
    species: "species1",
    time: 4,
  },
  {
    name: "plant2",
    species: "species2",
    time: 8,
  },
]; //wiem, wiem xddd

function App() {
  const [plants, setPlants] = React.useState(datas);

  const addPlant = React.useCallback(
    (plant) => {
      setPlants((plants) => plants.concat([plant]));
    },
    [setPlants]
  );

  const removePlant = React.useCallback(
    (name) => {
      setPlants((plants) => plants.filter((plant) => plant.name !== name));
    },
    [setPlants]
  );

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Yourplants" options={{ title: "Your plants" }}>
          {(props) => <PlantList {...props} plants={plants} />}
        </Stack.Screen>
        <Stack.Screen name="AddPlant" options={{ title: "Add a new plant" }}>
          {(props) => <AddPlant {...props} addPlant={addPlant} />}
        </Stack.Screen>
        <Stack.Screen name="Plant">
          {(props) => <Plant {...props} removePlant={removePlant} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
