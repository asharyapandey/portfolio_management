import mongoose from "mongoose";

export interface StockStatsData {
    stockID: string;
    stockName: string;
    totalUnits: number;
    totalInvestment: number;
    currentAmount: number;
    overallProfit: number;
    soldAmount: number;
}

export interface StockStatsDocument extends StockStatsData, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}

export const stockStatsSchema = new mongoose.Schema(
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
        totalUnits: {
            type: Number,
            required: true,
        },
        totalInvestment: {
            type: Number,
            required: true,
        },
        currentAmount: {
            type: Number,
            required: true,
        },
        overallProfit: {
            type: Number,
            required: false,
        },
        soldAmount: {
            type: Number,
            required: false,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

const StockStats = mongoose.model<StockStatsDocument>(
    "stockStats",
    stockStatsSchema
);

export default StockStats;
