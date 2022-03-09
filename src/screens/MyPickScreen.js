import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  Modal,
  Pressable,
  Text,
} from "react-native";
import { useRecoilState, useRecoilValue } from "recoil";
import PropTypes from "prop-types";
import MapView, { Marker } from "react-native-maps";

import { getMyPicks } from "../../util/api/myPick";
import { userState } from "../states/userState";
import NewButton from "../components/Button";
import { pickState } from "../states/pickState";
import { useState } from "react/cjs/react.development";
import { ScrollView } from "react-native-gesture-handler";

export default function MyPickScreen({ navigation }) {
  const user = useRecoilValue(userState);
  const userId = user.userId;
  const [picks, setPicks] = useRecoilState(pickState);
  const [clickedPick, setClickedPick] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

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

  const handleNewButtonClick = (userId) => {
    navigation.navigate("NewMyPick", { userId: userId });
  };

  const handleMarkerClick = (pickId) => {
    Object.entries(picks).map(([id, pick]) => {
      if (pickId === id) {
        setClickedPick(pick);
        setModalVisible(true);
      }
    });
  };

  return (
    <>
      <View style={styles.container}>
        <Modal
          animationType="fade"
          visible={modalVisible}
          transparent={true}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Pressable
                style={styles.button}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.buttonTextStyle}>X</Text>
              </Pressable>
              <ScrollView>
                <Text style={styles.pickText}>
                  <Text style={styles.formText}>Name: </Text>
                  {clickedPick?.name}
                </Text>
                <Text style={styles.pickText}>
                  <Text style={styles.formText}>Address: </Text>
                  {clickedPick?.address}
                </Text>
                <Text style={styles.pickText}>
                  <Text style={styles.formText}>Rating: </Text>
                  {clickedPick?.rating}
                </Text>
                <Text style={styles.pickText}>
                  <Text style={styles.formText}>Type: </Text>
                  {clickedPick?.type}
                </Text>
                {clickedPick?.image ? (
                  <Image
                    source={{
                      uri: clickedPick?.image,
                    }}
                    style={{ width: 290, height: 200 }}
                  />
                ) : (
                  <Text> </Text>
                )}
              </ScrollView>
            </View>
          </View>
        </Modal>
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
                onPress={(ev) => handleMarkerClick(id)}
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
          onPress={() => handleNewButtonClick(userId)}
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width: 350,
    height: 350,
    margin: 20,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    width: 40,
    height: 40,
    marginLeft: 260,
    borderRadius: 100,
    padding: 10,
    elevation: 2,
    backgroundColor: "#d3edf7",
  },
  buttonTextStyle: {
    color: "#898989",
    fontWeight: "bold",
    textAlign: "center",
  },
  pickText: {
    marginBottom: 10,
    color: "#898989",
  },
  formText: {
    fontSize: 15,
    color: "#0a80ae",
  },
});

MyPickScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    reset: PropTypes.func,
  }).isRequired,
};
