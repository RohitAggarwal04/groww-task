import React from "react";
import { Input } from "@/components/ui/input";
const ContactDetails = () => {
  return (
    <div className="flex flex-col gap-2 my-4 ">
      <Input
        type="text"
        icon="IoLocationOutline"
        className="bg-slate-200 sm:w-80 w-full pl-5  "
        placeholder="Your address"
      />
      <Input
        type="number"
        icon="IoCallOutline"
        className=" w-full pl-5 sm:max-w-2xl  "
        placeholder="Your Contact Number"
      />
    </div>
  );
};

export default ContactDetails;
