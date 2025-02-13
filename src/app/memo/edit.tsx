import { View, TextInput, StyleSheet } from "react-native";
import CircleButton from "../../components/CircleButton";

import { FontAwesome6 } from "@expo/vector-icons";
import { router } from "expo-router";
import { useKeyboardHeight } from "../../components/useKeyboardHeight";

const handlePress = (): void => {
  router.back();
};

const Edit = (): JSX.Element => {
  const keyboardHeight = useKeyboardHeight();

  return (
    <View style={[styles.container, { marginBottom: keyboardHeight }]}>
      <View style={styles.inputContainer}>
        <TextInput
          multiline
          value={"買い物\nリスト"}
          style={styles.input}
          autoFocus
        />
      </View>
      <CircleButton onPress={handlePress}>
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

export default Edit;
