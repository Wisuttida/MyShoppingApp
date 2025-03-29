// D:\MyShoppingApp\app\(tabs)\home\index.tsx
import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from "react-native";
import { db } from "../../../firebaseConfig"; // เชื่อมต่อกับ Firebase
import { collection, getDocs } from "firebase/firestore"; // ใช้ Firestore SDK สำหรับดึงข้อมูล
import { useRouter } from "expo-router";  // ใช้ useRouter สำหรับการทำการนำทาง

interface Product {
  id: string; // ใช้ id ที่ Firebase สร้างให้
  name: string;
  price: number;
  image: string;
}

export default function HomeScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();  // เพื่อใช้ในการนำทางไปยังรายละเอียดสินค้า

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productList: Product[] = querySnapshot.docs.map((doc) => ({
        ...(doc.data() as Omit<Product, "id">),
        id: doc.id, // <-- ใส่ไว้ท้ายสุด!
      }));
      setProducts(productList);
    };
    fetchProducts();
  }, []);

  const handlePress = (productId: string) => {
    console.log("กดสินค้า ID:", productId);  // เพิ่มตรงนี้
    router.push(`/home/${productId}`);
  };
  

  const renderItem = ({ item }: { item: Product }) => (
    <TouchableOpacity style={styles.card} onPress={() => handlePress(item.id)}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text>{item.name}</Text>
      <Text>ราคา: {item.price} บาท</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id} // ใช้ Auto-ID เป็น key
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 10,
    padding: 10,
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 8,
  },
});
