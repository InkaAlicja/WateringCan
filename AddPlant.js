import { Alert } from "react-native";
import {
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as React from "react";

const defaultPlant = { name: "", species: "", time: 7 };

function AddPlant({ navigation, addPlant }) {
  const [plant, setPlant] = React.useState(defaultPlant);

  const onChangeNameInputText = React.useCallback(
    (text) => {
      setPlant((plant) => ({
        name: text,
        species: plant.species,
        time: plant.time,
      }));
    },
    [setPlant],
  );

  const onChangeSpeciesInputText = React.useCallback(
    (text) => {
      setPlant((plant) => ({
        name: plant.name,
        species: text,
        time: plant.time,
      }));
    },
    [setPlant],
  );

  const onChangeDaysInputText = React.useCallback(
    (text) => {
      const inputNumber = text.replace(/[^0-9]/g, "");
      let days = inputNumber ? Number(inputNumber) : null;
      if (days === 0) {
        days = 1;
      }

      setPlant((plant) => ({
        name: plant.name,
        species: plant.species,
        time: days,
      }));
    },
    [setPlant],
  );

  const onCancel = React.useCallback(() => navigation.goBack(), [navigation]);

  const onSave = React.useCallback(() => {
    if (plant.time === null || plant.name === null || plant.name === "") {
      Alert.alert(
        "Missing data",
        "The plant needs a name and the num of days between watering needs to be specified",
        [
          {
            text: "OK",
            style: "cancel",
          },
        ],
      );
      return;
    }
    if (plant.species === null || plant.species === "") {
      plant.species = "--";
    }
    addPlant(plant);
    setPlant(defaultPlant);
    navigation.goBack();
  }, [navigation, plant, addPlant, setPlant]);

  return (
    <View>
      <View style={styles.modal}>
        <TextInput
          placeholder="Name"
          style={styles.input}
          value={plant.name}
          onChangeText={onChangeNameInputText}
        />
        <TextInput
          placeholder="Species"
          style={styles.input}
          value={plant.species}
          onChangeText={onChangeSpeciesInputText}
        />
        <View style={styles.days}>
          <Text>Water every</Text>
          <TextInput
            placeholder="days"
            style={styles.input}
            value={plant.time?.toString()}
            onChangeText={onChangeDaysInputText}
          />
          <Text>days</Text>
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.saveButton} onPress={onSave}>
            <Text style={styles.buttonLabel}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
            <Text style={styles.buttonLabel}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modal: {
    padding: 8,
    backgroundColor: "#FEFCF3",
    height: "100%",
    width: "100%",
    display: "flex",
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
  cancelButton: {
    backgroundColor: "#dd7777",
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    margin: 8,
    width: "48%",
  },
  buttonLabel: {
    color: "#fff",
    fontSize: 18,
    fontWeight: 600,
  },
  buttons: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
    display: "flex",
    alignSelf: "flex-end",
  },
  input: {
    borderColor: "#F0DBDB",
    borderWidth: 1,
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    marginHorizontal: 8,
    margin: 8,
  },
  days: {
    flexDirection: "row",
    alignItems: "center",
    fontSize: 20,
    marginLeft: 8,
  },
});

export { AddPlant };
