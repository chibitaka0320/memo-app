import { View, TextInput, StyleSheet } from "react-native";

import { FontAwesome6 } from "@expo/vector-icons";
import { router } from "expo-router";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { auth, db } from "../../config";
import { useState } from "react";
import CircleButton from "../../components/CircleButton";
import { useKeyboardHeight } from "../../components/useKeyboardHeight";

const handlePress = (bodyText: string): void => {
  if (!auth.currentUser) {
    return;
  }
  const ref = collection(db, `users/${auth.currentUser.uid}/memos`);
  addDoc(ref, {
    bodyText,
    updatedAt: Timestamp.fromDate(new Date()),
  })
    .then(() => {
      router.back();
    })
    .catch((error) => {
      console.log(error);
    });
};

const Create = (): JSX.Element => {
  const [bodyText, setBodyText] = useState<string>("");
  const keyboardHeight = useKeyboardHeight();

  return (
    <View style={[styles.container, { marginBottom: keyboardHeight }]}>
      <View style={styles.inputContainer}>
        <TextInput
          multiline
          value={bodyText}
          style={styles.input}
          onChangeText={(text) => {
            setBodyText(text);
          }}
          autoFocus
        />
      </View>
      <CircleButton
        onPress={() => {
          handlePress(bodyText);
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
    paddingVertical: 32,
    paddingHorizontal: 27,
    flex: 1,
  },
  input: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
  },
});

export default Create;
