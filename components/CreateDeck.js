import React, { Component } from "react"
import { Keyboard, KeyboardAvoidingView, Platform, View } from "react-native"
import { Button, Card, Input } from "react-native-elements"

// Redux/API
import { connect } from "react-redux"
import { saveDeckTitle } from "../utils/api"
import { addDeck } from "../actions"
import { red, purple } from '../utils/colors'

class CreateDeck extends Component {
  state = {
    title: "",
    showErrorMessage: false
  }

  handleSubmit = () => {
    const { title } = this.state

    if (title) {
      const deck = {
        title,
        questions: []
      }

      // Update Redux
      this.props.dispatch(addDeck(deck))

      // Save to AsyncStorage
      saveDeckTitle(title)

      // Reset state
      this.setState({
        title: "",
        showErrorMessage: false
      })

      // Navigate to the Deck View
      this.props.navigation.navigate("DeckDetail", { title })
      Keyboard.dismiss()
    } else {
      this.setState({ showErrorMessage: true })
    }
  }

  render() {
    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        keyboardVerticalOffset={Platform.select({
          ios: () => 100,
          android: () => 120
        })()}
        enabled
      >
        <Card title="What is the title of your new deck?">
          <Input
            placeholder="Enter title name"
            onChangeText={title => this.setState({ title })}
            value={this.state.title}
            errorStyle={{ color: red }}
            errorMessage={
              this.state.showErrorMessage
                ? "Please enter a title for this deck"
                : ""
            }
          />

          <View style={{ margin: 8 }} />

          <Button
            title="Create Deck"
            raised
            backgroundColor={purple}
            onPress={this.handleSubmit}
          />
        </Card>
      </KeyboardAvoidingView>
    )
  }
}

export default connect()(CreateDeck)
