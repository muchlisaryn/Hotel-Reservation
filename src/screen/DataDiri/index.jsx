import {View, Text, SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {Header} from '../../component/molecules';
import {colors} from '../../utils';
import {Button, Gap, Input} from '../../component/atoms';
import axios from 'axios';

export default function DataDiri({route, navigation}) {
  const {email, password} = route.params;
  const [data, setData] = useState([]);
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [telephone, setTelephone] = useState(0);

  const signUp = () => {
    axios
      .post(`${process.env.REACT_APP_URL_SERVER}/cms/users`, {
        email: email,
        password: password,
        confirmPassword: password,
        username: username,
        firstName: firstName,
        lastName: lastName,
        telephone: telephone,
        role: 'user',
      })
      .then(Response => {
        console.log(Response.data.data);
        setData(Response.data.data);
      })
      .catch(err => {
        console.log(err);
      });
    if (data) {
      navigation.navigate('Sign');
    }
  };

  return (
    <SafeAreaView style={styles.page}>
      <Header title="Isi Data Diri Anda" onPress={() => navigation.goBack()} />

      <View style={styles.content}>
        <View>
          <Text style={styles.headerInput}>Username</Text>
          <Input
            type="user"
            placeholder="Masukan username Anda..."
            onChangeText={value => setUsername(value)}
          />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <View style={styles.input}>
              <Text style={styles.headerInput}>First Name</Text>
              <View>
                <Input
                  type="user"
                  placeholder="First Name"
                  onChangeText={value => setFirstName(value)}
                />
              </View>
            </View>

            <View style={styles.input}>
              <Text style={styles.headerInput}>Last Name</Text>
              <View>
                <Input
                  type="user"
                  placeholder="Last Name"
                  onChangeText={value => setLastName(value)}
                />
              </View>
            </View>
          </View>

          <Text style={styles.headerInput}>Telephone</Text>
          <Input
            type="user"
            placeholder="Masukan First Name Anda..."
            onChangeText={value => setTelephone(value)}
          />

          <Gap height={20} />
          <Button title="Continue" onPress={signUp} color={colors.yellow} />
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
              onPress={signUp}
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
    width: '48%',
  },
});
