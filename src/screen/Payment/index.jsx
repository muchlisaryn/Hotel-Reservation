import {View, Text, Image, Platform, StyleSheet, Pressable} from 'react-native';
import React, {useState} from 'react';
import {Button} from '../../component/atoms';
import {launchImageLibrary} from 'react-native-image-picker';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Header} from '../../component/molecules';
import {colors} from '../../utils';
import {ScrollView} from 'react-native-gesture-handler';
import {UploadPhoto} from '../../assets/img';

export default function Payment({navigation}) {
  const [photo, setPhoto] = useState(null);

  const handleChoosePhoto = () => {
    launchImageLibrary({noData: true}, response => {
      // console.log(response);
      if (response) {
        setPhoto(response);
      }
    });
  };

  console.log(photo);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          backgroundColor: colors.darkBlue,
          paddingHorizontal: 10,
          paddingVertical: 20,
        }}>
        <Header title="Payment" onPress={() => navigation.goBack()} />
      </View>
      <ScrollView>
        <View style={styles.box}>
          <Image
            source={{
              uri: 'https://buatlogoonline.com/wp-content/uploads/2022/10/Logo-Bank-BCA-1.png',
            }}
            style={{width: 50, height: 50}}
          />
          <Text style={styles.price}>Transfer Manual</Text>
        </View>

        <View>
          <Text>Transfer pembayaran ke nomor rekening :</Text>
          <Text>023 702 02821412</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.title}>Total Payment</Text>
          <Text style={styles.price}>Rp 300.000</Text>
        </View>

        <View style={{alignItems: 'center'}}>
          <Pressable onPress={handleChoosePhoto}>
            {photo?.assets ? (
              <Image
                source={{uri: photo?.assets[0]?.uri}}
                style={styles.imagePayment}
              />
            ) : (
              <Image source={UploadPhoto} style={styles.imagePayment} />
            )}
          </Pressable>
        </View>
        <View style={{padding: 20}}>
          {photo?.assets ? (
            <Button title="Payment" color={colors.darkBlue} />
          ) : (
            <Button
              title="Upload Photo"
              onPress={handleChoosePhoto}
              color={colors.darkBlue}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black,
  },
  box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    color: colors.darkBlue,
  },
  imagePayment: {
    width: 300,
    height: 300,
    borderRadius: 10,
  },
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
