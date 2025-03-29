//D:\MyShoppingApp\app\(tabs)\account\index.tsx
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import { auth, db } from "../../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

interface Address {
  name: string;
  detail: string;
}

export default function AccountScreen() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [address, setAddress] = useState<Address | null>(null);

  const userId = auth.currentUser?.uid;

  useEffect(() => {
    if (!userId) return;
  
    const fetchUserData = async () => {
      const userDoc = await getDoc(doc(db, "users", userId));
      if (userDoc.exists()) {
        const data = userDoc.data();
        setAddress(data.address || null);
      }
    };
  
    fetchUserData();
  }, [userId]);
  
  

  return (
    <View style={styles.container}>

      {auth.currentUser?.email && (
        <Text style={styles.email}>📧 {auth.currentUser.email}</Text>
      )}

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>ที่อยู่</Text>
        <TouchableOpacity onPress={() => router.push("/(tabs)/account/edit-address")}>
  <Text style={styles.addBtn}>✏️ แก้ไขที่อยู่</Text>
</TouchableOpacity>

      </View>

      {address ? (
  <View style={styles.addressCard}>
    <Text style={styles.addressName}>{address.name}</Text>
    <Text>{address.detail}</Text>
  </View>
) : (
  <Text>ยังไม่มีที่อยู่</Text>
)}


      <TouchableOpacity style={styles.orderBtn} onPress={() => router.push("/(tabs)/account/orders")}>
        <Text style={styles.orderBtnText}>📦 ดูคำสั่งซื้อของฉัน</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutBtn} onPress={() => auth.signOut()}>
        <Text style={styles.logoutBtnText}>🚪 ออกจากระบบ</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  userName: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  email: { fontSize: 14, color: "#666", marginBottom: 20 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  sectionTitle: { fontSize: 18, fontWeight: "bold" },
  addBtn: { color: "blue" },
  addressCard: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 1,
  },
  addressName: { fontWeight: "bold", marginBottom: 4 },
  orderBtn: {
    marginTop: 20,
    backgroundColor: "#0080ff",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  orderBtnText: {
    color: "white",
    fontSize: 16,
  },
  logoutBtn: {
    marginTop: 16,
    backgroundColor: "#ff4444",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  logoutBtnText: {
    color: "white",
    fontSize: 16,
  },
});
