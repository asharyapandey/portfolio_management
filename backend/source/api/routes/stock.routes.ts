import express from "express";
import {
    ADD_STOCK_ROUTE,
    GET_STATS_ROUTE,
    GET_STOCK_NAMES_ROUTE,
    GET_STOCK_ROUTE,
    POST_STOCK_NAMES_ROUTE,
} from "../constants/stock.constants";
import {
    addTransaction,
    getOverallStats,
    getStockNames,
    getTransactions,
    postStockNames,
} from "../controllers/stock.controllers";

const stockRoutes = express.Router();

stockRoutes.get(GET_STOCK_NAMES_ROUTE, getStockNames);
stockRoutes.post(POST_STOCK_NAMES_ROUTE, postStockNames);
stockRoutes.post(ADD_STOCK_ROUTE, addTransaction);
stockRoutes.get(GET_STOCK_ROUTE, getTransactions);
stockRoutes.get(GET_STATS_ROUTE, getOverallStats);

export = stockRoutes;
