import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Modal,
  Dimensions,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import IngreListItem from "../compenents/IngreListItem";
import SearchBtn from "../compenents/SearchBtn";
import SearchResultScreen from "./SearchResult";

const listTab = [
  { cat: "All" },
  { cat: "Meats" },
  { cat: "Vegetables" },
  { cat: "Fruits" },
  { cat: "Dairy" },
  { cat: "Seafood" },
];

const ingrelist = [
  {
    id: 1,
    name: "apple",
    icon: require("../assets/category/apple.png"),
    cat: "Fruits",
  },
  {
    id: 2,
    name: "beef",
    icon: require("../assets/category/beef.png"),
    cat: "Meats",
  },
  {
    id: 3,
    name: "cabbage",
    icon: require("../assets/category/cabbage.png"),
    cat: "Vegetables",
  },
  {
    id: 4,
    name: "cheese",
    icon: require("../assets/category/cheese.png"),
    cat: "Dairy",
  },
  {
    id: 5,
    name: "chicken",
    icon: require("../assets/category/chicken.png"),
    cat: "Meats",
  },
  {
    id: 6,
    name: "egg",
    icon: require("../assets/category/egg.png"),
    cat: "Dairy",
  },
  {
    id: 7,
    name: "eggplant",
    icon: require("../assets/category/eggplant.png"),
    cat: "Vegetables",
  },
  {
    id: 8,
    name: "fish",
    icon: require("../assets/category/fish.png"),
    cat: "Seafood",
  },
  {
    id: 9,
    name: "pork",
    icon: require("../assets/category/pork.png"),
    cat: "Meats",
  },
  {
    id: 10,
    name: "tomato",
    icon: require("../assets/category/tomato.png"),
    cat: "Fruits",
  },
];

const choosenIngre = ["Chicken", "Egg"];

const SearchByIngrePage = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const [cat, setCat] = useState("All");
  const [datalist, setDatalist] = useState(ingrelist);
  const [test, setTest] = useState(true);
  const setCatFilter = (cat) => {
    if (cat !== "All") {
      setDatalist([...ingrelist.filter((e) => e.cat === cat)]);
      setTest(false);
    } else {
      setDatalist(ingrelist);
      setTest(true);
    }
    setCat(cat);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <SafeAreaView>
        <View style={{ alignItems: "center", marginVertical: 10 }}>
          <SearchBtn
            width={"80%"}
            image={require("../assets/search.png")}
            placeholder="Search"
          />
        </View>

        <View style={styles.listTab}>
          <ScrollView horizontal={true}>
            {listTab.map((e) => (
              <TouchableOpacity
                style={[styles.btnTab, cat === e.cat && styles.btnTabActive]}
                onPress={() => setCatFilter(e.cat)}
              >
                <Text
                  style={[styles.textTab, cat === e.cat && styles.txtTabActive]}
                >
                  {e.cat}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={{ alignSelf: "center", height: "60%" }}>
          <FlatList
            data={datalist}
            keyExtractor={(e, i) => i.toString()}
            numColumns={3}
            key={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <IngreListItem name={item.name} icon={item.icon} />
            )}
          />
        </View>

        <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
          <View
            style={{
              alignSelf: "center",
              marginTop: 10,
              paddingHorizontal: 50,
              paddingVertical: 15,
              backgroundColor: "#d4a373",
              shadowColor: "#4c411a",
              shadowRadius: 4,
              shadowOffset: { width: 1, height: 1 },
              shadowOpacity: 0.7,
            }}
          >
            <Modal
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                console.log("Modal has been closed.");
              }}
            >
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "rgba(0,0,0,0.5)",
                  padding: 100,
                }}
              >
                <View
                  style={{
                    padding: 10,
                    backgroundColor: "white",
                  }}
                >
                  <View style={{ padding: 20 }}>
                    <Text style={{ fontSize: 15, fontWeight: "700" }}>
                      Are you sure that you want to search an recipe with the
                      following ingredients?
                    </Text>
                    {choosenIngre.map((item) => {
                      return (
                        <Text style={{ fontSize: 15, paddingVertical: 10 }}>
                          - {item}
                        </Text>
                      );
                    })}

                    <View
                      style={{
                        marginTop: 20,
                        flexDirection: "row",
                        alignSelf: "center",
                      }}
                    >
                      <TouchableWithoutFeedback
                        onPress={() => setModalVisible(false)}
                      >
                        <View
                          style={{
                            paddingVertical: 10,
                            paddingHorizontal: 20,
                            backgroundColor: "#ededed",
                            shadowColor: "black",
                            shadowOpacity: 0.7,
                            margin: 10,
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 15,
                              fontWeight: "bold",
                              textTransform: "uppercase",
                              textAlign: "center",
                            }}
                          >
                            Back
                          </Text>
                        </View>
                      </TouchableWithoutFeedback>
                      <TouchableWithoutFeedback
                        onPress={() => {
                          setModalVisible(false);
                          navigation.navigate("SearchResult");
                        }}
                      >
                        <View
                          style={{
                            paddingVertical: 10,
                            paddingHorizontal: 20,
                            backgroundColor: "#ededed",
                            shadowColor: "black",
                            shadowOpacity: 0.7,
                            margin: 10,
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 15,
                              fontWeight: "bold",
                              textTransform: "uppercase",
                              textAlign: "center",
                            }}
                          >
                            match
                          </Text>
                        </View>
                      </TouchableWithoutFeedback>
                    </View>
                  </View>
                </View>
              </View>
            </Modal>
            <Text
              style={{
                fontWeight: "bold",
              }}
            >
              Proceed
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </View>
  );
};

const SearchResultStack = createStackNavigator();
const SearchResultStackScreen = () => {
  return (
    <SearchResultStack.Navigator screenOptions={() => ({ headerShown: false })}>
      <SearchResultStack.Screen
        name="SearchByIngrePage"
        component={SearchByIngrePage}
      />
      <SearchResultStack.Screen
        name="SearchResult"
        component={SearchResultScreen}
      />
    </SearchResultStack.Navigator>
  );
};

export default SearchResultStackScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: "center",
    margin: 20,
  },
  listTab: {
    flexDirection: "row",
    alignSelf: "center",
    marginLeft: 10,
    marginBottom: 20,
  },
  btnTab: {
    width: Dimensions.get("window").width / 3.5,
    flexDirection: "row",
    borderWidth: 2,
    borderColor: "#ebebeb",
    padding: 10,
    justifyContent: "center",
    margin: 10,
    borderRadius: 10,
  },
  textTab: {
    fontSize: 16,
  },
  btnTabActive: {
    backgroundColor: "#e6838d",
  },
  txtTabActive: {
    color: "white",
  },
  itemContainer: {
    flexDirection: "row",
    paddingVertical: 15,
  },
  itemBody: {
    flex: 1,
    paddingHorizontal: 18,
    justifyContent: "center",
  },
  itemName: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
