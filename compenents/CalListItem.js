import React, { useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  Button,
  TouchableWithoutFeedback,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";

export default function CalListItem({ item, onAdd, onMinus }) {
  // const [count, setCount] = useState(1);
  const total = Number(item.cal) * item.qty;
  return (
    <View
      style={{
        // top: 70,
        marginLeft: 20,
        flexDirection: "row",
      }}
    >
      <View style={{ width: "40%", padding: 10 }}>
        <View>
          <Text>{item.name}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text>{item.cal}</Text>
          <Text> calories</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text> Serving Size: </Text>
          <Text>{item.size}</Text>
        </View>
      </View>
      <View style={{ marginHorizontal: 20, top: 10 }}>
        <View style={{ flexDirection: "row" }}>
          <TouchableWithoutFeedback disabled={item.qty == 1} onPress={onMinus}>
            <View
              style={{
                backgroundColor: "white",
                width: 20,
                height: 20,
                borderRadius: 20 / 2,
                borderColor: "black",
                borderWidth: 1.5,
                marginRight: 15,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 14,
                }}
              >
                -
              </Text>
            </View>
          </TouchableWithoutFeedback>
          <Text
            style={{
              fontSize: 12,
            }}
          >
            {item.qty}
          </Text>

          <TouchableWithoutFeedback onPress={onAdd}>
            <View
              style={{
                backgroundColor: "white",
                width: 20,
                height: 20,
                borderRadius: 20 / 2,
                borderColor: "black",
                borderWidth: 1.5,
                marginLeft: 15,
              }}
            >
              <Text style={{ textAlign: "center", fontSize: 14 }}>+</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>

      <View style={{ marginLeft: 30, flexDirection: "row", top: 10 }}>
        <Text>{total.toString()}</Text>
        <Text> CAL</Text>
      </View>
    </View>
  );
}
