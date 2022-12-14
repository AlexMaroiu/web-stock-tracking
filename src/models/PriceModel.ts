import ShortFormatModel from "./ShortFormatModel";

interface PriceModel {
    shortName : string,
    longName : string,
    currencySymbol : string,
    currency : string,
    marketState : string,
    regularMarketPrice : ShortFormatModel
}


export default PriceModel;