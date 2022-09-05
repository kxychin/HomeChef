import React, { useState } from "react";
import {
  TouchableWithoutFeedback,
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Image,
  FlatList,
  StyleSheet,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import CatSearchResultScreen from "./CatSearchResult";
import RecipeScreen from "./Recipes";

const cuisneCat = [
  {
    id: 1,
    cuines: "asian",
    imgUrl: require("../assets/asian.jpg"),
  },
  {
    id: 2,
    cuines: "western",
    imgUrl: require("../assets/western.jpg"),
  },
  {
    id: 3,
    cuines: "korean",
    imgUrl: require("../assets/korean.jpg"),
  },
  {
    id: 4,
    cuines: "chinese",
    imgUrl: require("../assets/dish.jpg"),
  },
];

const CatSearchPage = ({ navigation }) => {
  const ItemRender = ({ item }) => (
    <View style={styleSheet.item}>
      <TouchableWithoutFeedback
        onPress={() => {
          navigation.navigate("CatSearchResult", { cuisinekey: item.cuines });
        }}
      >
        <View
          style={{
            height: 200,
            width: "100%",
          }}
        >
          <Image
            source={item.imgUrl}
            style={{
              height: 200,
              width: "100%",
            }}
          />
          <View
            style={{
              backgroundColor: "black",
              position: "absolute",
              height: 200,
              width: "100%",
              opacity: 0.5,
            }}
          />
          <Text
            style={{
              fontSize: 50,
              color: "white",
              position: "absolute",
              alignSelf: "center",
              top: "30%",
              opacity: 0.6,
              textShadowColor: "white",
              textShadowOffset: { width: 2, height: 2 },
              textShadowRadius: 5,
              textTransform: "uppercase",
            }}
          >
            {item.cuines}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <SafeAreaView style={{ marginBottom: 100 }}>
        <FlatList
          data={cuisneCat}
          renderItem={({ item }) => <ItemRender item={item} />}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    </View>
  );
};

const CatStack = createStackNavigator();
const CatStackScreens = () => {
  return (
    <CatStack.Navigator
      initialRouteName="CatSearchPage"
      screenOptions={() => ({ headerShown: false })}
    >
      <CatStack.Screen name="CatSearchPage" component={CatSearchPage} />
      <CatStack.Screen
        name="CatSearchResult"
        component={CatSearchResultScreen}
      />
      <CatStack.Screen name="Recipes" component={RecipeScreen} />
    </CatStack.Navigator>
  );
};

export default CatStackScreens;

const styleSheet = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: "white",
  },

  itemText: {
    fontSize: 24,
    color: "black",
  },
  textInput: {
    backgroundColor: "#BFBFBF",
    width: "80%",
    borderRadius: 5,
    height: 50,
    fontSize: 20,
    fontWeight: "bold",
    paddingHorizontal: 10,
  },
});
