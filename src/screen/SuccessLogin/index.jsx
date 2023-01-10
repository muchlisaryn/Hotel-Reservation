import {View, StyleSheet, Text, Image} from 'react-native';
import React, {useEffect} from 'react';
import {Logo} from '../../assets/img';
import {colors} from '../../utils';
import {useSelector} from 'react-redux';
import {Button} from '../../component/atoms';

export default function SuccessLogin({navigation}) {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Home');
    }, 2000);
  }, []);

  return (
    <View style={styles.page}>
      <Text>Wellcome</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.darkBlue,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
