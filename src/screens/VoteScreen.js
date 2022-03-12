import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  Modal,
  Pressable,
  ScrollView,
  Alert,
} from "react-native";
import { useRecoilValue } from "recoil";
import MapView, { Marker } from "react-native-maps";
import { CommonActions } from "@react-navigation/routers";
import PropTypes from "prop-types";

import { getPicksApi, postVotePickApi } from "../../util/api/vote";
import { getMyPicks } from "../../util/api/myPick";
import VoteButton from "../components/Button";
import { userState } from "../states/userState";

function VoteScreen({ route, navigation }) {
  const user = useRecoilValue(userState);
  const userId = user.userId;
  const userName = user.name;
  const planId = route.params.voteId;
  const [clickedPick, setClickedPick] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [friendsPicks, setFriendsPicks] = useState(null);
  const [myPicks, setMyPicks] = useState(null);
  const [place, setPlace] = useState(null);
  const [vote, setVote] = useState([]);

  useEffect(() => {
    const getPicks = async () => {
      try {
        const picks = await getPicksApi({ userId, planId });
        const myPicks = await getMyPicks(userId);

        setFriendsPicks(picks.data.friendsPicks);
        setMyPicks(myPicks.data);
        setPlace(picks.data.place);
      } catch (err) {
        alert("error");
      }
    };

    getPicks();
  }, []);

  const handleVoteButtonClick = async () => {
    try {
      const response = await postVotePickApi({
        userId,
        planId,
        vote,
        userName,
      });

      if (response.result === "success") {
        Alert.alert("Success👍🏻", "투표가 완료되었습니다.", [
          {
            text: "OK",
            onPress: () =>
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [
                    {
                      name: "VoteList",
                    },
                  ],
                })
              ),
          },
        ]);
      }
    } catch (err) {
      alert("error");
    }
  };

  const handleMarkerClick = (pickId) => {
    Object.entries(friendsPicks).map(([id, pick]) => {
      if (pickId === id) {
        setClickedPick({ id: id, pick: pick });
        setModalVisible(true);
      }
    });

    Object.entries(myPicks).map(([id, pick]) => {
      if (pickId === id) {
        setClickedPick({ id: id, pick: pick });
        setModalVisible(true);
      }
    });
  };

  const handlePickButtonClick = () => {
    const isNotDuplicate = vote.every((pick) => {
      return pick.id !== clickedPick.id;
    });

    if (isNotDuplicate) {
      setVote([...vote, { id: clickedPick.id, info: clickedPick.pick }]);
      setModalVisible(false);
    }

    if (!isNotDuplicate) {
      alert("중복으로 투표할 수 없습니다❗️");
    }
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
              <ScrollView style={{ width: "90%", height: "90%" }}>
                <Text style={styles.pickText}>
                  <Text style={styles.formText}>Name: </Text>
                  {clickedPick?.pick.name}
                </Text>
                <Text style={styles.pickText}>
                  <Text style={styles.formText}>Address: </Text>
                  {clickedPick?.pick.address}
                </Text>
                <Text style={styles.pickText}>
                  <Text style={styles.formText}>Rating: </Text>
                  {clickedPick?.pick.rating}
                </Text>
                <Text style={styles.pickText}>
                  <Text style={styles.formText}>Type: </Text>
                  {clickedPick?.pick.type}
                </Text>
                {clickedPick?.pick.image ? (
                  <Image
                    source={{
                      uri: clickedPick?.pick.image,
                    }}
                    style={{ width: 290, height: 200 }}
                  />
                ) : (
                  <Text> </Text>
                )}
                <View style={styles.modalButtonContainer}>
                  <VoteButton
                    width={80}
                    height={50}
                    title="Pick"
                    size={15}
                    onPress={(ev) => handlePickButtonClick()}
                  />
                </View>
              </ScrollView>
            </View>
          </View>
        </Modal>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: place?.placeLocation[0],
            longitude: place?.placeLocation[1],
            latitudeDelta: 0.02,
            longitudeDelta: 0.01,
          }}
        >
          {friendsPicks &&
            Object.entries(friendsPicks).map(([id, pick]) => {
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
          {myPicks &&
            Object.entries(myPicks).map(([id, pick]) => {
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
        <View style={styles.pickContainer}>
          <Text style={{ marginTop: 10, fontSize: 30, color: "#0a80ae" }}>
            MY PICK
          </Text>
          <Text style={{ color: "#CFCFCF" }}>
            가고싶은 장소의 마커를 클릭해서 투표해주세요
          </Text>
          <View style={{ marginTop: "3%" }}>
            {vote &&
              vote.map((pick) => {
                return (
                  <Text
                    key={pick.id}
                    style={{ fontSize: 15, marginBottom: "1%" }}
                  >
                    ✅ {pick.info.name}
                  </Text>
                );
              })}
          </View>
        </View>
        <VoteButton
          width={86}
          height={8}
          title="VOTE"
          size={20}
          onPress={() => handleVoteButtonClick()}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 16,
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
  modalButtonContainer: {
    flex: 1,
    width: "100%",
    height: 70,
    alignItems: "center",
    marginTop: "3%",
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
  pickContainer: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    backgroundColor: "#fff",
  },
});

VoteScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      voteId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    dispatch: PropTypes.func,
    reset: PropTypes.func,
  }).isRequired,
};

export default VoteScreen;
