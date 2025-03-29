// D:\MyShoppingApp\app\_layout.tsx
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { router, Slot } from "expo-router";

// 👇 เพิ่ม CartProvider
import { CartProvider } from "../contexts/CartContext";

export default function RootLayout() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace("/(tabs)/home");
      } else {
        router.replace("/(auth)");
      }
    });

    return () => unsubscribe();
  }, []);

  if (!isMounted) {
    return null;
  }

  // ✅ ครอบ Slot ด้วย CartProvider เพื่อให้ใช้ useCart ได้ทุกหน้า
  return (
    <CartProvider>
      <Slot />
    </CartProvider>
  );
}
