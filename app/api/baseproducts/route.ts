import connectDB from "../../../config/db";

export async function GET(request: Request, response: Response) {
  try {
    const db = await connectDB(); // Connect to MongoDB and handle errors
    const collection = db.collection("base_products"); // Get the collection

    // Your MongoDB operations here (e.g., fetch data)

    const data = await collection.find().toArray(); // Example: Fetch all documents
    return Response.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    return Response.json({ message: "Internal Server Error" }); // Handle errors gracefully
  }
}
