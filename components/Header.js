"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Header = () => {
  const [data, setData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://groww-intern-assignment.vercel.app/v1/api/merchant-metadata"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const datajson = await response.json();
        setData(datajson);
      } catch (error) {
        console.error("Error:", error.message);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="w-full flex gap-4 justify-center items-center py-4 px-6 invert-colors">
      {data && (
        <>
          <Image
            src={data?.merchantLogo}
            alt={data?.merchantName}
            width={40}
            height={40}
            className="md:w-20 md:h-20   "
          />
          <h1 className="font-bold md:text-4xl ">{data?.merchantName}</h1>{" "}
        </>
      )}
    </div>
  );
};

export default Header;
