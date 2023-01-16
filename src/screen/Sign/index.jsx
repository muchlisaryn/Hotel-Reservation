import {View, Text, StyleSheet, TextInput} from 'react-native';
import React, {useState, useEffect} from 'react';
import Input from '../../component/atoms/Input';
import Button from '../../component/atoms/Button';
import {useDispatch, useSelector} from 'react-redux';

import {colors} from '../../utils';
import Header from '../../component/molecules/Header';
import {Gap} from '../../component/atoms';
import {Logo} from '../../assets/img';
import {auth} from '../../features/authSlice';

export default function Sign({navigation}) {
  const dispatch = useDispatch();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const loading = useSelector(state => state.auth.loading);
  const success = useSelector(state => state.auth.success);
  const user = useSelector(state => state.auth.user);

  const Login = () => {
    dispatch(
      auth({
        email: email,
        password: password,
      }),
    );
    if (success) {
      navigation.navigate('main', {
        initial: false,
      });
    }
  };

  return (
    <View style={styles.page}>
      <Header title="Login" onPress={() => navigation.goBack()} />
      <View style={styles.content}>
        <View
          style={{
            alignItems: 'center',
          }}>
          <Logo />
        </View>
        <Text style={styles.text}>Masukan Email dan Password Anda</Text>
        <View style={styles.Input}>
          <Input
            type="email"
            placeholder="Masukan Email Anda..."
            onChangeText={value => setEmail(value)}
          />
          <Gap height={10} />
          <View>
            <Input
              type="password"
              placeholder="Masukan Password Anda..."
              onChangeText={value => setPassword(value)}
            />
          </View>
        </View>
        <Button
          title={loading ? 'loading...' : 'Login'}
          onPress={Login}
          color={colors.yellow}
        />
        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
            justifyContent: 'center',
          }}>
          <Text style={{marginRight: 5, color: colors.white}}>
            Belum Punya akun?
          </Text>
          <Button
            title="Daftar"
            type="link"
            color={colors.yellow}
            onPress={() => navigation.navigate('SignUp')}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.darkBlue,
    flex: 1,
    padding: 40,
  },
  content: {
    justifyContent: 'center',
    flex: 1,
  },
  Input: {
    marginTop: 20,
    marginBottom: 30,
  },
  title: {
    fontSize: 25,
    color: colors.white,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  text: {
    fontSize: 12,
    marginTop: 5,
    color: colors.white,
    textAlign: 'center',
  },
});
