import React from "react";

import PropTypes from "prop-types";
import styled from "styled-components/native";

const ButtonContainer = styled.Pressable`
  align-items: center;
  justify-content: center;
  width: ${(props) => props.width}%;
  height: ${(props) => props.height}%;
  padding: 5px;
  border: 1px solid #898989;
  border-radius: 15px;
`;

const StyledText = styled.Text`
  font-size: ${(props) => props.size};
  color: #0a80ae;
`;

function StyledButton({ onPress, title, width, height, size }) {
  return (
    <ButtonContainer onPress={onPress} width={width} height={height}>
      <StyledText size={size}>{title}</StyledText>
    </ButtonContainer>
  );
}

StyledButton.propTypes = {
  onPress: PropTypes.func,
  title: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  size: PropTypes.number,
};

export default StyledButton;
