import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import Destination from './parts/Destination';
import {colors, DataPopular, DataTop, shortMonth} from '../../utils';
import {Button, Input} from '../../component/atoms';
import Header from '../../component/molecules/Header';
import {useState, useEffect} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import InputModal from './parts/InputModal';
import {formatDate} from '../../utils/formatDate';
import Artikel from './parts/Artikel';

const maxDate = new Date();
maxDate.setMonth(maxDate.getMonth() + 1);

export default function Home({navigation}) {
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 1);
  const [input, setInput] = useState('');
  const [inputCheckIn, setInputCheckIn] = useState(null);
  const [inputCheckOut, setInputCheckOut] = useState(null);
  const [checkIn, setCheckIn] = useState('Check in');
  const [checkOut, setCheckOut] = useState('Check Out');
  const [dateCheckIn, setDateCheckIn] = useState('');
  const [dateCheckOut, setDateCheckOut] = useState('');
  const [openCheckin, setOpenCheckin] = useState(false);
  const [openCheckout, setOpenCheckout] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [originalDateCheckIn, setOriginalDateCheckIn] = useState();
  const [originalDateCheckOut, setOriginalDateCheckOut] = useState();
  const [guest, setGuest] = useState(1);
  const [room, setRoom] = useState(1);

  console.log(
    'checkIn => ',
    originalDateCheckIn,
    'checkout => ',
    originalDateCheckOut,
  );

  const checkOutButton = () => {
    if (inputCheckIn) {
      setOpenCheckout(true);
    } else {
      alert('Please input Check-in');
    }
  };

  useEffect(() => {
    if (room > guest) {
      setRoom(guest);
    }
  }, [guest, room]);

  useEffect(() => {
    if (inputCheckIn > inputCheckOut) {
      setCheckOut('Check Out');
    }
  }, []);

  const searchButton = () => {
    if (input !== '' && inputCheckIn && inputCheckOut) {
      navigation.navigate('SearchResult', {
        dateCheckIn,
        dateCheckOut,
        formatCheckIn: checkIn,
        formatCheckOut: checkOut,
        location: input,
        checkIn: inputCheckIn,
        checkOut: inputCheckOut,
        guests: guest,
        rooms: room,
        originalDateCheckIn,
        originalDateCheckOut,
      });
    } else if (input === '') {
      alert('Form input wajib di isi');
    } else if (checkIn && checkOut) {
      alert('Tanggal Check In dan Check Out harus di isi');
    }
  };

  return (
    <SafeAreaView style={{backgroundColor: colors.white, flex: 1}}>
      <ScrollView>
        <View style={styles.header}>
          <Header type="user" onPress={() => navigation.navigate('Sign')} />
          <Text style={styles.title}>
            Find deals on hotels, homes, and much more...
          </Text>
          <View style={styles.boxSearch}>
            <Input
              placeholder="Search place or location.."
              type="search"
              onChangeText={value => setInput(value)}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 10,
                alignItems: 'center',
              }}>
              <View>
                <Button
                  title={checkIn}
                  onPress={() => setOpenCheckin(true)}
                  color={colors.yellow}
                  width={120}
                />
                {openCheckin && (
                  <DateTimePicker
                    value={new Date()}
                    mode={'date'}
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    minimumDate={new Date()}
                    maximumDate={maxDate}
                    onChange={(event, selectedDate) => {
                      if (event.type == 'set') {
                        setOpenCheckin(false);
                        setOriginalDateCheckIn(
                          new Date(
                            selectedDate.setDate(selectedDate.getDate()),
                          ),
                        );
                        setInputCheckIn(formatDate(selectedDate));
                        setCheckIn(selectedDate.toLocaleDateString('pt-PT'));
                        const date = String(selectedDate.getDate());
                        const month = shortMonth.format(selectedDate);
                        setDateCheckIn(date + ' ' + month);
                        setOriginalDateCheckOut(
                          new Date(
                            selectedDate.setDate(selectedDate.getDate() + 1),
                          ),
                        );
                      } else {
                        setOpenCheckin(false);
                      }
                    }}
                  />
                )}
              </View>
              <Text style={{fontSize: 20, color: colors.black}}>-</Text>
              <View>
                <Button
                  title={checkOut}
                  onPress={checkOutButton}
                  color={colors.yellow}
                  width={120}
                />
                {openCheckout && (
                  <DateTimePicker
                    value={originalDateCheckOut}
                    mode={'date'}
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    minimumDate={originalDateCheckIn}
                    onChange={(event, selectedDate) => {
                      if (event.type == 'set') {
                        setOpenCheckout(false);
                        setOriginalDateCheckOut(selectedDate);
                        setInputCheckOut(formatDate(selectedDate));
                        setCheckOut(selectedDate.toLocaleDateString('pt-PT'));
                        const month = shortMonth.format(new Date(selectedDate));
                        const day = String(selectedDate.getDate());
                        setDateCheckOut(day + ' ' + month);
                      } else {
                        setOpenCheckout(false);
                      }
                    }}
                  />
                )}
              </View>
            </View>
            <View style={{marginBottom: 10}}>
              <Button
                title={`${guest} Guest & ${room} Room`}
                color={colors.yellow}
                onPress={() => setOpenModal(true)}
              />
            </View>
            <InputModal
              guest={guest}
              room={room}
              buttonMinRoom={() => setRoom(room - 1)}
              buttonPlusRoom={() => setRoom(room + 1)}
              buttonMinGuest={() => setGuest(guest - 1)}
              buttonPlusGuest={() => setGuest(guest + 1)}
              onRequestClose={() => setOpenModal(!openModal)}
              onPressOk={() => {
                setOpenModal(false);
              }}
              visible={openModal}
            />
            <Button
              title="Search"
              color={colors.darkBlue}
              onPress={searchButton}
            />
          </View>
        </View>
        <View style={{marginLeft: 20}}>
          <Destination title="Top Destinations" data={DataTop} />
          <View>
            <Artikel />
          </View>
          <Destination title="Popular Destinations" data={DataPopular} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.darkBlue,
    width: 280,
    marginTop: 30,
  },
  boxSearch: {
    backgroundColor: colors.grey,
    padding: 20,
    marginTop: 30,
    borderRadius: 20,
  },
});
