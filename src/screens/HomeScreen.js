import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SwipeListView } from 'react-native-swipe-list-view'
import { connect } from 'react-redux'
import { addInProgress, deleteTask } from '../../redux/actions'
import HiddenList from '../components/HiddenList'
import ModalView from '../components/ModalView'
import TaskList from '../components/TaskList'
import { SCREEN_WIDTH } from '../Dimentions'


const HomeScreen = ({ toDo, addInProgress, deleteTask }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [leftPulled, setLeftPulled] = useState(false)
  const [rightPulled, setRightPulled] = useState(false)
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.heading}>
        <Text style={styles.headingText}>Today's Tasks</Text>
        <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
          <View style={styles.taskBtn}>
            <Text style={styles.taskText}>New Task</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View>
        <SwipeListView
          data={toDo}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <TaskList task={item.task} time={item.time} />}
          renderHiddenItem={({ item }) => {
            return <HiddenList
              leftlogo='progress-clock'
              rightlogo='delete'
              bcolor='#7289DA'
              leftPulled={leftPulled}
              rightPulled={rightPulled}
              leftText='InProgress'
              rightText='Delete'
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
              toDo.map(item => {
                if (item.id == rowKey) {
                  addInProgress(item)
                  deleteTask(rowKey, 'TO_DO')
                }
              })
            } else if (data.translateX <= (-100)){
              deleteTask(rowKey, 'TO_DO')
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

const mapStateToProps = ({ toDo }) => {
  return { toDo }
}

export default connect(mapStateToProps, {
  deleteTask,
  addInProgress
})(HomeScreen)

const styles = StyleSheet.create({
  heading: {
    width: SCREEN_WIDTH,
    paddingVertical: 13,
    backgroundColor: '#fff3ff',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  headingText: {
    fontSize: 35,
    paddingLeft: 15,
    fontWeight: 'bold'
  },
  taskBtn: {
    backgroundColor: 'lightblue',
    borderRadius: 18,
    padding: 10,
    marginRight: 15,
    elevation: 5
  },
  taskText: {
    fontSize: 20,
    fontWeight: 'bold',
  }
})
