import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      "https://groww-intern-assignment.vercel.app/v1/api/order-details"
    );

    const result = await response.json();

    return NextResponse.json({ message: "OK", result });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ error: error.message });
  }
}
