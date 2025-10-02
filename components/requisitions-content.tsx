"use client"

import { useState, useMemo } from "react"
import { mockRequisitions, type Requisition } from "@/data/mock-data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Eye, Check, X, ArrowUpDown } from "lucide-react"

type SortField = "reqNumber" | "project" | "requestedBy" | "date" | "status" | "items"
type SortOrder = "asc" | "desc"

export function RequisitionsContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [sortField, setSortField] = useState<SortField>("reqNumber")
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const itemsPerPage = 6

  // Calculate stats
  const stats = useMemo(() => {
    const total = mockRequisitions.length
    const pendingApproval = mockRequisitions.filter(
      (req) => req.status === "Pending Approval" || req.status === "Pending Ops",
    ).length
    const approved = mockRequisitions.filter((req) => req.status === "Approved").length

    return { total, pendingApproval, approved }
  }, [])

  // Filter and sort requisitions
  const filteredAndSortedRequisitions = useMemo(() => {
    const filtered = mockRequisitions.filter((requisition) => {
      const matchesSearch =
        requisition.reqNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        requisition.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
        requisition.requestedBy.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesStatus = statusFilter === "all" || requisition.status === statusFilter

      return matchesSearch && matchesStatus
    })

    // Sort
    filtered.sort((a, b) => {
      let aValue = a[sortField]
      let bValue = b[sortField]

      if (typeof aValue === "string") aValue = aValue.toLowerCase()
      if (typeof bValue === "string") bValue = bValue.toLowerCase()

      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1
      return 0
    })

    return filtered
  }, [searchQuery, sortField, sortOrder, statusFilter])

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedRequisitions.length / itemsPerPage)
  const paginatedRequisitions = filteredAndSortedRequisitions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  )

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortOrder("asc")
    }
  }

  const getStatusColor = (status: Requisition["status"]) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case "Ops Approved":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100"
      case "Pending Ops":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
      case "Pending Approval":
        return "bg-orange-100 text-orange-800 hover:bg-orange-100"
      case "Rejected":
        return "bg-red-100 text-red-800 hover:bg-red-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-foreground">Requisition Management</h1>
        <Button className="gap-2 bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4" />
          New Requisition
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3">
        <Card>
          <CardContent className="py-6">
            <div className="text-center">
              <p className="text-4xl font-bold text-blue-600">{stats.total}</p>
              <p className="mt-2 text-sm text-muted-foreground">Total Requisitions</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-6">
            <div className="text-center">
              <p className="text-4xl font-bold text-orange-600">{stats.pendingApproval}</p>
              <p className="mt-2 text-sm text-muted-foreground">Pending Approval</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-6">
            <div className="text-center">
              <p className="text-4xl font-bold text-green-600">{stats.approved}</p>
              <p className="mt-2 text-sm text-muted-foreground">Approved</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search requisitions..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setCurrentPage(1)
            }}
            className="pl-9"
          />
        </div>
        <Select
          value={statusFilter}
          onValueChange={(value) => {
            setStatusFilter(value)
            setCurrentPage(1)
          }}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Approved">Approved</SelectItem>
            <SelectItem value="Ops Approved">Ops Approved</SelectItem>
            <SelectItem value="Pending Ops">Pending Ops</SelectItem>
            <SelectItem value="Pending Approval">Pending Approval</SelectItem>
            <SelectItem value="Rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("reqNumber")}
                  className="flex items-center gap-1 px-0 hover:bg-transparent"
                >
                  Req Number
                  <ArrowUpDown className="h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("project")}
                  className="flex items-center gap-1 px-0 hover:bg-transparent"
                >
                  Project
                  <ArrowUpDown className="h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("requestedBy")}
                  className="flex items-center gap-1 px-0 hover:bg-transparent"
                >
                  Requested By
                  <ArrowUpDown className="h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("date")}
                  className="flex items-center gap-1 px-0 hover:bg-transparent"
                >
                  Date
                  <ArrowUpDown className="h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("status")}
                  className="flex items-center gap-1 px-0 hover:bg-transparent"
                >
                  Status
                  <ArrowUpDown className="h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("items")}
                  className="flex items-center gap-1 px-0 hover:bg-transparent"
                >
                  Items
                  <ArrowUpDown className="h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedRequisitions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground">
                  No requisitions found
                </TableCell>
              </TableRow>
            ) : (
              paginatedRequisitions.map((requisition) => (
                <TableRow key={requisition.id}>
                  <TableCell className="font-medium">{requisition.reqNumber}</TableCell>
                  <TableCell>{requisition.project}</TableCell>
                  <TableCell>{requisition.requestedBy}</TableCell>
                  <TableCell>{requisition.date}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(requisition.status)}>{requisition.status}</Badge>
                  </TableCell>
                  <TableCell>{requisition.items} items</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:text-blue-700">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-green-600 hover:text-green-700">
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 hover:text-red-700">
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Card View */}
      <div className="grid gap-4 md:hidden">
        {paginatedRequisitions.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">No requisitions found</CardContent>
          </Card>
        ) : (
          paginatedRequisitions.map((requisition) => (
            <Card key={requisition.id}>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Req Number</p>
                      <p className="font-semibold">{requisition.reqNumber}</p>
                    </div>
                    <Badge className={getStatusColor(requisition.status)}>{requisition.status}</Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Project</p>
                    <p className="font-medium">{requisition.project}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Requested By</p>
                      <p className="text-sm">{requisition.requestedBy}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Date</p>
                      <p className="text-sm">{requisition.date}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Items</p>
                    <p className="font-semibold">{requisition.items} items</p>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1 gap-2 text-blue-600 bg-transparent">
                      <Eye className="h-3.5 w-3.5" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 gap-2 text-green-600 bg-transparent">
                      <Check className="h-3.5 w-3.5" />
                      Approve
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 gap-2 text-red-600 bg-transparent">
                      <X className="h-3.5 w-3.5" />
                      Reject
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, filteredAndSortedRequisitions.length)} of{" "}
            {filteredAndSortedRequisitions.length} requisitions
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className="h-8 w-8 p-0"
                >
                  {page}
                </Button>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
