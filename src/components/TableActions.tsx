import React, { useState } from 'react'
import { Button } from './ui/button'
import { deleteProduct } from '@/services/stock';
import { useToast } from "@/components/ui/use-toast";
import Modal from './Modal';

interface TableActionsProps {
  product: {
    id: string,
  }
}

const TableActions = ({product}: TableActionsProps) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

    
  const handleDelete = async (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      deleteProduct(product.id)

       toast({
        description: "Product deleted successfully",
      });

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
    <>
     <Button size="sm" className="h-7 bg-slate-400" onClick={()=> setIsModalOpen(true)}>Update</Button>
     <Button size="sm" variant="destructive" className="h-7 mt-2 md:mt-0 ml-3" onClick={handleDelete}>Delete</Button>
     {isModalOpen && <Modal selectedProduct={product} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>}
    </>
  )
}

export default TableActions
