import React, { useEffect, useState } from "react";
import { StyleSheet, View, Dimensions, Modal } from "react-native";
import { useRecoilState, useRecoilValue } from "recoil";
import MapView from "react-native-maps";
import PropTypes from "prop-types";

import { getMyPicks } from "../../util/api/myPick";
import { userState } from "../states/userState";
import { pickState } from "../states/pickState";
import NewButton from "../components/Button";
import MarkerModalDetail from "../components/MarkerModal";
import MESSAGE from "../constants/message";
import StyledMarker from "../components/Marker";
import SCREEN from "../constants/screen";

function MyPickScreen({ navigation }) {
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
        alert(MESSAGE.ERROR);
      }
    };

    getMyPickApi();
  }, []);

  const handleNewButtonClick = (userId) => {
    navigation.navigate(SCREEN.NEW_MY_PICK_SCREEN, { userId: userId });
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
          <MarkerModalDetail
            onPressModal={setModalVisible}
            modalVisible={modalVisible}
            clickedPick={clickedPick}
          />
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
          <StyledMarker picks={picks} onPressMarker={handleMarkerClick} />
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
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  buttonContainer: {
    alignItems: "center",
    height: "18%",
    justifyContent: "center",
    marginTop: "48%",
    backgroundColor: "#fff",
  },
});

MyPickScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    reset: PropTypes.func,
  }).isRequired,
};

export default MyPickScreen;
