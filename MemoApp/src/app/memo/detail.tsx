import { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { Foundation } from '@expo/vector-icons'
import { router, useLocalSearchParams } from 'expo-router'
import { doc, onSnapshot } from 'firebase/firestore'

import { CircleButton } from '../../components/CircleButton'
import { type Memo } from '../types/memo'
import { auth, db } from '../../config'

const handlePress = (id: string): void => {
  router.push({ pathname: '/memo/edit', params: { id } })
}

const Detail = (): JSX.Element => {
  const id = String(useLocalSearchParams().id)
  const [memo, setMemo] = useState<Memo | null>(null)

  useEffect(() => {
    if (auth.currentUser === null) { return }
    const ref = doc(db, `users/${auth.currentUser.uid}/memos`, id)
    const unsubscribe: any = onSnapshot(ref, (memoDoc) => {
      const { bodyText, updatedAt } = memoDoc.data() as Memo
      setMemo({
        id,
        bodyText,
        updatedAt
      })
      return unsubscribe
    })
  }, [])

  return (
    <View style={styles.container}>
        <View style={styles.memoHeader}>
            <Text style={styles.memoTitle} numberOfLines={1}>{memo?.bodyText}</Text>
            <Text style={styles.memoDate}>{memo?.updatedAt?.toDate().toLocaleString('ja-JP')}</Text>
        </View>
        <ScrollView style={styles.memoBody}>
            <Text style={styles.memoBodyText}>
                {memo?.bodyText}
            </Text>
        </ScrollView>
        <CircleButton style={{ top: 60, bottom: 'auto' }} onPress={() => { handlePress(id) }}>
            <Foundation name='pencil' size={30}/>
        </CircleButton>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  memoHeader: {
    backgroundColor: '#467FD3',
    height: 96,
    justifyContent: 'center',
    paddingVertical: 24,
    paddingHorizontal: 19
  },
  memoTitle: {
    color: '#ffffff',
    fontSize: 20,
    lineHeight: 32,
    fontWeight: 'bold'
  },
  memoDate: {
    color: '#ffffff',
    fontSize: 12,
    lineHeight: 16
  },
  memoBody: {
    paddingHorizontal: 27
  },
  memoBodyText: {
    paddingVertical: 32,
    fontSize: 16,
    lineHeight: 24,
    color: '#000000'
  }
}
)

export default Detail
