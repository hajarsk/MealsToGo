import React,{useState, useEffect}from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Divider,Button, Card } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';


export const TrackDeliveryScreen = () => {
  const [profileImage, setProfileImage] = useState("");
  const [expanded, setExpanded] = useState(true);
  const navigation = useNavigation();

  const handlePress = () => setExpanded(!expanded);

   

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission denied!');
      }
    })();
  }, []);

  const handleImagePicker = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      });

      if (!result.cancelled) {
        setProfileImage(result.uri);
      }
    } catch (error) {
      console.error('ImagePicker Error: ', error);
    }
  };

  
  

  return (
    <View style={styles.container}>

      {/* profile header */}
      <View style={styles.headerSection}>
        <Card style={{ flex: 1, backgroundColor:'#f5f5f5', justifyContent: 'center', alignItems: 'center' }}>
          <Card.Content style={{ aspectRatio: 4 / 3, resizeMode: 'cover', }}>
            <Card.Cover source={{ uri: 'https://img.freepik.com/premium-vector/express-delivery-social-media-post-scooter-delivery-online-delivery-service-home-delivery-ads_608547-174.jpg' }} />
          </Card.Content>
        </Card>
      </View>
      
     

      <View>
        <Card style={{backgroundColor:'#f5f5f5', width:350}}>
          <Card.Content>
            <Text style={styles.title}>Delivering...</Text>
            <Text style={styles.titleEmail}>Volunteer is on the way to deliver your food.
            </Text>
            <TouchableOpacity
            onPress={() =>
              navigation.navigate("Map")
            }>
              <Text style={styles.hyperlinkStyle} >
                Track Rider's Location
              </Text>
            </TouchableOpacity>

          </Card.Content>
        </Card>
      </View>

      <View style={styles.thickLine} />

      <View style={styles.bodySection}>
        <Text style={styles.headerStyle}>Delivery Details</Text>
        <Text style={styles.subHeaderStyle}>Deliver food from:</Text>
        <Text style={styles.bodyStyle}>Hotel Le Meridien</Text>
        <Divider style={styles.divider} />
        <Text style={styles.subHeaderStyle}>Delivery address:</Text>
        <Text style={styles. bodyStyle}>Kolej Canselor, Universiti Putra Malaysia 43400 Serdang, Selangor</Text>
        <Divider style={styles.divider} />
        <Text style={styles.subHeaderStyle}>Items:</Text>
        <Text style={styles. bodyStyle}>50x Nasi Lemak</Text>
        
          
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor:'white'    
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color:'#4FAF5A',    
  },
  titleEmail: {
    marginBottom: 5,
    marginTop:3,    
    fontSize: 15,
  },
  bodySection: {
    width: '100%',
    paddingLeft:25,
    marginTop:-5,
    
  },
  headerStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    color:'#4FAF5A',    
    marginBottom:10
  },
  subHeaderStyle: {
    fontSize: 15,
    color:'#979797',    
    
  },
  bodyStyle: {    
    marginBottom: 5, 
    fontSize: 15,
  },
  divider: {
    marginVertical: 8,
    width:'90%',
    alignContent:'center',   
  },
  profileImage: {
    width: 80,
    height:80,
    borderRadius: 75,   
    alignSelf:'center'
  },
  headerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 20,
    
    
  },
  subheaderSection: {
    flexDirection: 'row',
    alignItems: 'center',
    
    
  },
  titleContainer: {
    flexDirection: 'column',
    marginTop:-30,
   
  },
  hyperlinkStyle:{
    color: '#4FAF5A',
    textDecorationLine: 'underline',
    alignSelf: 'center',
    paddingTop:10
  }, 
  thickLine: {
    borderBottomWidth: 8,
    borderBottomColor: '#e5e5e5',
    marginVertical: 25,
    width: '100%',
  },
  
});