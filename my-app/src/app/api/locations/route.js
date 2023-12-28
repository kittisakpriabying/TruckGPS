import { findAllLocations } from "@/services/locations.service";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function GET() {
    try {
      const data = await findAllLocations();
      return NextResponse.json({ data });
    } catch (error) {
      console.error("An error occurred:", error);
      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      );
    }
  }
  async function createLocations(locationName, latitude, longitude) {
    try {
     
  
      
      await prisma.locations.create({
        data: {
          locationName,
          latitude,
          longitude,
        },
      });
    } catch (error) {
      console.error("Error registering user:", error);
      throw new Error("Locations is already");
    }
  }
  export async function POST(request) {
    try {
      const body = await request.json();
      console.log(body);
  
      // Register the user
      await createLocations(
        body.locationName,
        body.latitude,
        body.longitude,
        
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
  