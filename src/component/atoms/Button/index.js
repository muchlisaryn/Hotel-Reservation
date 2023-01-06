import {Text, StyleSheet} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {colors} from '../../../utils';
import Icon from './icon';

export default function Button({
  title,
  type,
  onPress,
  color,
  icon,
  size,
  width,
  fontSize,
  style,
}) {
  if (type === 'icon') {
    return <Icon onPress={onPress} color={color} icon={icon} size={size} />;
  }
  if (type === 'link') {
    return (
      <Text style={styles.link(color)} onPress={onPress}>
        {title}
      </Text>
    );
  }
  return (
    <TouchableOpacity
      style={styles.background(color, width, type)}
      onPress={onPress}>
      <Text style={styles.text(color, type, fontSize)}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: color => ({
    color: color === colors.darkBlue ? colors.white : colors.black,
    textAlign: 'center',
    fontSize: 16,
  }),
  background: (color, width) => ({
    backgroundColor: color,
    paddingVertical: 10,
    borderRadius: 10,
    width: width,
  }),
  link: color => ({
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    color: color,
  }),
});
