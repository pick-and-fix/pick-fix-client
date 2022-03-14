import React from "react";
import { Text, View, Pressable, StyleSheet } from "react-native";
import PropTypes from "prop-types";

const ResultModalDetail = ({ onPressModal, modalVisible, plan }) => {
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
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>VOTE RESULT</Text>
            {plan &&
              plan.voting.map((votes) => {
                const places = votes.vote;

                return (
                  <View key={votes.id} style={styles.voteResultContainer}>
                    <Text>
                      ✅
                      {places.map((place) => {
                        return (
                          <Text key={place.id} style={styles.voteResult}>
                            📍 {place.info.name}
                          </Text>
                        );
                      })}
                    </Text>
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
  modalContent: {
    marginTop: "7%",
  },
  modalTitle: {
    marginBottom: "5%",
    textAlign: "center",
    fontSize: 23,
    color: "#0a80ae",
  },
  voteResultContainer: {
    margin: 10,
  },
  voteResult: {
    fontSize: 16,
    paddingRight: 20,
  },
});

ResultModalDetail.propTypes = {
  onPressModal: PropTypes.func.isRequired,
  modalVisible: PropTypes.bool.isRequired,
  plan: PropTypes.object,
};

export default ResultModalDetail;
