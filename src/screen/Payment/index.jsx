import {View, Text, Image, Platform, StyleSheet, Pressable} from 'react-native';
import React, {useState} from 'react';
import {Button} from '../../component/atoms';
import {launchImageLibrary} from 'react-native-image-picker';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Header} from '../../component/molecules';
import {colors} from '../../utils';
import {ScrollView} from 'react-native-gesture-handler';
import {UploadPhoto} from '../../assets/img';
import {useDispatch, useSelector} from 'react-redux';
import {addBookHistory} from '../../features/bookHistorySlice';
import axios from 'axios';

export default function Payment({route, navigation}) {
  const {
    username,
    mainImage,
    hotel_name,
    book_id,
    order_id,
    stay_length,
    checkIn,
    checkOut,
    person,
    room,
    name_room,
    price,
    transaction_time,
  } = route.params;
  const [photo, setPhoto] = useState(null);
  const [photoPayment, setPhotoPayment] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

  console.log(photoPayment);

  const uploadPayment = () => {
    let formData = new FormData();
    formData.append('payment', photoPayment);
    axios
      .post(`${process.env.REACT_APP_URL_SERVER}/cms/images/payment`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      })
      .then(res => {
        console.log('alhamdulilah', res);
      })
      .catch(err => {
        console.log('WHY ?? kok bisa', err);
      });

    // const res = await axios.post(
    //   `${process.env.REACT_APP_URL_SERVER}/cms/images`,
    //   formData,
    //   true,
    // );
    // return res;
  };

  const handleChoosePhoto = () => {
    launchImageLibrary({noData: true}, response => {
      console.log('res', response.assets[0]);
      if (response) {
        setPhotoPayment(response.assets);
        setPhoto(response);
      }
    });
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <View
        style={{
          backgroundColor: colors.darkBlue,
          paddingHorizontal: 10,
          paddingVertical: 20,
        }}>
        <Header title="Payment" onPress={() => navigation.goBack()} />
      </View>
      <ScrollView>
        <View style={{paddingHorizontal: 20}}>
          <View style={styles.box}>
            <Image
              source={{
                uri: 'https://buatlogoonline.com/wp-content/uploads/2022/10/Logo-Bank-BCA-1.png',
              }}
              style={{width: 50, height: 50}}
            />
            <Text style={{fontWeight: 'normal', color: colors.black}}>
              Transfer Manual
            </Text>
          </View>

          <View
            style={{
              alignItems: 'center',
              borderBottomColor: colors.darkGrey,
              borderBottomWidth: 1,
              padding: 15,
            }}>
            <Text style={{color: colors.black}}>Jumlah yang harus dibayar</Text>
            <Text style={styles.price}>{price}</Text>
          </View>

          <View style={{alignItems: 'center', marginBottom: 40}}>
            <Image
              source={{
                uri: 'https://buatlogoonline.com/wp-content/uploads/2022/10/Logo-Bank-BCA-1.png',
              }}
              style={{width: 50, height: 50}}
            />
            <View style={{alignItems: 'center'}}>
              <Text>a/n Hotel.com</Text>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: colors.darkGrey,
                }}>
                023 702 02821412
              </Text>
            </View>
          </View>

          <View style={{alignItems: 'center'}}>
            <Pressable onPress={handleChoosePhoto}>
              {photo?.assets ? (
                <Image
                  source={{uri: photo?.assets[0]?.uri}}
                  style={styles.imagePayment(photo)}
                />
              ) : (
                <Image
                  source={UploadPhoto}
                  style={styles.imagePayment(photo)}
                />
              )}
            </Pressable>
          </View>
          <View style={{marginVertical: 20}}>
            {photo?.assets ? (
              <Button
                title="Bayar"
                color={colors.darkBlue}
                onPress={uploadPayment}
                // onPress={() => {
                //   dispatch(
                //     addBookHistory({
                //       username: user?.username,
                //       data: {
                //         mainImage,
                //         hotel_name,
                //         book_id,
                //         order_id,
                //         stay_length,
                //         checkIn,
                //         checkOut,
                //         person,
                //         room,
                //         name_room,
                //         price,
                //         transaction_time,
                //         photoPayment: photo,
                //       },
                //     }),
                //   );
                //   navigation.navigate('BookingSuccess', {
                //     transaction_time,
                //   });
                // }}
              />
            ) : (
              <Button
                title="Upload Bukti Pembayaran"
                onPress={handleChoosePhoto}
                color={colors.darkBlue}
              />
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.darkBlue,
    marginTop: 5,
  },
  box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: colors.darkGrey,
    borderBottomWidth: 1,
    paddingVertical: 15,
  },
  title: {
    color: colors.darkBlue,
  },
  imagePayment: photo => ({
    width: 300,
    height: 300,
    borderRadius: 10,
    borderColor: photo?.assets ? null : colors.darkGrey,
    borderWidth: 1,
  }),
  button: {
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
});
