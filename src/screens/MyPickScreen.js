import React, { useEffect } from "react";
import { StyleSheet, View, Dimensions, Image } from "react-native";
import { useRecoilState, useRecoilValue } from "recoil";
import PropTypes from "prop-types";
import MapView, { Marker } from "react-native-maps";

import { getMyPicks } from "../../util/api/myPick";
import { userState } from "../states/userState";
import NewButton from "../components/Button";
import { pickState } from "../states/pickState";

export default function MyPickScreen({ navigation }) {
  const user = useRecoilValue(userState);
  const userId = user.userId;
  const [picks, setPicks] = useRecoilState(pickState);

  useEffect(() => {
    const getMyPickApi = async () => {
      try {
        const myPicks = await getMyPicks(userId);

        setPicks(myPicks.data);
      } catch (err) {
        alert("error");
      }
    };

    getMyPickApi();
  }, []);

  const onNewButtonClick = (userId) => {
    navigation.navigate("NewMyPick", { userId: userId });
  };

  return (
    <>
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 37.570019624006946,
            longitude: 126.97613747407789,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          {Object.entries(picks).map(([id, pick]) => {
            const latitude = pick.location[0];
            const longitude = pick.location[1];
            let image;

            switch (pick.type) {
              case "meal":
                image = require("../../assets/meal.png");
                break;
              case "pup":
                image = require("../../assets/pup.png");
                break;
              case "cafe":
                image = require("../../assets/cafe.png");
                break;
              default:
                image = require("../../assets/pin.png");
            }

            return (
              <Marker
                key={id}
                coordinate={{ latitude: latitude, longitude: longitude }}
                title={pick.name}
              >
                <Image source={image} style={{ width: 30, height: 30 }} />
              </Marker>
            );
          })}
        </MapView>
      </View>
      <View style={styles.buttonContainer}>
        <NewButton
          width={90}
          height={40}
          title="NEW"
          size={20}
          onPress={() => onNewButtonClick(userId)}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  buttonContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 240,
    backgroundColor: "#fff",
  },
});

MyPickScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    reset: PropTypes.func,
  }).isRequired,
};
