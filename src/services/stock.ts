import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc, QuerySnapshot, DocumentData } from "firebase/firestore"

import db from "../../firebase";

interface Product{
    id: string
    name: string,
    category: string,
    description: string,
    quantity: number,
    price: number
}


export const addProducts = async (name: string, category: string, description: string, price: number, quantity: number) => {
	try {
		const product = await addDoc(collection(db, "products"), {
			name, category, description,price,quantity
		})
        return product
	}	
		 catch (err) {
		console.error(err)
	}

}


export const getAllProducts = async (setProducts: (products: Product[]) => void) => {
    try {
        const unsub = onSnapshot(collection(db, "products"), (snapshot: QuerySnapshot<DocumentData>) => {
            const docs: Product[] = [];
            snapshot.forEach((doc) => {
                const data = doc.data() as Product; 
                docs.unshift({ ...data, id: doc.id });
            });
            setProducts(docs);
        });
    } catch (err) {
        console.error(err);
    }
}



export const editProduct = async (productId: string,updatedProduct: Product) => {
	try {
         

        await updateDoc(doc(db, "products", productId), {
            ...updatedProduct,
          });

        
	} catch (err) {
		console.error(err)
	}
}


export const deleteProduct = async (productId: string) => {
	try {
         
          await deleteDoc(doc(db, "products", productId))
        
	} catch (err) {
		console.error(err)
	}
}