'use client'

import { User, onAuthStateChanged, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import { getUserInfo } from "@/services/auth";
import { auth } from "../../../firebase";


interface IAuthContext {
  currentUser: User | null
  userRole: string | null;
  logout: any,
}

export const AuthContext = createContext<IAuthContext>({
  currentUser: null,
  userRole: null,
  logout: () => null,
});

export const AuthProvider = ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null); // Add userRole state
  const [loading, setLoading] = useState(true);
  const router = useRouter()


  const logout = () => {
    setCurrentUser(null)
    signOut(auth)
    router.push("/");
  };

  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);      

      if(user){
        getUserInfo(user.uid).then((data: any) => {          
          setUserRole(data.role);
        });

      }
      setLoading(false);
    })

    return unsubscribe;
  }, [])

  return (
    <AuthContext.Provider value={{ currentUser, userRole, logout }}>
      {loading? null : children}
    </AuthContext.Provider>
  )
}