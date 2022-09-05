import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  ScrollView,
  FlatList,
  Alert,
  Modal,
} from "react-native";
import { Rating } from "react-native-ratings";
import CheckedBox from "../compenents/CheckBox";

const RecipePage = ({ route, navigation: { goBack } }) => {
  const dataSource = route.params.paramKey;
  const [heartColor, setHeartColor] = useState("white");
  const [modalVisible, setModalVisible] = useState(false);
  const [count, setCount] = useState(1);

  const ratingCompleted = (rating) => {
    Alert.alert("Thank you for rating");
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <SafeAreaView style={{ marginBottom: 100 }}>
        <ScrollView>
          <View>
            <Image
              source={{ uri: dataSource.imgUrl }}
              style={{
                width: "100%",
                height: 150,
              }}
            />
            <View
              style={{
                backgroundColor: "black",
                width: "100%",
                height: 150,
                position: "absolute",
                opacity: 0.5,
              }}
            />
            <TouchableWithoutFeedback
              onPress={() => {
                if (heartColor == "white") {
                  setHeartColor("red");
                  Alert.alert("Added to collection");
                } else {
                  setHeartColor("white");
                  Alert.alert("Removed to collection");
                }
              }}
            >
              <Image
                source={require("../assets/liked.png")}
                style={{
                  width: 30,
                  height: 30,
                  position: "absolute",
                  tintColor: heartColor,
                  right: 10,
                  bottom: 10,
                }}
              />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => goBack()}>
              <Image
                source={require("../assets/back.png")}
                style={{
                  width: 30,
                  height: 30,
                  position: "absolute",
                  tintColor: "white",
                  top: 10,
                  left: 10,
                }}
              />
            </TouchableWithoutFeedback>
          </View>
          <View style={{ padding: 20 }}>
            <View>
              <Text
                style={{
                  fontSize: 20,

                  fontWeight: "bold",
                }}
              >
                {dataSource.name}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 10,
              }}
            >
              <View
                style={{
                  paddingHorizontal: 20,
                  paddingVertical: 5,
                  borderRightColor: "grey",
                  borderRightWidth: 2,
                }}
              >
                <Text>{dataSource.ingre.length} Ingredients</Text>
              </View>
              <View
                style={{
                  paddingHorizontal: 20,
                  paddingVertical: 5,
                  borderRightColor: "grey",
                  borderRightWidth: 2,
                }}
              >
                <Text>{dataSource.calories} Calories</Text>
              </View>
              <View
                style={{
                  paddingHorizontal: 20,
                  paddingVertical: 5,
                }}
              >
                <Text> {dataSource.hr} Hours</Text>
              </View>
            </View>

            <View style={{ marginTop: 30 }}>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    fontSize: 17,
                    paddingBottom: 10,
                    fontWeight: "bold",
                  }}
                >
                  Ingredients
                </Text>
                <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
                  <View
                    style={{
                      shadowColor: "black",
                      shadowOffset: { width: 0, height: 2 },
                      shadowRadius: 2,
                      shadowOpacity: 0.7,
                      backgroundColor: "white",
                      right: 5,
                      position: "absolute",
                      backgroundColor: "#a4aa83",
                    }}
                  >
                    <Text
                      style={{
                        textTransform: "uppercase",
                        fontSize: 10,
                        fontWeight: "bold",
                        padding: 5,
                        color: "white",
                      }}
                    >
                      Add to shopping list
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>

              <Modal
                //animationType={"slide"}
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  console.log("Modal has been closed.");
                }}
              >
                <View
                  style={{
                    flex: 1,
                    backgroundColor: "white",
                    padding: 20,
                    paddingTop: 100,
                  }}
                >
                  <TouchableWithoutFeedback
                    onPress={() => {
                      setModalVisible(!modalVisible);
                    }}
                  >
                    <View
                      style={{
                        position: "absolute",
                        right: 30,
                        top: "10%",
                      }}
                    >
                      <Image
                        source={require("../assets/close.png")}
                        style={{
                          width: 20,
                          height: 20,
                        }}
                      />
                    </View>
                  </TouchableWithoutFeedback>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                      textAlign: "center",
                      marginVertical: 20,
                    }}
                  >
                    Add Ingredients to shopping list
                  </Text>
                  {dataSource.ingre.map((item) => {
                    return (
                      <View
                        style={{ flexDirection: "row", paddingVertical: 10 }}
                      >
                        <CheckedBox />
                        <Text
                          style={{
                            paddingBottom: 10,
                            paddingLeft: 10,
                          }}
                        >
                          {item}
                        </Text>
                      </View>
                    );
                  })}
                  <TouchableWithoutFeedback
                    onPress={() => {
                      Alert.alert("Item are added into shopping list");
                      setModalVisible(false);
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: "#4c411a",
                        paddingHorizontal: 20,
                        paddingVertical: 10,
                        //width: 100,
                        top: "50%",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: "bold",
                          textAlign: "center",
                          textTransform: "uppercase",
                          color: "white",
                        }}
                      >
                        Add
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </Modal>

              {dataSource.ingre.map((item) => {
                return (
                  <View style={{ flexDirection: "row", paddingVertical: 10 }}>
                    <CheckedBox />
                    <Text
                      style={{
                        paddingBottom: 10,
                        paddingLeft: 10,
                      }}
                    >
                      {item}
                    </Text>
                  </View>
                );
              })}

              {/* Counter */}
              <View
                style={{ marginHorizontal: 20, top: 10, alignItems: "center" }}
              >
                <View style={{ flexDirection: "row" }}>
                  <TouchableWithoutFeedback
                    disabled={count == 1}
                    onPress={() => setCount(count - 1)}
                  >
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
                    {count} Servings
                  </Text>

                  <TouchableWithoutFeedback onPress={() => setCount(count + 1)}>
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
                      <Text style={{ textAlign: "center", fontSize: 14 }}>
                        +
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </View>
            </View>

            <View style={{ marginTop: 20 }}>
              <Text
                style={{
                  fontSize: 17,
                  paddingBottom: 10,
                  fontWeight: "bold",
                }}
              >
                Nutritions
              </Text>

              <FlatList
                data={dataSource.nutritions}
                horizontal
                //   keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <View
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: 100 / 2,
                      backgroundColor: "#f0faf6",
                      justifyContent: "center",
                      alignItems: "center",
                      shadowColor: "black",
                      shadowOffset: { width: 2, height: 1 },
                      shadowRadius: 2,
                      shadowOpacity: 0.7,
                      margin: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "600",
                      }}
                    >
                      {item.split(" ")[1]}
                    </Text>
                    <Text>{item.split(" ")[0]}</Text>
                  </View>
                )}
              />
            </View>

            <View style={{ marginTop: 20 }}>
              <Text
                style={{
                  fontSize: 17,
                  paddingBottom: 10,
                  fontWeight: "bold",
                }}
              >
                Steps
              </Text>
              {dataSource.steps.map((item) => {
                return (
                  <Text
                    style={{
                      paddingBottom: 10,
                      paddingHorizontal: 10,
                    }}
                  >
                    {item}
                  </Text>
                );
              })}
              <TouchableWithoutFeedback>
                <View
                  style={{
                    marginTop: 10,
                    paddingVertical: 10,
                    paddingHorizontal: 30,
                    borderRadius: 10,
                    backgroundColor: "white",
                    alignSelf: "center",
                    shadowColor: "black",
                    shadowOffset: { width: 2, height: 1 },
                    shadowRadius: 2,
                    shadowOpacity: 0.7,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",
                      textTransform: "uppercase",
                    }}
                  >
                    Start
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </View>

            <View style={{ marginTop: 20, marginBottom: 30 }}>
              <Text
                style={{
                  fontSize: 17,
                  paddingBottom: 10,
                  fontWeight: "bold",
                }}
              >
                Rate for us
              </Text>
              <Rating onFinishRating={ratingCompleted} startingValue={0} />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default RecipePage;
