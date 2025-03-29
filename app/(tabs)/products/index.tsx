import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { db } from "../../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";


interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  shop: {
    name: string;
    image: string;
  };
}

export default function ProductsIndex() {
  const router = useRouter();
  const { category = "all" } = useLocalSearchParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [priceFilter, setPriceFilter] = useState("all");

  const selectedCategory = Array.isArray(category) ? category[0] : category;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productList: Product[] = querySnapshot.docs.map((doc) => ({
          ...(doc.data() as Omit<Product, "id">),
          id: doc.id, // ใส่ท้ายสุด ป้องกัน field "id" ทับ
        }));
        setProducts(productList);
      } catch (error) {
        console.error("ไม่สามารถดึงข้อมูลสินค้าได้:", error);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((p) => {
    const matchCategory = selectedCategory === "all" || p.category === selectedCategory;
    const matchPrice =
      priceFilter === "all" ||
      (priceFilter === "<500" && p.price < 500) ||
      (priceFilter === "500-1000" && p.price >= 500 && p.price <= 1000) ||
      (priceFilter === ">1000" && p.price > 1000);
    return matchCategory && matchPrice;
  });

  const renderItem = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/products/${item.id}`)}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>ราคา {item.price} บาท</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Text style={styles.header}>
        {selectedCategory === "all" ? "สินค้าทั้งหมด" : `หมวดหมู่: ${selectedCategory}`}
      </Text>

      <View style={styles.sidebarFilter}>
        <Text style={{ fontWeight: "bold", marginBottom: 5 }}>กรองตามราคา:</Text>
        {["all", "<500", "500-1000", ">1000"].map((range) => (
          <TouchableOpacity
            key={range}
            onPress={() => setPriceFilter(range)}
            style={[styles.priceBtn, priceFilter === range && styles.priceBtnActive]}
          >
            <Text>{range === "all" ? "ทั้งหมด" : range}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  sidebarFilter: {
    backgroundColor: "#f2f2f2",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  priceBtn: {
    backgroundColor: "#eee",
    padding: 6,
    borderRadius: 6,
    marginVertical: 3,
  },
  priceBtnActive: {
    backgroundColor: "#bbb",
  },
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
  name: {
    fontSize: 18,
    marginTop: 8,
  },
  price: {
    color: "green",
  },
});
