import mongoose from "mongoose";

export const connectDB = async () =>{

  await mongoose.connect('mongodb+srv://radhika-gaikwad:8830299974@cluster0.kahpcc4.mongodb.net/food-del').then(()=>console.log("DB Connected"));
}
