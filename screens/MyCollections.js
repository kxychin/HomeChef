import React from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  SafeAreaView,
  TouchableWithoutFeedback,
} from "react-native";
import { Rating } from "react-native-ratings";

const MyCollectionPage = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <SafeAreaView>
        <Text style={styles.titleTxt}> My Collections </Text>
        <ScrollView style={{ top: 30, height: "100%" }}>
          <TouchableWithoutFeedback>
            <View style={styles.svCont}>
              <Image
                source={require("../assets/dish.jpg")}
                style={styles.dishImg}
              />
              <View>
                <View style={styles.txtCont}>
                  <Text style={styles.dishTitle}>Title</Text>
                </View>

                <Rating imageSize={20} startingValue={3} readonly />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  titleTxt: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    top: 20,
  },
  dishImg: {
    width: 90,
    height: 90,
    marginRight: 20,
  },
  svCont: {
    padding: 10,
    marginTop: 10,
    marginHorizontal: 30,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    width: "80%",
    flexDirection: "row",
    backgroundColor: "white",
  },
  dishTitle: {
    fontSize: 20,
    fontWeight: "700",
  },
  txtCont: {
    flex: 1,
  },
});

export default MyCollectionPage;
