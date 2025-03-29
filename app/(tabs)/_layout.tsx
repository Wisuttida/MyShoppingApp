// D:\MyShoppingApp\app\(tabs)\_layout.tsx
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true, // ถ้าอยากใช้ header ของ Expo Router
        // หรือต้องการทำ Custom Top Bar เอง อาจตั้งเป็น false ได้
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "หน้าหลัก",
          tabBarIcon: ({ focused, size }) => (
            <Ionicons name="home" size={size} color={focused ? "blue" : "gray"} />
          ),
        }}
      />
      <Tabs.Screen
        name="products"
        options={{
          title: "สินค้า",
          tabBarIcon: ({ focused, size }) => (
            <Ionicons name="pricetag" size={size} color={focused ? "blue" : "gray"} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "ตะกร้า",
          tabBarIcon: ({ focused, size }) => (
            <Ionicons name="cart" size={size} color={focused ? "blue" : "gray"} />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "บัญชี",
          tabBarIcon: ({ focused, size }) => (
            <Ionicons name="person" size={size} color={focused ? "blue" : "gray"} />
          ),
        }}
      />
    </Tabs>
  );
}
