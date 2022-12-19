import {View, Text, SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {Header} from '../../component/molecules';
import {colors} from '../../utils';
import {Button, Gap, Input} from '../../component/atoms';

export default function SignUp({navigation}) {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [telephone, setTelephone] = useState(0);

  return (
    <SafeAreaView style={styles.page}>
      <Header title="Sign Up" onPress={() => navigation.goBack()} />
      <ScrollView>
        <View style={styles.content}>
          <View style={styles.input}>
            <Input
              type="user"
              placeholder="Username"
              onChangeText={value => setUsername(value)}
            />
            <Gap height={10} />
            <Input
              type="user"
              placeholder="First Name"
              onChangeText={value => setFirstName(value)}
            />
            <Gap height={10} />
            <Input
              type="user"
              placeholder="Last Name"
              onChangeText={value => setLastName(value)}
            />
            <Gap height={10} />
            <Input
              type="email"
              placeholder="Email"
              onChangeText={value => setEmail(value)}
            />
            <Gap height={10} />
            <Input
              value={password}
              type="password"
              placeholder="Password"
              onChangeText={value => setPassword(value)}
            />
            <Gap height={10} />
            <Input
              value={confirmPassword}
              type="password"
              placeholder="Ulangi Password"
              onChangeText={value => setConfirmPassword(value)}
            />
            <Gap height={10} />
            <Input
              type="telephone"
              placeholder="Phone"
              onChangeText={value => setTelephone(value)}
              keyboardType="numeric"
            />
          </View>
          <Button
            title="Sign Up"
            onPress={() => navigation.navigate('Sign')}
            color={colors.yellow}
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
      </ScrollView>
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
  input: {
    marginVertical: 30,
  },
});
