import * as React from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { Avatar } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";

import MyCollectionScreen from "./MyCollections";
import FeedbackScreen from "./Feedback";
import LoginScreen from "./Login";
//import SignupScreen from "./SignUp";

const ProfilePage = ({ navigation }) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
      }}
    >
      <SafeAreaView>
        <View>
          <View>
            <Avatar.Icon
              size={80}
              icon={require("../assets/profile-dp.png")}
              color="white"
              style={{
                backgroundColor: "grey",
                alignSelf: "center",
                top: "50%",
              }}
            />

            <Text
              style={{
                fontSize: 18,
                textAlign: "center",
                top: 60,
                textTransform: "uppercase",
                fontWeight: "bold",
              }}
            >
              Username
            </Text>
          </View>
          <View
            style={{
              top: "20%",
            }}
          >
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate("MyCollection")}
            >
              <View
                style={[
                  styles.profileBtn,
                  { borderColor: "#a4aa83", shadowColor: "#a4aa83" },
                ]}
              >
                <Text style={styles.btnTxt}>My collection</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate("Login")}
            >
              <View
                style={[
                  styles.profileBtn,
                  { borderColor: "#4c411a", shadowColor: "#4c411a" },
                ]}
              >
                <Text style={styles.btnTxt}>Login</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate("Feedback")}
            >
              <View
                style={[
                  styles.profileBtn,
                  { borderColor: "#d4a373", shadowColor: "#d4a373" },
                ]}
              >
                <Text style={styles.btnTxt}>Feedback</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

const ProfileStack = createStackNavigator();
const ProfileStackScreens = () => {
  return (
    <ProfileStack.Navigator
      initialRouteName="ProfileScreen"
      screenOptions={() => ({ headerShown: false })}
    >
      <ProfileStack.Screen name="ProfileScreen" component={ProfilePage} />
      <ProfileStack.Screen name="MyCollection" component={MyCollectionScreen} />
      <ProfileStack.Screen name="Login" component={LoginScreen} />
      <ProfileStack.Screen name="Feedback" component={FeedbackScreen} />
      {/* <ProfileStack.Screen name="SignUp" component={SignupScreen} /> */}
    </ProfileStack.Navigator>
  );
};

const styles = StyleSheet.create({
  profileBtn: {
    paddingHorizontal: 80,
    paddingVertical: 20,
    backgroundColor: "white",
    borderRadius: 10,
    margin: 30,
    borderWidth: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    shadowOpacity: 0.9,
  },
  btnTxt: {
    fontSize: 20,
    textAlign: "center",
    textTransform: "uppercase",
  },
});

export default ProfileStackScreens;
