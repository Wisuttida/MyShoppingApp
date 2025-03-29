import { useEffect, useState } from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../../../firebaseConfig";

interface Order {
  id: string;
  shopName: string;
  items: {
    name: string;
    image: string;
    price: number;
    quantity: number;
  }[];
  total: number;
  status: string;
}

export default function OrdersScreen() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const userId = auth.currentUser?.uid;
      if (!userId) return;

      const snap = await getDocs(collection(db, "users", userId, "orders"));
      const list = snap.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Order, "id">),
      }));
      setOrders(list);
    };

    fetchOrders();
  }, []);

  const renderItem = ({ item }: { item: Order }) => (
    <View style={styles.card}>
      <Text style={styles.shopName}>🛍️ {item.shopName}</Text>
      {item.items.map((prod, idx) => (
        <View key={idx} style={{ marginVertical: 6 }}>
          <Image source={{ uri: prod.image }} style={styles.image} />
          <Text>สินค้า: {prod.name}</Text>
          <Text>จำนวน: {prod.quantity}</Text>
          <Text>ราคาต่อชิ้น: {prod.price} บาท</Text>
        </View>
      ))}
      <Text>ราคารวม: {item.total} บาท</Text>
      <Text>สถานะ: {item.status}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>คำสั่งซื้อของฉัน</Text>
      <FlatList data={orders} keyExtractor={(item) => item.id} renderItem={renderItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
  },
  shopName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 6,
    marginBottom: 4,
  },
});
