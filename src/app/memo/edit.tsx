import { View, TextInput, StyleSheet, Alert } from "react-native";
import CircleButton from "../../components/CircleButton";

import { FontAwesome6 } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useKeyboardHeight } from "../../components/useKeyboardHeight";
import { useEffect, useState } from "react";
import { auth, db } from "../../config";
import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";

const handlePress = (id: string, bodyText: string): void => {
  if (!auth.currentUser) {
    return;
  }
  const ref = doc(db, `users/${auth.currentUser.uid}/memos`, id);
  setDoc(ref, {
    bodyText,
    updatedAt: Timestamp.fromDate(new Date()),
  })
    .then(() => {
      router.back();
    })
    .catch((error) => {
      console.log(error);
      Alert.alert("更新に失敗しました");
    });
};

const Edit = (): JSX.Element => {
  const keyboardHeight = useKeyboardHeight();
  const id = String(useLocalSearchParams().id);
  const [bodyText, setBodyText] = useState("");

  useEffect(() => {
    if (!auth.currentUser) {
      return;
    }
    const ref = doc(db, `users/${auth.currentUser.uid}/memos`, id);
    getDoc(ref)
      .then((docRef) => {
        const remoteBodyText = docRef?.data()?.bodyText;
        setBodyText(remoteBodyText);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <View style={[styles.container, { marginBottom: keyboardHeight }]}>
      <View style={styles.inputContainer}>
        <TextInput
          multiline
          value={bodyText}
          style={styles.input}
          autoFocus
          onChangeText={(text) => {
            setBodyText(text);
          }}
        />
      </View>
      <CircleButton
        onPress={() => {
          handlePress(id, bodyText);
        }}
      >
        <FontAwesome6 name="check" size={38} color="#FFFFFF" />
      </CircleButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    flex: 1,
  },
  input: {
    paddingHorizontal: 27,
    paddingVertical: 32,
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
  },
});

export default Edit;
