import React from 'react';
import { Analysis } from '../models/Analysis';
import StockType from '../models/StockType';

interface IStockContext{
    stock: StockType;
    setStock: (stock: StockType) => void;
    analysis: Analysis;
    setAnalysis: (analysis: Analysis) => void;
}

const StockContext = React.createContext<IStockContext>(null);

export default StockContext;