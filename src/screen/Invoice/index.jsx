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
import {useState, useEffect} from 'react';

export default function Invoice({route, navigation}) {
  const [statusOrder, setStatusOrder] = useState('Sedang di verifikasi');
  const [colorStatus, setColorStatus] = useState(colors.yellow);
  const {book_id, afterCheckout} = route.params;
  const user = useSelector(state => state.login.user);
  const bookHistory = useSelector(
    state => state.bookHistory.bookHistories[user.username],
  );
  const bookHistoryById = bookHistory.find(item => item.book_id === book_id);
  const imageResize = img => img?.replace('square60', 'max500');

  useEffect(() => {
    if (statusOrder === 'Sedang di verifikasi') {
      setColorStatus(colors.darkBlue);
    } else if (statusOrder === 'Berhasil di verifikasi') {
      setColorStatus(colors.yellow);
    } else if (statusOrder === 'Ditolak') {
      setColorStatus(colors.yellow);
    }
  }, []);

  console.log(bookHistoryById);
  return (
    <SafeAreaView style={styles.container}>
      <View style={{padding: 20, backgroundColor: colors.darkBlue}}>
        <Header
          title={`Order ID : #${bookHistoryById.order_id}`}
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

            <View style={styles.card}>
              <Text style={{color: colors.black, fontWeight: '600'}}>
                DETAIL ORDER
              </Text>
              <View style={styles.rowContainer}>
                <Text style={styles.text(colors.darkGrey)}>
                  Tanggal Pembayaran:
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
                <Text style={styles.text(colors.darkGrey)}>Total Payment:</Text>
                <Text
                  style={[
                    styles.text(colors.black),
                    {flex: 1, textAlign: 'right', fontWeight: '800'},
                  ]}>
                  {bookHistoryById.price}
                </Text>
              </View>

              <View style={styles.rowContainer}>
                <Text style={styles.text(colors.darkGrey)}>
                  Bukti Pembayaran
                </Text>
                <Text
                  style={[
                    styles.text(colorStatus),
                    {
                      flex: 1,
                      textAlign: 'right',
                    },
                  ]}>
                  Lihat disini
                </Text>
              </View>

              <View style={styles.rowContainer}>
                <Text style={styles.text(colors.darkGrey)}>
                  Status Pembayaran
                </Text>
                <Text
                  style={[
                    styles.text(colorStatus),
                    {flex: 1, textAlign: 'right', fontWeight: 'bold'},
                  ]}>
                  {statusOrder}
                </Text>
              </View>
            </View>

            <View style={styles.card}>
              <Text style={{color: colors.black, fontWeight: '600'}}>
                DETAIL RESERVASI
              </Text>

              <View style={styles.rowContainer}>
                <Text style={styles.text(colors.darkGrey)}>Tanggal</Text>
                <Text
                  style={[
                    styles.text(colors.black),
                    {flex: 1, textAlign: 'right'},
                  ]}>
                  {bookHistoryById.checkIn} - {bookHistoryById.checkOut}{' '}
                  {`(${bookHistoryById.stay_length} Days)`}
                </Text>
              </View>

              <View style={styles.rowContainer}>
                <Text style={styles.text(colors.darkGrey)}>
                  Jumlah Tamu & Kamar:
                </Text>
                <Text
                  style={[
                    styles.text(colors.black),
                    {flex: 1, textAlign: 'right'},
                  ]}>
                  {bookHistoryById.person} Orang | {bookHistoryById.room} Kamar
                </Text>
              </View>

              <View style={styles.rowContainer}>
                <Text style={styles.text(colors.darkGrey)}>Nama Kamar:</Text>
                <Text
                  style={[
                    styles.text(colors.black),
                    {flex: 1, textAlign: 'right'},
                  ]}>
                  {bookHistoryById.name_room}
                </Text>
              </View>
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
  card: {
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.darkGrey,
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
