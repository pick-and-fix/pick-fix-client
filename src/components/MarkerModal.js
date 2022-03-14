import React from "react";
import {
  Pressable,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  View,
} from "react-native";
import PropTypes from "prop-types";

const MarkerModalDetail = ({ onPressModal, modalVisible, clickedPick }) => {
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
  pickText: {
    marginBottom: 10,
    color: "#898989",
  },
  formText: {
    fontSize: 15,
    marginRight: 13,
    color: "#0a80ae",
  },
});

MarkerModalDetail.propTypes = {
  onPressModal: PropTypes.func.isRequired,
  modalVisible: PropTypes.bool.isRequired,
  clickedPick: PropTypes.object,
};

export default MarkerModalDetail;
