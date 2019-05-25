import React, { Component } from "react"
import { connect } from "react-redux"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Button } from "react-native-elements"

// Components
import QuizDetail from "./QuizDetail"

// Styles
import commonStyles from "../utils/styles"
import { purple, white, green, red } from '../utils/colors'

const DEFAULT_STATE = {
  cardIndex: 0,
  isLastCard: false,
  score: 0,
  showQuestionSide: true
}

class Quiz extends Component {
  state = DEFAULT_STATE

  /**
   * Render and starts quiz
   *
   * @function renderQuiz
   */
  renderQuiz = () => {
    const { showQuestionSide, cardIndex } = this.state
    const { deck } = this.props
    const { questions } = deck

    const showTitle = showQuestionSide ? "Answer" : "Question"

    return (
      <View>
        <View style={styles.cardIndexContainer}>
          <Text>{`${cardIndex + 1} / ${questions.length}`}</Text>
        </View>

        {showQuestionSide ? (
          <QuizDetail
            content={questions[cardIndex].question}
            link={"Answer"}
            handleClickLink={this.handleToggleShowQuestion}
          />
        ) : (
          <QuizDetail
            content={questions[cardIndex].answer}
            link={"Question"}
            handleClickLink={this.handleToggleShowQuestion}
          />
        )}

        <View style={[commonStyles.container]}>
          <TouchableOpacity
            style={[styles.btn, styles.btnShowAnswer]}
            onPress={() => this.handleToggleShowQuestion()}
          >
            <Text style={styles.btnText}>Show {showTitle}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btn, styles.btnCorrect]}
            onPress={() => this.handleResponseSelection(true)}
          >
            <Text style={styles.btnText}>Correct</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btn, styles.btnInCorrect]}
            onPress={() => this.handleResponseSelection(false)}
          >
            <Text style={styles.btnText}>Incorrect</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  /**
   * Renders a view that shows the user their final score
   *
   * @function renderScorePage
   */
  renderScorePage = () => {
    const { score } = this.state
    const { deck, navigation } = this.props
    const { questions } = deck

    return (
      <View style={commonStyles.container}>
        <Text style={styles.score}>
          You Scored: {((score / questions.length) * 100).toFixed(0)}%
        </Text>

        <Text>
          Correct Answers: {score} out of {questions.length}
        </Text>

        <Button
          title="Restart Quiz"
          type="outline"
          raised
          containerStyle={styles.scoreButtonContainerStyle}
          onPress={this.handleRestartQuiz}
        />
        <Button
          title="Back to Deck"
          type="outline"
          raised
          containerStyle={styles.scoreButtonContainerStyle}
          onPress={() => navigation.navigate("DeckDetail")}
        />
      </View>
    )
  }

  /**
   * Renders a view that shows the user their final score
   *
   * @function handleToggleShowQuestion
   */
  handleToggleShowQuestion = () => {
    this.setState(preState => ({
      showQuestionSide: !preState.showQuestionSide
    }))
  }

  /**
   * Update score based on user's response (correct or incorrect)
   *
   * @param {boolean} isCorrect True if response was correct
   * @function handleResponseSelection
   */
  handleResponseSelection = isCorrect => {
    const { cardIndex } = this.state
    const { questions } = this.props.deck

    const quizFinished = cardIndex + 1 === questions.length ? true : false

    if (quizFinished) {
      this.setState(preState => ({
        isLastCard: true,
        score: isCorrect ? preState.score + 1 : preState.score
      }))
    } else {
      this.setState(preState => ({
        showQuestionSide: true, // Flip to question side if answer is being shown
        cardIndex: preState.cardIndex + 1,
        score: isCorrect ? preState.score + 1 : preState.score
      }))
    }
  }

  /**
   * Restarts the current deck's quiz
   *
   * @function handleRestartQuiz
   */
  handleRestartQuiz = () => {
    this.setState({ ...DEFAULT_STATE })
  }

  render() {
    const { isLastCard } = this.state

    return (
      <View>{!isLastCard ? this.renderQuiz() : this.renderScorePage()}</View>
    )
  }
}

const styles = StyleSheet.create({
  cardIndexContainer: {
    marginTop: 10,
    marginLeft: 10
  },
  btn: {
    borderRadius: 3,
    height: 40,
    width: 120,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30
  },
  btnShowAnswer: {
    backgroundColor: purple
  },
  btnCorrect: {
    backgroundColor: green
  },
  btnInCorrect: {
    backgroundColor: red
  },
  btnBack: {
    backgroundColor: white
  },
  btnText: {
    color: white,
    fontWeight: "500"
  },
  btnBackText: {
    fontWeight: "500"
  },
  scoreButtonContainerStyle: {
    width: 200,
    marginTop: 16
  },
  score: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 60,
    marginBottom: 30
  },
  underScoreTxt: {
    fontSize: 20,
    marginBottom: 40
  }
})

const mapStateToProps = ({ decks }, props) => {
  const { deckKey } = props.navigation.state.params
  return {
    deck: decks[deckKey]
  }
}

export default connect(mapStateToProps)(Quiz)
