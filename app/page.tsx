import ProductCard from "@/components/productcard";
// import { db } from "@/lib/firebase/firebase";
// import { collection, getDocs } from "firebase/firestore";

export default async function Home() {
  // try {
  //   const usersRef = collection(db, "users");
  //   const docSnap = await getDocs(usersRef);
  //   docSnap.forEach((doc) => {
  //     console.log(doc.data());
  //   });
  // } catch (e) {
  //   console.log(e);
  // }
  return (
    <div className="p-20">
      <div>
        <ProductCard />
      </div>
    </div>
  );
}
