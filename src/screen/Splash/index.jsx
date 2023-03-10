import {View, StyleSheet, Text, Image} from 'react-native';
import React, {useEffect} from 'react';
import {Logo} from '../../assets/img';
import {colors} from '../../utils';
import {useSelector} from 'react-redux';

export default function Splash({navigation}) {
  const user = useSelector(state => state.auth.user);

  useEffect(() => {
    setTimeout(() => {
      navigation.replace(user ? 'main' : 'GetStarted');
    }, 3000);
  }, []);

  return (
    <View style={styles.page}>
      <Logo />
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
