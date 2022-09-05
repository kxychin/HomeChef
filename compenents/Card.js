import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableWithoutFeedback,
} from "react-native";

import { Rating } from "react-native-ratings";

export default function Card({ title, image, onPress, rate }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.imgCont}>
          <Image source={image} style={styles.image} />
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>

        <Rating
          imageSize={20}
          startingValue={rate}
          readonly
          style={styles.rating}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 10,
  },
  imgCont: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    borderRadius: 10,
  },
  image: {
    width: 150,
    height: 150,
    alignSelf: "center",
    borderRadius: 10,
  },
  detailContainer: {
    paddingTop: 5,
    width: 150,
    flexDirection: "row",
  },
  title: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
    flexWrap: "wrap",
    flex: 1,
  },
  rating: {
    top: 10,
  },
});
