import React from "react";
import { View, Text, Image, TouchableWithoutFeedback } from "react-native";
import { Formik, Field } from "formik";
import * as yup from "yup";

import CustomInput from "../compenents/CustomInput";

const SignupPage = ({ navigation }) => {
  const signUpValidationSchema = yup.object().shape({
    username: yup.string().required("Full name is required"),
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
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords do not match")
      .required("Confirm password is required"),
  });

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
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
          validationSchema={signUpValidationSchema}
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
                name="username"
                placeholder="Username"
              />
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
              <Field
                component={CustomInput}
                name="confirmPassword"
                placeholder="Confirm Password"
                secureTextEntry
              />

              <TouchableWithoutFeedback
                onPress={handleSubmit}
                disabled={!isValid}
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
                    }}
                  >
                    sign up
                  </Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                <Text
                  style={{
                    fontSize: 10,
                    textDecorationLine: "underline",
                    textAlign: "center",
                    color: "white",
                    top: 20,
                  }}
                >
                  Already have an account?
                </Text>
              </TouchableWithoutFeedback>
            </>
          )}
        </Formik>
      </View>
    </View>
  );
};

export default SignupPage;
