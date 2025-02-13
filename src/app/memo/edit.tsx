import {
  View,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import CircleButton from "../../components/CircleButton";

import { FontAwesome6 } from "@expo/vector-icons";
import { router } from "expo-router";

const handlePress = (): void => {
  router.back();
};

const Edit = (): JSX.Element => {
  return (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput multiline value={"買い物\nリスト"} style={styles.input} />
      </View>
      <CircleButton onPress={handlePress}>
        <FontAwesome6 name="check" size={38} color="#FFFFFF" />
      </CircleButton>
    </KeyboardAvoidingView>
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
