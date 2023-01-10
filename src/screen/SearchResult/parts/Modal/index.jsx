import {View, Text, Modal, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {colors} from '../../../../utils';
import {Gap} from '../../../../component/atoms';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import {formatDate, shortMonth} from '../../../../utils/formatDate';

export default function ModalEdit({
  visible,
  onRequestClose,
  plusGuest,
  onPressCancel,
  guest,
  search,
  minGuest,
  plusRooms,
  minRooms,
  rooms,
  checkIn,
  checkOut,
  setNewCheckOut,
  setNewCheckIn,
  setNewDateCheckIn,
  setNewDateCheckOut,
}) {
  const date = new Date();
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 1);
  const [minimumDate, setMinimumDate] = useState(date);
  const [openCheckin, setOpenCheckin] = useState(false);
  const [openCheckout, setOpenCheckOut] = useState(false);
  const [titleCheckIn, setTitleCheckIn] = useState(checkIn);
  const [titleCheckOut, setTitleCheckOut] = useState(checkOut);

  console.log('=>', titleCheckOut);

  useEffect(() => {
    if (titleCheckIn > titleCheckOut) {
      setTitleCheckOut('Check Out');
    }
  });

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text
            style={{
              marginBottom: 20,
              textAlign: 'center',
              color: colors.white,
              fontSize: 15,
            }}>
            Ubah Pencarian
          </Text>
          <View style={styles.optionView}>
            <View>
              <Text style={{marginBottom: 5, color: colors.white}}>
                Check In
              </Text>
              <TouchableOpacity
                style={styles.buttonDate}
                onPress={() => setOpenCheckin(true)}>
                <Ionicons
                  name="calendar-outline"
                  style={{fontSize: 20, marginRight: 10}}
                />
                <Text>{titleCheckIn}</Text>
              </TouchableOpacity>
            </View>
            {openCheckin && (
              <DateTimePicker
                value={date}
                mode={'date'}
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                minimumDate={date}
                maximumDate={maxDate}
                onChange={(event, selectedDate) => {
                  if (event.type == 'set') {
                    setOpenCheckin(false);
                    setNewCheckIn(formatDate(selectedDate));
                    setTitleCheckIn(selectedDate.toLocaleDateString('pt-PT'));
                    const date = String(selectedDate.getDate());
                    const month = shortMonth.format(selectedDate);
                    setNewDateCheckIn(date + ' ' + month);
                    setMinimumDate(
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
            <Text style={{color: colors.white, marginTop: 10}}>-</Text>
            <View>
              <Text style={{marginBottom: 5, color: colors.white}}>
                Check Out
              </Text>
              <TouchableOpacity
                style={styles.buttonDate}
                onPress={() => setOpenCheckOut(true)}>
                <Ionicons
                  name="calendar-outline"
                  style={{fontSize: 20, marginRight: 10}}
                />
                <Text>{titleCheckOut}</Text>
              </TouchableOpacity>
            </View>
            {openCheckout && (
              <DateTimePicker
                value={minimumDate}
                mode={'date'}
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                minimumDate={minimumDate}
                onChange={(event, selectedDate) => {
                  if (event.type == 'set') {
                    setOpenCheckOut(false);
                    setNewCheckOut(formatDate(selectedDate));
                    setTitleCheckOut(selectedDate.toLocaleDateString('pt-PT'));
                    const month = shortMonth.format(new Date(selectedDate));
                    const day = String(selectedDate.getDate());
                    setNewDateCheckOut(day + ' ' + month);
                    console.log('test => ', month, day);
                  } else {
                    setOpenCheckOut(false);
                  }
                }}
              />
            )}
          </View>
          <View style={styles.optionView}>
            <Text style={styles.title}>Rooms</Text>
            <View style={styles.option}>
              <TouchableOpacity
                style={styles.Button}
                disabled={rooms === 0 ? true : false}
                onPress={minRooms}>
                <Text style={styles.textButton}>-</Text>
              </TouchableOpacity>
              <Text style={{color: colors.white, paddingHorizontal: 20}}>
                {rooms}
              </Text>
              <TouchableOpacity
                style={styles.Button}
                disabled={rooms === 8 ? true : false}
                onPress={plusRooms}>
                <Text style={styles.textButton}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.optionView}>
            <Text style={styles.title}>Guest</Text>
            <View style={styles.option}>
              <TouchableOpacity
                style={styles.Button}
                disabled={guest === 0 ? true : false}
                onPress={minGuest}>
                <Text style={styles.textButton}>-</Text>
              </TouchableOpacity>
              <Text style={{color: colors.white, paddingHorizontal: 20}}>
                {guest}
              </Text>
              <TouchableOpacity
                style={styles.Button}
                disabled={guest === 32 ? true : false}
                onPress={plusGuest}>
                <Text style={styles.textButton}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{marginTop: 20}}>
            <TouchableOpacity
              onPress={search}
              style={{
                backgroundColor: colors.yellow,
                padding: 10,
                borderRadius: 10,
              }}>
              <Text style={{textAlign: 'center', color: colors.black}}>
                Search
              </Text>
            </TouchableOpacity>
            <Gap height={10} />
            <TouchableOpacity
              style={{
                backgroundColor: colors.white,
                padding: 10,
                borderRadius: 10,
              }}
              onPress={onPressCancel}>
              <Text style={{textAlign: 'center', color: colors.black}}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  Button: {
    backgroundColor: colors.white,
    borderColor: colors.darkGrey,
    borderWidth: 1,
    borderRadius: 99,
    padding: 8,
    paddingHorizontal: 14,
  },
  buttonDate: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: colors.darkBlue,
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '85%',
  },
  optionView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: colors.yellow,
    padding: 9,
    borderRadius: 10,
    flex: 1,
  },
  textButton: {
    textAlign: 'center',
    color: colors.black,
  },
  title: {
    color: colors.white,
    textAlign: 'center',
    fontSize: 15,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
