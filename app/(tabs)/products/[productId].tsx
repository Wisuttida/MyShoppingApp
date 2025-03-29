// D:\MyShoppingApp\app\(tabs)\products\[productId].tsx
import React, { useState, useEffect } from "react";
import { View, Text, Image, Button, StyleSheet } from "react-native";
import { useRouter, useLocalSearchParams, useNavigation } from "expo-router";
import { db } from "../../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useCart } from "../../../contexts/CartContext";
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  shop: {
    name: string;
    image: string;
  };
}

export default function ProductDetailScreen() {
  const [product, setProduct] = useState<Product | null>(null);
  const { productId } = useLocalSearchParams();
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    const fetchProductDetails = async () => {
      const productRef = doc(db, "products", productId as string);
      const productSnap = await getDoc(productRef);
      if (productSnap.exists()) {
        const data = productSnap.data() as Product;
        setProduct(data);

        // ✅ ตั้งชื่อ Header เป็นชื่อสินค้า
        navigation.setOptions({ title: data.name });
      } else {
        console.log("ไม่พบสินค้า");
      }
    };
    fetchProductDetails();
  }, [productId]);

  const { addToCart } = useCart();

const handleAddToCart = () => {
  if (product) {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      shop: product.shop,
      image: product.image,
    });
    
    alert(`เพิ่ม "${product.name}" ลงในตะกร้าแล้ว!`);
  }
};

  if (!product) {
    return <Text>กำลังโหลดข้อมูลสินค้า...</Text>;
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>ราคา: {product.price} บาท</Text>
      <Text style={styles.shopName}>ร้าน: {product.shop.name}</Text>
      <Image source={{ uri: product.shop.image }} style={styles.shopImage} />
      <Text>{product.description}</Text>
      <Button title="เพิ่มลงในตะกร้า" onPress={handleAddToCart} />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 250,
    borderRadius: 8,
  },
  name: {
    fontSize: 24,
    marginVertical: 8,
  },
  price: {
    fontSize: 20,
    color: "green",
    marginBottom: 8,
  },
  shopName: {
    fontSize: 18,
    marginBottom: 8,
  },
  shopImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 8,
  },
});
