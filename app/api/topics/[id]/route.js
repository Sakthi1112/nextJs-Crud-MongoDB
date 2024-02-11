// Import necessary modules and functions
import connectMongoDB from "@/libs/mongodb";
import Topic from "@/models/topic"; // Import the Topic model
import { NextResponse } from "next/server";
// Handler function for PUT requests
export async function PUT(request, { params }) {
  try {
    // Destructure the id parameter from the request parameters
    const { id } = params;

    // Destructure the newTitle and newDescription from the request body
    const { newTitle: title, newDescription: description } =
      await request.json();

    // Connect to MongoDB
    await connectMongoDB();

    // Find the topic by id and update its title and description
    await Topic.findByIdAndUpdate(id, { title, description });

    // Return success response with status code 200
    return NextResponse.json({ message: "Topic Updated" }, { status: 200 });
  } catch (error) {
    // Log any errors and return an error response with status code 500
    console.error("Error updating topic:", error);
    return NextResponse.error(new Error("Failed to update topic"), {
      status: 500,
    });
  }
}

export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  const topic = await Topic.findOne({ _id: id });
  return NextResponse.json({ topic }, { status: 200 });
}
