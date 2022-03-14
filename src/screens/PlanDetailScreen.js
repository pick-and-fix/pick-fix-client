import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Modal, Dimensions } from "react-native";
import { useRecoilValue } from "recoil";
import MapView, { Marker } from "react-native-maps";
import PropTypes from "prop-types";

import { planState } from "../states/planState";
import StyledButton from "../components/Button";
import Loading from "../components/Loading";
import ResultModalDetail from "../components/ResultModal";
import MarkerModalDetail from "../components/MarkerModal";
import StyledMarker from "../components/Marker";

function PlanDetailScreen({ route }) {
  const planId = route.params.planId;

  const planList = useRecoilValue(planState);

  const [modalVisible, setModalVisible] = useState(false);
  const [resultModalVisible, setResultModalVisible] = useState(false);
  const [clickedPick, setClickedPick] = useState(null);
  const [plan, setPlan] = useState(null);
  const picks = plan?.picks;

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
    <React.Suspense fallback={<Loading />}>
      <View style={styles.container}>
        <Modal
          animationType="fade"
          visible={resultModalVisible}
          transparent={true}
          onRequestClose={() => {
            setResultModalVisible(!resultModalVisible);
          }}
        >
          <ResultModalDetail
            onPressModal={setResultModalVisible}
            modalVisible={resultModalVisible}
            plan={plan}
          />
        </Modal>
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
            latitude: plan?.placeLocation[0],
            longitude: plan?.placeLocation[1],
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          <StyledMarker picks={picks} onPressMarker={handleMarkerClick} />
          <Marker
            title={plan?.place}
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
            <Text>{plan?.place}</Text>
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
    </React.Suspense>
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

export default PlanDetailScreen;
