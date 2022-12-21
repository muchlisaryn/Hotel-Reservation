import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {Button} from '../../component/atoms';
import {Ilustration2} from '../../assets/img';
import {colors} from '../../utils';

export default function BookingSuccess({route, navigation}) {
  const {transaction_time} = route.params;
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
