const APIURL = "https://www.cbr-xml-daily.ru/daily_json.js";

export interface ICurrencyData {
  Date: Date;
  PreviousDate: Date;
  PreviousURL: string;
  Timestamp: Date;
  Valute: {
    [key: string]: {
      ID: string;
      NumCode: string;
      CharCode: string;
      Nominal: number;
      Name: string;
      Value: number;
      Previous: number;
    };
  };
}

export const fetchCurrency = async (): Promise<ICurrencyData> => {
  const res = await fetch(APIURL);
  const data = await res.json();
  return data;
};
