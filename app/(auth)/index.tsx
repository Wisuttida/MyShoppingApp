// D:\MyShoppingApp\app\(auth)\index.tsx
import { useState } from "react";
import { View, Button, TextInput, Alert, StyleSheet } from "react-native";
import { auth } from "../../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { router } from "expo-router";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        // ล็อกอินสำเร็จ
        router.replace("/(tabs)/home"); 
      })
      .catch(() => {
        // ล็อกอินไม่สำเร็จ
        Alert.alert("Login failed", "รหัสหรือ email ของคุณไม่ถูกต้อง");
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Register" onPress={() => router.push("/(auth)/register")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    justifyContent: "center", 
    padding: 16 
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 8,
    padding: 8,
    borderRadius: 4
  }
});
