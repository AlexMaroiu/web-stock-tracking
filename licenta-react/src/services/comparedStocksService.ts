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