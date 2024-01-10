import styled from "styled-components/native";
import { Button, TextInput } from "react-native-paper";
import { colors } from "../../../../theme/colors";
import { Text } from "../../../typography/text.component";

export const AccountBackground = styled.ImageBackground.attrs({
  source: require("../../../../../assets/home_bg.jpg"),
})`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const AccountCover = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.3);
`;

export const AccountContainer = styled.View`
  background-color: rgba(255, 255, 255, 0.9);
  padding: ${(props) => props.theme.space[3]};
  margin-top: ${(props) => props.theme.space[3]};
  border-radius: 20px;
`;

export const AuthButton = styled(Button).attrs({

})`
  padding: ${(props) => props.theme.space[2]};
  background-color: '#4FAF5A';
`;

export const AuthInput = styled(TextInput)`
  width: 300px;
  backgroundColor: transparent;
  font-size: 15px;
  
`;

export const Title = styled(Text)`
  font-size: 30px;
  font-weight: bold;
 
  padding-bottom:5px;
`;

export const ErrorContainer = styled.View`
  max-width: 300px;
  align-items: center;
  align-self: center;
  margin-top: ${(props) => props.theme.space[2]};
  margin-bottom: ${(props) => props.theme.space[2]};
`;