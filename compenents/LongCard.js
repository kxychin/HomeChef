import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableWithoutFeedback,
} from "react-native";

export default function LongCard({ image, heading, subheading, onPress }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <Image source={image} style={styles.image} />
        <View style={styles.txtCont}>
          <Text style={styles.headingTxt}>{heading}</Text>
          <Text numberOfLines={3} style={styles.subTxt}>
            {subheading}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
    flexDirection: "row",
    marginHorizontal: 10,
    shadowColor: "black",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.7,
    shadowRadius: 4,
    backgroundColor: "white",
    padding: 10,
  },
  image: {
    width: 100,
    height: 100,
  },
  txtCont: {
    paddingLeft: 20,
    flex: 1,
    paddingVertical: 3,
  },
  headingTxt: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: "bold",
  },
});
