import React, { useState } from "react";
import { StyleSheet, View, Dimensions, Image, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useRecoilValue } from "recoil";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import DropDownPicker from "react-native-dropdown-picker";
import PropTypes from "prop-types";

import getEnvVars from "../../environment";
import { userState } from "../states/userState";
import { pickState } from "../states/pickState";
import SaveButton from "../components/Button";
import { saveNewPick } from "../../util/api/myPick";

const { REACT_NATIVE_ANDROID_GOOGLE_API_KEY } = getEnvVars();

export default function NewMyPickScreen({ navigation }) {
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

  const onSaveButtonClick = async () => {
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
      const res = await saveNewPick({ userId, newPick });

      if (res.result === "success") {
        navigation.navigate("MyPicks");
      }
    } catch (err) {
      alert("error");
    }
  };

  return (
    <View style={styles.screenContainer}>
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
        {Object.entries(picks).map(([id, pick]) => {
          const latitude = pick.location[0];
          const longitude = pick.location[1];
          let image;

          switch (pick.type) {
            case "meal":
              image = require("../../assets/meal.png");
              break;
            case "pup":
              image = require("../../assets/pup.png");
              break;
            case "cafe":
              image = require("../../assets/cafe.png");
              break;
            default:
              image = require("../../assets/pin.png");
          }

          return (
            <Marker
              key={id}
              coordinate={{ latitude: latitude, longitude: longitude }}
              title={pick.name}
            >
              <Image source={image} style={{ width: 30, height: 30 }} />
            </Marker>
          );
        })}
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
            marginBottom: 10,
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
            marginBottom: 10,
            borderColor: "#cdcecf",
          }}
        />
        <SaveButton
          width={100}
          height={17}
          title="SAVE"
          size={20}
          onPress={onSaveButtonClick}
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
    reset: PropTypes.func,
  }).isRequired,
};
