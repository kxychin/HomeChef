import React from "react";
import {
  Text,
  TextInput,
  View,
  Button,
  TouchableWithoutFeedback,
  SafeAreaView,
} from "react-native";

const FeedbackPage = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#d4a373",
      }}
    >
      <SafeAreaView>
        <Text
          style={{
            position: "absolute",
            fontSize: 20,
            alignSelf: "center",
            top: 70,
            fontWeight: "bold",
            color: "white",
            textShadowColor: "grey",
            textShadowOffset: { width: 0, height: 2 },
            textShadowRadius: 5,
            lineHeight: 30,
          }}
        >
          Any feedback or suggestions will be appreciated. Thank you!
        </Text>
        <View
          style={{
            backgroundColor: "white",
            height: "100%",
            top: "15%",
            borderTopLeftRadius: 70,
            borderTopRightRadius: 70,
            padding: "10%",
            flexDirection: "column",
          }}
        >
          <View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                top: 10,
                paddingBottom: "10%",
              }}
            >
              FEEDBACK FORM
            </Text>
          </View>

          <View style={{ marginVertical: 20 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: "#c5c5c5",
                paddingBottom: 10,
              }}
            >
              NAME
            </Text>
            <TextInput
              style={{
                height: 20,
                borderBottomWidth: 4,
                borderColor: "#ececec",
              }}
            />
          </View>

          <View style={{ marginVertical: 20 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: "#c5c5c5",
              }}
            >
              EMAIL
            </Text>
            <TextInput
              style={{
                borderBottomWidth: 4,
                borderColor: "#ececec",
              }}
            />
          </View>

          <View style={{ marginVertical: 20 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: "#c5c5c5",
              }}
            >
              MESSAGE
            </Text>
            <TextInput
              style={{
                height: 150,
                backgroundColor: "#ececec",
              }}
            />
          </View>
          <TouchableWithoutFeedback>
            <View
              style={{
                paddingVertical: 10,
                paddingHorizontal: 20,
                alignSelf: "center",
                backgroundColor: "#faedcd",
                borderRadius: 5,
                shadowColor: "#d4a373",
                shadowOpacity: 0.6,
                shadowOffset: { width: 1, height: 2 },
              }}
            >
              <Text
                style={{
                  textTransform: "uppercase",
                  fontSize: 18,
                  fontWeight: "700",
                }}
              >
                Submit
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default FeedbackPage;
