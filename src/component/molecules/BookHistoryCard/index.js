import {useState} from 'react';
import {StyleSheet, Text, View, Pressable} from 'react-native';
import {colors} from '../../../utils';
import {convertDate} from '../../../utils/formatDate';

export default function BookHistoryCard({
  onPress,
  hotel_name,
  stay_length,
  checkIn,
  checkOut,
  price,
  transaction,
  statusOrder,
  statusPayment,
}) {
  return (
    <View style={styles.container}>
      <Pressable
        style={({pressed}) => [
          {backgroundColor: pressed ? '#e5e5e5' : 'white', borderRadius: 10},
        ]}
        onPress={onPress}>
        <View style={styles.transactionDate}>
          <Text style={{color: colors.white}}>
            Transaction Date {transaction}
          </Text>
        </View>
        <View style={{padding: 10}}>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              paddingTop: 22,
            }}>
            <View>
              <Text numberOfLines={2} style={styles.name}>
                {hotel_name}
              </Text>
            </View>
            <View>
              <Text style={styles.text(colors.darkBlue)}>{price}</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text
              style={{color: colors.darkGrey, fontSize: 12, fontWeight: '400'}}>
              {convertDate(checkIn)} - {convertDate(checkOut)} ({stay_length}{' '}
              days)
            </Text>

            {statusPayment === 'Sedang di verifikasi' ? (
              <Text>{statusPayment}</Text>
            ) : (
              <>
                {statusOrder ? (
                  <Text style={styles.statusOrder(colors.darkGreen)}>
                    Aktif
                  </Text>
                ) : (
                  <Text style={styles.statusOrder(colors.red)}>Selesai</Text>
                )}
              </>
            )}
          </View>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    backgroundColor: colors.white,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  img: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: '100%',
    height: 100,
  },
  name: {
    color: colors.black,
    maxWidth: 200,
  },
  text: color => ({
    color: color,
    fontSize: 12,
    fontWeight: '400',
  }),
  transactionDate: {
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    padding: 5,
    backgroundColor: colors.darkBlue,
    borderTopStartRadius: 10,
    borderBottomEndRadius: 10,
  },
  statusOrder: color => ({
    color: color,
    backgroundColor:
      color === colors.red ? colors.primaryRed : colors.primaryGreen,
    paddingHorizontal: 4,
    borderRadius: 4,
  }),
});
