import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import ByCat from "../screens/SearchByCat";
import ByIngre from "../screens/SearchByIngre";

const TabModal = (props) => {
  return (
    <View>
      <TouchableOpacity
        onPressOut={() => {
          props.navigation.goBack();
        }}
      >
        <View style={styles.container} />
      </TouchableOpacity>
      <View style={styles.tabModal}>
        <TouchableWithoutFeedback
          onPress={() => {
            props.navigation.navigate("ByCat");
            props.navigation.pop();
          }}
        >
          <View
            style={[styles.iconCont, styles.byCatBgcolor, styles.byCatIconPos]}
          >
            <Image
              source={require("../assets/TabbarIcon/category.png")}
              resizeMode="contain"
              style={[styles.optIcon, styles.byCatIconColor]}
            />
            <Text style={[styles.optText, styles.byCatTxtColor]}>
              Search By Category
            </Text>
            <Image
              source={require("../assets/TabbarIcon/next.png")}
              resizeMode="contain"
              style={[styles.optIcon, styles.byCatIconColor, styles.nxtIcon]}
            />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            props.navigation.navigate("ByIngre");
            props.navigation.pop();
          }}
        >
          <View
            style={[
              styles.iconCont,
              styles.byIngreBgcolor,
              styles.byIngreIconPos,
            ]}
          >
            <Image
              source={require("../assets/TabbarIcon/ingredients.png")}
              resizeMode="contain"
              style={[styles.optIcon, styles.byIngreIconColor]}
            />
            <Text style={[styles.optText, styles.byIngreTxtColor]}>
              Search By Ingredients
            </Text>
            <Image
              source={require("../assets/TabbarIcon/next.png")}
              resizeMode="contain"
              style={[styles.optIcon, styles.byIngreIconColor, styles.nxtIcon]}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    height: "100%",
    width: "100%",
  },
  tabModal: {
    backgroundColor: "white",
    bottom: 0,
    height: 250,
    width: "100%",
    position: "absolute",
    alignItems: "center",
  },
  iconCont: {
    position: "absolute",
    padding: 20,
    width: "90%",
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
  },
  optIcon: {
    width: 30,
    height: 30,
  },
  optText: {
    left: 10,
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  byCatIconPos: {
    top: "15%",
  },
  byCatBgcolor: {
    backgroundColor: "#e9edc9",
  },
  byCatIconColor: {
    tintColor: "#a4aa83",
  },
  byCatTxtColor: {
    color: "#a4aa83",
  },
  byIngreIconPos: {
    bottom: "25%",
  },
  byIngreBgcolor: {
    backgroundColor: "#f3eed9",
  },
  byIngreIconColor: {
    tintColor: "#d4a373",
  },
  byIngreTxtColor: {
    color: "#d4a373",
  },
  nxtIcon: {
    right: 10,
    position: "absolute",
  },
});

export default TabModal;
