import React from "react";
import {
  Text,
  View,
  Image,
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";

import Card from "../compenents/Card";
import GoBack from "../compenents/GoBack";

const data = [
  {
    id: 1,
    name: "Asparagus with Smoked Salmon and Horseradish",
    imgUrl:
      "https://firebasestorage.googleapis.com/v0/b/test-3ad2c.appspot.com/o/recipes%2FAsparagus%20Grantin%20Topped%20with%20Poached%20Egg.jpeg?alt=media&token=3663edb2-2985-4c61-8ade-5cab7ef672d6",
    rating: 3,
  },
  {
    id: 2,
    name: "Asparagus with Smoked Salmon and Horseradish",
    imgUrl:
      "https://firebasestorage.googleapis.com/v0/b/test-3ad2c.appspot.com/o/recipes%2FPompano%20Fish%20and%20Sour%20Bamboo%20Soup.jpg?alt=media&token=50943d90-9718-4641-9ade-fdbcc1749588",
    rating: 3,
  },
];

const SearchResult = ({ navigation }) => {
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
          <Text style={styles.headerTxt}>Search Result</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            key={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Card title={item.name} image={{ uri: item.imgUrl }} rate={3} />
            )}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default SearchResult;

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
