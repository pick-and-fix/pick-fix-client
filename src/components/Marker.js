import React from "react";
import PropTypes from "prop-types";
import { Image } from "react-native";
import { Marker } from "react-native-maps";

const StyledMarker = ({ plan, onPressMarker }) => {
  return (
    <>
      {plan &&
        Object.entries(plan?.picks).map(([id, pick]) => {
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
      <Marker
        title={plan?.place}
        coordinate={{
          latitude: plan?.placeLocation[0],
          longitude: plan?.placeLocation[1],
        }}
      />
    </>
  );
};

StyledMarker.propTypes = {
  plan: PropTypes.object,
  onPressMarker: PropTypes.func.isRequired,
};

export default StyledMarker;
