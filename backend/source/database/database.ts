import mongoose from "mongoose";

export default async (MONGO_URI: string) => {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.info(`MongoDB is connected\n URI: ${MONGO_URI}`);
    } catch (error) {
        console.error(error);
    }
};
