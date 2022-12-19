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
  Pressable,
} from 'react-native';
import {colors} from '../../../utils';

export default function BookHistoryCard({
  onPress,
  hotel_name,
  stay_length,
  checkIn,
  checkOut,
  price,
  mainImage,
  transaction,
}) {
  const imageResize = mainImage?.replace('square60', 'max500');
  return (
    <View style={styles.container}>
      <Pressable
        style={({pressed}) => [
          {backgroundColor: pressed ? '#e5e5e5' : 'white', borderRadius: 10},
        ]}
        onPress={onPress}>
        <Image
          source={{
            uri: imageResize,
          }}
          style={styles.img}
        />
        <View style={styles.transactionDate}>
          <Text style={{color: colors.white}}>
            Transaction Date {transaction}
          </Text>
        </View>
        <View style={{padding: 10}}>
          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
            <View>
              <Text numberOfLines={2} style={styles.name}>
                {hotel_name}
              </Text>
            </View>
            <View>
              <Text style={styles.text(colors.darkBlue)}>{price}</Text>
            </View>
          </View>
          <Text
            style={{color: colors.darkGrey, fontSize: 12, fontWeight: '400'}}>
            {checkIn} - {checkOut} ({stay_length} days)
          </Text>
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
});
