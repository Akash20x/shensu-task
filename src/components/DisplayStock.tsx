"use client";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHead,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { usePagination } from "@mantine/hooks";
import { getAllProducts } from "@/services/stock";
import { AuthContext } from "@/app/context/AuthContext";
import TableActions from "./TableActions";

const ITEMS_PER_PAGE = 5;

interface ProductType{
    id: string
    name: string,
    category: string,
    description: string,
    quantity: number,
    price: number
}

const DisplayStock = () => {
    const {userRole} = useContext(AuthContext)

  const { toast } = useToast();

  const [products, setProducts] = useState<ProductType[]>([]);


  const [loading, setLoading] = useState(false);
  const [visibleResults, setVisibleResults] = useState(
    products.slice(0, ITEMS_PER_PAGE)
  );


  const getProducts = async () => {
    try {

      await getAllProducts(setProducts);
      
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "Please try again later",
      });
    } 
  };


  useEffect(() => {
    getProducts();  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);


  useEffect(() => {
    setLoading(products.length === 0 ? true : false);
    
    setVisibleResults(products.slice(0, ITEMS_PER_PAGE));
  }, [products]);


  const pagination = usePagination({
    total: Math.ceil(products.length / ITEMS_PER_PAGE),
    initialPage: 1,
    onChange(page) {
      const start = (page - 1) * ITEMS_PER_PAGE;
      const end = start + ITEMS_PER_PAGE;
      setVisibleResults(products.slice(start, end));
    },
  });



  return (
    <>
      <h2 className="text-2xl font-bold my-4">All Stocks</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-center">Quantity</TableHead>
            <TableHead className="text-center w-[10%]">Price</TableHead>
            {userRole === "admin" &&  <TableHead className="text-center w-[26%]">Action</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.length > 0 ? (
            visibleResults.map((product,index) => {
              return (
                <TableRow key={index}>

                  <TableCell>
                    {product.name}
                  </TableCell>



                  <TableCell>
                    {product.category}
                  </TableCell>

                  <TableCell>
                    {product.description}
                  </TableCell>


                  <TableCell className="text-center">
                    {product.quantity}
                  </TableCell>
                  <TableCell className="text-center">${product.price}</TableCell>

                  {userRole === "admin" &&  
                    <TableCell className="text-right pl-0">
                      <TableActions product={product}/>
                    </TableCell>
                    }

                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
              {loading ? "Loading..." : "No products found"}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      
      {products.length > 5 && (
        <div className="mt-4 flex justify-between">
          <Button onClick={pagination.previous} size="sm">
            Previous
          </Button>
          <Button onClick={pagination.next} size="sm">
            Next
          </Button>
        </div>
      )}
    </>
  );
};

export default DisplayStock;