import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SwipeListView } from 'react-native-swipe-list-view'
import { connect } from 'react-redux'
import { addInProgress, deleteTask } from '../../redux/actions'
import HiddenList from '../components/HiddenList'
import ModalView from '../components/ModalView'
import TaskList from '../components/TaskList'
import { SCREEN_WIDTH } from '../Dimentions'


const CompletedScreen = ({ addInProgress, completed, deleteTask }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [leftPulled, setLeftPulled] = useState(false)
  const [rightPulled, setRightPulled] = useState(false)
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.heading}>
        <Text style={styles.headingText}>Completed</Text>
      </View>
      <View>
        <SwipeListView
          data={completed}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <TaskList task={item.task} time={item.time} />}
          renderHiddenItem={({ item }) => {
            return <HiddenList
              leftlogo='delete'
              rightlogo='progress-clock'
              bcolor='#f44336'
              leftPulled={leftPulled}
              rightPulled={rightPulled}
              leftText='Delete'
              rightText='In Progress'
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
              deleteTask(rowKey, 'COMPLETED')
            } else if (data.translateX <= (-100)) {
              completed.map(item => {
                if (item.id == rowKey) {
                  addInProgress(item)
                  deleteTask(rowKey, 'COMPLETED')
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

const mapStateToProps = ({ completed }) => {
  return { completed }
}

export default connect(mapStateToProps, {
  deleteTask,
  addInProgress
})(CompletedScreen)

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
