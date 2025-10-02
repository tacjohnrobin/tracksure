"use client"

import { useState, useMemo } from "react"
import { mockAuditLogs, type AuditLog } from "@/data/mock-data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, Search, Edit, Check, Plus, User, AlertCircle, Settings } from "lucide-react"

export function AuditTrailContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const itemsPerPage = 8

  // Filter audit logs
  const filteredAuditLogs = useMemo(() => {
    return mockAuditLogs.filter((log) => {
      const matchesSearch =
        log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.user.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory = categoryFilter === "all" || log.category === categoryFilter

      return matchesSearch && matchesCategory
    })
  }, [searchQuery, categoryFilter])

  // Pagination
  const totalPages = Math.ceil(filteredAuditLogs.length / itemsPerPage)
  const paginatedLogs = filteredAuditLogs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const getCategoryIcon = (category: AuditLog["category"]) => {
    switch (category) {
      case "stock":
        return <Edit className="h-5 w-5" />
      case "requisition":
        return <Check className="h-5 w-5" />
      case "project":
        return <Plus className="h-5 w-5" />
      case "user":
        return <User className="h-5 w-5" />
      case "system":
        return <Settings className="h-5 w-5" />
      default:
        return <AlertCircle className="h-5 w-5" />
    }
  }

  const getCategoryColor = (category: AuditLog["category"]) => {
    switch (category) {
      case "stock":
        return "bg-blue-100 text-blue-700"
      case "requisition":
        return "bg-green-100 text-green-700"
      case "project":
        return "bg-purple-100 text-purple-700"
      case "user":
        return "bg-orange-100 text-orange-700"
      case "system":
        return "bg-gray-100 text-gray-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const handleExport = () => {
    // In a real app, this would export the audit log data
    console.log("[v0] Exporting audit log data...")
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-xl font-semibold text-foreground">Audit Trail & Action Replay</h1>
        <Button onClick={handleExport} className="gap-2 bg-gray-700 hover:bg-gray-800">
          <Download className="h-4 w-4" />
          Export Audit Log
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search audit logs..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setCurrentPage(1)
            }}
            className="pl-9"
          />
        </div>
        <Select
          value={categoryFilter}
          onValueChange={(value) => {
            setCategoryFilter(value)
            setCurrentPage(1)
          }}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="stock">Stock</SelectItem>
            <SelectItem value="requisition">Requisition</SelectItem>
            <SelectItem value="project">Project</SelectItem>
            <SelectItem value="user">User</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Timeline Section */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-foreground">System Changes Timeline</h2>

        {/* Timeline Items */}
        <div className="space-y-2 border rounded-2xl border-border p-4 bg-white-600">
          {paginatedLogs.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">No audit logs found</CardContent>
            </Card>
          ) : (
            paginatedLogs.map((log) => (
              <Card key={log.id} className="border-none bg-gray-100">
                <CardContent className="">
                  <div className="flex gap-2 md:gap-4">
                    {/* Icon */}
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${getCategoryColor(log.category)}`}
                    >
                      {getCategoryIcon(log.category)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-1">
                      <h3 className="font-semibold text-foreground text-md">{log.action}</h3>
                      <p className="text-sm text-gray-700">{log.description}</p>
                      <p className="text-xs text-muted-foreground">
                        {log.user === "System" ? "System" : `Changed by: ${log.user}`} • {log.timestamp}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, filteredAuditLogs.length)} of {filteredAuditLogs.length} logs
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
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let pageNum
                if (totalPages <= 5) {
                  pageNum = i + 1
                } else if (currentPage <= 3) {
                  pageNum = i + 1
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i
                } else {
                  pageNum = currentPage - 2 + i
                }
                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(pageNum)}
                    className="h-8 w-8 p-0"
                  >
                    {pageNum}
                  </Button>
                )
              })}
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
