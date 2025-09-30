export interface Project {
  id: string
  projectCode: string
  projectName: string
  client: string
  status: "Active" | "Planning" | "Completed" | "On Hold"
  budget: number
  startDate: string
  endDate?: string
  description?: string
}

export const mockProjects: Project[] = [
  {
    id: "1",
    projectCode: "PROJ-001",
    projectName: "Nairobi Tower Construction",
    client: "Skyline Developers",
    status: "Active",
    budget: 325000000,
    startDate: "2024-01-15",
    description: "High-rise commercial building in Nairobi CBD",
  },
  {
    id: "2",
    projectCode: "PROJ-002",
    projectName: "Mombasa Port Upgrade",
    client: "Kenya Ports Authority",
    status: "Planning",
    budget: 215000000,
    startDate: "2024-03-01",
    description: "Port infrastructure modernization project",
  },
  {
    id: "3",
    projectCode: "PROJ-003",
    projectName: "Kisumu Airport Expansion",
    client: "Kenya Airports Authority",
    status: "Active",
    budget: 180000000,
    startDate: "2024-02-10",
    description: "Airport terminal and runway expansion",
  },
  {
    id: "4",
    projectCode: "PROJ-004",
    projectName: "Thika Road Bridge",
    client: "KeNHA",
    status: "Completed",
    budget: 95000000,
    startDate: "2023-06-01",
    endDate: "2024-01-30",
    description: "Bridge construction over Thika Road",
  },
  {
    id: "5",
    projectCode: "PROJ-005",
    projectName: "Nakuru Water Pipeline",
    client: "Nakuru Water Company",
    status: "Active",
    budget: 120000000,
    startDate: "2024-01-20",
    description: "Water distribution infrastructure",
  },
  {
    id: "6",
    projectCode: "PROJ-006",
    projectName: "Eldoret Stadium Renovation",
    client: "County Government of Uasin Gishu",
    status: "Planning",
    budget: 75000000,
    startDate: "2024-04-01",
    description: "Sports facility modernization",
  },
  {
    id: "7",
    projectCode: "PROJ-007",
    projectName: "Malindi Beach Resort",
    client: "Coastal Hospitality Ltd",
    status: "On Hold",
    budget: 250000000,
    startDate: "2023-11-01",
    description: "Luxury resort development",
  },
  {
    id: "8",
    projectCode: "PROJ-008",
    projectName: "Naivasha Geothermal Plant",
    client: "KenGen",
    status: "Active",
    budget: 450000000,
    startDate: "2023-09-15",
    description: "Renewable energy facility",
  },
  {
    id: "9",
    projectCode: "PROJ-009",
    projectName: "Machakos Shopping Mall",
    client: "Retail Ventures Kenya",
    status: "Planning",
    budget: 165000000,
    startDate: "2024-05-01",
    description: "Modern shopping complex",
  },
  {
    id: "10",
    projectCode: "PROJ-010",
    projectName: "Nyeri Hospital Wing",
    client: "Ministry of Health",
    status: "Active",
    budget: 135000000,
    startDate: "2024-02-01",
    description: "Hospital expansion project",
  },
]
