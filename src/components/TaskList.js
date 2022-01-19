import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../Dimentions'

const TaskList = ({ time, task }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{task}</Text>
      <Text style={styles.timeText}>{time}</Text>
    </View>
  )
}

export default TaskList

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH - 50,
    marginHorizontal: 20,
    height: SCREEN_HEIGHT / 18,
    backgroundColor: '#ffffff',
    marginTop: 15,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  text: {
    fontSize: 20,
    marginLeft: 10,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  timeText: {
    alignSelf: 'flex-end',
    marginBottom: 5,
    marginRight: 10
  }
})
