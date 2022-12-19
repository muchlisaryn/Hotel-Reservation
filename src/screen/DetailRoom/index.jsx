import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import React from 'react';
import {Header} from '../../component/molecules';
import {colors, formatIDR} from '../../utils';
import {Button} from '../../component/atoms';

export default function DetailRoom({route, navigation}) {
  const {
    name_room,
    price,
    bed_type,
    image,
    room,
    person,
    checkIn,
    checkOut,
    detail_room,
    mainImage
  } = route.params;

  console.log(detail_room);
  return (
    <SafeAreaView style={styles.page}>
      <ScrollView>
        <View>
          <Image
            source={{
              uri: image[1] ? image[1]?.url_original : image[0]?.url_original,
            }}
            style={styles.image}
          />
          <View style={styles.buttonBack}>
            <Header
              numberOfLines={1}
              color={colors.white}
              onPress={() => navigation.goBack()}
            />
          </View>
        </View>
        <View style={{paddingBottom: 80}}>
          <View style={styles.roomDescription}>
            <Text style={styles.nameRoom}>{name_room}</Text>
            <View style={{flexDirection: 'row', marginTop: 5}}>
              <View style={{flexDirection: 'row'}}>
                <Button
                  type="icon"
                  color={colors.darkGrey}
                  icon={'person-outline'}
                  size={15}
                />
                <Text style={{color: colors.darkGrey}}>{person} Guest</Text>
              </View>
              <Text style={{marginHorizontal: 10}}>|</Text>
              <View style={{flexDirection: 'row'}}>
                <Button
                  type="icon"
                  color={colors.darkGrey}
                  icon={'bed-outline'}
                  size={18}
                />
                <Text style={{color: colors.darkGrey}}>{bed_type}</Text>
              </View>
            </View>
          </View>
          <View style={styles.facilities}>
            <ScrollView horizontal={true}>
              {detail_room?.highlights?.map((item, index) => (
                <Text key={index} style={styles.facilitiesTitle}>
                  {item?.translated_name}
                </Text>
              ))}
            </ScrollView>
          </View>
          <View style={styles.contentImage}>
            <Text style={styles.title}>Photos</Text>
            <ScrollView horizontal={true}>
              {image?.map((item, index) => (
                <Image
                  key={index}
                  source={{
                    uri: item.url_original,
                  }}
                  style={styles.imageRoom}
                />
              ))}
            </ScrollView>
          </View>
          <View style={styles.container}>
            <Text style={styles.title}>Description</Text>
            <Text style={{ color: colors.darkGrey }}>{detail_room?.description}</Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.SelectRoom}>
        <View>
          <Text
            style={{
              color: colors.yellow,
              fontWeight: 'bold',
              fontSize: 15,
            }}>
            {formatIDR.format(price)}
            <Text
              style={{
                color: colors.white,
                fontWeight: 'normal',
                fontSize: 10,
              }}>
              /malam
            </Text>
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Button
              type="icon"
              color={colors.white}
              icon={'bed-outline'}
              size={18}
            />
            <Text style={{color: colors.white, marginLeft: 5}}>{bed_type}</Text>
          </View>
        </View>
        <Button
          title="Book Now"
          color={colors.yellow}
          size={10}
          width={100}
          onPress={() =>
            navigation.navigate('Booking', {
              price: price,
              bed_type: bed_type,
              room: room,
              person: person,
              checkIn: checkIn,
              checkOut: checkOut,
              name_room: name_room,
              image: image[1]?.url_original,
              mainImage
            })
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  facilities: {
    marginBottom: 20,
    paddingLeft: 20,
  },
  facilitiesTitle: {
    color: colors.darkBlue,
    backgroundColor: colors.yellow,
    paddingVertical: 5,
    marginRight: 5,
    borderRadius: 10,
    paddingHorizontal: 8,
  },
  title: {
    fontSize: 15,
    color: colors.darkBlue,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  roomDescription: {
    padding: 20,
  },
  imageRoom: {
    width: 120,
    height: 120,
    marginRight: 5,
    borderRadius: 10,
  },
  image: {
    width: '100%',
    height: 240,
  },
  contentImage: {
    paddingLeft: 20,
  },
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
  nameRoom: {
    fontWeight: 'bold',
    fontSize: 18,
    color: colors.darkBlue,
  },
  SelectRoom: {
    margin: 15,
    borderRadius: 10,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.darkBlue,
    alignItems: 'center',
    padding: 10,
    left: 0,
    right: 0,
    bottom: 0,
  },
  buttonBack: {
    position: 'absolute',
    padding: 10,
    margin: 10,
  },
});
