import React, { useState } from "react";
import { View, Text, TouchableWithoutFeedback, Image } from "react-native";

export default function Checkedbox() {
  const [check, setCheck] = useState(false);
  const [checked, setChecked] = useState("none");
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (check == false) {
          setCheck(true);
          setChecked("flex");
        } else {
          setCheck(false);
          setChecked("none");
        }
      }}
    >
      <View>
        <View
          style={{
            width: 20,
            height: 20,
            borderColor: "black",
            borderWidth: 1,
          }}
        />
        <Image
          source={require("../assets/tick.png")}
          style={{
            width: 20,
            height: 20,
            position: "absolute",
            display: checked,
          }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}
