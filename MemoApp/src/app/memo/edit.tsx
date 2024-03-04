import { useEffect, useState } from 'react'
import {
  View, TextInput, StyleSheet, Alert
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import { router, useLocalSearchParams } from 'expo-router'

import { CircleButton } from '../../components/CircleButton'
import { auth, db } from '../../config'
import { Timestamp, doc, getDoc, setDoc } from 'firebase/firestore'
import KeyboardAvoidingView from '../../components/KeyboardAvoidingView'

const handlePress = (id: string, bodyText: string): void => {
  if (auth.currentUser === null) { return }
  const ref = doc(db, `users/${auth.currentUser.uid}/memos`, id)
  setDoc(ref, {
    bodyText,
    updatedAt: Timestamp.fromDate(new Date())
  })
    .then(() => {
      router.back()
    })
    .catch((error) => {
      console.log(error)
      Alert.alert('更新に失敗しました')
    })
}

const Edit = (): JSX.Element => {
  const id = String(useLocalSearchParams().id)
  const [bodyText, setBodyText] = useState('')

  useEffect(() => {
    if (auth.currentUser === null) { return }
    const ref = doc(db, `users/${auth.currentUser.uid}/memos`, id)
    getDoc(ref)
      .then((docRef) => {
        const RemoteBodyText = docRef?.data()?.bodyText as string
        setBodyText(RemoteBodyText)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <KeyboardAvoidingView style={styles.container}>
        <View style={styles.inputContainer}>
            <TextInput
              multiline
              style={styles.input}
              value={bodyText}
              onChangeText={(value) => { setBodyText(value) }}
              autoFocus
            />
        </View>
        <CircleButton onPress={() => { handlePress(id, bodyText) }}>
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
    flex: 1
  },
  input: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    paddingVertical: 32,
    paddingHorizontal: 27
  }
})

export default Edit
