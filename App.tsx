import { PlantList } from "./PlantList";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AddPlant } from "./AddPlant";
import { Plant } from "./Plant";
import { DBProvider } from "./DbProvider";

type RootStackParamList = {
  Yourplants: undefined;
  AddPlant: undefined;
  Plant: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <DBProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Yourplants"
            options={{ title: "Your plants" }}
            component={PlantList}
          />
          <Stack.Screen
            name="AddPlant"
            options={{ title: "Add a new plant" }}
            component={AddPlant}
          />
          <Stack.Screen name="Plant" component={Plant} />
        </Stack.Navigator>
      </NavigationContainer>
    </DBProvider>
  );
}

export default App;
