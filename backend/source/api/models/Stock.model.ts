import mongoose from "mongoose";

export interface StockData {
    companyName: string;
    sellRate: number;
}

export interface StockDocument extends StockData, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}

export const stockSchema = new mongoose.Schema(
    {
        companyName: {
            type: String,
            required: true,
        },
        sellRate: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Stock = mongoose.model<StockDocument>("stock", stockSchema);

export default Stock;
