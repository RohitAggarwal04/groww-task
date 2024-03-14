import React from "react";
import { useTotalAmount } from "../context/TotalAmountContext";
import Link from "next/link";
const PaymentComponent = ({ selected }) => {
  const { totalAmount } = useTotalAmount();
  return (
    <div className="gap-3 my-4 flex flex-col w-full max-w-xl ">
      <div className="flex justify-between">
        <p>Admin fee</p>
        <p>$0</p>
      </div>
      <div className="flex justify-between">
        <h3 className="font-semibold text-slate-400 ">TOTAL</h3>
        <p className="font-bold text-lg ">${totalAmount}</p>
      </div>
      <Link
        href={selected ? "/order-confirmation" : undefined}
        className={`bg-purple-600 flex items-center self-center w-full justify-center h-10   rounded-md text-white ${
          !selected && "pointer-events-none"
        } `}
      >
        Pay Now
      </Link>
    </div>
  );
};

export default PaymentComponent;
