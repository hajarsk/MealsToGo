import styled from "styled-components/native";
import { Card } from "react-native-paper";
import { View,Text } from "react-native";


export const Icon = styled.Image`
  width: 15px;
  height: 15px;
`;

export const RestaurantCard = styled(View)`
  background-color: ${(props) => props.theme.colors.bg.primary};
  margin-bottom: 10px;
  width: 200px;
  height: 230px;
  

`;

export const RestaurantCardCover = styled(Card.Cover)`
  padding-vertical: ${(props) => props.theme.space[3]};
  height: 150px;
  background-color: ${(props) => props.theme.colors.bg.primary};
  padding-horizontal: ${(props) => props.theme.space[3]};

`;

export const Slot = styled.View`
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: ${(props) => props.theme.fontSizes.sm};
  color: ${(props) => props.theme.colors.text.secondary};
  padding-bottom: ${(props) => props.theme.space[2]};
  padding-top: ${(props) => props.theme.space[0]};
  text-align: right; 
  
`;
export const Address = styled.Text`
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: ${(props) => props.theme.fontSizes.sm};
  color: ${(props) => props.theme.colors.text.secondary};
  padding-bottom: ${(props) => props.theme.space[2]};
  padding-top: ${(props) => props.theme.space[2]};
  text-align: right; 
  
`;

export const ratioString = styled.Text`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.sm};
  color: ${(props) => props.theme.colors.text.secondary};
  padding-bottom: ${(props) => props.theme.space[2]};
  padding-top: ${(props) => props.theme.space[0]};
  text-align: right; 
  
`;

export const Info = styled.View`
  padding-left: ${(props) => props.theme.space[3]};
  padding-right: ${(props) => props.theme.space[3]};
  padding-bottom: ${(props) => props.theme.space[3]};
`;

export const Rating = styled.View`
  flex-direction: row;
  padding-top: ${(props) => props.theme.space[2]};
  padding-bottom: ${(props) => props.theme.space[2]};
`;

export const Section = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const SectionEnd = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
`;







