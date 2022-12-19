import {useNavigation} from '@react-navigation/native';
import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import CardDestinations from '../../../../component/molecules/CardDestinations';
import {colors} from '../../../../utils';

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

export default function Destination({title, data}) {
    const navigation = useNavigation();
    return(
        <View>
            <Text style={{color: colors.darkBlue, fontSize: 16, fontWeight: '600'}}>
                {title}
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
    )
}