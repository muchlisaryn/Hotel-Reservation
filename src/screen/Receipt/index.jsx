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
import Ionicons from 'react-native-vector-icons/Ionicons';
import BookHistoryCard from '../../component/molecules/BookHistoryCard';
import {Button} from '../../component/atoms';

export default function Receipt({navigation}) {
  const user = useSelector(state => state?.login?.user);
  const bookHistories = useSelector(
    state => state?.bookHistory.bookHistories[user?.username],
  );

  console.log(bookHistories);

  if (user) {
    return (
      <SafeAreaView>
        <View style={{backgroundColor: colors.darkBlue, padding: 20}}>
          <Text
            style={{
              color: colors.white,
              fontSize: 18,
              fontWeight: '700',
              textAlign: 'center',
            }}>
            Booking History
          </Text>
        </View>
        <ScrollView>
          <View style={{margin: 20, marginBottom: 60}}>
            {bookHistories ? (
              <View style={{marginTop: 15}}>
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
              <View style={{marginTop: 50}}>
                <Text
                  style={{
                    color: colors.black,
                    fontSize: 18,
                    fontStyle: 'italic',
                    textAlign: 'center',
                  }}>
                  Empty~
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={{flex: 1, margin: 20}}>
        <View style={[styles.profileBox, {marginBottom: 10}]}>
          <Text style={[styles.textHeader(colors.black), {marginBottom: 5}]}>
            Booking History
          </Text>
          <Text style={styles.text(colors.black)}>
            Sign in to see your booking history
          </Text>
        </View>
        <Button
          title="Sign in"
          color={colors.darkBlue}
          onPress={() => navigation.navigate('Sign')}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
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
