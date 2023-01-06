import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Icon({color, onPress, icon, size}) {
  return (
    <View>
      <Ionicons
        name={icon}
        style={{color: color, fontSize: size}}
        onPress={onPress}
      />
    </View>
  );
}
