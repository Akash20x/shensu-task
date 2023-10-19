"use client"
import React, { useContext, useState } from "react"
import { useRouter } from 'next/navigation'
import { signupUser } from "@/services/auth"
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

const Signup = () => {

  const { currentUser } = useContext(AuthContext)
  const router = useRouter()

  if(currentUser){
    router.push("/dashboard");     
  }


  const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    const [credentials, setCredentials] = useState({
      name: "",
      email: "",
      password: "",
    });


    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };
  


    const handleSubmit = async () => {

      if(!credentials.name || !credentials.email || !credentials.password){
        toast({
          variant: "destructive",
          description: "Missing Fields",
        });
        return
      }
      
      setIsLoading(true)
      const res = await signupUser(credentials.name, credentials.email, credentials.password, router)
      
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
        title: "⏰ Welcome",
        description: "Your account is created",
    })
      setIsLoading(false) 
    }
  return (
  <div className="flex justify-center items-center mt-5">
 <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Create an account</CardTitle>
        <CardDescription>
          Enter your email below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={credentials.name}
            onChange={handleChange}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
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
            value={credentials.password}
            onChange={handleChange}
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-3">
        <Button className="w-full" onClick={handleSubmit}>
          {isLoading ? "Creating account..." : "Create account"}
        </Button>
        <p>
          Already have an account?{" "}
          <Link href="/login" className="text-primary underline">
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  </div>
  )
}

export default Signup
