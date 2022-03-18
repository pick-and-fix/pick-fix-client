import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
    color: "#0a80ae",
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
    color: "#0a80ae",
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
