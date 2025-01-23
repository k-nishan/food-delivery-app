import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://nishakanaga0708:8HPd0ojuXp3Eodf7@cluster0.dnqy2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then(() => console.log("Database connected successfullt"));
};
