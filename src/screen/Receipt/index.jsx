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
import {useSelector} from 'react-redux';
import BookHistoryCard from '../../component/molecules/BookHistoryCard';
import {PageUndifined} from '../../component/molecules';

export default function Receipt({navigation}) {
  const user = useSelector(state => state?.login?.user);
  const bookHistories = useSelector(
    state => state?.bookHistory.bookHistories[user?.username],
  );

  console.log(bookHistories);

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
        <ScrollView>
          <View style={styles.page}>
            {bookHistories ? (
              <View style={{padding: 20}}>
                {bookHistories?.map(item => (
                  <BookHistoryCard
                    key={item?.book_id}
                    onPress={() =>
                      navigation.navigate('Invoice', {
                        book_id: item?.book_id,
                        afterCheckout: false,
                      })
                    }
                    hotel_name={item?.hotel_name}
                    stay_length={item?.stay_length}
                    checkIn={item?.checkIn}
                    checkOut={item?.checkOut}
                    price={item?.price}
                    mainImage={item?.mainImage}
                    transaction={item?.transaction_time}
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
