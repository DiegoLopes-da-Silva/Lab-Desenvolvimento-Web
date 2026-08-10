import mongoose from "mongoose";

async function main() {
    try {
        await mongoose.connect("mongodb://localhost:27017/ToDo");
        console.log("Conectou com o mongo");
    } catch (err) {
        console.log(err);
    }
}

// exorta o que foi feito no main, palavra reservada do mongoose
export default mongoose;