import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import { firebase } from "../config";
import { createStackNavigator } from "@react-navigation/stack";

import Card from "../compenents/Card";
import GoBack from "../compenents/GoBack";
import RecipeScreen from "./Recipes";
import RecipeSearch from "./RecipeSearchBar";

const AllRecipesPage = ({ navigation }) => {
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
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <SafeAreaView>
        <View style={styles.headerCont}>
          <View style={styles.backBtn}>
            <GoBack onPress={() => navigation.goBack()} color={"black"} />
          </View>

          <Text style={styles.headerTxt}>Recipes</Text>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate("RecipeSearch")}
          >
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
        <View style={{ alignItems: "center", height: "83%" }}>
          <FlatList
            data={recipes}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            key={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Card
                title={item.name}
                image={{ uri: item.imgUrl }}
                onPress={() => {
                  navigation.navigate("Recipe", { paramKey: item });
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

const RecipeStack = createStackNavigator();
const RecipeStackScreens = () => {
  return (
    <RecipeStack.Navigator screenOptions={() => ({ headerShown: false })}>
      <RecipeStack.Screen name="AllRecipes" component={AllRecipesPage} />
      <RecipeStack.Screen name="Recipe" component={RecipeScreen} />
      <RecipeStack.Screen name="RecipeSearch" component={RecipeSearch} />
    </RecipeStack.Navigator>
  );
};

export default RecipeStackScreens;

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
  },
});
