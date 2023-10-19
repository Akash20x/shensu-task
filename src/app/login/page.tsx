"use client"
import React, { useContext, useState } from "react"
import { useRouter } from 'next/navigation'
import { LoginUser } from "@/services/auth"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { AuthContext } from "../context/AuthContext";



const Login = () => {

  const { currentUser } = useContext(AuthContext)
  const router = useRouter()

  if(currentUser){
    router.push("/dashboard");     
  }

    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const [credentials, setCredentials] = useState({
      email: "",
      password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };
  
  
    const handleSubmit = async () => {

      if(!credentials.email || !credentials.password){
        toast({
          variant: "destructive",
          description: "Missing Fields",
        });
        return
      }
      
      setIsLoading(true)
      const res = await LoginUser(credentials.email, credentials.password, router)
      if(!res){
          toast({
          title: "Error",
          variant: "destructive",
          description: "Invalid Credentials",
        });
        setIsLoading(false) 
        return;
      }
      toast({
        description: "✅ Signing you in.",
      });
      setIsLoading(false) 
    }
  return (
    <div className="flex justify-center items-center mt-5">

<Card>
<CardHeader className="space-y-1">
  <CardTitle className="text-2xl">Welcome back</CardTitle>
  <CardDescription>Login to access your account.</CardDescription>
</CardHeader>
<CardContent className="grid gap-4">
  <div className="grid gap-2">
    <Label htmlFor="email">Email</Label>
    <Input
      type="email"
      id="email"
      name="email"
      placeholder="admin@gmail.com"
      value={credentials.email}
      onChange={handleChange}
    />
  </div>
  <div className="grid gap-2">
    <Label htmlFor="password">Password</Label>
    <Input
      type="password"
      id="password"
      name="password"
      placeholder="admin123"
      value={credentials.password}
      onChange={handleChange}
    />
  </div>
</CardContent>
<CardFooter className="flex flex-col gap-3">
  <Button className="w-full" onClick={handleSubmit}>
    {isLoading ? "Signing in..." : "Sign in"}
  </Button>
  <p>
    Don&apos;t have an account?{" "}
    <Link href="/signup" className="text-primary underline">
      Sign up
    </Link>
  </p>
</CardFooter>
</Card>
</div>
  )
}

export default Login
