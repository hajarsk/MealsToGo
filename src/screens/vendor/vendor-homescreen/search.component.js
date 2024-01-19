import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components/native";
import { Searchbar } from "react-native-paper";

import { LocationContext} from "../../../services/location/location.context";
import { FIREBASE_DATABASE } from "../../../config/firebase";


const SearchContainer = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;

export const Search = () => {
  const { keyword, search } = useContext(LocationContext);
  const [searchKeyword, setSearchKeyword] = useState(keyword);

  useEffect(() => {
    setSearchKeyword(keyword);
  }, [keyword]);

fetchCheckpointData = async (searchKeyword) => {
  try{
    const dbRef = ref(FIREBASE_DATABASE, 'checkpoint');
    const snapshot = await get(dbRef);
    if(snapshot.exists()){
      const allData = Object.values(snapshot.val());
      const filteredData = allData.filter(
        (item) => item.name.toLowerCase().includes(searchKeyword.toLowerCase()));
      return filteredData;
    }else{
      return [];
    }
  }catch(error){
    console.error('Error fetching vendor name:', error);
  }
}

  return (
    <SearchContainer >
      <Searchbar
        placeholder="Search Food Bank"
        placeholderTextColor="#878787"
        inputStyle={{marginTop:-4}}
        value={searchKeyword}
        // Apply custom styles to the Searchbar
        iconColor="#878787"
        
        style={{ 
          borderRadius: 50, 
          backgroundColor: '#ffffff', 
          borderColor:'#D6D6D6',
          borderWidth:1, 
          height: 50,  
          marginBottom:-5,
          
        
        }}
     
        onSubmitEditing={() => {
          search(searchKeyword);
        }}
        onChangeText={(item) => {
          setSearchKeyword(item.name);
        }}
      />
    </SearchContainer>
  );
};