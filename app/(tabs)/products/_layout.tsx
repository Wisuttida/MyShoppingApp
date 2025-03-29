import { Drawer } from "expo-router/drawer";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

function CustomDrawerContent() {
  const router = useRouter();

  const categories = [
    { label: "สินค้าทั้งหมด", value: "all" },
    { label: "เครื่องแต่งกาย", value: "เครื่องแต่งกาย" },
    { label: "เครื่องประดับ", value: "เครื่องประดับ" },
    { label: "เครื่องสำอาง", value: "เครื่องสำอาง" },
  ];

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>หมวดหมู่สินค้า</Text>
      {categories.map((cat) => (
        <TouchableOpacity
          key={cat.value}
          style={styles.drawerItem}
          onPress={() => {
            router.push(`/products?category=${encodeURIComponent(cat.value)}`);
          }}
        >
          <Text>{cat.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

export default function ProductsLayout() {
  return (
    <Drawer drawerContent={() => <CustomDrawerContent />} screenOptions={{ headerShown: true }}>
      <Drawer.Screen name="index" options={{ title: "สินค้า" }} />
    </Drawer>
  );
}

const styles = StyleSheet.create({
  drawerItem: {
    backgroundColor: "#eee",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
});
