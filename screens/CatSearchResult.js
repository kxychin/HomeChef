import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { firebase } from "../config";
import { createStackNavigator } from "@react-navigation/stack";

import Card from "../compenents/Card";
import GoBack from "../compenents/GoBack";

import RecipeScreen from "./Recipes";

const CatSearchResultPage = ({ route, navigation }) => {
  const recipeRef = firebase.firestore().collection("recipes");
  const [recipe, setRecipe] = useState([]);
  const choosenCat = route.params.cuisinekey;
  //const [filterRecipe, setFilterRecipe] = useState([])

  useEffect(() => {
    (async () => {
      recipeRef.onSnapshot((querySnapshot) => {
        const recipe = [];
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
          recipe.push({
            id: doc.id,
            name,
            cuisinecat,
            dishcat,
            imgUrl,
            ingre,
            calories,
            nutritions,
            steps,
          });
        });
        setRecipe(recipe);
      });
    })();
  }, []);

  const filterRecipe = recipe.filter((item) =>
    item.cuisinecat.includes(choosenCat)
  );

  return (
    <View
      style={{
        flex: 1,

        backgroundColor: "white",
      }}
    >
      <SafeAreaView style={{ marginBottom: 100, marginTop: 30 }}>
        <View style={styles.headerCont}>
          <View style={styles.backBtn}>
            <GoBack onPress={() => navigation.goBack()} color={"black"} />
          </View>

          <Text style={styles.headerTxt}>{choosenCat}</Text>
          <TouchableWithoutFeedback>
            <Image
              source={require("../assets/search.png")}
              style={{
                width: 30,
                height: 30,
                alignSelf: "center",
                right: 40,
                position: "absolute",
              }}
            />
          </TouchableWithoutFeedback>
        </View>
        {/* present recipes */}
        <View style={{ alignItems: "center" }}>
          <FlatList
            data={filterRecipe}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            key={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Card
                title={item.name}
                image={{ uri: item.imgUrl }}
                onPress={() => {
                  navigation.navigate("Recipes", { paramKey: item });
                }}
                rate={3}
              />
            )}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default CatSearchResultPage;

const styles = StyleSheet.create({
  headerCont: {
    flexDirection: "row",
  },
  backBtn: {
    left: 10,
    justifyContent: "center",
  },
  headerTxt: {
    fontSize: 30,
    marginLeft: 10,
    padding: 20,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
});
