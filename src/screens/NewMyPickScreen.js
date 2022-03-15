import React, { useState } from "react";
import { StyleSheet, View, Dimensions, Text, Modal } from "react-native";
import { useRecoilValue } from "recoil";
import MapView, { Marker } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import DropDownPicker from "react-native-dropdown-picker";
import * as ImagePicker from "expo-image-picker";
import PropTypes from "prop-types";

import getEnvVars from "../../environment";
import { saveNewPick } from "../../util/api/myPick";
import { userState } from "../states/userState";
import { pickState } from "../states/pickState";
import StyledButton from "../components/Button";
import StyledMarker from "../components/Marker";
import MarkerModalDetail from "../components/MarkerModal";
import MESSAGE from "../constants/message";
import { CommonActions } from "@react-navigation/routers";
import SCREEN from "../constants/screen";

const { REACT_NATIVE_ANDROID_GOOGLE_API_KEY } = getEnvVars();

function NewMyPickScreen({ navigation }) {
  const user = useRecoilValue(userState);
  const userId = user.userId;
  const picks = useRecoilValue(pickState);

  const [restaurantName, setRestaurantName] = useState("");
  const [address, setAddress] = useState("");
  const [searchLatitude, setSearchLatitude] = useState("37.570019624006946");
  const [searchLongitude, setSearchLongitude] = useState("126.97613747407789");
  const [ratingOpen, setRatingOpen] = useState(false);
  const [typeOpen, setTypeOpen] = useState(false);
  const [ratingValue, setRatingValue] = useState(null);
  const [typeValue, setTypeValue] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [clickedPick, setClickedPick] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const handelSaveButtonClick = async () => {
    const newPick = {
      author: userId,
      name: restaurantName,
      address: address.split("대한민국 ")[1],
      rating: ratingValue,
      type: typeValue,
      image: "",
      location: [searchLatitude, searchLongitude],
    };

    try {
      const response = await saveNewPick({ userId, newPick });
      if (response.result === MESSAGE.SUCCESS) {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {
                name: SCREEN.MY_PICKS_SCREEN,
              },
            ],
          })
        );
      }
    } catch (err) {
      alert(MESSAGE.ERROR);
    }
  };

  const handleImageButtonClick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImageFile(result.uri);
    }
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
    <View style={styles.screenContainer}>
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
      <GooglePlacesAutocomplete
        placeholder="Search"
        fetchDetails={true}
        onPress={(data, details = null) => {
          setRestaurantName(data.structured_formatting.main_text);
          setAddress(data.structured_formatting.secondary_text);
          setSearchLatitude(details.geometry.location.lat);
          setSearchLongitude(details.geometry.location.lng);
        }}
        query={{
          key: REACT_NATIVE_ANDROID_GOOGLE_API_KEY,
          language: "ko",
        }}
        styles={{
          container: {
            flex: 0,
            position: "absolute",
            width: "100%",
            zIndex: 1,
          },
          textInput: {
            backgroundColor: "#edf3fb",
            color: "#000000",
          },
          listView: { backgroundColor: "#fff" },
        }}
        debounce={200}
      />
      <MapView
        style={styles.map}
        region={{
          latitude: Number(searchLatitude),
          longitude: Number(searchLongitude),
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <StyledMarker picks={picks} onPressMarker={handleMarkerClick} />
        <Marker
          coordinate={{
            latitude: Number(searchLatitude),
            longitude: Number(searchLongitude),
          }}
        />
      </MapView>
      <View style={styles.formContainer}>
        <Text style={styles.formText}>
          Name: <Text style={styles.searchText}>{restaurantName}</Text>
        </Text>
        <Text style={styles.formText}>
          Address:{" "}
          <Text style={styles.searchText}>{address.split("대한민국 ")[1]}</Text>
        </Text>
        <DropDownPicker
          open={ratingOpen}
          placeholder="Rating"
          value={ratingValue}
          items={[
            { label: "⭐️", value: "⭐️" },
            { label: "⭐️⭐️", value: "⭐️⭐️" },
            { label: "⭐️⭐️⭐️", value: "⭐️⭐️⭐️" },
            { label: "⭐️⭐️⭐️⭐️", value: "⭐️⭐️⭐️⭐️" },
            { label: "⭐️⭐️⭐️⭐️⭐️", value: "⭐️⭐️⭐️⭐️⭐️" },
          ]}
          setOpen={setRatingOpen}
          setValue={setRatingValue}
          zIndex={5000}
          zIndexInverse={1000}
          autoScroll={true}
          listMode="MODAL"
          modalTitle="Select Rating"
          modalProps={{
            animationType: "fade",
          }}
          style={{
            height: 30,
            marginTop: 10,
            borderColor: "#cdcecf",
          }}
        />
        <DropDownPicker
          open={typeOpen}
          placeholder="Type"
          value={typeValue}
          items={[
            { label: "meal", value: "meal" },
            { label: "pup", value: "pup" },
            { label: "cafe", value: "cafe" },
          ]}
          setOpen={setTypeOpen}
          setValue={setTypeValue}
          zIndex={5000}
          zIndexInverse={1000}
          autoScroll={true}
          listMode="MODAL"
          modalTitle="Restaurant Type"
          modalProps={{
            animationType: "fade",
          }}
          style={{
            height: 30,
            marginTop: 10,
            marginBottom: 7,
            borderColor: "#cdcecf",
          }}
        />
        <StyledButton
          width={100}
          height={13}
          title="IMAGE"
          size={20}
          onPress={handleImageButtonClick}
        />
        <StyledButton
          width={100}
          height={13}
          title="SAVE"
          size={20}
          onPress={handelSaveButtonClick}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    zIndex: -1,
  },
  map: {
    width: Dimensions.get("window").width,
    height: 300,
    zIndex: -1,
  },
  formContainer: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  formText: {
    marginTop: 10,
    marginBottom: 10,
    paddingBottom: 3,
    borderBottomWidth: 1,
    borderBottomColor: "#cdcecf",
    fontSize: 18,
    color: "#0a80ae",
  },
  searchText: {
    fontSize: 15,
    color: "#000000",
  },
});

NewMyPickScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    dispatch: PropTypes.func,
    reset: PropTypes.func,
  }).isRequired,
};

export default NewMyPickScreen;
