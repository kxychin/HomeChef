import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
  Alert,
  SafeAreaView,
  Image,
} from "react-native";

import { firebase } from "../config";

import SearchBtn from "../compenents/SearchBtn";
const CaloriesIngreSearchPage = ({ navigation: { goBack } }) => {
  const [ingreCal, setIngreCal] = useState([]);
  const ingreCalRef = firebase.firestore().collection("ingrecalories");

  const [calCount, setCalCount] = useState([]);
  const calCountRef = firebase.firestore().collection("caloriescounter");

  useEffect(() => {
    (async () => {
      calCountRef.onSnapshot((querySnapshot) => {
        const calCount = [];
        querySnapshot.forEach((doc) => {
          const { name, cal, size } = doc.data();
          calCount.push({
            id: doc.id,
            name,
            cal,
            size,
          });
        });
        setCalCount(calCount);
      });
    })();
  }, []);

  useEffect(() => {
    (async () => {
      ingreCalRef.onSnapshot((querySnapshot) => {
        const ingreCal = [];
        querySnapshot.forEach((doc) => {
          const { name, cal, size } = doc.data();
          ingreCal.push({
            id: doc.id,
            name,
            cal,
            size,
          });
        });
        setIngreCal(ingreCal);
      });
    })();
  }, []);

  const [filterData, setFilterData] = useState(ingreCal);
  const [search, setSearch] = useState("");
  const [masterData, setmasterData] = useState(ingreCal);

  const searchFilter = (text) => {
    if (text) {
      const newData = ingreCal.filter((item) => {
        const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilterData(newData);
      setSearch(text);
    } else {
      setFilterData(masterData);
      setSearch(text);
    }
  };

  var [duplicate, setDuplicate] = useState(0);

  const addIngre = ({ item }) => {
    firebase
      .firestore()
      .collection("caloriescounter")
      .add({
        name: item.name,
        cal: item.cal,
        size: item.size,
      })
      .catch((error) => console.log(error));
  };

  const checkForDuplicate = (item) => {
    calCount.forEach((obj) => {
      if (item.name == obj.name) {
        Alert.alert("test");
      } else {
        addIngre({ item });
        goBack();
      }

      //Alert.alert("Duplicate");
    });
  };

  const ItemRender = ({ item }) => (
    <TouchableWithoutFeedback
      onPress={() => {
        checkForDuplicate(item);
      }}
    >
      <View style={styles.container}>
        <Text style={styles.title}>{item.name}</Text>
        <View
          style={{
            flexDirection: "row",
            marginTop: 10,
          }}
        >
          <View style={styles.seperator}>
            <Text style={styles.subtext}>{item.cal}</Text>
            <Text style={styles.subtext}> Calories</Text>
          </View>
          <Text style={styles.subtext}>Serving Size:</Text>
          <Text style={styles.subtext}>{item.size}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
      }}
    >
      <SafeAreaView
        style={{
          width: "100%",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <View
          style={{
            alignItems: "center",
            marginTop: 20,
            flexDirection: "row",
          }}
        >
          <SearchBtn
            width={"70%"}
            image={require("../assets/search.png")}
            value={search}
            onChangeText={(text) => searchFilter(text)}
            placeholder="Search"
          />
          <TouchableWithoutFeedback onPress={() => goBack()}>
            <Image
              source={require("../assets/close.png")}
              style={{
                width: 30,
                height: 30,
                tintColor: "grey",
                alignSelf: "center",
                marginLeft: 30,
              }}
            />
          </TouchableWithoutFeedback>
        </View>

        <FlatList
          data={filterData}
          renderItem={({ item }) => <ItemRender item={item} />}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e0e0e0",
    padding: 15,
    margin: 10,
    shadowColor: "black",
    shadowOpacity: 0.6,
    shadowOffset: { width: 1, height: 2 },
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    textTransform: "capitalize",
  },
  subtext: {
    fontSize: 13,
  },
  seperator: {
    paddingRight: 10,
    marginRight: 10,
    borderRightColor: "grey",
    borderRightWidth: 1,
    flexDirection: "row",
  },
});

export default CaloriesIngreSearchPage;
