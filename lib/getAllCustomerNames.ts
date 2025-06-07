// fetchNames.ts or wherever you want to use it
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase"; // adjust the path based on your project structure

async function fetchNames() {
  const nameCollection = collection(db, "Name");

  try {
    const snapshot = await getDocs(nameCollection);
    const nameList = snapshot.docs.map(doc => doc.data().Name);
    console.log(nameList);
    return nameList;
  } catch (error) {
    console.error("Error fetching names:", error);
    return [];
  }
}

fetchNames();
