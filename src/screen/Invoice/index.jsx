import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList,
  Image,
} from 'react-native';
import {colors} from '../../utils';
import {Button} from '../../component/atoms';
import {Header} from '../../component/molecules';
import {useSelector} from 'react-redux';

export default function Invoice({route, navigation}) {
  const {book_id, afterCheckout} = route.params;
  const user = useSelector(state => state.login.user);
  const bookHistory = useSelector(
    state => state.bookHistory.bookHistories[user.username],
  );
  const bookHistoryById = bookHistory.find(item => item.book_id === book_id);
  const imageResize = img => img?.replace('square60', 'max500');

  console.log(bookHistoryById);
  return (
    <SafeAreaView style={styles.container}>
      <View style={{padding: 20, backgroundColor: colors.darkBlue}}>
        <Header
          title="Invoice"
          onPress={() =>
            afterCheckout ? navigation.navigate('main') : navigation.goBack()
          }
        />
      </View>
      <ScrollView>
        <View>
          <Image
            source={{
              uri: imageResize(bookHistoryById.mainImage),
            }}
            style={styles.img}
          />
          <View style={{padding: 15}}>
            <Text numberOfLines={2} style={styles.textHeader}>
              {bookHistoryById.hotel_name}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: colors.darkBlue,
                padding: 5,
                borderRadius: 10,
              }}>
              <Text style={styles.text(colors.white)}>Booking ID:</Text>
              <Text style={styles.invoiceId}>{bookHistoryById.book_id}</Text>
            </View>
            <View style={styles.rowContainer}>
              <Text style={styles.text(colors.darkGrey)}>
                Transaction Time:
              </Text>
              <Text
                style={[
                  styles.text(colors.black),
                  {flex: 1, textAlign: 'right', color: colors.black},
                ]}>
                {bookHistoryById.transaction_time}
              </Text>
            </View>

            <View style={styles.rowContainer}>
              <Text style={styles.text(colors.darkGrey)}>Check In Date:</Text>
              <Text
                style={[
                  styles.text(colors.black),
                  {flex: 1, textAlign: 'right'},
                ]}>
                {bookHistoryById.checkIn}
              </Text>
            </View>
            <View style={styles.rowContainer}>
              <Text style={styles.text(colors.darkGrey)}>Check Out Date:</Text>
              <Text
                style={[
                  styles.text(colors.black),
                  {flex: 1, textAlign: 'right'},
                ]}>
                {bookHistoryById.checkOut}
              </Text>
            </View>
            <View style={styles.rowContainer}>
              <Text style={styles.text(colors.darkGrey)}>Length of Stay:</Text>
              <Text
                style={[
                  styles.text(colors.black),
                  {flex: 1, textAlign: 'right'},
                ]}>
                {bookHistoryById.stay_length} days
              </Text>
            </View>
            <View style={styles.rowContainer}>
              <Text style={styles.text(colors.darkGrey)}>Total Guests:</Text>
              <Text
                style={[
                  styles.text(colors.black),
                  {flex: 1, textAlign: 'right'},
                ]}>
                {bookHistoryById.person} guests
              </Text>
            </View>
            <View style={styles.rowContainer}>
              <Text style={styles.text(colors.darkGrey)}>Room Name:</Text>
              <Text
                style={[
                  styles.text(colors.black),
                  {flex: 1, textAlign: 'right'},
                ]}>
                {bookHistoryById.name_room}
              </Text>
            </View>
            <View style={styles.rowContainer}>
              <Text style={styles.text(colors.darkGrey)}>Total Payment:</Text>
              <Text
                style={[
                  styles.text(colors.black),
                  {flex: 1, textAlign: 'right', fontWeight: '800'},
                ]}>
                {bookHistoryById.price}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  img: {
    width: '100%',
    height: 160,
  },
  textHeader: {
    color: colors.black,
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: colors.grey,
    paddingVertical: 15,
  },
  text: color => ({
    color: color,
    fontSize: 14,
  }),
  invoiceId: {
    fontWeight: 'bold',
    color: colors.darkBlue,
    backgroundColor: colors.yellow,
    padding: 8,
    borderRadius: 10,
  },
});
