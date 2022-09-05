import React from "react";
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { Formik, Field } from "formik";
import * as yup from "yup";

import CustomInput from "../compenents/CustomInput";

import { createStackNavigator } from "@react-navigation/stack";

import SignupScreen from "./SignUp";
import ExploreScreen from "./Explore";

const LoginPage = ({ navigation }) => {
  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter valid email")
      .required("Email is required"),
    password: yup
      .string()
      .matches(/\w*[a-z]\w*/, "Password must have a small letter")
      .matches(/\w*[A-Z]\w*/, "Password must have a capital letter")
      .matches(/\d/, "Password must have a number")
      .matches(
        /[!@#$%^&*()\-_"=+{}; :,<.>]/,
        "Password must have a special character"
      )
      .min(8, ({ min }) => `Password must be at least ${min} characters`)
      .required("Password is required"),
  });

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Image
        source={require("../assets/bg.jpg")}
        style={{
          width: "100%",
          height: "100%",
        }}
      />
      <View
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: "black",
          opacity: 0.5,
        }}
      />
      <View
        style={{
          shadowColor: "#faedcd",
          shadowOpacity: 0.9,
          shadowOffset: { width: 2, height: 2 },
          position: "absolute",
          top: 160,
          left: 30,
        }}
      >
        <Image
          source={require("../assets/logotext.png")}
          style={{ tintColor: "#fefae0" }}
        />
      </View>
      <View style={{ position: "absolute", alignSelf: "center", top: "30%" }}>
        <Formik
          validationSchema={loginValidationSchema}
          initialValues={{
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          onSubmit={() => navigation.navigate("Explore")}
        >
          {({ handleSubmit, isValid }) => (
            <>
              <Field
                component={CustomInput}
                name="email"
                placeholder="Email Address"
                keyboardType="email-address"
              />

              <Field
                component={CustomInput}
                name="password"
                placeholder="Password"
                secureTextEntry
              />

              <TouchableWithoutFeedback
                onPress={handleSubmit}
                disabled={!isValid}
                //onPress={() => console.log("Helo")}
              >
                <View
                  style={{
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    backgroundColor: "#e9edc9",
                    width: 120,
                    borderRadius: 10,
                    alignSelf: "center",
                    top: 10,
                    shadowColor: "white",
                    shadowOpacity: 0.8,
                    shadowOffset: { width: 2, height: 2 },
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      color: "black",
                      textTransform: "uppercase",
                      fontWeight: "700",
                      textAlign: "center",
                    }}
                  >
                    login
                  </Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={() => navigation.navigate("Signup")}
              >
                <Text
                  style={{
                    fontSize: 10,
                    textDecorationLine: "underline",
                    textAlign: "center",
                    color: "white",
                    top: 20,
                  }}
                >
                  Do not have an account?
                </Text>
              </TouchableWithoutFeedback>
            </>
          )}
        </Formik>
      </View>
    </View>
  );
};

const LoginStack = createStackNavigator();
const LoginStackScreen = () => {
  return (
    <LoginStack.Navigator screenOptions={() => ({ headerShown: false })}>
      <LoginStack.Screen name="LoginPage" component={LoginPage} />
      <LoginStack.Screen name="Signup" component={SignupScreen} />
      <LoginStack.Screen name="Explore" component={ExploreScreen} />
    </LoginStack.Navigator>
  );
};

export default LoginStackScreen;
