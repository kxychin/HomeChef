import React from "react";
import { View, Text, TextInput, StyleSheet, Image } from "react-native";

export default function SearchBtn({
  value,
  onChangeText,
  placeholder,
  width,
  image,
}) {
  return (
    <View style={[styles.searchBarCont, { width: width }]}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder.toUpperCase()}
        style={styles.searchBar}
        placeholderTextColor="#c6c6c6"
      />
      <Image style={styles.image} source={image} />
    </View>
  );
}

const styles = StyleSheet.create({
  searchBarCont: {
    height: 70,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
  },
  searchBar: {
    paddingLeft: 70,
    fontSize: 20,
    fontWeight: "600",
  },
  image: {
    position: "absolute",
    width: 40,
    height: 40,
    marginLeft: 20,
    tintColor: "#c6c6c6",
  },
});
