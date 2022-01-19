import { MaterialCommunityIcons } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../Dimentions'

const HiddenList = ({
  leftlogo,
  rightlogo,
  bcolor,
  leftPulled,
  rightPulled,
  leftText,
  rightText
}) => {
  return (
    <View style={{
      ...styles.container,
      backgroundColor: `${bcolor}`
    }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <MaterialCommunityIcons
          name={leftlogo}
          size={30}
          color="black"
        />
        {leftPulled
          ? <Text style={styles.leftText}>{leftText}</Text>
          : null}
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 5 }}>
        {rightPulled
          ? <Text style={styles.rightText}>{rightText}</Text>
          : null }
        <MaterialCommunityIcons
          name={rightlogo}
          size={30}
          color="black"
        />
      </View>

    </View>
  )
}

export default HiddenList

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: SCREEN_WIDTH - 50,
    marginHorizontal: 20,
    height: SCREEN_HEIGHT / 18,
    marginTop: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: 'space-between',
    paddingLeft: 10
  },
  leftText: {
    fontSize: 20,
    color: '#ffffff',
    fontWeight: 'bold',
    marginLeft: 15
  },
  rightText: {
    fontSize: 20,
    color: '#ffffff',
    fontWeight: 'bold',
    marginRight: 15
  },
  timeText: {
    alignSelf: 'flex-end',
    marginBottom: 5,
    marginRight: 10
  }
})
