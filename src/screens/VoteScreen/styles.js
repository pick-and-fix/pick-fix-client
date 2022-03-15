import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 16,
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
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalButtonContainer: {
    flex: 1,
    width: "100%",
    height: 70,
    alignItems: "center",
    marginTop: "3%",
  },
  button: {
    width: 40,
    height: 40,
    marginLeft: 260,
    padding: 10,
    borderRadius: 100,
    elevation: 2,
    backgroundColor: "#d3edf7",
  },
  buttonTextStyle: {
    textAlign: "center",
    color: "#898989",
    fontWeight: "bold",
  },
  pickText: {
    marginBottom: 10,
    color: "#898989",
  },
  formText: {
    fontSize: 15,
    color: "#0a80ae",
  },
  pickContainer: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    backgroundColor: "#fff",
  },
  pickContainerTitle: {
    marginTop: 10,
    fontSize: 30,
    color: "#0a80ae",
  },
  notification: {
    color: "#cfcfcf",
  },
  pickName: {
    marginBottom: "1%",
    fontSize: 15,
  },
  pickNameContainer: {
    marginTop: "3%",
  },
});
