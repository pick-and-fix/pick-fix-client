import React, { useEffect } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { useRecoilState, useRecoilValue } from "recoil";
import PropTypes from "prop-types";

import { getVoteListApi } from "../../util/api/vote";
import { userState } from "../states/userState";
import { voteState } from "../states/voteState";
import VoteList from "../components/List";

export default function VoteListScreen({ navigation }) {
  const user = useRecoilValue(userState);
  const [votes, setVotes] = useRecoilState(voteState);

  useEffect(() => {
    const getVoteList = async () => {
      try {
        const voteList = await getVoteListApi(user.userId);
        setVotes(voteList.data);
      } catch (err) {
        alert("error");
      }
    };

    getVoteList();
  }, []);

  const navigateVotePage = (voteId) => {
    Object.entries(votes).map(([id, plan]) => {
      if (voteId === id) {
        if (!plan.voting.length) {
          navigation.navigate("Vote", { voteId: voteId });

          return;
        }

        const isNotVotedUser = plan.voting.every((votedPick) => {
          return votedPick.id !== user.userId;
        });

        if (isNotVotedUser) {
          navigation.navigate("Vote", { voteId: voteId });

          return;
        }

        if (!isNotVotedUser) {
          navigation.navigate("VoteResult", { voteId: voteId });

          return;
        }
      }
    });
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Vote List</Text>
        <ScrollView>
          <VoteList
            plans={votes}
            onClickPlan={navigateVotePage}
            dotColor="#f5ba6a"
          />
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    flex: 1,
    color: "#0a80ae",
    fontSize: 45,
  },
});

VoteListScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
