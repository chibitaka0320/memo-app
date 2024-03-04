import { useState } from 'react'
import {
  View, TextInput, StyleSheet
} from 'react-native'
import { router } from 'expo-router'
import { Timestamp, addDoc, collection } from 'firebase/firestore'
import { auth, db } from '../../config'
import { Feather } from '@expo/vector-icons'

import { CircleButton } from '../../components/CircleButton'
import KeyboardAvoidingView from '../../components/KeyboardAvoidingView'

const handlePress = (bodyText: string): void => {
  if (auth.currentUser === null) { return }
  const ref = collection(db, `users/${auth.currentUser.uid}/memos`)
  addDoc(ref, {
    bodyText,
    updatedAt: Timestamp.fromDate(new Date())
  })
    .then((docRef) => {
      console.log('success', docRef.id)
    })
    .catch((error) => {
      console.log(error)
    })
  router.back()
}

const Create = (): JSX.Element => {
  const [bodyText, setBodyText] = useState('')
  return (
      <KeyboardAvoidingView style={styles.container}>
          <View style={styles.inputContainer}>
              <TextInput
                multiline
                style={styles.input}
                value={bodyText}
                onChangeText={(value) => { setBodyText(value) }}
                autoCapitalize='none'
                autoFocus
              />
          </View>
          <CircleButton onPress={() => { handlePress(bodyText) }}>
              <Feather name='check' size={40}/>
          </CircleButton>
      </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  inputContainer: {
    paddingVertical: 32,
    paddingHorizontal: 27,
    flex: 1
  },
  input: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24
  }
})

export default Create
