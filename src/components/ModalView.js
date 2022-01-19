import React, { useState } from 'react'
import { Modal, TouchableOpacity, TextInput, StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { AntDesign } from '@expo/vector-icons';
import { addTask } from '../../redux/actions'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../Dimentions'

const ModalView = ({ modalVisible, addTask, setModalVisible }) => {
  const [task, setTask] = useState('')
  const [error, setError] = useState(false)
  const date = new Date()
  const hour = date.getHours() <= 12 ? date.getHours() : date.getHours() - 12
  const addZero = item => item < 10 ? `0${item}` : `${item}`
  const time = `${addZero(hour)}:${addZero(date.getMinutes())} ${date.getHours() > 11 ? 'PM' : 'AM'}`
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.modalView}>
          <AntDesign name="edit" size={45} color="black" />
          <TextInput
            style={styles.textInput}
            value={task}
            onChangeText={text => setTask(text)}
            placeholder={error ? 'Task Cannot Be Empty' : "Add New Task"}
          />
          <View style={styles.actions}>
            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
              <AntDesign name="closecircleo" size={40} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              if (task == '') {
                setError(true)
              } else {
                addTask(task, time)
                setTask('')
                setError(false)
                setModalVisible(!modalVisible)
              }
            }}>
              <AntDesign name="checkcircleo" size={40} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default connect(null, { addTask })(ModalView)

const styles = StyleSheet.create({
  modalView: {
    marginTop: SCREEN_HEIGHT / 3.5,
    marginHorizontal: SCREEN_WIDTH / 5,
    paddingVertical: 80,
    backgroundColor: "lightgrey",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    elevation: 10
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: SCREEN_WIDTH / 3,
  },
  textInput: {
    width: SCREEN_WIDTH / 3,
    marginVertical: 30,
    borderRadius: 12,
    paddingVertical: 5,
    paddingLeft: 10,
    elevation: 6,
    backgroundColor: '#ffffff'
  }
})
