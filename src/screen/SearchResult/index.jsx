import {SafeAreaView, ScrollView, Text, View, StyleSheet} from 'react-native';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {colors} from '../../utils';
import HotelCard from '../../component/molecules/HotelCard';
import {Button} from '../../component/atoms';
import {fetchHotels} from '../../features/hotelSlice';

export default function SearchResult({route, navigation}) {
  const dispatch = useDispatch();
  const hotels = useSelector(state => state.hotel.hotels);
  const isPending = useSelector(state => state.hotel.isPending);

  const {location, checkIn, checkOut, guests, rooms} = route.params;
  const [newCheckIn, setNewCheckIn] = useState(checkIn);
  const [newCheckOut, setNewCheckOut] = useState(checkOut);
  const [newGuest, setNewGuest] = useState(guests);
  const [newRooms, setNewRooms] = useState(rooms);

  useEffect(() => {
    dispatch(fetchHotels(route.params));
  }, []);

  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.header}>
        <Button
          type="icon"
          icon="chevron-back"
          color={colors.darkBlue}
          size={30}
          onPress={() => navigation.goBack()}
        />

        <View style={{}}>
          <Text
            style={{color: colors.darkBlue, fontSize: 16, fontWeight: '600'}}>
            Search result for "{location}"
          </Text>
          <Text style={{color: colors.darkBlue, fontSize: 15}}>
            {newCheckIn} - {newCheckOut}
          </Text>
          <Text style={{color: colors.darkBlue, fontSize: 15}}>
            {newGuest} person | {newRooms} rooms
          </Text>
        </View>
        <Button title="ubah" color={colors.darkBlue} width={50} />
      </View>
      {isPending ? (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text
            style={{
              color: colors.darkBlue,
              fontSize: 18,
              fontWeight: '600',
              justifyContent: 'center',
            }}>
            Loading...
          </Text>
        </View>
      ) : (
        <ScrollView>
          <View style={{padding: 10, paddingTop: 0, marginBottom: 100}}>
            {hotels.map(item => (
              <HotelCard
                key={item?.hotel_id}
                onPress={() =>
                  navigation.navigate('DetailHotel', {
                    hotel_id: item?.hotel_id,
                    checkIn: checkIn,
                    checkOut: checkOut,
                    guests: guests,
                    rooms: rooms,
                    image: item?.main_photo_url,
                  })
                }
                hotelId={item?.hotel_id}
                image={item?.main_photo_url}
                hotelName={item?.hotel_name}
                price={item?.price_breakdown?.all_inclusive_price}
                address={item?.address}
                // city={item?.city}
                reviewScore={item?.review_score}
                reviewTotal={item?.review_nr}
                guests={guests}
                rooms={rooms}
              />
            ))}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
});
