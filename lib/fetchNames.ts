// fetchNames.ts
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";

export async function fetchNames() {
  const nameCollection = collection(db, "Names");

  try {
    const snapshot = await getDocs(nameCollection);
    const nameList = snapshot.docs.map(doc => doc.data().Name);
    return nameList;
  } catch (error) {
    console.error("Error fetching names:", error);
    return [];
  }
}
