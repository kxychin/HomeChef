import React from "react";
import { TouchableWithoutFeedback, Image, StyleSheet } from "react-native";

const GoBack = ({ onPress, color }) => {
  const styles = StyleSheet.create({
    img: {
      width: 30,
      height: 30,
      tintColor: color,
    },
  });
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Image source={require("../assets/back.png")} style={styles.img} />
    </TouchableWithoutFeedback>
  );
};

export default GoBack;
