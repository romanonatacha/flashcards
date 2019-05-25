import React, { Component } from "react"
import { Platform, View, StatusBar } from "react-native"
import {
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
  createAppContainer,
  createStackNavigator
} from "react-navigation"
import { Constants } from "expo"

import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons"
import { white, purple } from '../utils/colors'
// Components
import DecksDisplay from "./DeckDisplay"
import CreateDeck from "./CreateDeck"
import DeckDetail from "./DeckDetail"
import AddCard from "./AddCard"
import Quiz from "./Quiz"

const RouteConfigs = {
  DecksDisplay: {
    screen: DecksDisplay,
    navigationOptions: {
      tabBarLabel: "Decks",
      tabBarIcon: ({ tintColor }) => (
        <MaterialCommunityIcons name="cards" size={30} color={tintColor} />
      )
    }
  },

  CreateDeck: {
    screen: CreateDeck,
    navigationOptions: {
      tabBarLabel: "Add Deck",
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome name="plus-square" size={30} color={tintColor} />
      )
    }
  }
}

const TabNavigatorConfig = {
  navigationOptions: {
    header: null
  },

  tabBarOptions: {
    activeTintColor: Platform.OS === "ios" ? purple : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === "ios" ? white : purple,
      shadowColor: "rgba(0, 0, 0, 0.24)",
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
}

const Tabs =
  Platform.OS === "ios"
    ? createBottomTabNavigator(RouteConfigs, TabNavigatorConfig)
    : createMaterialTopTabNavigator(RouteConfigs, TabNavigatorConfig)

const TabsContainer = createAppContainer(Tabs)

const MainNavigator = createStackNavigator({
  Home: {
    screen: TabsContainer,
    navigationOptions: {
      header: null
    }
  },

  DeckDetail: {
    screen: DeckDetail,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple
      }
    }
  },

  AddCard: {
    screen: AddCard,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple
      }
    }
  },

  Quiz: {
    screen: Quiz,
    navigationOptions: {
      title: "Quiz",
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple
      }
    }
  }
})

const MainNavigatorContainer = createAppContainer(MainNavigator)

const StatusBarContainer = ({ backgroundColor, ...props }) => {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

export default class NavigationBar extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBarContainer
          backgroundColor={purple}
          barStyle="light-content"
        />
        <MainNavigatorContainer />
      </View>
    )
  }
}
