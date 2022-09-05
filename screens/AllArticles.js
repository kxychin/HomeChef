import React, { useState, useEffect } from "react";
import { Text, View, ScrollView, SafeAreaView, StyleSheet } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";

import LongCard from "../compenents/LongCard";
import GoBack from "../compenents/GoBack";

import ArticleScreen from "./Article";

import { firebase } from "../config";

const AllArticlesPage = ({ navigation }) => {
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

          <Text style={styles.headerTxt}>Articles</Text>
        </View>
        <ScrollView>
          {articles.map((item, index) => {
            return (
              <View key={index}>
                <LongCard
                  image={{ uri: item.imgUrl }}
                  heading={item.heading}
                  subheading={item.subHeading}
                  onPress={() => {
                    navigation.navigate("Article", { paramKey: item });
                  }}
                />
              </View>
            );
          })}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const ArticlesStack = createStackNavigator();
const ArticlesStackScreens = () => {
  return (
    <ArticlesStack.Navigator
      initialRouteName="AllArticles"
      screenOptions={() => ({ headerShown: false })}
    >
      <ArticlesStack.Screen name="AllArticles" component={AllArticlesPage} />
      <ArticlesStack.Screen name="Article" component={ArticleScreen} />
    </ArticlesStack.Navigator>
  );
};

export default ArticlesStackScreens;

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
