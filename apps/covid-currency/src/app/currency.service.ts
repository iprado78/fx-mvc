import { Injectable } from '@angular/core';
import { euroUsdFxTimeSeries } from './euroUsdFx'

interface FxRow {
  date: string,
  open: number,
  close: number,
  "open-close-diff": number,
  "high-low-diff": number,
  high: number,
  low: number 
}

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  fxCols = [
   {
    headerName: "Date",
    field: "date",
    sortable: true,
  },
  {
    headerName: "Open ($)",
    field: "open",
    sortable: true
  },
  {
    headerName: "Close ($)",
    field: "close",
    sortable: true,
  },
  {
    headerName: "Open/Close Diff (BPS)",
    field: "open-close-diff",
    sortable: "true",
  },
  {
    headerName: "High ($)",
    field: "high",
    sortable: true
  },
  {
    headerName: "Low ($)",
    field: "low",
    sortable: true
  },
  {
    headerName: "High/Low Diff (BPS)",
    field: "high-low-diff",
    sortable: true
  }
  ]

  fxRows = Object
    .entries(euroUsdFxTimeSeries)
    .map(([date, restFields]) => {
      const { open, close, high, low } = 
        Object
          .keys(restFields)
          .reduce((accum, field) => ({...accum, [field.split('. ')[1]]: Number(restFields[field])}), {} as FxRow)
      
      return {
        date,
        open,
        close,
        "open-close-diff": Math.round((close - open) * 10_000),
        high,
        low,
        "high-low-diff": Math.round((high - low) * 10_000)
      }
    }) as FxRow[]
  constructor() { }
  getFxRows () {
    return this.fxRows;
  }
  getFxCols () {
    return this.fxCols;
  }
}
