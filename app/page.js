"use client";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useState, useEffect } from "react";
import ContactDetails from "@/components/forms/Location";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useTotalAmount } from "../context/TotalAmountContext";
import { Button } from "@/components/ui/button";
const Home = () => {
  const [orderDetails, setOrderDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { totalAmount, settotalAmount } = useTotalAmount();
  const router = useRouter();
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/data`
        );
        const data = await response.json();

        setOrderDetails(data.result);
        setIsLoading(false);

        localStorage.setItem("orderDetails", JSON.stringify(data.result));
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    fetchOrderDetails();
  }, []);
  useEffect(() => {
    if (orderDetails && orderDetails.products) {
      let calculatedTotal = 0;
      orderDetails.products.forEach((product) => {
        calculatedTotal += product.price * product.quantity;
      });
      settotalAmount(calculatedTotal);
    }
  }, [orderDetails]);

  const handleClick = (id, action) => {
    setOrderDetails((prevOrderDetails) => {
      const updatedProducts = prevOrderDetails.products.map((product) => {
        if (product.id === id) {
          if (action === "increase") {
            return { ...product, quantity: product.quantity + 1 };
          } else if (action === "decrease" && product.quantity > 0) {
            return { ...product, quantity: product.quantity - 1 };
          }
        }
        return product;
      });

      const updatedOrderDetails = {
        ...prevOrderDetails,
        products: updatedProducts.filter((product) => product.quantity > 0), // Remove products with quantity 0
      };

      return updatedOrderDetails;
    });
  };

  return (
    <div className="flex  flex-col pt-10 px-5 invert-colors">
      <div className="flex items-center w-full">
        <MdKeyboardArrowLeft size={25} color="gray" />
        <h1 className="text-3xl font-bold w-full text-center  ">Checkout</h1>
      </div>
      {isLoading ? (
        <div className="self-center mt-10 h-20 w-20 animate-spin rounded-full border-b-2 border-purple-700   "></div>
      ) : (
        <>
          {!orderDetails || orderDetails?.length === 0 ? (
            <div className="flex items-center justify-center flex-col ">
              <Image
                src="/empty-cart.png"
                alt="empty-cart"
                width={500}
                height={500}
                priority
              />
              <h1 className="text-red-600 text-xl">Your cart is empty!</h1>
            </div>
          ) : (
            <>
              <div className="w-full">
                <h2 className="text-xl font-semibold mt-8  text-slate-700 dark:text-slate-200 ">
                  Delivery detail
                </h2>
                <ContactDetails />
                <p className=" mt-10 mb-5 ">Order List</p>

                <div className=" w-full ">
                  {orderDetails.products?.map((product, index) => (
                    <div key={index} className="flex w-full gap-8 my-8 ">
                      <Image
                        src={product.image}
                        width={50}
                        height={50}
                        alt={product.title}
                      />

                      <div className="flex justify-between gap-8 w-full ">
                        <div className="flex flex-col gap-2 flex-1">
                          <h5 className="flex-1 break-all line-clamp-1 leading-6 ">
                            {product.title}
                          </h5>
                          <p className="text-slate-600 dark:text-slate-100 font-sm">
                            ${product.price}
                          </p>
                        </div>

                        <div className="flex items-center justify-between w-20">
                          <FaMinus
                            className="cursor-pointer "
                            onClick={() => handleClick(product.id, "decrease")}
                          />{" "}
                          <p className="items-center justify-center text-slate-950 dark:text-slate-50">
                            {product.quantity}
                          </p>{" "}
                          <FaPlus
                            className="cursor-pointer "
                            onClick={() => handleClick(product.id, "increase")}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="sm:flex mt-10 mb-5 items-center justify-between ">
                  <p className="font-semibold max-sm:mb-5 text-green-900 ">
                    PROMO CODE
                  </p>
                  <div className="flex rounded-md border-2 pr-5 sm:w-fit w-full items-center h- dark:bg-[#0F1117] ">
                    <Input
                      type="text"
                      icon="none"
                      placeholder="DISCOUNTDEDO"
                      className="border-none pl-0 w-full "
                    />
                    <button type="submit" className="text-purple-400 ">
                      APPLY
                    </button>
                  </div>
                </div>
              </div>
              <div className="gap-3 flex flex-col ">
                <h2 className="text-xl font-semibold mt-8 mb-3 text-slate-700 dark:text-slate-300">
                  Order summary
                </h2>
                <div className="flex justify-between ">
                  <p>Order amount</p>
                  <p>${totalAmount}</p>
                </div>
                <div className="flex justify-between ">
                  <p>Delivery fee</p>
                  <p>$10</p>
                </div>
                <div className="flex justify-between ">
                  <p>Discount</p>
                  <p>$10</p>
                </div>
              </div>
              <div className="flex items-center justify-between mt-6 ">
                <div className="flex flex-col ">
                  <h3 className="font-semibold text-slate-400 ">TOTAL</h3>
                  <p className="font-bold text-lg ">${totalAmount}</p>
                </div>
                <Button
                  onClick={() => {
                    localStorage.setItem(
                      "orderDetails",
                      JSON.stringify(orderDetails)
                    );
                    router.push("/payment");
                  }}
                  className="bg-purple-600 flex items-center justify-center h-10 w-2/5 max-w-sm rounded-md text-white"
                >
                  Payment
                </Button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
