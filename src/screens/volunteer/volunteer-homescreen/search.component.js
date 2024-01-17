import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components/native";
import { Searchbar } from "react-native-paper";

import { LocationContext } from "../../../services/location/location.context";

const SearchContainer = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;

export const Search = () => {
  const { keyword, search } = useContext(LocationContext);
  const [searchKeyword, setSearchKeyword] = useState(keyword);

  useEffect(() => {
    setSearchKeyword(keyword);
  }, [keyword]);
  return (
    <SearchContainer >
      <Searchbar
        placeholder="Find a food bank..."
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
        onChangeText={(text) => {
          setSearchKeyword(text);
        }}
      />
    </SearchContainer>
  );
};