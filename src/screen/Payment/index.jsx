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
    originalDateCheckIn,
    originalDateCheckOut,
    hotel_id,
  } = route.params;
  const [photo, setPhoto] = useState(null);
  const [photoPayment, setPhotoPayment] = useState(null);
  const [idPhoto, setIdPhoto] = useState();
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

  console.log('id', idPhoto);

  let imagePayment = new FormData();
  imagePayment.append('payment', {
    uri: photoPayment?.uri,
    name: photoPayment?.fileName,
    type: photoPayment?.type,
  });

  const uploadPayment = async () => {
    // let imagePayment = new FormData();
    // imagePayment.append('payment', {
    //   uri: photoPayment.uri,
    //   name: photoPayment.fileName,
    //   type: photoPayment.type,
    // });
    // try {
    // const res = await fetch(
    //   `${process.env.REACT_APP_URL_SERVER}/cms/images/payment`,
    //   {
    //     method: 'POST',
    //     body: imagePayment,
    //   },
    // );
    // if (res) {
    //   console.log('berhasil Upload Payment');
    //   setIdPhoto(res);
    // }
    // const res = await axios({
    //   method: 'post',
    //   url: `${process.env.REACT_APP_URL_SERVER}/cms/images/payment`,
    //   data: imagePayment,
    //   headers: {'Content-Type': 'multipart/form-data'},
    // });
    // if (res.data.data) {
    //   console.log('berhasil upload bukti pembayaran');
    //   setIdPhoto(res.data.data._id);
    // }
    // try {
    //   const createOrder = await axios.post(
    //     `${process.env.REACT_APP_URL_SERVER}/cms/booking`,
    //     {
    //       customer: user.id,
    //       order_id,
    //       hotel_id,
    //       hotelName: hotel_name,
    //       checkIn: originalDateCheckIn,
    //       checkOut: originalDateCheckOut,
    //       Total_payment: price,
    //       image_payment: idPhoto,
    //       transaction_time: transaction_time,
    //       statusOrder: false,
    //       statusPayment: 'Sedang di verifikasi',
    //     },
    //   );
    //   console.log(createOrder);
    // } catch (err) {
    //   console.log(err);
    // }
  };

  const handleChoosePhoto = async () => {
    await launchImageLibrary({noData: true}, response => {
      if (response) {
        setPhotoPayment(response.assets[0]);
        setPhoto(response);
      }
    });
  };

  console.log(hotel_id);

  const Upload = async () => {
    const res = await axios({
      method: 'post',
      url: `${process.env.REACT_APP_URL_SERVER}/cms/images/payment`,
      data: imagePayment,
      headers: {'Content-Type': 'multipart/form-data'},
    });
    if (res.data.data) {
      console.log('berhasil upload bukti pembayaran');
      setIdPhoto(res.data.data._id);
    }

    navigation.navigate('BookingSuccess', {
      customerID: user.id,
      order_id,
      hotel_id,
      hotelName: hotel_name,
      DateCheckIn: originalDateCheckIn,
      DateCheckOut: originalDateCheckOut,
      price,
      idPhoto,
      transaction_time,
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
              {photoPayment ? (
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
                onPress={Upload}
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
