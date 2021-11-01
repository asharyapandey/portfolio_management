import mongoose from "mongoose";

export interface UserStockData {
    stockName: string;
    transactionType: string;
    quantity: number;
    price: number;
    transactionDate: string;
}

export interface UserStockDocument extends UserStockData, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}

export const userStockSchema = new mongoose.Schema(
    {
        stockID: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "stock",
        },
        stockName: {
            type: String,
            required: true,
        },
        transactionType: {
            type: String,
            required: true,
            enum: ["BUY", "SELL"],
        },
        quantity: {
            type: Number,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        transactionDate: {
            type: Date,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const UserStock = mongoose.model<UserStockDocument>(
    "userStock",
    userStockSchema
);

export default UserStock;
