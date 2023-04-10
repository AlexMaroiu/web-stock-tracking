import React from 'react';
import { Analysis } from '../models/Analysis';
import IStockData from '../models/IStockData';

interface IStockContext{
    stock: IStockData;
    setStock: (stock: IStockData) => void;
    analysis: Analysis;
    setAnalysis: (analysis: Analysis) => void;
}

const StockContext = React.createContext<IStockContext>(null);

export default StockContext;