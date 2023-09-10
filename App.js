import { PlantList } from "./PlantList";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AddPlant } from "./AddPlant";
import { Plant } from "./Plant";
import { DBProvider } from "./DbProvider";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <DBProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Yourplants" options={{ title: "Your plants" }}>
            {(props) => <PlantList {...props} />}
          </Stack.Screen>
          <Stack.Screen name="AddPlant" options={{ title: "Add a new plant" }}>
            {(props) => <AddPlant {...props} />}
          </Stack.Screen>
          <Stack.Screen name="Plant">
            {(props) => <Plant {...props} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </DBProvider>
  );
}

export default App;
