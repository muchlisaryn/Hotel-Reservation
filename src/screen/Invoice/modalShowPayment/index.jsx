import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import {colors} from '../../../utils';

export default function ModalShowPayment({
  visible,
  onRequestClose,
  onPressCancel,
  imagePay,
}) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Image
            source={{uri: `http://192.168.1.8:8000/${imagePay}`}}
            style={styles.image}
          />
          <View style={styles.optionView}>
            <View style={{width: 10}}></View>
            <TouchableOpacity style={styles.button} onPress={onPressCancel}>
              <Text style={styles.textButton}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 265,
    height: 450,
    justifyContent: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '85%',
  },
  optionView: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: colors.yellow,
    padding: 9,
    borderRadius: 10,
    flex: 1,
  },
  textButton: {
    textAlign: 'center',
    color: colors.black,
  },
  title: {
    color: colors.white,
    textAlign: 'center',
    fontSize: 15,
    paddingVertical: 15,
  },
});
