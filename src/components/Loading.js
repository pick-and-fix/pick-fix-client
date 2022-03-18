import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components";

const ImageContainer = styled.View`
  width: 100%;
  height: 180px;
  margin-bottom: 5px;
  align-self: center;
  justify-content: center;
`;

const Loading = () => {
  return (
    <ImageContainer>
      <ActivityIndicator size="small" color="#0a80ae" />
    </ImageContainer>
  );
};

export default Loading;
