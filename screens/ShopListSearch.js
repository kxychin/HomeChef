import React, { useState, useEffect } from "react";
import {
  FlatList,
  Text,
  TouchableWithoutFeedback,
  View,
  Image,
  SafeAreaView,
} from "react-native";
import SearchBtn from "../compenents/SearchBtn";
import { firebase } from "../config";

const ShopListSearchPage = ({ navigation: { goBack } }) => {
  const [ingreShop, setIngreShop] = useState([]);
  const ingreShopRef = firebase.firestore().collection("ingre");

  useEffect(() => {
    (async () => {
      ingreShopRef.onSnapshot((querySnapshot) => {
        const ingreShop = [];
        querySnapshot.forEach((doc) => {
          const { name } = doc.data();
          ingreShop.push({
            id: doc.id,
            name,
          });
        });
        setIngreShop(ingreShop);
      });
    })();
  }, []);

  const [filterData, setFilterData] = useState(ingreShop);
  const [search, setSearch] = useState("");
  const [masterData, setmasterData] = useState(ingreShop);

  const searchFilter = (text) => {
    if (text) {
      const newData = ingreShop.filter((item) => {
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

  const addIngre = ({ item }) => {
    firebase
      .firestore()
      .collection("shoppinglist")
      .add({
        name: item.name,
        qty: "1",
        size: "",
        note: "",
      })
      .catch((error) => console.log(error));
  };

  const ItemRender = ({ item }) => (
    <TouchableWithoutFeedback
      onPress={() => {
        addIngre({ item });
        goBack();
      }}
    >
      <Text style={{ fontSize: 20, paddingLeft: 20, paddingVertical: 10 }}>
        {item.name}
      </Text>
    </TouchableWithoutFeedback>
  );

  const ItemSeperator = () => {
    return (
      <View
        style={{
          backgroundColor: "grey",
          height: 2,
        }}
      />
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <SafeAreaView>
        <Text
          style={{
            fontSize: 30,
            textAlign: "center",
            padding: 20,
            fontWeight: "bold",
          }}
        >
          Shopping List
        </Text>
        <View style={{ marginTop: 10, padding: 20, flexDirection: "row" }}>
          <SearchBtn
            width={"75%"}
            image={require("../assets/addingre.png")}
            value={search}
            onChangeText={(text) => searchFilter(text)}
            placeholder="add an item"
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
          ItemSeparatorComponent={ItemSeperator}
        />
      </SafeAreaView>
    </View>
  );
};

export default ShopListSearchPage;
