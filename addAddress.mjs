import { doc, setDoc } from "firebase/firestore";
import firebaseModule from "./firebaseConfig.js"; // ✅ ใช้ default import
const { db } = firebaseModule;

const userId = "XNzQ26daPVhY0cbaRiZh5uE4IMr1";

const saveAddress = async () => {
  try {
    await setDoc(doc(db, "users", userId), {
      address: {
        name: "บ้าน",
        detail: "99/2 ซอยสุขใจ แขวงสวนหลวง เขตสวนหลวง กรุงเทพฯ",
      },
    }, { merge: true });

    console.log("✅ เพิ่ม/แก้ไขที่อยู่เรียบร้อย");
  } catch (error) {
    console.error("❌ เกิดข้อผิดพลาด:", error);
  }
};

saveAddress();
