import React from "react";
import { Text, View, Pressable, StyleSheet } from "react-native";
import PropTypes from "prop-types";

const ResultModalDetail = ({ onPressModal, modalVisible, vote }) => {
  return (
    <>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Pressable
            style={styles.button}
            onPress={() => onPressModal(!modalVisible)}
          >
            <Text style={styles.buttonTextStyle}>X</Text>
          </Pressable>
          <Text style={styles.modalTitle}>VOTE RESULT</Text>
          <View style={styles.modalContent}>
            {vote &&
              vote.map((votes) => {
                const places = votes.vote;

                return (
                  <View key={votes.id} style={styles.voteResultContainer}>
                    <View style={styles.dot} />
                    <View>
                      {places.map((place) => {
                        return (
                          <Text key={place.id} style={styles.voteResult}>
                            📍 {place.info.name}
                          </Text>
                        );
                      })}
                    </View>
                  </View>
                );
              })}
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    alignItems: "center",
    width: 350,
    height: 350,
    margin: 20,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 15,
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
    textAlign: "center",
    color: "#898989",
    fontWeight: "bold",
  },
  modalContent: {
    justifyContent: "center",
    height: "65%",
    marginTop: "3%",
  },
  modalTitle: {
    textAlign: "center",
    marginBottom: "3%",
    fontSize: 23,
    color: "#0a80ae",
  },
  voteResultContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
  },
  voteResult: {
    paddingRight: 20,
    fontSize: 16,
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

ResultModalDetail.propTypes = {
  onPressModal: PropTypes.func.isRequired,
  modalVisible: PropTypes.bool.isRequired,
  vote: PropTypes.array,
};

export default ResultModalDetail;
