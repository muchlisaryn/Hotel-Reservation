import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {Header} from '../../component/molecules';
import {colors} from '../../utils';
import {Button, Gap, Input} from '../../component/atoms';

export default function SignUp({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <SafeAreaView style={styles.page}>
      <Header title="Registrasi" onPress={() => navigation.goBack()} />

      <View style={styles.content}>
        <View style={styles.input}>
          <Text style={styles.headerInput}>Email</Text>
          <Input
            type="email"
            placeholder="Masukan alamat email"
            onChangeText={value => setEmail(value)}
          />

          <Text style={styles.headerInput}>Password</Text>
          <Input
            value={password}
            type="password"
            placeholder="Masukan Password"
            onChangeText={value => setPassword(value)}
          />

          <Text style={styles.headerInput}>Ulangi Password</Text>
          <Input
            value={confirmPassword}
            type="password"
            placeholder="Ulangi Password"
            onChangeText={value => setConfirmPassword(value)}
          />
          <Gap height={20} />
          <Button
            title="Continue"
            color={colors.yellow}
            onPress={() =>
              navigation.navigate('DataDiri', {
                email,
                password,
              })
            }
          />
          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: colors.white,
                marginRight: 5,
              }}>
              Sudah Punya akun?
            </Text>
            <Button
              type="link"
              title="Sign in"
              color={colors.yellow}
              onPress={() => navigation.navigate('Sign')}
            />
          </View>
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
    justifyContent: 'center',
    flex: 1,
  },
  headerInput: {
    color: colors.white,
    marginVertical: 5,
  },
  input: {
    marginVertical: 30,
  },
});
