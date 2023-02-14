import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {Header} from '../../component/molecules';
import {colors} from '../../utils';
import {Button, Gap, Input} from '../../component/atoms';
import SelectDropdown from 'react-native-select-dropdown';
import axios from 'axios';

import {ScrollView} from 'react-native-gesture-handler';

export default function DataDiri({route, navigation}) {
  const {email, password} = route.params;
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [telephone, setTelephone] = useState(0);
  const [bank, setBank] = useState('');
  const [pemilikRek, setPemilikRek] = useState('');
  const [nomorRek, setNomorRek] = useState('');
  const countries = ['BCA', 'BRI', 'BNI'];

  console.log('ini select', bank);

  const nextPage = () => {
    navigation.navigate('UploadPhoto', {
      email,
      password,
      username,
      firstName,
      lastName,
      telephone,
      bank,
      pemilikRek,
      nomorRek,
    });
  };

  return (
    <SafeAreaView style={styles.page}>
      <View style={{paddingBottom: 20}}>
        <Header title="Isi Data Anda" onPress={() => navigation.goBack()} />
      </View>
      <ScrollView>
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
              type="telephone"
              placeholder="Masukan Nomor Handphone..."
              onChangeText={value => setTelephone(value)}
            />
            {/* <Text
              style={{
                marginTop: 10,
                fontSize: 10,
                textAlign: 'center',
                color: colors.white,
              }}>
              *Nomor rekening ini adalah nomor rekening yang dipakai pada saat
              transaksi
            </Text>
            <View style={{width: '100%'}}>
              <Text style={styles.headerInput}>Bank</Text>
              <SelectDropdown
                buttonStyle={styles.dropdown1BtnStyle}
                buttonTextStyle={styles.dropdown1BtnTxtStyle}
                dropdownStyle={styles.dropdown1DropdownStyle}
                rowStyle={styles.dropdown1RowStyle}
                rowTextStyle={styles.dropdown1RowTxtStyle}
                defaultButtonText={'Select Bank'}
                data={countries}
                buttonTextAfterSelection={(selectedItem, index) => {
                  setBank(selectedItem);
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  return item;
                }}
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
              }}>
              <View style={styles.input}>
                <Text style={styles.headerInput}>Pemilik Rekening</Text>
                <View>
                  <Input
                    placeholder="Pemilik Rekening"
                    onChangeText={value => setPemilikRek(value)}
                  />
                </View>
              </View>

              <View style={styles.input}>
                <Text style={styles.headerInput}>Nomor Rekening</Text>
                <View>
                  <Input
                    placeholder="Last Name"
                    onChangeText={value => setNomorRek(value)}
                  />
                </View>
              </View>
            </View> */}

            <Gap height={20} />
            <Button title="Continue" color={colors.yellow} onPress={nextPage} />
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
              <Button type="link" title="Sign in" color={colors.yellow} />
            </View>
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
    justifyContent: 'center',
    padding: 20,
  },
  content: {
    flex: 1,
    marginTop: 100,
  },
  bank: {
    width: 50,
    color: colors.white,
    marginVertical: 5,
  },
  headerInput: {
    color: colors.white,
    marginVertical: 5,
  },
  input: {
    width: '48%',
  },
  dropdown1BtnStyle: {
    width: '100%',
    height: 50,
    borderRadius: 8,
  },
  dropdown1BtnTxtStyle: {color: '#444', textAlign: 'left'},
  dropdown1DropdownStyle: {backgroundColor: '#EFEFEF'},
  dropdown1RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
  dropdown1RowTxtStyle: {color: '#444', textAlign: 'left'},
});
