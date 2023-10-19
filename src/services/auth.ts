import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { auth } from "../../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import db from "../../firebase";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";


export const signupUser = async (name: string, email: string, password: string, router: AppRouterInstance) => {


    try{
        const {user} = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
          

        await updateProfile(user, {
            displayName: name,
          });

          
            await setDoc(doc(db, "users",  user.uid), {
                email: email,
                role: "user"
              });
              router.push("/dashboard");     
        return user

    }
    catch(error){
        console.log(error);
    }
};





export const LoginUser = async (email: string, password: string, router: AppRouterInstance) => {

    try{
        const userData  = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );

          router.push("/dashboard");     
          return userData

    }
    catch(error){
        console.log(error);     
    }
};



export const getUserInfo = async (id:string) => {
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);
    const data = { uid: id, ...docSnap.data() };
    return data
  };
  