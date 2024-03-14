import React from "react";
import { RiHandCoinLine } from "react-icons/ri";
import { LuWallet, LuSun, LuMoon } from "react-icons/lu";
import { MdSystemUpdateAlt } from "react-icons/md";
import { CgCreditCard } from "react-icons/cg";
import { TbTruckDelivery } from "react-icons/tb";
export const paymentMethods = [
  {
    id: "CARDS",
    title: "Debit/Credit Card",
    subtitle: "1234*********",
    icon: React.createElement(CgCreditCard, { size: 30 }),
  },
  {
    id: "UPI",
    title: "UPI",
    icon: React.createElement(RiHandCoinLine, { size: 30 }),
  },
  {
    id: "WALLET",
    title: "E-Wallet",
    icon: React.createElement(LuWallet, { size: 30 }),
  },
  {
    id: "COD",
    title: "Cash on Delivery",
    subtitle: "Pay directly to the driver",
    icon: React.createElement(TbTruckDelivery, { size: 30 }),
  },
];
export const themes = [
  {
    value: "light",
    label: "Light",
    icon: React.createElement(LuSun, { size: 15 }),
  },
  {
    value: "dark",
    label: "Dark",
    icon: React.createElement(LuMoon, { size: 15 }),
  },
  {
    value: "system",
    label: "System",
    icon: React.createElement(MdSystemUpdateAlt, { size: 15 }),
  },
];
export function getRandomStatus() {
  const randomValue = Math.random();
  if (randomValue < 0.4) {
    return "success";
  } else if (randomValue < 0.7) {
    return "pending";
  } else {
    return "failed";
  }
}
