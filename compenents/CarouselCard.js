import React, { useEffect, useState } from "react";
import { View } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from "./CarouselCardItem";

import { firebase } from "../config";

const CarouselCards = () => {
  const data = [
    {
      id: 1,
      name: "Hello",
      imgUrl: require("../assets/dish.jpg"),
    },
    {
      id: 2,
      name: "Hello",
      imgUrl: require("../assets/dish.jpg"),
    },
    {
      id: 3,
      name: "Hello",
      imgUrl: require("../assets/dish.jpg"),
    },
  ];

  const [carouselData, setCarouselData] = useState([]);
  const popularRef = firebase.firestore().collection("popular");

  useEffect(() => {
    (async () => {
      popularRef.onSnapshot((querySnapshot) => {
        const carouselData = [];
        querySnapshot.forEach((doc) => {
          const { name, imgUrl } = doc.data();
          carouselData.push({
            id: doc.id,
            name,
            imgUrl,
          });
        });
        setCarouselData(carouselData);
      });
    })();
  }, []);

  // const [carousel, setCarousel] = useState([]);
  // const carouselRef = firebase.firestore().collection("popular");

  // useEffect(() => {
  //   (async () => {
  //     carouselRef.onSnapshot((querySnapshot) => {
  //       const carousel = [];
  //       querySnapshot.forEach((doc) => {
  //         const { name, imgUrl } = doc.data();
  //         carousel.push({
  //           id: doc.id,
  //           name,
  //           imgUrl,
  //         });
  //       });
  //       setCarousel(carousel);
  //     });
  //   })();
  // }, []);
  const [index, setIndex] = React.useState(0);
  const isCarousel = React.useRef(null);

  return (
    <View>
      <Carousel
        layout="tinder"
        layoutCardOffset={9}
        ref={isCarousel}
        data={carouselData}
        renderItem={CarouselCardItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        onSnapToItem={(index) => setIndex(index)}
        useScrollView={true}
      />
      <Pagination
        dotsLength={data.length}
        activeDotIndex={index}
        carouselRef={isCarousel}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 0,
          backgroundColor: "rgba(0, 0, 0, 0.92)",
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        tappableDots={true}
      />
    </View>
  );
};

export default CarouselCards;
