import {SafeAreaView, ScrollView, Text, View, StyleSheet} from 'react-native';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {colors} from '../../utils';
import HotelCard from '../../component/molecules/HotelCard';
import {Button} from '../../component/atoms';
import {fetchHotels} from '../../features/hotelSlice';
import ModalEdit from './parts/Modal';

export default function SearchResult({route, navigation}) {
  const dispatch = useDispatch();
  const hotels = useSelector(state => state.hotel.hotels);
  const isPending = useSelector(state => state.hotel.isPending);

  const {
    location,
    checkIn,
    checkOut,
    guests,
    rooms,
    formatCheckIn,
    formatCheckOut,
    dateCheckIn,
    dateCheckOut,
  } = route.params;

  const [modalVisible, setModalVisible] = useState(false);

  const [newCheckIn, setNewCheckIn] = useState(checkIn);
  const [newCheckOut, setNewCheckOut] = useState(checkOut);
  const [newGuest, setNewGuest] = useState(guests);
  const [newRooms, setNewRooms] = useState(rooms);
  const [valueGuest, setValueGuest] = useState(guests);
  const [valueRooms, setValueRooms] = useState(rooms);
  const [valueCheckIn, setValueCheckIn] = useState(newCheckIn);
  const [valueCheckOut, setValueCheckOut] = useState(newCheckIn);
  const [newDateCheckIn, setNewDateCheckIn] = useState(dateCheckIn);
  const [newDateCheckOut, setNewDateCheckOut] = useState(dateCheckOut);

  useEffect(() => {
    dispatch(
      fetchHotels({
        location,
        checkIn: newCheckIn,
        checkOut: newCheckOut,
        guests: newGuest,
        rooms: newRooms,
      }),
    );
  }, [newCheckIn, newCheckOut, newGuest, newRooms]);

  const ubah = () => {
    setModalVisible(true);
  };

  console.log(newDateCheckIn);

  const changeHotels = () => {
    setNewGuest(valueGuest === guests ? guests : valueGuest);
    setModalVisible(false);
    setNewRooms(valueRooms === rooms ? rooms : valueRooms);
    setNewCheckIn(valueCheckIn === checkIn ? checkIn : valueCheckIn);
    setNewCheckOut(valueCheckOut === checkOut ? checkOut : valueCheckOut);
    setNewDateCheckIn(
      newDateCheckIn === dateCheckIn ? dateCheckIn : newDateCheckIn,
    );
    setNewDateCheckOut(
      newCheckOut === dateCheckOut ? dateCheckOut : newDateCheckOut,
    );
  };

  console.log(newDateCheckIn);

  

  useEffect(() => {
    if (valueGuest < valueRooms) {
      setValueRooms(valueGuest);
    } else if (valueGuest === 8 && valueRooms === 1) {
      setValueRooms(valueRooms + 1);
    }
  });

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
            {newDateCheckIn} - {newDateCheckOut}
          </Text>
          <Text style={{color: colors.darkBlue, fontSize: 15}}>
            {newGuest} person | {newRooms} rooms
          </Text>
        </View>
        <Button
          title="ubah"
          color={colors.darkBlue}
          width={50}
          onPress={ubah}
        />
        <ModalEdit
          visible={modalVisible}
          onPressCancel={() => {
            setModalVisible(false);
            setValueGuest(newGuest);
          }}
          onRequestClose={() => setModalVisible(!modalVisible)}
          setNewCheckIn={setValueCheckIn}
          setNewCheckOut={setValueCheckOut}
          setNewDateCheckIn={setNewDateCheckIn}
          setNewDateCheckOut={setNewDateCheckOut}
          valueCheckIn={valueCheckIn}
          valueCheckOut={valueCheckOut}
          checkIn={formatCheckIn}
          checkOut={formatCheckOut}
          guest={valueGuest}
          rooms={valueRooms}
          plusGuest={() => setValueGuest(valueGuest + 1)}
          minGuest={() => setValueGuest(valueGuest - 1)}
          plusRooms={() => setValueRooms(valueRooms + 1)}
          minRooms={() => setValueRooms(valueRooms - 1)}
          search={changeHotels}
        />
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
            {hotels?.map(item => (
              <HotelCard
                key={item?.hotel_id}
                onPress={() =>
                  navigation.navigate('DetailHotel', {
                    hotel_id: item?.hotel_id,
                    checkIn: newCheckIn,
                    checkOut: newCheckOut,
                    guests: newGuest,
                    rooms: newRooms,
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
                guests={newGuest}
                rooms={newRooms}
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
