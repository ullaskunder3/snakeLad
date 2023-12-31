import bcrypt from "bcrypt";
import prisma from "@libs/prismaDb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const body = await request.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
        return new NextResponse("Missing field", { status: 400 });
    }
    const existedUser = await prisma.user.findUnique({
        where: {
            email
        }
    });
    if (existedUser) {
        throw new Error("Email already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        }
    });
    return NextResponse.json(newUser);
}