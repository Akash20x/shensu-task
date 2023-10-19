import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import add from "@/../public/assets/add.svg";
import view from "@/../public/assets/view.svg";
import Image from "next/image";
import Link from "next/link";



interface DashboardCardsProps {
  userRole: string | null;
}


const DashboardCards = ({userRole}: DashboardCardsProps) => {
  return (
    <main className="flex flex-col items-center sm:flex-row gap-6 justify-center">
      {/* Add stock */}
      {userRole==="admin" && 
         <Card className="w-[350px] h-auto sm:h-[400px] text-center flex flex-col justify-between dark:hover:border-white hover:border-black">
         <CardHeader>
           <CardTitle>Add Stock</CardTitle>
           <CardDescription>Add a new stock to inventory.</CardDescription>
         </CardHeader>
         <CardContent>
           <Image src={add} className="max-w-[86%]" priority={false} alt="Add stock" />
         </CardContent>
         <CardFooter className="flex justify-center">
           <Button>
             <Link href={"/dashboard/add-stock"}>Add</Link>
           </Button>
         </CardFooter>
       </Card>
      }
   
      {/* View stock */}
      <Card className="w-[350px] h-auto sm:h-[400px] text-center flex flex-col justify-between dark:hover:border-white hover:border-black">
        <CardHeader>
          <CardTitle>View Stock</CardTitle>
          <CardDescription>View all your stocks in one place.</CardDescription>
        </CardHeader>
        <CardContent>
          <Image src={view} priority={false} alt="view stock" />
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button>
            <Link href={"/dashboard/all-stock"}>View</Link>
          </Button>
        </CardFooter>
      </Card>

    </main>
  );
};

export default DashboardCards;