import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as React from "react";
import { Modal, Alert } from "react-native";

import { DBContext } from "./DbProvider";

function Plant({ navigation, route }) {
  const dbContext = React.useContext(DBContext);
  const { deletePlant: removePlant } = dbContext;

  const { plant } = route.params;
  const deletePlant = React.useCallback(() => {
    removePlant(plant.id);
    navigation.goBack();
  }, [removePlant, navigation, plant]);

  const onPressDelete = React.useCallback(() => {
    Alert.alert(
      "R u sure?",
      `U sure u wanna delete ${plant.name}?`,
      [
        { text: "NO", style: "cancel" },
        { text: "YES", onPress: deletePlant },
      ],
      {
        cancelable: true,
      },
    );
  }, []);

  return (
    <View style={styles.container}>
      <Text>Name: {plant?.name}</Text>
      <Text>Sepecies: {plant?.species}</Text>
      <Text>Water every: {plant?.days} days</Text>

      <TouchableOpacity style={styles.deleteButton} onPress={onPressDelete}>
        <Text>DELETE PLANT</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 8,
    paddingTop: 40,
    backgroundColor: "#FEFCF3",
  },
  saveButton: {
    backgroundColor: "#33cc99",
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    margin: 8,
    width: "48%",
  },
  deleteButton: {
    backgroundColor: "#dd7777",
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    margin: 8,
    width: "48%",
  },
});

export { Plant };
