// D:\MyShoppingApp\app\index.tsx
import { View, Text, ActivityIndicator } from "react-native";

export default function InitialScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="#000" />
      <Text>กำลังโหลด...</Text>
    </View>
  );
}
