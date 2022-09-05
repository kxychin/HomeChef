import React, { useState } from "react";
import { Text, View, Image, TouchableWithoutFeedback } from "react-native";

export default function Category({ cat, image }) {
  const [select, setSelected] = useState(false);
  const [bgSelect, setBgSelected] = useState("#f3eed9");

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (select == false) {
          setSelected(true);
          setBgSelected("#d4a373");
        } else {
          setSelected(false);
          setBgSelected("#f3eed9");
        }
      }}
    >
      <View
        style={{
          width: 100,
          height: 100,
          borderRadius: 100 / 2,
          backgroundColor: bgSelect,
          justifyContent: "center",
          alignItems: "center",
          shadowColor: "#a4aa83",
          shadowOffset: { width: 2, height: 0 },
          shadowRadius: 4,
          shadowOpacity: 0.7,
          margin: 10,
        }}
      >
        <View>
          <Image
            source={image}
            style={{
              width: 50,
              height: 50,
              tintColor: "#4c411a",
              alignSelf: "center",
            }}
          />
          <Text
            style={{
              fontSize: 13,
              fontWeight: "500",
              color: "#4c411a",
              textAlign: "center",
              textTransform: "uppercase",
            }}
          >
            {cat}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
