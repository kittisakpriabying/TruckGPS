import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { genSalt, hash } from "bcrypt";
import { findAllUser , findOneUser} from "@/services/user.service";

// Function to register a new user
async function registerUser(firstName, lastName, userId, email, password) {
  try {
    // Check email existence
    const userExist = await prisma.user.findUnique({ where: { email } });
    if (userExist !== null) {
      throw new Error("Email already exists");
    }

    // Hash password
    const salt = await genSalt(10);
    const hashPassword = await hash(password, salt);

    // Create user
    await prisma.user.create({
      data: {
        firstName,
        lastName,
        userId,
        email,
        password: hashPassword,
      },
    });
  } catch (error) {
    console.error("Error registering user:", error);
    throw new Error("User is already.");
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    console.log(body);

    // Register the user
    await registerUser(
      body.firstName,
      body.lastName,
      body.userId,
      body.email,
      body.password
    );
    return NextResponse.json(
      { message: "User registration successful" },
      { status: 201 }
    );
  } catch (error) {
    console.error("An error occurred:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const data = await findAllUser();
    return NextResponse.json({ data });
  } catch (error) {
    console.error("An error occurred:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

