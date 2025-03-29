import { db } from "./firebaseConfig.js";
import { collection, addDoc } from "firebase/firestore";

// ข้อมูลสินค้าจาก JSON
const products = [
    {
        "id": "1",
        "name": "เสื้อเชิ้ตลายทาง",
        "category": "เครื่องแต่งกาย",
        "price": 350,
        "description": "เสื้อเชิ้ตลายทางสวยงาม เหมาะสำหรับใส่ในทุกโอกาส",
        "image": "clothes/shirt1.jpg",
        "shop": {
          "name": "ร้านเสื้อผ้าแฟชั่น A",
          "image": "shops/shop-a.jpg"
        }
      },
      {
        "id": "2",
        "name": "สร้อยคอเงินแท้",
        "category": "เครื่องประดับ",
        "price": 1500,
        "description": "สร้อยคอเงินแท้ ดีไซน์สวยงาม เหมาะสำหรับใส่ในทุกโอกาส",
        "image": "accessories/necklace1.jpg",
        "shop": {
          "name": "ร้านเครื่องประดับ B",
          "image": "shops/shop-b.jpg"
        }
      },
      {
        "id": "3",
        "name": "ลิปสติกสีแดง",
        "category": "เครื่องสำอาง",
        "price": 280,
        "description": "ลิปสติกสีแดงสดใส ติดทนนาน เหมาะสำหรับทุกโอกาส",
        "image": "cosmetics/lipstick1.jpg",
        "shop": {
          "name": "ร้านเครื่องสำอาง C",
          "image": "shops/shop-b.jpg"
        }
      },
      {
        "id": "4",
        "name": "เสื้อเชิ้ต",
        "category": "เครื่องแต่งกาย",
        "price": 350,
        "description": "เสื้อเชิ้ตลายทางสวยงาม เหมาะสำหรับใส่ในทุกโอกาส",
        "image": "clothes/shirt4.jpg",
        "shop": {
          "name": "ร้านเสื้อผ้าแฟชั่น A",
          "image": "shops/shop-b.jpg"
        }
      },
      {
        "id": "5",
        "name": "สร้อยทอง",
        "category": "เครื่องประดับ",
        "price": 15000,
        "description": "สร้อยทอง ดีไซน์สวยงาม เหมาะสำหรับใส่ในทุกโอกาส",
        "image": "accessories/necklace1.jpg",
        "shop": {
          "name": "ร้านเครื่องประดับ B",
          "image": "shops/shop-b.jpg"
        }
      },
      {
        "id": "6",
        "name": "ลิปสติกสีชมพู",
        "category": "เครื่องสำอาง",
        "price": 300,
        "description": "ลิปสติกสีแดงสดใส ติดทนนาน เหมาะสำหรับทุกโอกาส",
        "image": "cosmetics/lipstick1.jpg",
        "shop": {
          "name": "ร้านเครื่องสำอาง C",
          "image": "shops/shop-c.jpg"
        }
      },
      {
        "id": "7",
        "name": "เสื้อเชิ้ต",
        "category": "เครื่องแต่งกาย",
        "price": 350,
        "description": "เสื้อเชิ้ตลายทางสวยงาม เหมาะสำหรับใส่ในทุกโอกาส",
        "image": "clothes/shirt2.jpg",
        "shop": {
          "name": "ร้านเสื้อผ้าแฟชั่น A",
          "image": "shops/shop-b.jpg"
        }
      },
      {
        "id": "8",
        "name": "เสื้อเชิ้ต",
        "category": "เครื่องแต่งกาย",
        "price": 350,
        "description": "เสื้อเชิ้ตลายทางสวยงาม เหมาะสำหรับใส่ในทุกโอกาส",
        "image": "clothes/shirt3.jpg",
        "shop": {
          "name": "ร้านเสื้อผ้าแฟชั่น A",
          "image": "shops/shop-b.jpg"
        }
      },
  // เพิ่มข้อมูลสินค้าทุกตัวที่มีใน JSON ที่คุณส่งมา
];

// ฟังก์ชันสำหรับเพิ่มข้อมูลสินค้าไปยัง Firestore
const addProducts = async () => {
  try {
    for (const product of products) {
      // เพิ่มเอกสารสินค้าใน collection "products"
      const docRef = await addDoc(collection(db, "products"), {
        id: product.id,
        name: product.name,
        category: product.category,
        price: product.price,
        description: product.description,
        image: product.image,
        shop: product.shop
      });
      console.log("Document written with ID: ", docRef.id);
    }
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

// เรียกใช้งานฟังก์ชันเพิ่มสินค้า
addProducts();
