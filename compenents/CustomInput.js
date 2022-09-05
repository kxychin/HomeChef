import React from "react";
import { Text, TextInput, StyleSheet } from "react-native";

const CustomInput = (props) => {
  const {
    field: { name, onBlur, onChange, value },
    form: { errors, touched, setFieldTouched },
    ...inputProps
  } = props;

  const hasError = errors[name] && touched[name];

  return (
    <>
      <TextInput
        style={[styles.textInput, hasError && styles.errorInput]}
        value={value}
        onChangeText={(text) => onChange(name)(text)}
        onBlur={() => {
          setFieldTouched(name);
          onBlur(name);
        }}
        {...inputProps}
        placeholderTextColor="white"
      />
      {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
    </>
  );
};

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    width: 300,
    margin: 10,
    backgroundColor: "transparent",
    borderColor: "white",
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 20,
    paddingLeft: 10,
    color: "white",
  },
  errorText: {
    fontSize: 10,
    color: "red",
    marginLeft: 15,
  },
  errorInput: {
    borderColor: "red",
  },
});

export default CustomInput;
