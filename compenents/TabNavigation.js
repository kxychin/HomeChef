import * as React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StackActions } from "@react-navigation/native";

import ExploreScreen from "../screens/Explore";
import ShoppingListScreen from "../screens/ShoppingList";
import CaloriesCounterScreen from "../screens/CaloriesCounter";
import ProfileScreen from "../screens/Profile";
import SearchByCatScreen from "../screens/SearchByCat";
import SearchByIngreScreen from "../screens/SearchByIngre";

import TabModal from "../compenents/TabModal";

const SearchScreen = () => <View style={{ flex: 1 }} />;

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          backgroundColor: "white",
          height: 100,
        },
      }}
    >
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabContainer}>
              <Image
                source={require("../assets/TabbarIcon/bulb.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "#a4aa83" : "#cbcbcb",
                }}
              />
              <Text
                style={{
                  color: focused ? "#a4aa83" : "#cbcbcb",
                  fontSize: 8.5,
                  fontWeight: "600",
                  top: 3,
                }}
              >
                Explore
              </Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Shopping List"
        component={ShoppingListScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabContainer}>
              <Image
                source={require("../assets/TabbarIcon/clipboard-list-check.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "#a4aa83" : "#cbcbcb",
                }}
              />
              <Text
                style={{
                  color: focused ? "#a4aa83" : "#cbcbcb",
                  fontSize: 8.5,
                  fontWeight: "600",
                  top: 3,
                }}
              >
                Shopping List
              </Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: () => (
            <View
              style={{
                top: -30,
                justifyContent: "center",
                alignItems: "center",
                width: 70,
                height: 70,
                borderRadius: 35,
                backgroundColor: "#ccd5ae",
                shadowOffset: {
                  width: 0,
                  height: 5,
                },
                shadowOpacity: 0.25,
                shadowRadius: 10,
                shadowColor: "grey",
              }}
            >
              <Image
                source={require("../assets/TabbarIcon/search-alt.png")}
                resizeMode="contain"
                style={{
                  width: 35,
                  height: 35,
                  tintColor: "white",
                }}
              />
            </View>
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate("TabModal");
          },
        })}
      />

      <Tab.Screen
        name="ByIngre"
        component={SearchByIngreScreen}
        options={{
          tabBarButton: (props) => null,
        }}
      />
      <Tab.Screen
        name="ByCat"
        component={SearchByCatScreen}
        options={{
          tabBarButton: (props) => null,
        }}
      />

      <Tab.Screen
        name="Calories Counter"
        component={CaloriesCounterScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabContainer}>
              <Image
                source={require("../assets/TabbarIcon/calculator.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "#a4aa83" : "#cbcbcb",
                }}
              />
              <Text
                style={{
                  color: focused ? "#a4aa83" : "#cbcbcb",
                  fontSize: 8.5,
                  fontWeight: "600",
                  top: 3,
                }}
              >
                Calories Counter
              </Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabContainer}>
              <Image
                source={require("../assets/TabbarIcon/user.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "#a4aa83" : "#cbcbcb",
                }}
              />
              <Text
                style={{
                  color: focused ? "#a4aa83" : "#cbcbcb",
                  fontSize: 8.5,
                  fontWeight: "600",
                  top: 3,
                }}
              >
                Profile
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const RootStack = createStackNavigator();
const RootStackScreen = () => {
  return (
    <RootStack.Navigator screenOptions={() => ({ headerShown: false })}>
      <RootStack.Screen name="Tabs" component={Tabs} />
      <RootStack.Screen
        name="TabModal"
        component={TabModal}
        options={{
          presentation: "transparentModal",
          cardOverlayEnabled: "true",
        }}
      />
    </RootStack.Navigator>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default RootStackScreen;
