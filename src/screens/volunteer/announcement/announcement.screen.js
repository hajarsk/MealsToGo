import React from 'react';
import styled from "styled-components/native";
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card } from 'react-native-paper';
import { Spacer } from '../../../components/spacer/spacer.component';

export const AnnouncementImage = styled.ImageBackground.attrs({
  source: require("../../../../assets/home_bg.jpg"),
})`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const AnnouncementScreen = () => {
  return (

    <View style={styles.container}>

      <Text style={styles.profileText}>Announcement</Text>

      <View style={styles.profileSection}>


        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Card style={{ width: 350, height: 350 }}>
            <Card.Cover style={{ width: 350, height: 350 }} source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/mealstogo-df673.appspot.com/o/kotak_foodbank.jpg?alt=media&token=6e077e27-1ac4-42ca-a366-c37601a5daec' }} />
          </Card>
          {/* Your existing content */}
          <Spacer size="large">
            <Text style={styles.justifyText}>Assalammualaikum wbt, {"\n"}
              Salam Sejahtera, {"\n"}
              Salam We Love UPM</Text>
          </Spacer >
          <Spacer size="large">
            <Text style={styles.justifyText}>Untuk makluman semua Pelajar Universiti Putra Malaysia, Majlis Perwakilan Pelajar UPM Sesi 2022/2023 sedang menganjurkan Pemerkasaan Foodbank Madani Fasa 2. Agihan Foodbank akan dilakukan melalui dua cara iaitu penyerahan ke rak-rak kolej dan fakulti atau penyerahan terus kepada pelajar.
            </Text>
          </Spacer>
          <Spacer size="large">
            <Text style={styles.justifyText}>Bagi pelajar yang memerlukan Kotak Bantuan Foodbank, pelajar boleh mendaftar di pautan yang disediakan dan mengambilnya mengikut ketetapan berikut
            </Text></Spacer>
          <Spacer size="small">
            <Text style={styles.justifyText}>📍Tarikh : 24 Disember 2023 (Ahad) {"\n"}
              📍Masa : 8.30 Malam - 10.30 Malam  {"\n"}
              📍Tempat : Dewan Putra 2 UPM </Text>
          </Spacer>
          <Spacer size="large">
            <Text style={styles.justifyText}>Pautan Pendaftaran:</Text>
            <Text style={{ textDecorationLine: "underline", color: 'blue' }}>https://linktr.ee/MPPKEBAJIKAN2223</Text>
          </Spacer>
          <Spacer size="large">
            <Text style={styles.justifyText}>Maklumat tambahan, agihan akan dibuat semasa dipertengahan program Sembang Santai Kempen Keselamatan Jalan Raya bersama Bos James & En Muiz COO Dania Garage. Pelajar perlu hadir dan menyertai program pada malam tersebut untuk melayakkan diri bagi mendapatkan bantuan. Anda juga diingatkan untuk menggunakan emel rasmi UPM anda.
            </Text>
          </Spacer>
          <Spacer size="large">
            <Text>Sebarang pertanyaan sila hubungi :</Text>
            <Text>📞 Ikram Marozan : 0179878404</Text>
          </Spacer>
          <Spacer size="large">
            <Text>Sekian, terima kasih.</Text>
          </Spacer>
          <Spacer size="large">
            <Text>"Memacu Kecemerlangan Mahasiswa"</Text>
          </Spacer>
          <Spacer size="large">
            <Text>Majlis Perwakilan Pelajar</Text>
            <Text>Universiti Putra Malaysia</Text>
            <Text>Sesi 2022/2023</Text>
          </Spacer>


        </ScrollView>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,

    alignItems: 'center',
    backgroundColor: 'white'
  },
  justifyText: {
    fontSize: 14,
    textAlign: 'justify',
    lineHeight: 20, // Adjust line height as needed for better readability
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 50,
  },
  profileSection: {
    width: '100%',


  },
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: 'white'
  },
  profileText: {
    fontSize: 17,
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  divider: {
    marginVertical: 10,
    backgroundColor: 'grey',
  },
});