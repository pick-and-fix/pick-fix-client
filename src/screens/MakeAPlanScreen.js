import { CommonActions } from "@react-navigation/routers";
import React, { useState } from "react";
import { StyleSheet, View, Text, Platform, Alert } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { TextInput } from "react-native-gesture-handler";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useRecoilValue } from "recoil";
import PropTypes from "prop-types";

import getEnvVars from "../../environment";
import { checkEmailApi, makeAPlanApi } from "../../util/api/makeAPlan";
import StyledButton from "../components/Button";
import PlanDate from "../components/Date";
import { userState } from "../states/userState";

const { REACT_NATIVE_ANDROID_GOOGLE_API_KEY } = getEnvVars();

function MakeAPlanScreen({ navigation }) {
  const user = useRecoilValue(userState);
  const userId = user.userId;
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [place, setPlace] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [dropOpen, setDropOpen] = useState(false);
  const [pickValue, setPickValue] = useState(null);
  const [email, setEmail] = useState("");
  const [friendsId, setFriendsId] = useState([]);
  const [friends, setFriends] = useState([]);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  const handlePlusButtonClick = async () => {
    try {
      const user = await checkEmailApi(email);
      setFriendsId([...friendsId, user.data.userId]);
      setFriends([...friends, user.data.name]);
      setEmail("");
    } catch (err) {
      alert("please check the email");
    }
  };

  const handleCreateButtonClick = async () => {
    if (!place) {
      alert("Select the place");

      return;
    }

    if (!pickValue) {
      alert("Select the pick number");

      return;
    }

    if (!friends.length) {
      alert("Check the friends email");

      return;
    }

    const newPlan = {
      creator: userId,
      place: place,
      placeLocation: [latitude, longitude],
      date: date,
      friends: friendsId,
      pickNumber: pickValue,
      isVoted: false,
      isFixed: false,
    };

    const response = await makeAPlanApi({ userId, newPlan });

    if (response.result === "success") {
      Alert.alert("Success👍🏻", "Vote List에서 약속장소를 Pick하세요!", [
        {
          text: "OK",
          onPress: () =>
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [
                  {
                    name: "Main",
                  },
                ],
              })
            ),
        },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainTextContainer}>
        <Text style={styles.title}>Make A Plan</Text>
      </View>
      <View style={styles.formContainer}>
        <View style={styles.inlineContainer}>
          <View style={styles.circle} />
          <Text style={styles.formText}>Date</Text>
          <PlanDate
            onChange={onChange}
            showDatepicker={showDatepicker}
            showTimepicker={showTimepicker}
            date={date}
            mode={mode}
            show={show}
          />
        </View>
        <View style={styles.inlineContainer}>
          <View style={styles.circle} />
          <Text style={styles.formText}>Place</Text>
          <GooglePlacesAutocomplete
            placeholder="Search"
            fetchDetails={true}
            onPress={(data, details = null) => {
              setPlace(data.structured_formatting.main_text);
              setLatitude(details.geometry.location.lat);
              setLongitude(details.geometry.location.lng);
            }}
            query={{
              key: REACT_NATIVE_ANDROID_GOOGLE_API_KEY,
              language: "ko",
            }}
            styles={{
              container: {
                flex: 0,
                position: "absolute",
                marginLeft: 100,
                width: "70%",
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
        </View>
        <View style={styles.inlineContainer}>
          <View style={styles.circle} />
          <Text style={styles.formText}>Pick</Text>
          <DropDownPicker
            open={dropOpen}
            value={pickValue}
            placeholder="Pick Number"
            items={[
              { label: "1", value: "1" },
              { label: "2", value: "2" },
              { label: "3", value: "3" },
              { label: "4", value: "4" },
            ]}
            setOpen={setDropOpen}
            setValue={setPickValue}
            zIndex={6000}
            zIndexInverse={1000}
            autoScroll={true}
            listMode="MODAL"
            modalTitle="Select Pick Number!"
            modalProps={{
              animation: "fade",
            }}
            style={{
              marginLeft: "11%",
              width: "69%",
              height: 30,
            }}
          />
        </View>
        <View style={styles.inlineContainer}>
          <View style={styles.circle} />
          <Text style={styles.formText}>Friends</Text>
          <View>
            <View style={styles.friendsContainer}>
              <TextInput
                style={styles.friendTextInput}
                placeholder="Your Friend Email"
                value={email}
                onChangeText={setEmail}
              />
              <View>
                <StyledButton
                  width={200}
                  height={80}
                  title="+"
                  size={20}
                  onPress={handlePlusButtonClick}
                />
              </View>
            </View>
            <View style={styles.friendsContainer}>
              {friends.map((friend, index) => {
                return <Text key={index}>@ {friend} </Text>;
              })}
            </View>
          </View>
        </View>
        <View style={{ flex: 1, marginTop: "10%", alignItems: "center" }}>
          <StyledButton
            width={80}
            height={30}
            title="CREATE"
            size={20}
            onPress={handleCreateButtonClick}
          />
        </View>
      </View>
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
  mainTextContainer: {
    flex: 1,
    marginTop: "10%",
    paddingTop: 0,
  },
  title: {
    color: "#0A80AE",
    fontSize: 40,
  },
  formContainer: {
    flex: 7,
    width: 350,
    marginTop: "15%",
  },
  inlineContainer: {
    height: "15%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: "1%",
  },
  circle: {
    width: 10,
    height: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 100,
    backgroundColor: "#f6dced",
  },
  formText: {
    color: "#0A80AE",
    fontSize: 17,
  },
  friendTextInput: {
    width: "77%",
    borderBottomWidth: 1,
  },
  friendsContainer: {
    marginLeft: "10%",
    height: "45%",
    flexDirection: "row",
    alignItems: "center",
  },
});

MakeAPlanScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    dispatch: PropTypes.func,
    reset: PropTypes.func,
  }).isRequired,
};

export default MakeAPlanScreen;
