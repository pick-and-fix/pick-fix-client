import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  Modal,
  Pressable,
  ScrollView,
  Alert,
} from "react-native";
import { useRecoilValue } from "recoil";
import MapView from "react-native-maps";
import { CommonActions } from "@react-navigation/routers";
import PropTypes from "prop-types";

import { getPicksApi, postVotePickApi } from "../../../util/api/vote";
import { getMyPicks } from "../../../util/api/myPick";
import VoteButton from "../../components/Button";
import { userState } from "../../states/userState";
import StyledMarker from "../../components/Marker";
import MESSAGE from "../../constants/message";
import SCREEN from "../../constants/screen";
import { styles } from "./styles";

function VoteScreen({ route, navigation }) {
  const planId = route.params.voteId;

  const user = useRecoilValue(userState);
  const userId = user.userId;

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
        alert(MESSAGE.ERROR);
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
      });

      if (response.result === MESSAGE.SUCCESS) {
        Alert.alert(MESSAGE.SUCCESS_ALERT_TITLE, MESSAGE.VOTE_SUCCESS_ALERT, [
          {
            text: MESSAGE.OK,
            onPress: () =>
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [
                    {
                      name: SCREEN.VOTE_LIST_SCREEN,
                    },
                  ],
                })
              ),
          },
        ]);
      }
    } catch (err) {
      alert(MESSAGE.ERROR);
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
      alert(MESSAGE.NOT_DUPLICATE_VOTE_ALERT);
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
          <StyledMarker
            picks={friendsPicks}
            onPressMarker={handleMarkerClick}
          />
          <StyledMarker picks={myPicks} onPressMarker={handleMarkerClick} />
        </MapView>
        <View style={styles.pickContainer}>
          <Text style={styles.pickContainerTitle}>MY PICK</Text>
          <Text style={styles.notification}>
            가고싶은 장소의 마커를 클릭해서 투표해주세요
          </Text>
          <View style={styles.pickNameContainer}>
            {vote &&
              vote.map((pick) => {
                return (
                  <Text key={pick.id} style={styles.pickName}>
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
