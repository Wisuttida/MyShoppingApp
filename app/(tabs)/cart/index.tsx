// D:\MyShoppingApp\app\(tabs)\cart\index.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Button,
  ScrollView,
} from "react-native";
import Checkbox from "expo-checkbox"; // ต้องติดตั้ง expo-checkbox
import { useCart } from "../../../contexts/CartContext";
import { collection, addDoc, Timestamp } from "firebase/firestore"; 
import { auth, db } from "../../../firebaseConfig";
 // Adjust the path to your Firebase config file
// contexts/CartContext.tsx

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  shop: {
    name: string;
    image: string;
  };
}


export default function CartScreen() {
  const { cartItems, addToCart, clearCart } = useCart();

  // จัดกลุ่มตามร้านค้า
  const groupedByShop = cartItems.reduce((groups: Record<string, CartItem[]>, item) => {
    const shopName = item.shop?.name || "ไม่ทราบชื่อร้าน";
    if (!groups[shopName]) groups[shopName] = [];
    groups[shopName].push(item);
    return groups;
  }, {});

  // เช็คสินค้า & ร้านค้าที่ถูกเลือก
  const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>({});
  const [selectedShops, setSelectedShops] = useState<Record<string, boolean>>({});

  const toggleItem = (id: string) => {
    setSelectedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleShop = (shop: string) => {
    const isSelected = !selectedShops[shop];
    setSelectedShops((prev) => ({ ...prev, [shop]: isSelected }));

    // เลือก/ยกเลิกทั้งหมดในร้านเดียวกัน
    const updatedItems = { ...selectedItems };
    groupedByShop[shop].forEach((item: any) => {
      updatedItems[item.id] = isSelected;
    });
    setSelectedItems(updatedItems);
  };

  const handleQuantityChange = (id: string, delta: number) => {
    const item = cartItems.find((i) => i.id === id);
    if (item) {
      const newQty = Math.max(1, item.quantity + delta);
      addToCart({ ...item, quantity: newQty - item.quantity });
    }
  };

  const handleCheckout = async () => {
    console.log("เริ่ม process handleCheckout");
  
    const ordersByShop: Record<string, CartItem[]> = {};
  
    cartItems.forEach((item) => {
      if (selectedItems[item.id]) {
        const shopName = item.shop?.name || "ไม่ทราบร้าน";
        if (!ordersByShop[shopName]) ordersByShop[shopName] = [];
        ordersByShop[shopName].push(item);
      }
    });
  
    const userId = auth.currentUser?.uid;
    if (!userId) {
      alert("ไม่พบผู้ใช้งาน");
      return;
    }
  
    console.log("🛒 คำสั่งซื้อที่จะบันทึก:", ordersByShop);
  
    for (const [shopName, items] of Object.entries(ordersByShop)) {
      const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      await addDoc(collection(db, "users", userId, "orders"), {
        shopName,
        items,
        total,
        status: "รอการชำระเงิน",
        createdAt: Timestamp.now(),
      });
    }
  
    alert("บันทึกคำสั่งซื้อเรียบร้อยแล้ว");
    clearCart();
  };
  
  const total = cartItems.reduce((sum, item) => {
    if (selectedItems[item.id]) {
      return sum + item.price * item.quantity;
    }
    return sum;
  }, 0);

  return (
    <ScrollView style={{ flex: 1, padding: 10 }}>
      {Object.entries(groupedByShop).map(([shop, items]) => (
        <View key={shop} style={styles.shopSection}>
          <View style={styles.shopHeader}>
            <Checkbox value={!!selectedShops[shop]} onValueChange={() => toggleShop(shop)} />
            <Text style={styles.shopName}>{shop}</Text>
          </View>

          {items.map((item: any) => (
            <View key={item.id} style={styles.itemRow}>
              <Checkbox value={!!selectedItems[item.id]} onValueChange={() => toggleItem(item.id)} />
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text>{item.name}</Text>
                <Text style={{ color: "green" }}>฿ {item.price} / ชิ้น</Text>
                <View style={styles.qtyRow}>
                  <TouchableOpacity onPress={() => handleQuantityChange(item.id, -1)} style={styles.qtyBtn}>
                    <Text>-</Text>
                  </TouchableOpacity>
                  <Text style={{ marginHorizontal: 10 }}>{item.quantity}</Text>
                  <TouchableOpacity onPress={() => handleQuantityChange(item.id, 1)} style={styles.qtyBtn}>
                    <Text>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>
      ))}

      <View style={styles.footer}>
        <Text style={styles.total}>รวมทั้งหมด: ฿ {total}</Text>
        <Button title="สั่งสินค้า" onPress={handleCheckout} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  shopSection: {
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  shopHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  shopName: {
    marginLeft: 8,
    fontWeight: "bold",
    fontSize: 16,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 6,
  },
  qtyRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  qtyBtn: {
    padding: 4,
    backgroundColor: "#ddd",
    borderRadius: 4,
    width: 30,
    alignItems: "center",
  },
  footer: {
    padding: 16,
    backgroundColor: "#f8f8f8",
    borderTopWidth: 1,
    borderColor: "#ccc",
    marginTop: 20,
    alignItems: "center",
  },
  total: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
  },
});
