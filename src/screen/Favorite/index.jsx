import {useSelector} from 'react-redux';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import HotelCard from '../../component/molecules/HotelCard';
import {colors} from '../../utils';
import {PageUndifined} from '../../component/molecules';
import {formatDate} from '../../utils/formatDate';

const today = new Date();
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

export default function Favorite({navigation}) {
  const user = useSelector(state => state?.login?.user);
  const favorites = useSelector(
    state => state?.favorite?.favorites[user?.username],
  );

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
            Favorite
          </Text>
        </View>
        <ScrollView>
          <View style={styles.page}>
            {favorites ? (
              <View style={{marginTop: 15}}>
                {favorites?.map(item => (
                  <HotelCard
                    key={item?.hotelId}
                    hotelName={item?.hotelName}
                    hotelId={item?.hotelId}
                    image={item?.image}
                    price={item?.price}
                    reviewScore={item?.reviewScore}
                    reviewTotal={item?.reviewTotal}
                    guests={item?.guests}
                    rooms={item?.rooms}
                    address={item?.address}
                    onPress={() =>
                      navigation.navigate('DetailHotel', {
                        hotel_id: item?.hotelId,
                        checkIn: formatDate(today),
                        checkOut: formatDate(tomorrow),
                        guests: item?.guests,
                        rooms: item?.rooms,
                        image: item?.image,
                      })
                    }
                  />
                ))}
              </View>
            ) : (
              <View
                style={{
                  padding: 20,
                }}>
                <Text style={styles.title}>Belum Ada Hotel Favorite</Text>
                <Text style={styles.description}>
                  kamu belum memilih hotel favorite, hotel favorite akan muncul
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
        <PageUndifined type="not login" namePage="Favorite" />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    justifyContent: 'center',
    flex: 1,
    marginBottom: 60,
    margin: 10,
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
