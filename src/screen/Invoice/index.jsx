import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import {colors, formatIDR} from '../../utils';
import {Header} from '../../component/molecules';
import {useDispatch, useSelector} from 'react-redux';
import {useState, useEffect, useCallback} from 'react';
import {fetchOrderOne} from '../../features/getOneBooking';
import {lengthOfDay} from '../../utils/formatDate';
import ModalShowPayment from './modalShowPayment';

export default function Invoice({route, navigation}) {
  const [colorStatus, setColorStatus] = useState(colors.yellow);
  const {currentStatus, statusOrder, id, checkIn, checkOut, lengthDay} =
    route.params;
  const [modalVisible, setModalVisible] = useState(false);

  const order = useSelector(state => state.oneOrder.order);

  console.log('status Order', statusOrder);
  console.log('order', order);
  const dispatch = useDispatch();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    if (statusOrder === 'Sedang di verifikasi') {
      setColorStatus(colors.darkBlue);
    } else if (statusOrder === 'Berhasil di verifikasi') {
      setColorStatus(colors.darkGreen);
    } else if (statusOrder === 'Ditolak') {
      setColorStatus(colors.red);
    }
  }, []);

  useEffect(() => {
    dispatch(fetchOrderOne(id));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{padding: 20, backgroundColor: colors.darkBlue}}>
        <Header
          title={`Order ID : # ${order?.order_id}`}
          onPress={() => navigation.goBack()}
        />
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View>
          <View style={{padding: 15}}>
            <Text numberOfLines={2} style={styles.textHeader}>
              {order?.hotel_name}
            </Text>

            {currentStatus === 'Berhasil' ? (
              <>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: colors.darkBlue,
                    padding: 5,
                    borderRadius: 10,
                  }}>
                  <Text style={styles.text(colors.white)}>Kode Booking:</Text>
                  <Text style={styles.invoiceId}>{order?.codeBooking}</Text>
                </View>
              </>
            ) : (
              <></>
            )}

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
                  {order?.transaction_time}
                </Text>
              </View>

              <View style={styles.rowContainer}>
                <Text style={styles.text(colors.darkGrey)}>Total Payment:</Text>
                <Text
                  style={[
                    styles.text(colors.black),
                    {flex: 1, textAlign: 'right', fontWeight: '800'},
                  ]}>
                  {formatIDR.format(order?.Total_payment)}
                </Text>
              </View>

              <View style={styles.rowContainer}>
                <Text style={styles.text(colors.darkGrey)}>
                  Bukti Pembayaran
                </Text>
                <Text
                  onPress={() => setModalVisible(true)}
                  style={[
                    styles.text(colors.darkBlue),
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
                  Status Pemesanan
                </Text>
                <Text
                  style={[
                    styles.text(colors.darkGrey),
                    {flex: 1, textAlign: 'right', fontWeight: 'bold'},
                  ]}>
                  {order?.currentStatus}
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
                  {checkIn} - {checkOut} ({lengthDay} Days)
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
                  {order?.countPerson} Orang | {order?.countRoom} Kamar
                </Text>
              </View>

              <View style={styles.rowContainer}>
                <Text style={styles.text(colors.darkGrey)}>Nama Kamar:</Text>
                <Text
                  style={[
                    styles.text(colors.black),
                    {flex: 1, textAlign: 'right', paddingStart: 2},
                  ]}>
                  {order?.name_room}
                </Text>
              </View>
            </View>

            <View style={styles.card}>
              <Text style={{color: colors.black, fontWeight: '600'}}>
                DATA TAMU
              </Text>

              <View style={styles.rowContainer}>
                <Text style={styles.text(colors.darkGrey)}>Nama</Text>
                <Text
                  style={[
                    styles.text(colors.black),
                    {flex: 1, textAlign: 'right'},
                  ]}>
                  {order?.guest?.name}
                </Text>
              </View>

              <View style={styles.rowContainer}>
                <Text style={styles.text(colors.darkGrey)}>No Telephone</Text>
                <Text
                  style={[
                    styles.text(colors.black),
                    {flex: 1, textAlign: 'right'},
                  ]}>
                  {order?.guest?.telephone}
                </Text>
              </View>

              <View style={styles.rowContainer}>
                <Text style={styles.text(colors.darkGrey)}>Email</Text>
                <Text
                  style={[
                    styles.text(colors.black),
                    {flex: 1, textAlign: 'right', paddingStart: 2},
                  ]}>
                  {order?.guest?.email}
                </Text>
              </View>
            </View>
          </View>
          <ModalShowPayment
            visible={modalVisible}
            imagePay={order?.image_payment?.name}
            onPressCancel={() => {
              setModalVisible(false);
            }}
            onRequestClose={() => setModalVisible(!modalVisible)}
          />
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
    textAlign: 'center',
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
