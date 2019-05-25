import React, { Component } from "react"
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native"
import { Card } from "react-native-elements"

// Redux
import { connect } from "react-redux"
import { handleInitialData } from "../actions"
import { white } from '../utils/colors'

class DecksDisplay extends Component {
  componentDidMount() {
    this.props.getDecks()
  }

  /**
   * Renders a card view with a deck's title and number of questions
   *
   * @function renderDeckList
   */
  renderDeckList = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        this.props.navigation.navigate("DeckDetail", {
          id: item.id,
          title: item.title
        })
      }
    >
      <View>
        <Card title={item.title}>
          <Text style={styles.textStyle}>{`${
            item.questions.length
          } cards`}</Text>
        </Card>
      </View>
    </TouchableOpacity>
  )

  render() {
    const { decks } = this.props

    if (!decks) {
      return <Card title="Create a deck to get started!" />
    }

    return (
      <View style={styles.containerStyle}>
        {decks && (
          <FlatList
            data={decks}
            renderItem={this.renderDeckList}
            keyExtractor={item => item.title}
          />
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white
  },
  containerStyle: {
    flex: 1,
    alignSelf: "stretch"
  },
  textStyle: {
    flex: 1,
    alignSelf: "center"
  }
})

const mapDispatchToProps = dispatch => ({
  getDecks: () => dispatch(handleInitialData())
})

const mapStateToProps = ({ decks }) => ({
  decks: decks ? getSortedList(decks) : []
})

/**
 * Return sorted decks list based on title
 *
 * @function getSortedList
 */
const getSortedList = decks => {
  if (decks) {
    return Object.keys(decks)
      .map(key => ({
        id: decks[key].id,
        title: decks[key].title,
        questions: decks[key].questions
      }))
      .sort((a, b) => a.title.localeCompare(b.title))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DecksDisplay)
