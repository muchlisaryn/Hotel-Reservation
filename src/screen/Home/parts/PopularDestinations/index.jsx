import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import CardDestinations from '../../../../component/molecules/CardDestinations';
import {colors} from '../../../../utils';
import {useNavigation} from '@react-navigation/native';

const formatDate = date => {
  let month = '' + (date.getMonth() + 1);
  let day = '' + date.getDate();
  let year = date.getFullYear();

  if (month.length < 2) {
    month = '0' + month;
  }
  if (day.length < 2) {
    day = '0' + day;
  }
  return [year, month, day].join('-');
};

const today = new Date();
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

export default function PopularDestinations() {
  const navigation = useNavigation();

  const data = [
    {
      title: 'Ubud',
      City: 'Bali',
      image:
        'https://theworldtravelguy.com/wp-content/uploads/2021/03/DSCF0040_3x4.jpg',
    },
    {
      title: 'Kuta Beach',
      City: 'Lombok',
      image:
        'http://balipancatour.com/wp-content/uploads/2012/01/kuta-beach-bali.jpg',
    },
    {
      title: 'Komodo',
      City: 'Bajo',
      image:
        'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/13/cc/4a/d7/komodo-adala-sala-satu.jpg?w=1200&h=-1&s=1',
    },
    {
      title: 'Tugu',
      City: 'Yogyakarta',
      image:
        'https://media.suara.com/pictures/653x366/2019/10/14/14093-tugu-pal-putih-atau-tugu-yogyakarta-suaraeleonora-pew.jpg',
    },
  ];

  return (
    <View>
      <Text style={{color: colors.darkBlue, fontSize: 16, fontWeight: '600'}}>
        Popular Destinations
      </Text>
      <ScrollView
        horizontal={true}
        style={{flexDirection: 'row', marginVertical: 10}}>
        {data?.map((item, index) => (
          <CardDestinations
            key={index}
            uri={item.image}
            title={item.title}
            onPress={() =>
              navigation.navigate('SearchResult', {
                location: item.City,
                checkIn: formatDate(today),
                checkOut: formatDate(tomorrow),
                guests: 1,
                rooms: 1,
              })
            }
          />
        ))}
      </ScrollView>
    </View>
  );
}
