import React from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import GoBack from "../compenents/GoBack";

const ArticlePage = ({ route, navigation: { goBack } }) => {
  const dataSource = route.params.paramKey;

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <SafeAreaView style={{ marginBottom: 100 }}>
        <ScrollView>
          <View style={styles.imgCont}>
            <Image source={{ uri: dataSource.imgUrl }} style={styles.img} />
            <View style={styles.imgOverlay} />
            <Text style={styles.title}>{dataSource.heading}</Text>
          </View>
          <View style={styles.backBtn}>
            <GoBack onPress={() => goBack()} color={"white"} />
          </View>

          <View style={styles.contentCont}>
            <Text style={styles.subHeading}>{dataSource.subHeading}</Text>
            {dataSource.text.map((item, index) => {
              return (
                <View key={index}>
                  <Text style={styles.txt}>{item}</Text>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default ArticlePage;

const styles = StyleSheet.create({
  imgCont: {
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: "100%",
    height: 150,
  },
  imgOverlay: {
    backgroundColor: "black",
    opacity: 0.5,
    width: "100%",
    height: 150,
    position: "absolute",
  },
  title: {
    fontSize: 30,
    position: "absolute",
    color: "white",
    fontWeight: "bold",
  },
  contentCont: {
    margin: 20,
    flex: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 4,
    backgroundColor: "white",
  },
  subHeading: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 10,
  },
  txt: {
    fontSize: 15,
    padding: 10,
  },
  backBtn: {
    position: "absolute",
    top: 10,
    left: 10,
  },
});
