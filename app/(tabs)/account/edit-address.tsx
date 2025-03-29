// D:\MyShoppingApp\app\(tabs)\account\edit-address.tsx
import { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import { db, auth } from "../../../firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function EditAddressScreen() {
  const router = useRouter();
  const userId = auth.currentUser?.uid || "XNzQ26daPVhY0cbaRiZh5uE4IMr1"; // ใช้ uid ของคุณชั่วคราว
  const [name, setName] = useState("");
  const [detail, setDetail] = useState("");

  useEffect(() => {
    const fetchAddress = async () => {
      if (!userId) return;

      const userDoc = await getDoc(doc(db, "users", userId));
      if (userDoc.exists()) {
        const data = userDoc.data();
        if (data.address) {
          setName(data.address.name);
          setDetail(data.address.detail);
        }
      }
    };
    fetchAddress();
  }, []);

  const handleSave = async () => {
    if (!userId) return;

    await setDoc(doc(db, "users", userId), {
      address: {
        name,
        detail,
      },
    }, { merge: true }); // merge = ไม่ลบข้อมูลอื่นใน doc

    Alert.alert("บันทึกที่อยู่เรียบร้อยแล้ว");
    router.replace("/(tabs)/account");
    
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>แก้ไขที่อยู่</Text>

      <TextInput
        style={styles.input}
        placeholder="ชื่อที่อยู่ เช่น บ้าน"
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

      <Button title="บันทึก" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 16 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginBottom: 16,
  },
});
