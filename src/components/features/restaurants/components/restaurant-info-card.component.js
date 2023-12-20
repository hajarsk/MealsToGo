import React from "react";
import { Text } from "../../../typography/text.component";
import { Spacer } from "../../../spacer/spacer.component";
import { ProgressBar, MD3Colors } from 'react-native-paper';



//rating, card default info
import {
  RestaurantCard,
  RestaurantCardCover,
  Info,
  Section,
  SectionEnd,
  Slot,
  Address,
  ratioString as RatioStringText

} from "./restaurant-info-card.styles";
import { View } from "react-native";

export const RestaurantInfoCard = ({ checkpoint = {} }) => {
  const {
    name = "Kolej Canselor",
    address = "Universiti Putra Malaysia",
    icon = "https://images.macrumors.com/t/iemYuJMly_zkkWqyqXRLrEaqcpI=/1600x/article-new/2019/01/googlemaps.jpg",
    images = [
      "https://www.foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made-600x899.jpg",
    ],
    available = 0,
    total = 0,

  } = checkpoint;
 
  // const address = checkpoint[name]?.address || "No address provided"; // Retrieve the address


  const ratioString = `${available}/${total}`; // Display the ratio as a string in the format `available/total`
 

  //available food slot left
  // Calculate progress ratio
  const progressRatio = total > 0 ? available / total : 0;

  const ProgressBarSlot = () => (
    <ProgressBar progress={progressRatio} theme={{ colors: { primary: '#4FAF5A' } }} />
    
  );


  return (
    <RestaurantCard>
      <RestaurantCardCover key={name} source={{ uri: images[0] }} />

      <Info>
        <Text style={{ fontSize: 14, marginTop: -10 }} variant="label">{name}</Text>
        <Text style={{ fontSize: 12, marginTop: 3, color: '#878787' }} variant="label">{address}</Text>
        <Section>
          <SectionEnd>

          </SectionEnd>
        </Section>
        <Slot><Text style={{ marginRight:-8,alignSelf: 'flex-end', fontSize: 12, marginTop: 8, color: '#878787' }}>{ratioString}</Text></Slot>
        {/* progress bar */}
        <View style={{ width: 167, borderRadius: 10, overflow: 'hidden' }}>
        <ProgressBarSlot ></ProgressBarSlot>
        </View>
        <SectionEnd>
          <Spacer size="large">
            <Spacer position="left" size="large">
              {/* <Icon source={{ uri: icon }} /> */}
            </Spacer>
          </Spacer>
        </SectionEnd>
      </Info>
    </RestaurantCard>
  );
};
