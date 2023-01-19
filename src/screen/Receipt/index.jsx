import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  RefreshControl,
} from 'react-native';
import {colors} from '../../utils';
import {useDispatch, useSelector} from 'react-redux';
import BookHistoryCard from '../../component/molecules/BookHistoryCard';
import {PageUndifined} from '../../component/molecules';
import {useState} from 'react';
import {fetchOrder} from '../../features/orderHistorySlice';
import {useEffect, useCallback} from 'react';
import {convertDate, lengthOfDay, localDate} from '../../utils/formatDate';

export default function Receipt({navigation}) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const order = useSelector(state => state.allOrder.allOrder);

  useEffect(() => {
    dispatch(fetchOrder());
  }, []);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  if (user) {
    return (
      <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
        <View style={{backgroundColor: colors.darkBlue, padding: 20}}>
          <Text
            style={{
              color: colors.white,
              fontSize: 18,
              fontWeight: '700',
              textAlign: 'center',
            }}>
            Riwayat Transaksi
          </Text>
        </View>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View style={styles.page}>
            {order ? (
              <View style={{padding: 20}}>
                {order?.map(item => (
                  <BookHistoryCard
                    onPress={() =>
                      navigation.navigate('Invoice', {
                        id: item?._id,
                        statusOrder: item?.statusOrder,
                        statusPayment: item?.statusPayment,
                        checkIn: convertDate(item?.checkIn),
                        checkOut: convertDate(item?.checkOut),
                      })
                    }
                    transaction={item?.transaction_time}
                    statusPayment={item?.statusPayment}
                    price={item?.Total_payment}
                    hotel_name={item?.hotelName}
                    checkIn={item?.checkIn}
                    checkOut={item?.checkOut}
                  />
                ))}
              </View>
            ) : (
              <View
                style={{
                  padding: 20,
                }}>
                <Text style={styles.title}>Belum Ada Riwayat Transaksi</Text>
                <Text style={styles.description}>
                  kamu belum melakukan transaksi, riwayat tarnsaksi akan muncul
                  disini
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: colors.white,
        }}>
        <PageUndifined type="not login" namePage="Booking History" />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    justifyContent: 'center',
    flex: 1,
    marginBottom: 60,
  },
  title: {
    color: colors.black,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
    fontSize: 13,
    marginTop: 8,
  },
  profileBox: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  profile: {
    flexDirection: 'row',
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.darkGrey,
  },
  quantity: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  imgBorder: {
    borderRadius: 99,
    borderWidth: 3,
    borderColor: colors.darkBlue,
  },
  img: {
    height: 75,
    width: 75,
    borderRadius: 99,
  },
  textHeader: color => ({
    fontSize: 16,
    fontWeight: '700',
    color: color,
  }),
  text: color => ({
    fontSize: 15,
    color: color,
  }),
});
