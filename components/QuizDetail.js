import React from "react"
import { StyleSheet, Text, View } from "react-native"
import commonStyles from "../utils/styles"
import { purple,gray } from '../utils/colors'

const QuizDetail = ({ content }) => {
  return (
    <View style={[commonStyles.container, { height: 300 }]}>
      <Text style={styles.content}>{content}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  content: {
    color: gray,
    fontSize: 26,
    maxWidth: 300
  },
  link: {
    fontSize: 18,
    fontWeight: "500",
    textDecorationLine: "underline",
    color: purple
  }
})

export default QuizDetail
