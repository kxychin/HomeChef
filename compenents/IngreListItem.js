import React, { useState } from "react";
import { View, Image, Text, TouchableWithoutFeedback } from "react-native";

export default function IngreListItem({ name, icon }) {
  const [selIngre, setSelIngre] = useState(false);
  const [selIngreBg, setSelIngreBg] = useState("white");

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (selIngre == "white") {
          setSelIngre("#e9edc9");
        } else {
          setSelIngre("white");
        }
      }}
    >
      <View
        style={{
          alignItems: "center",
          padding: 10,
          borderColor: "black",
          borderWidth: 2,
          backgroundColor: selIngre,
        }}
      >
        <Image source={icon} style={{ width: 100, height: 100 }} />
        <Text>{name}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}
