import React, { Component } from "react"
import { KeyboardAvoidingView, View } from "react-native"
import { Button, Card, Input } from "react-native-elements"
import { white, red } from '../utils/colors'

// Redux/API
import { connect } from "react-redux"
import { addCard } from "../actions"
import { addCardToDeck } from "../utils/api"

class AddCard extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.title
    }
  }

  state = {
    questionText: "",
    answerText: "",
    errorMessage: ""
  }

  handleSubmit = () => {
    const { questionText, answerText } = this.state;
    const title = this.props.navigation.state.params.title;

    if (questionText && answerText) {
      const card = {
        question: questionText,
        answer: answerText
      }

      // Update Redux
      this.props.dispatch(addCard(card, title));

      // Save to Storage
      addCardToDeck(card, title);

      // Navigate back
      this.props.navigation.goBack();
    } else {
      this.setState({ errorMessage: true });
    }
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.mainContainer} behavior="padding">
        <Card title="Add a Card">
          <View style={styles.inputContainer}>
            <Input
              label="Question:"
              onChangeText={questionText => this.setState({ questionText })}
              value={this.state.questionText}
            />
          </View>

          <View style={styles.inputContainer}>
            <Input
              label="Answer:"
              onChangeText={answerText => this.setState({ answerText })}
              value={this.state.answerText}
              errorStyle={{ color: red }}
              errorMessage={
                this.state.errorMessage ? "Both fields are required" : ""
              }
            />
          </View>

          <Button
            title="Submit"
            raised
            backgroundColor={white}
            onPress={this.handleSubmit}
          />
        </Card>
      </KeyboardAvoidingView>
    )
  }
}

const styles = {
  mainContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignContent: "center"
  },
  inputContainer: {
    marginBottom: 16
  }
}

export default connect()(AddCard)
