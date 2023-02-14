import {useNavigation} from '@react-navigation/native';
import {View, Text, ScrollView, Image, StyleSheet} from 'react-native';
import React from 'react';
import {colors} from '../../../../utils';

export default function Artikel() {
  return (
    <View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={{color: colors.darkBlue, fontSize: 16, fontWeight: '600'}}>
          Artikel
        </Text>
        <Text style={{marginRight: 20}}>See All</Text>
      </View>
      <ScrollView
        horizontal={true}
        style={{flexDirection: 'row', marginVertical: 10}}>
        <View style={{paddingRight: 15, width: 300}}>
          <Image
            source={{
              uri: 'https://asset.kompas.com/crops/BraddfIZmVVlO1coTQnSxt0phcs=/0x0:719x479/750x500/data/photo/2021/07/29/61021b10f16fc.jpg',
            }}
            style={styles.image}
          />

          <View style={styles.theme}>
            <Text style={{color: colors.yellow}}>Tips</Text>
          </View>
          <Text style={styles.title}>
            5 Hal yang Boleh dan Tidak Boleh Kamu Lakukan Kalau Lagi Staycation
          </Text>
        </View>

        <View style={{paddingRight: 15, width: 300}}>
          <Image
            source={{
              uri: 'https://theworldtravelguy.com/wp-content/uploads/2021/03/DSCF0040_3x4.jpg',
            }}
            style={styles.image}
          />

          <View style={styles.theme}>
            <Text style={{color: colors.yellow}}>Tips</Text>
          </View>
          <Text style={styles.title}>
            5 Hal yang Boleh dan Tidak Boleh Kamu Lakukan Kalau Lagi Staycation
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  theme: {
    position: 'absolute',
    top: 0,
    padding: 5,
    paddingHorizontal: 10,
    margin: 10,
    backgroundColor: colors.darkBlue,
    borderRadius: 5,
  },
  image: {
    height: 150,
    borderRadius: 10,
  },
  title: {
    fontWeight: 'bold',
    color: colors.black,
    marginVertical: 10,
    textAlign: 'justify',
  },
});
