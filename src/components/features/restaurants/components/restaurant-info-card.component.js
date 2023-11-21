import React from "react";
import { Text } from "../../../typography/text.component";
import {Spacer} from "../../../spacer/spacer.component";
import { ProgressBar, MD3Colors } from 'react-native-paper';

//rating, card default info
import {
  RestaurantCard,
  RestaurantCardCover,
  Info,
  Section,
  SectionEnd,
  Icon,
  Address,
  
   
} from "./restaurant-info-card.styles";

export const RestaurantInfoCard = ({ checkpoint = {} }) => {
  const {
    name = "Kolej Canselor",
    icon = "https://images.macrumors.com/t/iemYuJMly_zkkWqyqXRLrEaqcpI=/1600x/article-new/2019/01/googlemaps.jpg",
    images = [
      "https://www.foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made-600x899.jpg",
    ],
    slot = 250
       
  } = checkpoint;

  //available food slot left
  const FoodAvailability = () => (
    <ProgressBar progress={0.5} theme={{ colors: { primary: '#4FAF5A' } }} />
  );


  return (
    <RestaurantCard elevation={5}>
      <RestaurantCardCover key={name} source={{ uri: images[0] }} />
      
      <Info>
      <Text variant="label">{name}</Text>      
        <Section>
          <SectionEnd>
            <Spacer position="left" size="large">
            <Icon source={{ uri: icon }} />
            </Spacer>
          </SectionEnd>
        </Section>
        <Address>{slot}</Address>
        <FoodAvailability></FoodAvailability>
      </Info>
    </RestaurantCard>
  );
};
