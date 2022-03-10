import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { TextInput } from "react-native-gesture-handler";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

import getEnvVars from "../../environment";
import { checkEmail } from "../../util/api/makeAPlan";
import StyledButton from "../components/Button";
import PlanDate from "../components/Date";

const { REACT_NATIVE_ANDROID_GOOGLE_API_KEY } = getEnvVars();

export default function MakeAPlanScreen() {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  // const [place, setPlace] = useState("");
  // const [latitude, setLatitude] = useState(null);
  // const [longitude, setLongitude] = useState(null);
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
      const user = await checkEmail(email);
      setFriendsId([...friendsId, user.data.userId]);
      setFriends([...friends, user.data.name]);
      setEmail("");
    } catch (err) {
      alert("please check the email");
    }
  };

  // const handleCreateButtonClick = () => {
  //   console.log("asdf");
  // };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <View style={styles.mainTextContainer}>
        <Text style={styles.title}>Make A Plan Screen</Text>
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
              // setPlace(data.structured_formatting.main_text);
              // setLatitude(details.geometry.location.lat);
              // setLongitude(details.geometry.location.lng);
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
              marginLeft: 30,
              width: "70%",
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
                  height={70}
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
        <StyledButton
          width={100}
          height={10}
          title="CREATE"
          size={20}
          // onPress={handleCreateButtonClick}
        />
      </View>
    </KeyboardAvoidingView>
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
    marginTop: "8%",
  },
  inlineContainer: {
    height: 90,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 1,
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
    fontSize: 20,
  },
  friendTextInput: {
    width: "65%",
    marginLeft: "5%",
    borderBottomWidth: 1,
  },
  friendsContainer: {
    height: "50%",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
  },
});
