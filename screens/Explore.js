import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  ScrollView,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import { firebase } from "../config";

import LongCard from "../compenents/LongCard";

import CarouselCards from "../compenents/CarouselCard";
import ArticlesPage from "./AllArticles";
import RecipesPage from "./AllRecipes";
import IndArticleScreen from "./Article";
import IndRecipePage from "./Recipes";

const ExplorePage = ({ navigation }) => {
  //Feeds
  const [articles, setArticles] = useState([]);
  const articlesRef = firebase.firestore().collection("articles");

  useEffect(() => {
    (async () => {
      articlesRef.onSnapshot((querySnapshot) => {
        const articles = [];
        querySnapshot.forEach((doc) => {
          const { heading, subHeading, imgUrl, text } = doc.data();
          articles.push({
            id: doc.id,
            heading,
            subHeading,
            imgUrl,
            text,
          });
        });
        setArticles(articles);
      });
    })();
  }, []);

  const articlesdata = articles.slice(0, 3);

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

  const recipedata = recipes.slice(0, 4);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.tabCont}>
          <Text style={styles.tabTxt}>HomeChef</Text>
          <Image source={require("../assets/logo.png")} style={styles.tabImg} />
        </View>
        <ScrollView style={{ flex: 1 }}>
          <CarouselCards />
          <View style={styles.sectionCont}>
            <View style={styles.sectionHeader}>
              <Text style={styles.txtTitle}>FEEDS</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("Articles")}
                style={styles.viewAllBtn}
              >
                <View>
                  <Text style={styles.viewAllTxt}>View All</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {articlesdata.map((item) => {
            return (
              <View key={item.id}>
                <LongCard
                  image={{ uri: item.imgUrl }}
                  heading={item.heading}
                  subheading={item.subHeading}
                  onPress={() => {
                    navigation.navigate("IndArticle", { paramKey: item });
                  }}
                />
              </View>
            );
          })}

          <View style={styles.sectionCont}>
            <View style={styles.sectionHeader}>
              <Text style={styles.txtTitle}>RECIPES</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("Recipes")}
                style={styles.viewAllBtn}
              >
                <View>
                  <Text style={styles.viewAllTxt}>View All</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <FlatList
            data={recipedata}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableWithoutFeedback
                onPress={() => {
                  navigation.navigate("IndRecipe", { paramKey: item });
                }}
              >
                <View style={styles.item}>
                  <View style={styles.itemCont}>
                    <Image
                      source={{ uri: item.imgUrl }}
                      style={styles.itemImg}
                    />
                  </View>
                  <Text style={styles.title}>{item.name}</Text>
                </View>
              </TouchableWithoutFeedback>
            )}
            horizontal
          />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    marginBottom: 100,
  },
  tabCont: {
    width: "100%",
    height: 50,
    backgroundColor: "#e9edc9",
    justifyContent: "center",
    marginBottom: 10,
  },
  tabTxt: {
    fontSize: 30,
    color: "#4c411a",
    fontWeight: "bold",
    textAlign: "center",
    fontStyle: "italic",
    left: 10,
  },
  tabImg: {
    width: 40,
    height: 40,
    position: "absolute",
    left: 80,
  },
  txtTitle: {
    fontSize: 25,
    fontWeight: "bold",
  },
  viewAllTxt: {
    fontSize: 15,
    fontWeight: "bold",
    top: 3,
  },
  viewAllBtn: { right: 0, position: "absolute" },
  sectionCont: { padding: 20 },
  sectionHeader: { flexDirection: "row" },
  itemCont: {
    shadowColor: "black",
    shadowOffset: { width: 4, height: 5 },
    shadowOpacity: 0.7,
  },
  itemImg: {
    width: 200,
    height: 200,
  },
  item: {
    justifyContent: "center",
    paddingBottom: 20,
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 18,
    position: "absolute",
    color: "white",
    fontWeight: "bold",
    bottom: 20,
    left: 25,
  },
});

const ExploreStack = createStackNavigator();
const ExploreStackScreens = () => {
  return (
    <ExploreStack.Navigator
      initialRouteName="ExplorePage"
      screenOptions={() => ({ headerShown: false })}
    >
      <ExploreStack.Screen name="ExplorePage" component={ExplorePage} />
      <ExploreStack.Screen name="Articles" component={ArticlesPage} />
      <ExploreStack.Screen name="Recipes" component={RecipesPage} />
      <ExploreStack.Screen name="IndArticle" component={IndArticleScreen} />
      <ExploreStack.Screen name="IndRecipe" component={IndRecipePage} />
    </ExploreStack.Navigator>
  );
};

export default ExploreStackScreens;
