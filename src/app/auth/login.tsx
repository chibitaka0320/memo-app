import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import Button from "../../components/Button";
import { Link, router } from "expo-router";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config";

const handlePress = (email: string, password: string): void => {
  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      router.replace("/memo/list");
    })
    .catch((error) => {
      const { message } = error;
      Alert.alert(message);
    });
};

const Login = (): JSX.Element => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={(text) => {
            setEmail(text);
          }}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="Email Address"
          textContentType="emailAddress"
        />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={(text) => {
            setPassword(text);
          }}
          autoCapitalize="none"
          secureTextEntry
          placeholder="Password Address"
          textContentType="password"
        />
        <Button
          label="Submit"
          onPress={() => {
            handlePress(email, password);
          }}
        />
        <View style={styles.footer}>
          <Text style={styles.footerText}>Not registerd?</Text>
          <Link href="/auth/signup" asChild replace>
            <TouchableOpacity>
              <Text style={styles.footerLink}>Sign up here!</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F4F8",
  },
  inner: {
    paddingVertical: 24,
    paddingHorizontal: 27,
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "bold",
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: "#DDDDDD",
    backgroundColor: "#FFFFFF",
    height: 48,
    padding: 8,
    fontSize: 16,
    marginBottom: 16,
  },
  footer: {
    flexDirection: "row",
  },
  footerText: {
    fontSize: 14,
    lineHeight: 24,
    marginRight: 8,
  },
  footerLink: {
    fontSize: 14,
    lineHeight: 24,
    color: "#467FD3",
  },
});

export default Login;
