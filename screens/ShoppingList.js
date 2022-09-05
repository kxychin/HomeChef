import React, { useState, useEffect } from "react";
import {
  Alert,
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  TextInput,
  Animated,
  TouchableWithoutFeedback,
  Image,
  Modal,
  Keyboard,
  Dimensions,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Swipeable } from "react-native-gesture-handler";

import { firebase } from "../config";
import SearchBtn from "../compenents/SearchBtn";
import Checkedbox from "../compenents/CheckBox";

import ShopListSearchPage from "./ShopListSearch";

const SCREEN_WIDTH = Dimensions.get("window").width;

const ShoppingList = ({ navigation }) => {
  const [shoppingList, setShoppingList] = useState([]);
  const shoppingListRef = firebase.firestore().collection("shoppinglist");

  useEffect(() => {
    (async () => {
      shoppingListRef.onSnapshot((querySnapshot) => {
        const shoppingList = [];
        querySnapshot.forEach((doc) => {
          const { name, qty, size, note } = doc.data();
          shoppingList.push({
            id: doc.id,
            name,
            note,
            size,
            qty,
          });
        });
        setShoppingList(shoppingList);
      });
    })();
  }, []);

  const [modalVisible, setModalVisible] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [qtyInput, setQtyInput] = useState("");
  const [sizeInput, setSizeInput] = useState("");
  const [noteInput, setNoteInput] = useState("");
  const [selId, setSelId] = useState([]);

  const modaltxt = ({ item }) => {
    setNameInput(item.name);
    setQtyInput(item.qty);
    setSizeInput(item.size);
    setNoteInput(item.note);
    setSelId({ item });
  };

  const deleteAll = () => {
    shoppingList.map((item) => {
      firebase.firestore().collection("shoppinglist").doc(item.id).delete();
    });
  };

  const deleteItem = ({ item }) => {
    firebase.firestore().collection("shoppinglist").doc(item.id).delete();
  };

  const updateItem = ({ item }) => {
    firebase.firestore().collection("shoppinglist").doc(item.id).set({
      name: nameInput,
      qty: qtyInput,
      size: sizeInput,
      note: noteInput,
    });
  };

  console.log(nameInput);

  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <Text
        style={{
          fontSize: 30,
          textAlign: "center",
          padding: 20,
          fontWeight: "bold",
        }}
      >
        Shopping List
      </Text>
      <View style={{ marginTop: 10, padding: 20, flexDirection: "row" }}>
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate("ShopListSearch");
          }}
        >
          <View
            style={{
              width: "65%",
              height: 70,
              backgroundColor: "#e0e0e0",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                paddingLeft: 70,
                fontSize: 20,
                fontWeight: "600",
                color: "#c6c6c6",
                textTransform: "uppercase",
              }}
            >
              add an item
            </Text>
            <Image
              style={{
                position: "absolute",
                width: 40,
                height: 40,
                marginLeft: 20,
                tintColor: "#c6c6c6",
              }}
              source={require("../assets/addingre.png")}
            />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => deleteAll()}>
          <View
            style={{
              padding: 5,
              backgroundColor: "white",
              shadowColor: "black",
              shadowOpacity: 0.7,
              justifyContent: "center",
              marginLeft: 10,
              shadowOffset: { width: 2, height: 2 },
            }}
          >
            <Text
              style={{
                fontSize: 18,
                textTransform: "uppercase",
                fontWeight: "bold",
              }}
            >
              clear all
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>

      <Modal
        //animationType={"slide"}
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
              width: 280,
              height: 400,
              backgroundColor: "white",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                padding: 10,
                margin: 10,
                alignItems: "center",
              }}
            >
              <TouchableWithoutFeedback
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Image
                  source={require("../assets/close.png")}
                  style={{
                    width: 20,
                    height: 20,
                  }}
                />
              </TouchableWithoutFeedback>

              <TouchableWithoutFeedback
                onPress={() => {
                  updateItem(selId);
                  setModalVisible(!modalVisible);
                }}
              >
                <Text
                  style={{
                    right: 5,
                    position: "absolute",

                    fontSize: 15,
                    textTransform: "uppercase",
                    color: "grey",
                    fontWeight: "bold",
                  }}
                >
                  Save
                </Text>
              </TouchableWithoutFeedback>
            </View>

            <View
              style={{
                padding: 10,
                borderTopColor: "grey",
                borderTopWidth: 2,
              }}
            >
              <Text
                style={{
                  color: "grey",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  marginBottom: 5,
                }}
              >
                Name
              </Text>
              <TextInput defaultValue={nameInput} editable={false} />
            </View>

            <View
              style={{
                borderTopColor: "grey",
                borderTopWidth: 2,
                flexDirection: "row",
              }}
            >
              <View style={{ padding: 10 }}>
                <Text
                  style={{
                    color: "grey",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    marginBottom: 5,
                  }}
                >
                  quantity
                </Text>
                <TextInput
                  defaultValue={qtyInput}
                  onChangeText={(text) => setQtyInput(text)}
                  onEndEditing={() => setQtyInput(qtyInput)}
                  editable
                />
              </View>
              <View
                style={{
                  marginLeft: 40,
                  borderLeftColor: "grey",
                  borderLeftWidth: 2,
                  padding: 10,
                }}
              >
                <Text
                  style={{
                    color: "grey",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    marginBottom: 5,
                  }}
                >
                  size
                </Text>
                <TextInput
                  defaultValue={sizeInput}
                  onChangeText={(text) => setSizeInput(text)}
                  onEndEditing={() => setSizeInput(sizeInput)}
                  editable
                />
              </View>
            </View>
            <View
              style={{
                padding: 10,
                borderTopColor: "grey",
                borderTopWidth: 2,
              }}
            >
              <Text
                style={{
                  color: "grey",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  marginBottom: 5,
                }}
              >
                note
              </Text>
              <TextInput
                keyboardType="default"
                returnKeyType="done"
                blurOnSubmit={true}
                onSubmitEditing={() => {
                  Keyboard.dismiss();
                }}
                onChangeText={(text) => setNoteInput(text)}
                onEndEditing={() => setNoteInput(noteInput)}
                defaultValue={noteInput}
                editable
                multiline
              />
            </View>
          </View>
        </View>
      </Modal>

      {shoppingList.map((item, index) => {
        const leftSwipe = (progress, dragX) => {
          const scale = dragX.interpolate({
            inputRange: [-150, 0],
            outputRange: [1, 0],
            extrapolate: "clamp",
          });
          return (
            <View key={item.id}>
              <TouchableWithoutFeedback
                onPress={() => deleteItem({ item })}
                activeOpacity={0.6}
              >
                <View style={styleSheet.deleteBox}>
                  <Animated.Image
                    source={require("../assets/delete.png")}
                    style={{
                      width: 30,
                      height: 30,
                      tintColor: "white",
                      transform: [{ scale: scale }],
                    }}
                  />
                </View>
              </TouchableWithoutFeedback>
            </View>
          );
        };
        return (
          <Swipeable renderRightActions={leftSwipe}>
            <View key={item.id}>
              <View
                style={{
                  flexDirection: "row",
                  padding: 10,
                  alignItems: "center",
                  marginLeft: 10,
                }}
              >
                <Checkedbox />
                <Text style={{ margin: 5 }}>{item.name}</Text>
                <Text style={{ margin: 5, color: "grey" }}>{item.qty}</Text>
                <Text style={{ margin: 5, color: "grey" }}>{item.size}</Text>
                <TouchableWithoutFeedback
                  onPress={() => {
                    modaltxt({ item });
                    setModalVisible(true);
                  }}
                >
                  <Image
                    source={require("../assets/edit.png")}
                    style={{
                      width: 20,
                      height: 20,
                      tintColor: "grey",
                      right: 30,
                      position: "absolute",
                    }}
                  />
                </TouchableWithoutFeedback>
              </View>
            </View>
          </Swipeable>
        );
      })}
    </SafeAreaView>
  );
};

const ShopIngreSearchStack = createStackNavigator();
const ShopIngreSearchStackScreens = () => {
  return (
    <ShopIngreSearchStack.Navigator
      screenOptions={() => ({
        headerShown: false,
      })}
      initialRouteName="ShoppingList"
    >
      <ShopIngreSearchStack.Screen
        name="ShoppingList"
        component={ShoppingList}
      />
      <ShopIngreSearchStack.Screen
        name="ShopListSearch"
        component={ShopListSearchPage}
      />
    </ShopIngreSearchStack.Navigator>
  );
};

export default ShopIngreSearchStackScreens;

const styleSheet = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: "white",
  },

  item: {
    paddingLeft: 15,
    paddingTop: 8,
    paddingBottom: 8,
  },

  itemText: {
    fontSize: 24,
    color: "black",
  },
  textInput: {
    backgroundColor: "#BFBFBF",
    width: "50%",
    borderRadius: 5,
    height: 50,
    fontSize: 20,
    fontWeight: "bold",
    paddingHorizontal: 10,
    left: 20,
    top: 10,
  },
  deleteBox: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 40,
  },
});
