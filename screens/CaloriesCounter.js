import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  SafeAreaView,
  Button,
  TouchableWithoutFeedback,
  FlatList,
  ScrollView,
  Animated,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Swipeable } from "react-native-gesture-handler";

import { firebase } from "../config";
import CalListItem from "../compenents/CalListItem";

import CaloriesIngreSearchScreen from "./CaloriesIngreSearch";

const CaloriesCounterPage = ({ navigation }) => {
  const [calCount, setCalCount] = useState([]);
  const calCountRef = firebase.firestore().collection("caloriescounter");

  useEffect(() => {
    (async () => {
      calCountRef.onSnapshot((querySnapshot) => {
        const calCount = [];
        querySnapshot.forEach((doc) => {
          const { name, cal, size } = doc.data();
          calCount.push({
            id: doc.id,
            name,
            cal,
            size,
            qty: 1,
          });
        });
        setCalCount(calCount);
      });
    })();
  }, []);

  let totalCal = 0;
  calCount.forEach((item) => {
    totalCal += item.qty * item.cal;
  });

  const onMinus = (item, index) => {
    const calCounts = [...calCount];
    calCounts[index].qty -= 1;
    //calCount[index].qty -= 1;
    setCalCount(calCounts);
  };
  const onAdd = (item, index) => {
    const calCounts = [...calCount];
    calCounts[index].qty += 1;
    //calCount[index].qty -= 1;
    setCalCount(calCounts);
  };
  const deleteItem = ({ item }) => {
    firebase.firestore().collection("caloriescounter").doc(item.id).delete();
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <SafeAreaView>
        <Text
          style={{
            top: 30,
            fontSize: 30,
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          MY TOTAL
        </Text>

        <ScrollView style={{ height: "60%", top: 50, marginBottom: 70 }}>
          <View style={{ flexDirection: "column", marginBottom: 10 }}>
            {calCount.map((item, index) => {
              //console.log(index);
              const leftSwipe = (progress, dragX) => {
                const scale = dragX.interpolate({
                  inputRange: [-150, 0],
                  outputRange: [1, 0],
                  extrapolate: "clamp",
                });
                return (
                  <TouchableWithoutFeedback
                    onPress={() => deleteItem({ item })}
                    activeOpacity={0.6}
                  >
                    <View
                      style={{
                        backgroundColor: "red",
                        justifyContent: "center",
                        alignItems: "center",
                        width: 100,
                        height: "100%",
                      }}
                    >
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
                );
              };
              return (
                <Swipeable renderRightActions={leftSwipe}>
                  <View key={index}>
                    <CalListItem
                      item={item}
                      onAdd={() => onAdd(item, index)}
                      onMinus={() => onMinus(item, index)}
                    />
                  </View>
                </Swipeable>
              );
            })}
          </View>

          <View>
            <TouchableWithoutFeedback
              onPress={() => {
                navigation.navigate("IngreSearch");
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  marginLeft: 20,
                }}
              >
                <View
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 20 / 2,
                    borderWidth: 2,
                    borderColor: "black",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    +
                  </Text>
                </View>
                <Text
                  style={{
                    marginLeft: 10,
                    fontWeight: "bold",
                  }}
                >
                  Add Ingredients
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </ScrollView>

        <View
          style={{
            alignSelf: "center",
            flexDirection: "row",
          }}
        >
          <Text style={{ fontSize: 30, fontWeight: "bold" }}>Total:</Text>
          <Text
            style={{ fontSize: 30, fontWeight: "bold", marginHorizontal: 10 }}
          >
            {totalCal}
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
};

const IngreSearchStack = createStackNavigator();
const IngreSearchStackScreens = () => {
  return (
    <IngreSearchStack.Navigator screenOptions={() => ({ headerShown: false })}>
      <IngreSearchStack.Screen
        name="CaloriesCounter"
        component={CaloriesCounterPage}
      />
      <IngreSearchStack.Screen
        name="IngreSearch"
        component={CaloriesIngreSearchScreen}
      />
    </IngreSearchStack.Navigator>
  );
};

export default IngreSearchStackScreens;
