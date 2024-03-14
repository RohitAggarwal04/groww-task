"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { getRandomStatus } from "../../constants";
import {
  Table,
  TableBody,
  TableCaption,
  TableFooter,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { useTotalAmount } from "../../context/TotalAmountContext";
const page = () => {
  const [orderDetails, setOrderDetails] = useState(null);
  const { totalAmount } = useTotalAmount();
  const [status, setStatus] = useState("");

  useEffect(() => {
    const storedData = localStorage.getItem("orderDetails");
    const data = JSON.parse(storedData);
    setOrderDetails(data);
    setStatus(getRandomStatus());
  }, []);
  useEffect(() => {
    if (status === "pending") {
      toast.loading("Waiting for Transaction to complete...");
      setTimeout(() => {
        setStatus("success");
      }, 2000);
    } else if (status === "failed") {
      toast.error("Transaction failed!");
    } else if (status === "success") {
      toast.success("Transaction Successfull!");
    }
  }, [status]);
  const getStatusText = (status) => {
    switch (status) {
      case "success":
        return "Your transaction was successful";
      case "pending":
        return "Your transaction is pending";
      case "failed":
        return "Your transaction failed";
      default:
        return "Unknown status";
    }
  };
  return (
    <div className="invert-colors px-5 mt-10 flex flex-col justify-center items-center">
      <Table>
        <TableCaption className="text-3xl font-bold mb-10">
          {getStatusText(status)}
        </TableCaption>
        <TableHeader className="w-full">
          <TableRow className="w-full">
            <TableHead className="sm:w-2/6 3/6 text-center">Product</TableHead>
            <TableHead className="w-1/6 text-center max-sm:hidden">
              Quantity
            </TableHead>
            <TableHead className="w-1/6 text-center max-sm:hidden">
              Price
            </TableHead>
            <TableHead className="sm:w-1/6 w-1/4 text-center">Amount</TableHead>
            <TableHead className="sm:w-1/6 w-1/4 text-center">
              Payment Method
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orderDetails?.products?.map((product, index) => (
            <TableRow
              key={index}
              className="border-b border-black/20 dark:border-white/20 h-20"
            >
              <TableCell>
                <div className="flex items-center gap-6">
                  <Image
                    src={product.image}
                    width={50}
                    height={50}
                    alt={product.title}
                    className="hidden md:flex"
                  />
                  <span className="overflow-hidden">{product.title}</span>
                </div>
              </TableCell>
              <TableCell className="text-center max-sm:hidden">
                {product.quantity}
              </TableCell>
              <TableCell className="text-center max-sm:hidden">
                {product.price}
              </TableCell>
              <TableCell className="text-center">
                ${product.price * product.quantity}
              </TableCell>
              <TableCell
                rowSpan={orderDetails.products.length}
                className={`${index !== 0 && "hidden"} text-center`}
              >
                {localStorage.getItem("selectedMethod")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow className="h-[4rem] bg-gray-100 dark:text-gray-900 font-bold">
            <TableCell colSpan={4} className="px-4 ">
              Total
            </TableCell>
            <TableCell className="text-center min-w-sm">
              ${totalAmount}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default page;
