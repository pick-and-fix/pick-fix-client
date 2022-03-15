import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Modal, Alert } from "react-native";
import { CommonActions } from "@react-navigation/routers";
import { useRecoilValue } from "recoil";
import PropTypes from "prop-types";

import { getVoteResultApi, saveFinalPickApi } from "../../util/api/vote";
import { userState } from "../states/userState";
import { voteState } from "../states/voteState";
import StyledButton from "../components/Button";
import MESSAGE from "../constants/message";
import SCREEN from "../constants/screen";
import ResultModalDetail from "../components/ResultModal";

function VoteResultScreen({ route, navigation }) {
  const planId = route.params.voteId;
  const user = useRecoilValue(userState);
  const userId = user.userId;
  const allPlan = useRecoilValue(voteState);

  const [currentPlan, setCurrentPlan] = useState(null);
  const [vote, setVote] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const places = [];

  useEffect(() => {
    Object.entries(allPlan).map(([id, plan]) => {
      if (id === planId) {
        setCurrentPlan(plan);
      }
    });

    const getVoteResult = async () => {
      try {
        const voteResult = await getVoteResultApi({ userId, planId });

        if (voteResult.data !== MESSAGE.ONGOING_STATUS) {
          setVote(voteResult.data);
        }
      } catch (err) {
        alert(MESSAGE.ERROR);
      }
    };

    getVoteResult();
  }, []);

  if (vote) {
    vote.map((votes) => {
      votes.vote.map((pick) => {
        places.push(pick.info.name);
      });
    });
  }

  const duplicateCheck = places.reduce((acc, cur) => {
    acc[cur] = (acc[cur] || 0) + 1;
    return acc;
  }, {});

  const sortArray = [];

  for (let name in duplicateCheck) {
    sortArray.push([name, duplicateCheck[name]]);
  }

  sortArray.sort((a, b) => {
    return b[1] - a[1];
  });

  const date = new Date(currentPlan?.date);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const time = date.toLocaleTimeString().substring(0, 5);

  const handleEditButtonClick = () => {
    setModalVisible(true);
  };

  const handleFixButtonClick = async () => {
    const finalPicks = [];

    sortArray.map((name, index) => {
      if (index === currentPlan?.pickNumber) {
        return;
      }

      return finalPicks.push(name[0]);
    });

    try {
      const response = await saveFinalPickApi({ userId, planId, finalPicks });

      if (response.result === MESSAGE.OK) {
        Alert.alert(MESSAGE.SUCCESS_ALERT_TITLE, MESSAGE.FIX_SUCCESS_ALERT, [
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

  const handleResultButtonClick = () => {
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <ResultModalDetail
          onPressModal={setModalVisible}
          modalVisible={modalVisible}
          vote={vote}
        />
      </Modal>
      <View style={styles.planContainer}>
        <View style={styles.inlineContainer}>
          <View style={styles.dot} />
          <Text style={styles.formText}>Date</Text>
          <Text>{`${year}. ${month}. ${day}. ${time}`}</Text>
        </View>
        <View style={styles.inlineContainer}>
          <View style={styles.dot} />
          <Text style={styles.formText}>Place</Text>
          <Text>{currentPlan?.place}</Text>
        </View>
        <View style={styles.inlineContainer}>
          <View style={styles.dot} />
          <Text style={styles.formText}>With</Text>
          <View style={styles.friendContainer}>
            {currentPlan?.friends.map((friend) => (
              <Text key={friend._id} style={{ marginRight: 3 }}>
                {friend.name}
              </Text>
            ))}
          </View>
        </View>
        <View style={styles.inlineContainer}>
          <View style={styles.dot} />
          <Text style={styles.formText}>Voting</Text>
          {vote ? (
            <StyledButton
              width={20}
              height={40}
              title="RESULT"
              size={13}
              onPress={handleResultButtonClick}
            />
          ) : (
            <Text>투표가 진행중입니다</Text>
          )}
        </View>
        <View style={styles.inlineContainer}>
          <View style={styles.dot} />
          <Text style={styles.formText}>Pick</Text>
          {vote ? (
            <View style={{ width: "75%" }}>
              {sortArray.map((name, index) => {
                if (index === currentPlan?.pickNumber) {
                  return;
                }

                return <Text key={index}>📍 {name[0]} </Text>;
              })}
            </View>
          ) : (
            <Text>투표가 진행중입니다</Text>
          )}
        </View>
      </View>
      {currentPlan?.creator === userId && vote && (
        <View style={styles.buttonContainer}>
          <StyledButton
            width={80}
            height={25}
            title="EDIT"
            size={20}
            onPress={handleEditButtonClick}
          />
          <StyledButton
            width={80}
            height={25}
            title="FIX"
            size={20}
            onPress={handleFixButtonClick}
          />
        </View>
      )}
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
  planContainer: {
    width: "70%",
    height: "60%",
    marginTop: "10%",
  },
  inlineContainer: {
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    height: "15%",
    marginBottom: "1%",
  },
  friendContainer: {
    flexDirection: "row",
  },
  dot: {
    width: 10,
    height: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 100,
    backgroundColor: "#f5ba6a",
  },
  formText: {
    marginRight: "4%",
    color: "#0A80AE",
    fontSize: 17,
  },
  buttonContainer: {
    width: "100%",
    height: "20%",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});

VoteResultScreen.propTypes = {
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

export default VoteResultScreen;
