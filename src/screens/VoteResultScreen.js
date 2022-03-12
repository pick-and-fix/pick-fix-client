import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Modal, Pressable, Alert } from "react-native";
import { CommonActions } from "@react-navigation/routers";
import { ScrollView } from "react-native-gesture-handler";
import { useRecoilValue } from "recoil";
import PropTypes from "prop-types";

import { getVoteResultApi, saveFinalPickApi } from "../../util/api/vote";
import { userState } from "../states/userState";
import { voteState } from "../states/voteState";
import StyledButton from "../components/Button";

function VoteResultScreen({ route, navigation }) {
  const user = useRecoilValue(userState);
  const userId = user.userId;
  const allPlan = useRecoilValue(voteState);
  const planId = route.params.voteId;

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

        if (voteResult.data !== "ongoing") {
          setVote(voteResult.data);
        }
      } catch (err) {
        alert("error");
      }
    };

    getVoteResult();
  }, []);

  if (vote) {
    vote.map((vote) => {
      vote.vote.map((pick) => {
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

      if (response.result === "success") {
        Alert.alert("Success👍🏻", "Fix된 약속을 Plan List에서 확인하세요!", [
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
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable
              style={styles.button}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.buttonTextStyle}>X</Text>
            </Pressable>
            <ScrollView>
              {vote &&
                vote.map((votes) => {
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
            <Text>
              {sortArray.map((name, index) => {
                if (index === currentPlan?.pickNumber) {
                  return;
                }

                return <Text key={index}>{name[0]} </Text>;
              })}
            </Text>
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
    height: "15%",
    flexDirection: "row",
    alignItems: "center",
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
