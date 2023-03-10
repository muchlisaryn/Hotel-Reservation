import {View, Text, Image, StyleSheet, Pressable} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Button} from '../../component/atoms';
import {launchImageLibrary} from 'react-native-image-picker';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Header} from '../../component/molecules';
import {colors, formatIDR} from '../../utils';
import {ScrollView} from 'react-native-gesture-handler';
import {UploadPhoto} from '../../assets/img';
import {useDispatch, useSelector} from 'react-redux';

import axios from 'axios';
import CountDown from 'react-native-countdown-component';

export default function Payment({route, navigation}) {
  const {
    book_id,
    order_id,
    person,
    guest,
    room,
    name_room,
    price,
    transaction_time,
    originalDateCheckIn,
    originalDateCheckOut,
    hotel_id,
    hotel_name,
    city,
    address,
  } = route.params;
  const [photo, setPhoto] = useState(null);
  const [photoPayment, setPhotoPayment] = useState(null);
  const [nomorRekening, setNomorRekening] = useState([]);
  console.log('ini nomor rek', nomorRekening);

  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

  const handleChoosePhoto = () => {
    launchImageLibrary({noData: true}, response => {
      if (response) {
        setPhotoPayment(response.assets[0]);
        setPhoto(response);
      }
    });
  };

  const [idImage, setIdImage] = useState();
  console.log('image', idImage);

  const Upload = async () => {
    let imagePayment = new FormData();
    imagePayment.append('payment', {
      uri: photoPayment?.uri,
      name: photoPayment?.fileName,
      type: photoPayment?.type,
    });

    const res = await axios({
      method: 'POST',
      url: `${process.env.REACT_APP_URL_SERVER}/cms/images/payment`,
      data: imagePayment,
      headers: {'Content-Type': 'multipart/form-data'},
    });
    setIdImage(res.data.data._id);
    alert('Bukti Pembayaran berhasil di upload');
  };

  const nextPage = () => {
    navigation.navigate('BookingSuccess', {
      hotel_id,
      hotel_name,
      city,
      address,
      customerID: user.id,
      guest,
      order_id,
      codeBooking: book_id,
      countRoom: room,
      countPerson: person,
      name_room,
      hotelName: hotel_name,
      DateCheckIn: originalDateCheckIn,
      DateCheckOut: originalDateCheckOut,
      price,
      imagePayment: idImage,
      transaction_time,
    });
  };

  const timeOut = () => {
    navigation.replace('main', {
      initial: false,
    });
    alert('waktu pembayaran sudah habis silahkan ulangi pemesanan');
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL_SERVER}/cms/rekening`)
      .then(ressponse => {
        console.log(ressponse);
        setNomorRekening(ressponse.data.data[0]);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

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
            {nomorRekening.bank === 'BCA' ? (
              <Image
                source={{
                  uri: 'https://buatlogoonline.com/wp-content/uploads/2022/10/Logo-Bank-BCA-1.png',
                }}
                style={{width: 50, height: 50}}
              />
            ) : (
              <></>
            )}
            {nomorRekening?.bank === 'BNI' ? (
              <Image
                source={{
                  uri: 'https://upload.wikimedia.org/wikipedia/id/thumb/5/55/BNI_logo.svg/1200px-BNI_logo.svg.png',
                }}
                resizeMode={'center'}
                style={{width: '20%', height: 50}}
              />
            ) : (
              <></>
            )}
            {nomorRekening?.bank === 'BRI' ? (
              <Image
                source={{
                  uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/BRI_2020.svg/1200px-BRI_2020.svg.png',
                }}
                style={{width: 50, height: 50}}
              />
            ) : (
              <></>
            )}
            <View>
              <Text style={{textAlign: 'right'}}>
                a/n {nomorRekening?.pemilik}
              </Text>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: colors.darkGrey,
                  textAlign: 'right',
                }}>
                {nomorRekening?.nomor}
              </Text>
            </View>
          </View>

          <View
            style={{
              alignItems: 'center',
              borderBottomColor: colors.darkGrey,
              borderBottomWidth: 1,
              padding: 15,
            }}>
            <Text style={{color: colors.black}}>Jumlah yang harus dibayar</Text>
            <Text style={styles.price}>{formatIDR.format(price)}</Text>
          </View>

          <View style={{marginVertical: 10}}>
            <Text style={{textAlign: 'center', marginBottom: 10}}>
              ayo bayar sebelum waktumu habis!!
            </Text>
            <CountDown
              size={15}
              until={1000}
              onFinish={timeOut}
              timeToShow={['H', 'M', 'S']}
              digitStyle={{
                backgroundColor: colors.red,
              }}
              timeLabelStyle={{color: 'red', fontWeight: 'bold'}}
              digitTxtStyle={{color: colors.white}}
            />
          </View>

          <View style={{alignItems: 'center'}}>
            <Pressable onPress={handleChoosePhoto}>
              {photoPayment ? (
                <Image
                  source={{uri: photo?.assets[0]?.uri}}
                  style={styles.imagePayment(photo)}
                />
              ) : (
                <>
                  <Image
                    source={UploadPhoto}
                    style={styles.imagePayment(photo)}
                  />
                  <Text style={{textAlign: 'center', marginTop: 5}}>
                    Upload JPEG, JPG, PNG
                  </Text>
                </>
              )}
            </Pressable>
          </View>
          <View style={{marginVertical: 20}}>
            {idImage ? (
              <Button
                title="Bayar"
                color={colors.darkBlue}
                onPress={nextPage}
              />
            ) : (
              <Button
                title="Upload Bukti Pembayaran"
                onPress={Upload}
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
