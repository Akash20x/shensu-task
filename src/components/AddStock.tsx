"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { addProducts } from "@/services/stock";
import { Loader2 } from "lucide-react";
import { useState } from "react";

const AddStock = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState({
    name: "",
    category: "",
    description: "",
    price: 0,
    quantity: 0,
  });

  const addProduct = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    const { name, category, description, price, quantity } = products;

    if (!name || !category || !description || !price || !quantity) {
      toast({
        variant: "destructive",
        description: "Please fill all the fields",
      });
      return;
    }

    setLoading(true);

    const res = await addProducts(name, category, description, price, quantity)

      if(!res){
        toast({
        title: "Error",
        variant: "destructive",
        description: "Something Went Wrong"
    });
        return;
      }
      
      toast({
        description: "Product added successfully",
      });
      setLoading(false);

      setProducts({
        name: "",
        category: "",
        description: "",
        price: 0,
        quantity: 0,
      });

  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProducts({ ...products, [name]: value });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add a stock</CardTitle>
      </CardHeader>
      <form onSubmit={addProduct}>
      <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Product name</Label>
              <Input
                id="name"
                onChange={handleChange}
                name="name"
                value={products?.name}
                type="text"
                placeholder="Name of the product"
              />
            </div>


            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="category">Product Category</Label>
              <Input
                id="category"
                onChange={handleChange}
                name="category"
                value={products?.category}
                type="text"
                placeholder="Category of the product"
              />
            </div>


            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="description">Product description</Label>
              <Input
                id="description"
                onChange={handleChange}
                name="description"
                value={products?.description}
                type="text"
                placeholder="Description of the product"
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="quantity">Product quantity</Label>
              <Input
                id="quantity"
                onChange={handleChange}
                name="quantity"
                value={products?.quantity}
                type="number"
                placeholder="Product Quantity"
              />
            </div>


            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="price">Product price</Label>
              <Input
                id="price"
                onChange={handleChange}
                name="price"
                value={products?.price}
                type="number"
                placeholder="Product Price"
              />
            </div>
         
          </div>
      </CardContent>
      <CardFooter>
        <Button>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Add stock
        </Button>
      </CardFooter>
      </form>
    </Card>
  );
};

export default AddStock;