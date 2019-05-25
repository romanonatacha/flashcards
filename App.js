import React from "react"
import { View } from "react-native"
import { Provider } from "react-redux"

// Redux
import { createStore } from "redux"

// Components
import NavigationBar from "./components/NavigationBar"
import middleware from "./middleware"
import reducer from "./reducers"

const store = createStore(reducer, middleware)

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <NavigationBar />
        </View>
      </Provider>
    )
  }
}
