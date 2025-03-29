// D:\MyShoppingApp\app\(tabs)\account\add-address.tsx
import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import { db, auth } from "../../../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export default function AddAddressScreen() {
  const [name, setName] = useState("");
  const [detail, setDetail] = useState("");
  const router = useRouter();

  const handleSave = async () => {
    if (!name || !detail) {
      Alert.alert("กรุณากรอกข้อมูลให้ครบ");
      return;
    }

    const userId = auth.currentUser?.uid;
    if (!userId) return;

    await addDoc(collection(db, "users", userId, "addresses"), {
      name,
      detail,
      isPrimary: false,
    });

    Alert.alert("เพิ่มที่อยู่เรียบร้อยแล้ว");
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>เพิ่มที่อยู่ใหม่</Text>
      <TextInput
        style={styles.input}
        placeholder="ชื่อที่อยู่ เช่น บ้านหลัก"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="รายละเอียดที่อยู่"
        value={detail}
        onChangeText={setDetail}
        multiline
      />
      <Button title="บันทึกที่อยู่" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 12 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginBottom: 16,
  },
});
