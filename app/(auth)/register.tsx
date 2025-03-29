// D:\MyShoppingApp\app\(auth)\register.tsx
import { useState } from "react";
import { View, Button, TextInput, Alert, StyleSheet } from "react-native";
import { auth } from "../../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { router } from "expo-router";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        Alert.alert("Register Success", "สร้างบัญชีผู้ใช้สำเร็จ!");
        // อาจจะให้ redirect ไปหน้า Login หรือหน้า Home เลยก็ได้
        router.replace("/(auth)"); 
      })
      .catch((error) => {
        Alert.alert("Register Failed", error.message);
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
      <Button title="Register" onPress={handleRegister} />
      <Button
        title="Back to Login"
        onPress={() => router.replace("/(auth)")}
      />
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
