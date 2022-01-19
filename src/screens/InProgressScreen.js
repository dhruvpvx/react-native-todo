import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SwipeListView } from 'react-native-swipe-list-view'
import { connect } from 'react-redux'
import { addToDo, addCompleted, deleteTask } from '../../redux/actions'
import HiddenList from '../components/HiddenList'
import ModalView from '../components/ModalView'
import TaskList from '../components/TaskList'
import { SCREEN_WIDTH } from '../Dimentions'


const InProgressScreen = ({ addToDo, onGoing, addCompleted, deleteTask }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [leftPulled, setLeftPulled] = useState(false)
  const [rightPulled, setRightPulled] = useState(false)
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.heading}>
        <Text style={styles.headingText}>InProgress</Text>
      </View>
      <View>
        <SwipeListView
          data={onGoing}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <TaskList task={item.task} time={item.time} />}
          renderHiddenItem={({ item }) => {
            return <HiddenList
              leftlogo='marker-check'
              rightlogo='home'
              bcolor='#329932'
              leftPulled={leftPulled}
              rightPulled={rightPulled}
              leftText='Completed'
              rightText='To Do'
            />
          }}
          leftOpenValue={75}
          rightOpenValue={-75}
          rightActivationValue={-100}
          swipeGestureBegan={() => {
            setLeftPulled(false)
            setRightPulled(false)
          }}
          swipeGestureEnded={(rowKey, data) => {
            if (data.translateX >= 100) {
              onGoing.map(item => {
                if (item.id == rowKey) {
                  addCompleted(item)
                  deleteTask(rowKey, 'IN_PROGRESS')
                }
              })
            } else if (data.translateX <= (-100)) {
              onGoing.map(item => {
                if (item.id == rowKey) {
                  addToDo(item)
                  deleteTask(rowKey, 'IN_PROGRESS')
                }
              })
            }
          }}
          leftActivationValue={100}
          onLeftActionStatusChange={() => setLeftPulled(true)}
          onRightActionStatusChange={() => setRightPulled(true)}
        />

      </View>
      <ModalView modalVisible={modalVisible} setModalVisible={setModalVisible} />
    </SafeAreaView>
  )
}

const mapStateToProps = ({ onGoing }) => {
  return { onGoing }
}

export default connect(mapStateToProps, {
  deleteTask,
  addToDo,
  addCompleted
})(InProgressScreen)

const styles = StyleSheet.create({
  heading: {
    width: SCREEN_WIDTH,
    paddingVertical: 15,
    backgroundColor: '#fff3ff',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  headingText: {
    fontSize: 35,
    paddingLeft: 15,
    fontWeight: 'bold'
  }
})




