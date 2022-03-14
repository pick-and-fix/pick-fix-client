import React from "react";
import { Image } from "react-native";
import { Marker } from "react-native-maps";
import PropTypes from "prop-types";

const StyledMarker = ({ picks, onPressMarker }) => {
  return (
    <>
      {picks &&
        Object.entries(picks).map(([id, pick]) => {
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
              onPress={(ev) => onPressMarker(id)}
            >
              <Image source={image} style={{ width: 30, height: 30 }} />
            </Marker>
          );
        })}
    </>
  );
};

StyledMarker.propTypes = {
  picks: PropTypes.object,
  onPressMarker: PropTypes.func,
};

export default StyledMarker;
