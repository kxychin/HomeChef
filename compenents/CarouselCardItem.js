import React from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";

export const SLIDER_WIDTH = Dimensions.get("window").width;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.9);

const CarouselCardItem = ({ item, index }) => {
  return (
    <View style={styles.container} key={index}>
      <Image source={{ uri: item.imgUrl }} style={styles.image} />
      <View style={styles.txtCont}>
        <Text style={styles.header}>{item.name}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 10,
    backgroundColor: "transparent",
    borderRadius: 8,
    width: ITEM_WIDTH,
    paddingBottom: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  image: {
    width: ITEM_WIDTH,
    height: 200,
  },
  header: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  txtCont: {
    shadowColor: "black",
    shadowOpacity: 0.8,
    position: "absolute",
    bottom: 50,
    paddingTop: 20,
    alignSelf: "center",
  },
});

export default CarouselCardItem;
