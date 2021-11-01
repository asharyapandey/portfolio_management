import { Request, Response, NextFunction } from "express";
import {
    INTERNAL_SERVER_ERROR,
    SUCCESS,
} from "../constants/status-codes.constants";
import labels from "../labels/labels";
import Stock from "../models/Stock.model";
import StockStats from "../models/StockStats.model";
import UserStock from "../models/UserStock.model";

export const getStockNames = async (req: Request, res: Response) => {
    try {
        const stockNames = await Stock.find({});
        if (stockNames) {
            return res.status(SUCCESS).json({
                message: labels.stock.stockFetched,
                result: stockNames,
            });
        }
    } catch (error: any) {
        return res.status(INTERNAL_SERVER_ERROR).json({
            message: labels.stock.stockFetchError,
            devMessage: error.message,
            result: [],
        });
    }
};

export const postStockNames = async (req: Request, res: Response) => {
    try {
        const { companyName, sellRate } = req.body;
        const stockNameObj = new Stock({ companyName, sellRate });
        const stockName = await stockNameObj.save();
        if (stockName) {
            return res.status(SUCCESS).json({
                message: labels.stock.stockFetched,
                result: stockName,
            });
        }
    } catch (error: any) {
        return res.status(INTERNAL_SERVER_ERROR).json({
            message: labels.stock.stockFetchError,
            devMessage: error.message,
            result: [],
        });
    }
};

export const addTransaction = async (req: Request, res: Response) => {
    try {
        // HERE: stockName is the id of that stock
        const { stockName, transactionType, quantity, price, transactionDate } =
            req.body;
        const stock = await Stock.findOne({ _id: stockName });
        if (stock) {
            // if that stock is available
            // CHECK if the stock is already bought by the user
            const stockStats = await StockStats.findOne({ stockID: stockName });
            if (stockStats) {
                // if stock is already bought .. then increment or decrement it
                if (transactionType === "BUY") {
                    stockStats.totalUnits += quantity;
                    stockStats.totalInvestment += quantity * price;
                    stockStats.currentAmount += quantity * stock.sellRate;
                } else {
                    stockStats.totalUnits -= quantity;
                    stockStats.currentAmount -= quantity * stock.sellRate;
                    stockStats.soldAmount += quantity * price;
                }
                await stockStats.save();
            } else {
                const stockStatObj = new StockStats({
                    stockID: stockName,
                    stockName: stock.companyName,
                    totalUnits: quantity,
                    totalInvestment: quantity * price,
                    currentAmount: quantity * stock.sellRate,
                });
                const stockStatSave = await stockStatObj.save();
            }
            const userStockObj = new UserStock({
                stockID: stockName,
                stockName: stock.companyName,
                transactionDate,
                transactionType,
                quantity,
                price,
            });
            const userStock = await userStockObj.save();
            if (userStock) {
                return res.status(SUCCESS).json({
                    message: labels.stock.transactionAdded,
                    devMessage: "",
                    result: userStock,
                });
            }
        }
    } catch (error: any) {
        return res.status(INTERNAL_SERVER_ERROR).json({
            message: labels.stock.transactionAddError,
            devMessage: error.message,
            result: [],
        });
    }
};

export const getTransactions = async (req: Request, res: Response) => {
    try {
        const page: number = parseInt(req?.query.page as string) || 1;
        const limit: number = parseInt(req?.query.limit as string) || 0;

        const userStocks = await UserStock.find({})
            .skip(page * limit - limit)
            .limit(limit);

        const totalCount = await UserStock.countDocuments({});
        return res.status(SUCCESS).json({
            message: labels.stock.stockFetched,
            result: userStocks,
            page,
            totalCount,
        });
    } catch (error: any) {
        return res.status(INTERNAL_SERVER_ERROR).json({
            message: labels.stock.stockFetchError,
            devMessage: error.message,
            result: [],
            page: 0,
            totalCount: 0,
        });
    }
};

export const getOverallStats = async (req: Request, res: Response) => {
    try {
        const stocks = await StockStats.find({});
        let totalUnits = 0;
        let totalInvestment = 0;
        let soldAmount = 0;
        let currentAmount = 0;
        let overallProfit = 0;

        if (stocks.length > 0) {
            stocks.forEach((stock) => {
                totalUnits += stock.totalUnits;
                totalInvestment += stock.totalInvestment;
                soldAmount += stock.soldAmount;
                currentAmount += stock.currentAmount;
                overallProfit += stock.soldAmount - stock.totalInvestment;
            });

            const returnData = {
                overallStats: {
                    totalUnits,
                    totalInvestment,
                    soldAmount,
                    currentAmount,
                    overallProfit,
                },
                stocks,
            };
            return res.status(SUCCESS).json({
                message: labels.stock.statsFetched,
                stats: true,
                result: returnData,
            });
        } else {
            return res.status(SUCCESS).json({
                message: labels.stock.noStats,
                stats: false,
                result: {
                    overallStats: {},
                    stocks: [],
                },
            });
        }
    } catch (error: any) {
        return res.status(INTERNAL_SERVER_ERROR).json({
            message: labels.stock.statsFetchError,
            devMessage: error.message,
            result: {
                overallStats: {},
                stocks: [],
            },
        });
    }
};
