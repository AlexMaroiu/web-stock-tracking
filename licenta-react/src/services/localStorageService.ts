const itemID = "comparedStocks"

export default function getComparedStocks(): string[] {
    return JSON.parse(localStorage.getItem(itemID)) || [];
};

export function addComparedStocks(symbol: string){
    const set = new Set([...getComparedStocks(), symbol]);
    localStorage.setItem(itemID, JSON.stringify(Array.from(set)));
}

export function emptyComparedStocks(){
    localStorage.setItem(itemID, JSON.stringify([]));
}

export function deleteCompareStock(symbol: string){
    const symbols = getComparedStocks().filter(item => item !== symbol);
    localStorage.setItem(itemID, JSON.stringify(symbols));
}

export function findInComparedStocks(symbol: string): boolean{
    const set = new Set(getComparedStocks());
    return set.has(symbol);
}