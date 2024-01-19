import React from "react";
import { View } from "react-native";
import { ProgressBar } from 'react-native-paper';

import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";


// card default info
import {
  CheckpointCard,
  CheckpointCardCover,
  Info,
  Section,
  SectionEnd,
  Slot,
  ratioString as RatioStringText

} from "./checkpoint-card.styles";


export const CheckpointInfoCard = ({ checkpoint = {} }) => {
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


  const ratioString = `${available}/${total}`; // Display the ratio as a string in the format `available/total`


  // Calculate progress ratio to get available food slot left
  const progressRatio = total > 0 ? available / total : 0;

  const ProgressBarSlot = () => (
    <ProgressBar progress={progressRatio} theme={{ colors: { primary: '#4FAF5A' } }} />
  );


  return (
    <CheckpointCard>
      <CheckpointCardCover key={name} source={{ uri: images[0] }} />

      <Info>
        <Text style={{ fontSize: 14, marginTop: -10 }} variant="label">{name}</Text>
        <Text style={{ fontSize: 12, marginTop: 3, color: '#878787' }} variant="label">{address}</Text>
        <Section>
          <SectionEnd>

          </SectionEnd>
        </Section>
        <Slot>
          <Text style={{ marginRight: -8, alignSelf: 'flex-end', fontSize: 12, marginTop: 8, color: '#878787' }}>{ratioString}</Text>
        </Slot>
        <View
          style={{ width: 167, borderRadius: 10, overflow: 'hidden' }}>
          <ProgressBarSlot></ProgressBarSlot>
        </View>

        <SectionEnd>
          <Spacer size="large">
            <Spacer position="left" size="large">
            </Spacer>
          </Spacer>
        </SectionEnd>
      </Info>
    </CheckpointCard>
  );
};
