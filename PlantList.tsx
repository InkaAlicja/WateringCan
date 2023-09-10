import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as React from "react";

import { DBContext } from "./DbProvider";

function PlantList({ navigation, route }) {
  const dbContext = React.useContext(DBContext);
  const { plants } = dbContext;

  const onItemPress = React.useCallback(
    (plant) => {
      navigation.navigate("Plant", {
        plant: plant,
      });
    },
    [navigation],
  );

  const plantItems = plants.map((item, i) => (
    <PlantItem data={item} onItemPress={onItemPress} key={i} />
  ));

  const onPressAddPlant = React.useCallback(() => {
    navigation.navigate("AddPlant");
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.headers}>
        <Cell text="Name:" />
        <Cell text="Species:" />
        <Cell text="Water every:" />
      </View>
      {plantItems}
      <TouchableOpacity onPress={onPressAddPlant} style={styles.button}>
        <Text style={styles.buttonLabel}>Add Plant</Text>
      </TouchableOpacity>
    </View>
  );
}

function PlantItem({ data, onItemPress }) {
  return (
    <TouchableOpacity onPress={() => onItemPress(data)}>
      <View style={styles.row}>
        <Cell text={data.name} />
        <Cell text={data.species} labelStyle={styles.speciesLabel} />
        <Cell text={data.days} />
      </View>
    </TouchableOpacity>
  );
}

type CellProps = {
  text: string;
  labelStyle?: any;
};

function Cell(props: CellProps) {
  const { text, labelStyle } = props;
  const labelStyleResolved = labelStyle ?? styles.label;
  return (
    <View style={styles.cell}>
      <Text style={labelStyleResolved}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    rowGap: 12,
    padding: 20,
    backgroundColor: "#FEFCF3",
    height: "100%",
  },
  headers: {
    justifyContent: "space-evenly",
    flexDirection: "row",
    width: "100%",
  },
  button: {
    backgroundColor: "#33cc99",
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  buttonLabel: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },

  row: {
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
    borderRadius: 8,
    borderColor: "#F0DBDB",
    borderWidth: 1,
    paddingVertical: 8,
    backgroundColor: "#F5EBE0",
  },
  label: {
    color: "#000",
    fontSize: 18,
  },
  speciesLabel: {
    color: "#000",
    fontSize: 18,
    fontStyle: "italic",
  },
  cell: {
    alignItems: "center",
    justifyContent: "center",
    width: "32%",
  },
});

export { PlantList };
