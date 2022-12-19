import {View, Text, Modal, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {colors} from '../../../../utils';

export default function LogoutModal({
  visible,
  onRequestClose,
  Logout,
  onPressCancel,
}) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.title}>Are You Sure Logout ?</Text>
          <View style={styles.optionView}>
            <TouchableOpacity style={styles.button} onPress={Logout}>
              <Text style={styles.textButton}>Yes</Text>
            </TouchableOpacity>
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: colors.darkBlue,
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
