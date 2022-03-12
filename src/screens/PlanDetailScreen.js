import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Modal,
  Pressable,
  Image,
  Dimensions,
} from "react-native";
import { planState } from "../states/planState";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { ScrollView } from "react-native-gesture-handler";
import MapView, { Marker } from "react-native-maps";
import PropTypes from "prop-types";

import StyledButton from "../components/Button";

export default function PlanDetailScreen({ route }) {
  const planId = route.params.planId;
  const planList = useRecoilValue(planState);
  const [modalVisible, setModalVisible] = useState(false);
  const [resultModalVisible, setResultModalVisible] = useState(false);
  const [clickedPick, setClickedPick] = useState(null);
  const [plan, setPlan] = useState(null);

  useEffect(() => {
    if (planList) {
      Object.entries(planList).map(([id, plan]) => {
        if (id === planId) {
          setPlan(plan);
        }
      });
    }
  }, []);
  const date = new Date(plan?.date);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const time = date.toLocaleTimeString().substring(0, 5);

  const handleMarkerClick = (pickId) => {
    Object.entries(plan?.picks).map(([id, pick]) => {
      if (pickId === id) {
        setClickedPick(pick);
        setModalVisible(true);
      }
    });
  };

  const handleResultButtonClick = () => {
    setResultModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => {
          setResultModalVisible(!resultModalVisible);
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
              {plan &&
                plan.voting.map((votes) => {
                  const places = votes.vote;
                  return (
                    <View key={votes.id} style={{ margin: 10 }}>
                      <Text>
                        ✅
                        {places.map((place) => {
                          return (
                            <Text
                              key={place.id}
                              style={{ fontSize: 20, paddingRight: 20 }}
                            >
                              {place.info.name}
                            </Text>
                          );
                        })}
                      </Text>
                    </View>
                  );
                })}
            </ScrollView>
          </View>
        </View>
      </Modal>
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
          latitude: plan?.placeLocation[0],
          longitude: plan?.placeLocation[1],
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {plan &&
          Object.entries(plan?.picks).map(([id, pick]) => {
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
        <Marker
          coordinate={{
            latitude: plan?.placeLocation[0],
            longitude: plan?.placeLocation[1],
          }}
        />
      </MapView>
      <View style={styles.planDetailContainer}>
        <View style={styles.inlineContainer}>
          <View style={styles.dot} />
          <Text style={styles.formText}>Date</Text>
          <Text>{`${year}. ${month}. ${day}. ${time}`}</Text>
        </View>
        <View style={styles.inlineContainer}>
          <View style={styles.dot} />
          <Text style={styles.formText}>Place</Text>
          <Text style={styles.formText}>{plan?.place}</Text>
        </View>
        <View style={styles.inlineContainer}>
          <View style={styles.dot} />
          <Text style={styles.formText}>With</Text>
          <View style={{ flexDirection: "row" }}>
            {plan?.friends.map((friend) => (
              <Text key={friend._id} style={{ marginRight: 3 }}>
                {friend.name}
              </Text>
            ))}
          </View>
        </View>
        <View style={styles.inlineContainer}>
          <View style={styles.dot} />
          <Text style={styles.formText}>Voting</Text>
          <StyledButton
            width={20}
            height={50}
            title="RESULT"
            size={13}
            onPress={handleResultButtonClick}
          />
        </View>
        <View style={styles.inlineContainer}>
          <View style={styles.dot} />
          <Text style={styles.formText}>Pick</Text>
          {plan &&
            Object.entries(plan.picks).map(([id, pick]) => {
              return <Text key={id}>📍 {pick.name} </Text>;
            })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },

  map: {
    width: Dimensions.get("window").width,
    height: 300,
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
    marginRight: 13,
    color: "#0a80ae",
  },
  planDetailContainer: {
    flex: 1,
    marginTop: "5%",
    width: "90%",
  },
  inlineContainer: {
    height: "15%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: "1%",
  },
  dot: {
    width: 10,
    height: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 100,
    backgroundColor: "#90b189",
  },
});

PlanDetailScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      planId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
