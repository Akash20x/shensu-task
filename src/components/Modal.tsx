"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { editProduct } from "@/services/stock";

interface ModalProps {
  selectedProduct: any,
  isModalOpen: boolean,
  setIsModalOpen: (value: boolean) => void
}


const Modal = ({ selectedProduct,isModalOpen, setIsModalOpen }: ModalProps) => {
  const { toast } = useToast();

  const [updatedProduct, setUpdatedProduct] = useState({ ...selectedProduct });
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedProduct({
      ...updatedProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {


      const productId = updatedProduct.id
      editProduct(productId,updatedProduct)

        toast({
        description: "Product updated successfully",
      });

      setIsModalOpen(false);


    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "Please try again later",
      });

    } 
  };

  
  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="sm:max-w-[425px]" >
        <DialogHeader>
          <DialogTitle>{selectedProduct.name.toUpperCase()}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">


          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              onChange={handleChange}
              value={updatedProduct.name}
              className="col-span-3"
            />
          </div>


          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Category
            </Label>
            <Input
              id="category"
              name="category"
              type="text"
              onChange={handleChange}
              value={updatedProduct.category}
              className="col-span-3"
            />
          </div>


          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input
              id="description"
              name="description"
              type="text"
              onChange={handleChange}
              value={updatedProduct.description}
              className="col-span-3"
            />
          </div>





          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="quantity" className="text-right">
              Quantity
            </Label>
            <Input
              id="quantity"
              name="quantity"
              type="number"
              onChange={handleChange}
              value={updatedProduct.quantity}
              className="col-span-3"
            />
          </div>


          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Price
            </Label>
            <Input
              id="price"
              name="price"
              type="number"
              onChange={handleChange}
              value={updatedProduct.price}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <div className="flex gap-2 justify-center">
            <Button onClick={handleSubmit} size="sm">
              Update
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;