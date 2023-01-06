import {View, Text, StyleSheet, Image} from 'react-native';
import {colors} from '../../../utils';
import {Button} from '../../atoms';
import React from 'react';
import {notLogin, HotelNotFound, Empty} from '../../../assets/img';

export default function PageUndifined({type, namePage, navigation}) {
  if (type === 'not login') {
    return (
      <View style={styles.content}>
        <Image source={notLogin} style={styles.image} />
        <Text style={[styles.textHeader(colors.black), {marginBottom: 5}]}>
          {namePage}
        </Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.text(colors.black)}>Silahkan</Text>
          <View style={{marginHorizontal: 4}}>
            <Button
              type="link"
              title="Login"
              color={colors.darkBlue}
              onPress={() => navigation.navigate('Sign')}
            />
          </View>
          <Text style={styles.text(colors.black)}>
            Untuk Mengakses halaman ini
          </Text>
        </View>
      </View>
    );
  }

  if (type === 'hotel not found') {
    return (
      <View style={styles.content}>
        <Image source={HotelNotFound} style={styles.image} />
        <Text style={[styles.textHeader(colors.black), {marginBottom: 5}]}>
          {namePage}
        </Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.text(colors.black)}>
            Hotel tidak ditemukan, Kembali ke
          </Text>
          <View style={{marginHorizontal: 4}}>
            <Button
              type="link"
              title="Home"
              color={colors.darkBlue}
              onPress={() => navigation.navigate('Home')}
            />
          </View>
        </View>
      </View>
    );
  }

  if (type === 'data empty') {
    return (
      <View style={styles.content}>
        <Image source={Empty} style={styles.image} />
        <Text style={[styles.textHeader(colors.black), {marginBottom: 5}]}>
          Belum Ada {namePage}
        </Text>
        <Text style={styles.description}>
          Kamu Belum memilih {namePage}, {namePage} akan muncul disini
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    margin: 20,
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
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
  description: {
    textAlign: 'center',
    fontSize: 13,
    marginTop: 8,
  },
});
