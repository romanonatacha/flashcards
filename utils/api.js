import { AsyncStorage } from "react-native"
import { Notifications, Permissions } from "expo"

export const DECKS_STORAGE_KEY = "RNFlashcards:Decks"
export const NOTIFICATION_KEY = "RNFlashcards:Notifications"

/**
 * Return all of the decks along with their titles, questions, and answers
 *
 * @function getDecks
 */
export const getDecks = () => {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY).then(results =>
    formatDecks(results)
  )
}

const setDummyData = () => {
  const decks = {
    React: {
      title: "React",
      questions: [
        {
          question: "What is React?",
          answer: "A library for managing user interfaces"
        },
        {
          question: "Where do you make Ajax requests in React?",
          answer: "The componentDidMount lifecycle event"
        }
      ]
    },
    JavaScript: {
      title: "JavaScript",
      questions: [
        {
          question: "What is a closure?",
          answer:
            "The combination of a function and the lexical environment within which that function was declared."
        }
      ]
    }
  }

  AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks))
  return decks
}

const formatDecks = results => {
  return results === null ? setDummyData() : JSON.parse(results)
}

/**
 * Take in two arguments, title and card, and will add the card to the list of questions
 * for the deck with the associated title.
 *
 * @function addCardToDeck
 */
export const addCardToDeck = (card, title) => {
  getDecks()
    .then(decks => {
      return {
        ...decks,
        [title]: {
          title,
          questions: decks[title].questions.concat([card])
        }
      }
    })
    .then(newDecks => {
      AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(newDecks))
    })
}

/**
 * Take in a single title argument and add it to the decks.
 *
 * @function saveDeckTitle
 */
export const saveDeckTitle = title => {
  getDecks()
    .then(decks => {
      return {
        ...decks,
        [title]: {
          title,
          questions: []
        }
      }
    })
    .then(newDecks => {
      AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(newDecks))
    })
}

/**
 * Delete a deck from storage
 *
 * @param {string} title - Title of deck to delete
 * @function deleteDeckFromStorage
 */
export const deleteDeckFromStorage = async title => {
  const decks = await getDecks()

  let newDecks = {}
  for (let [key, value] of Object.entries(decks)) {
    if (key !== title) {
      newDecks[key] = value
    }
  }

  await AsyncStorage.removeItem(DECKS_STORAGE_KEY)
  await AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(newDecks))
}

export const clearLocalNotification = () => {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync
  )
}

const createNotification = () => {
  return {
    title: "Learn by Flashcards!",
    body: "👋 don't forget to review your flashcards today!",
    ios: {
      sound: true
    },
    android: {
      sound: true,
      priority: "high",
      sticky: false,
      vibrate: true
    }
  }
}

export const setLocalNotification = () => {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then(data => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          if (status === "granted") {
            Notifications.cancelAllScheduledNotificationsAsync()

            let tomorrow = new Date()
            tomorrow.setDate(tomorrow.getDate() + 1)
            tomorrow.setHours(20)
            tomorrow.setMinutes(0)

            Notifications.scheduleLocalNotificationAsync(createNotification(), {
              time: tomorrow,
              repeat: "day"
            })

            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
          }
        })
      }
    })
}
