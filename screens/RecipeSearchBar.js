import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
  Image,
  FlatList,
  StyleSheet,
} from "react-native";
import { firebase } from "../config";
import { Rating } from "react-native-ratings";
import { createStackNavigator } from "@react-navigation/stack";

import SearchBtn from "../compenents/SearchBtn";
import RecipeScreen from "./Recipes";

const RecipeSearch = ({ navigation }) => {
  //Recipes
  const [recipes, setRecipes] = useState([]);
  const recipesRef = firebase.firestore().collection("recipes");

  useEffect(() => {
    (async () => {
      recipesRef.onSnapshot((querySnapshot) => {
        const recipes = [];
        querySnapshot.forEach((doc) => {
          const {
            calories,
            cuisinecat,
            dishcat,
            imgUrl,
            ingre,
            name,
            nutritions,
            steps,
          } = doc.data();
          recipes.push({
            id: doc.id,
            name,
            cuisinecat,
            dishcat,
            imgUrl,
            ingre,
            calories,
            nutritions,
            steps,
            hr: 1,
          });
        });
        setRecipes(recipes);
      });
    })();
  }, []);

  const [filterData, setFilterData] = useState(recipes);
  const [search, setSearch] = useState("");
  const [masterData, setmasterData] = useState(recipes);

  const searchFilter = (text) => {
    if (text) {
      const newData = recipes.filter((item) => {
        const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilterData(newData);
      setSearch(text);
    } else {
      setFilterData(masterData);
      setSearch(text);
    }
  };

  const ItemRender = ({ item }) => (
    <TouchableWithoutFeedback
      onPress={() => {
        navigation.navigate("RecipePage", { paramKey: item });
      }}
    >
      <View style={styles.svCont}>
        <Image source={{ uri: item.imgUrl }} style={styles.dishImg} />

        <View style={styles.txtCont}>
          <Text style={styles.dishTitle}>{item.name}</Text>
        </View>
        <Rating imageSize={10} startingValue={3} readonly />
      </View>
    </TouchableWithoutFeedback>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <SafeAreaView>
        <View style={{ marginTop: 10, padding: 20, flexDirection: "row" }}>
          <SearchBtn
            width={"75%"}
            image={require("../assets/search.png")}
            value={search}
            onChangeText={(text) => searchFilter(text)}
            placeholder="Search"
          />
          <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
            <Image
              source={require("../assets/close.png")}
              style={{
                width: 30,
                height: 30,
                tintColor: "grey",
                alignSelf: "center",
                marginLeft: 30,
              }}
            />
          </TouchableWithoutFeedback>
        </View>
        <FlatList
          data={filterData}
          renderItem={({ item }) => <ItemRender item={item} />}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  dishImg: {
    width: 50,
    height: 50,
  },
  svCont: {
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    width: "90%",
    flexDirection: "row",
    backgroundColor: "white",
  },
  dishTitle: {
    fontSize: 12,
    fontWeight: "700",
  },
  txtCont: {
    paddingLeft: 5,
    flex: 1,
  },
});

const RecipeSearchStack = createStackNavigator();
const RecipeSearchStackScreens = () => {
  return (
    <RecipeSearchStack.Navigator screenOptions={() => ({ headerShown: false })}>
      <RecipeSearchStack.Screen name="RecipeSearch" component={RecipeSearch} />
      <RecipeSearchStack.Screen name="RecipePage" component={RecipeScreen} />
    </RecipeSearchStack.Navigator>
  );
};

export default RecipeSearchStackScreens;
