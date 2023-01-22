import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {Button} from '../../component/atoms';
import {ErrorIlustration, Ilustration2} from '../../assets/img';
import {colors} from '../../utils';
import {useDispatch, useSelector} from 'react-redux';
import {order} from '../../features/bookingSlice';
import axios from 'axios';

export default function BookingSuccess({route, navigation}) {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.order.loading);
  const error = useSelector(state => state.order.error);

  const {
    hotel_id,
    hotel_name,
    city,
    address,
    customerID,
    guest,
    order_id,
    codeBooking,
    countRoom,
    countPerson,
    name_room,
    DateCheckIn,
    DateCheckOut,
    price,
    imagePayment,
    transaction_time,
  } = route.params;

  useEffect(() => {
    dispatch(
      order({
        customerID,
        guest,
        imagePayment,
        order_id,
        hotel_id,
        codeBooking,
        hotel_name,
        address_hotel: address,
        countRoom,
        countPerson,
        name_room,
        DateCheckIn,
        DateCheckOut,
        price,
        charge_pay: price,
        transaction_time,
      }),
    );
  }, []);

  if (error) {
    return (
      <View style={styles.page}>
        <View style={styles.container}>
          <ErrorIlustration />
          <View style={{marginVertical: 15}}>
            <Text style={styles.title}>Sorry Booking Failed</Text>
            <Text style={styles.description}>
              Server error Please try again later.
            </Text>
          </View>
        </View>
        <Button
          title="Back to home"
          onPress={() => navigation.navigate('Home')}
          color={colors.yellow}
        />
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.page}>
        <View style={styles.container}>
          <View style={{marginVertical: 15}}>
            <Text>Loading...</Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <Ilustration2 />
        <View style={{marginVertical: 15}}>
          <Text style={styles.title}>The Hold Booking We Successful!!</Text>
          <Text style={styles.description}>
            this booking will be held until date {transaction_time}
          </Text>
        </View>
      </View>
      <Button
        title="Back to home"
        onPress={() => navigation.navigate('Home')}
        color={colors.yellow}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.darkBlue,
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  container: {
    alignItems: 'center',
  },
  title: {
    color: colors.white,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  description: {
    color: colors.white,
    fontSize: 12,
    textAlign: 'center',
    marginTop: 10,
  },
});
