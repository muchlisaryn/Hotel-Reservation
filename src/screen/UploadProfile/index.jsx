import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import {useState} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import {BtnAddPhoto, DefaultPhoto} from '../../assets/img';
import {colors} from '../../utils';
import {Header} from '../../component/molecules';
import {Button} from '../../component/atoms';
import axios from 'axios';

export default function UploadProfile({route, navigation}) {
  const {
    password,
    email,
    username,
    firstName,
    lastName,
    telephone,
    bank,
    pemilikRek,
    nomorRek,
  } = route.params;
  const [photo, setPhoto] = useState('');
  const [avatar, setAvatar] = useState('');
  const [idPhoto, setIdPhoto] = useState();

  const handleChoosePhoto = () => {
    launchImageLibrary({noData: true}, response => {
      if (response) {
        setAvatar(response.assets[0]);
        setPhoto(response);
      }
    });
  };

  const savePhoto = async () => {
    let imagePayment = new FormData();
    imagePayment.append('avatar', {
      uri: avatar?.uri,
      name: avatar?.fileName,
      type: avatar?.type,
    });

    const res = await axios({
      method: 'POST',
      url: `${process.env.REACT_APP_URL_SERVER}/cms/images`,
      data: imagePayment,
      headers: {'Content-Type': 'multipart/form-data'},
    });
    setIdPhoto(res?.data?.data?._id);
    alert('Profile berhasil di upload');
  };

  const signUp = async () => {
    const ressponse = await axios.post(
      `${process.env.REACT_APP_URL_SERVER}/cms/users`,
      {
        image: idPhoto,
        email,
        password,
        username,
        firstName,
        lastName,
        telephone,
        name_bank: bank,
        no_rekening: nomorRek,
        nama_rekening: pemilikRek,
        role: 'user',
      },
    );
    if (ressponse?.data) {
      navigation.navigate('Sign');
      alert('Berhasil registrasi, Silahkan Login');
    }
  };

  return (
    <SafeAreaView style={styles.page}>
      <View style={{paddingBottom: 20}}>
        <Header
          title="Upload Photo Profile"
          onPress={() => navigation.goBack()}
        />
      </View>
      <Text
        style={{
          color: colors.white,
          marginTop: 50,
          textAlign: 'center',
          fontSize: 15,
        }}>
        Ayo Pendaftaran kamu hampir selesai "{firstName}" !!!
      </Text>
      <View style={styles.content}>
        <View
          style={{
            alignItems: 'center',
            marginBottom: 20,
          }}>
          <Pressable onPress={handleChoosePhoto}>
            {photo?.assets ? (
              <Image
                source={{uri: photo.assets[0].uri}}
                style={styles.imagePayment(photo)}
              />
            ) : (
              <View>
                <Image
                  source={DefaultPhoto}
                  style={styles.imagePayment(photo)}
                />
                <BtnAddPhoto style={styles.addPhoto} />
              </View>
            )}
          </Pressable>
        </View>
        <View style={{marginTop: 50}}>
          {idPhoto ? (
            <Button title="Daftar" onPress={signUp} color={colors.yellow} />
          ) : (
            <View>
              {photo?.assets ? (
                <Button
                  title="Simpan Photo Profile"
                  color={colors.yellow}
                  onPress={savePhoto}
                />
              ) : (
                <Button title="Upload photo" color={colors.yellow} />
              )}
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.darkBlue,
    flex: 1,
    padding: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  imagePayment: photo => ({
    width: 200,
    height: 200,
    borderRadius: 99,
    borderColor: photo?.assets ? colors.yellow : colors.white,
    borderWidth: 1,
  }),
  addPhoto: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
});
