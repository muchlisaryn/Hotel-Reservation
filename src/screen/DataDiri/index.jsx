import {View, Text} from 'react-native';
import React from 'react';

export default function index() {
  return (
    <View>
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
        type="telephone"
        placeholder="Phone"
        onChangeText={value => setTelephone(value)}
        keyboardType="numeric"
      />
    </View>
  );
}
