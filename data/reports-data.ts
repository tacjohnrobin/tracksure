export interface ReportData {
  categoryData: {
    category: string
    value: number
    fill: string
  }[]
  monthlyMovements: {
    quarter: string
    value: number
  }[]
  quickStats: {
    requisitionsThisMonth: number
    stockReceived: number
    stockIssued: number
    reqApprovalRate: number
  }
}

export const reportsData: ReportData = {
  categoryData: [
    { category: "Construction", value: 45, fill: "hsl(217, 91%, 60%)" },
    { category: "Electrical", value: 25, fill: "hsl(173, 58%, 39%)" },
    { category: "IT", value: 18, fill: "hsl(271, 91%, 65%)" },
    { category: "Vehicles", value: 12, fill: "hsl(36, 100%, 50%)" },
  ],
  monthlyMovements: [
    { quarter: "Q1", value: 4500000 },
    { quarter: "Q2", value: 5200000 },
    { quarter: "Q3", value: 4800000 },
    { quarter: "Q4", value: 6200000 },
  ],
  quickStats: {
    requisitionsThisMonth: 15,
    stockReceived: 2800000,
    stockIssued: 1500000,
    reqApprovalRate: 94,
  },
}
