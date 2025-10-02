"use client"

import { useState, useMemo } from "react"
import { mockAssets, type Asset } from "@/data/assets-data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Plus, Search, Eye, RefreshCw, ArrowUpDown, QrCode } from "lucide-react"
import Image from "next/image"

type SortField = "serialNo" | "assetName" | "category" | "currentLocation" | "status" | "assignedTo"
type SortOrder = "asc" | "desc"

export function AssetsContent() {
  const [assets, setAssets] = useState<Asset[]>(mockAssets)
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [sortField, setSortField] = useState<SortField>("serialNo")
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [qrDialogOpen, setQrDialogOpen] = useState(false)
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null)
  const itemsPerPage = 8

  // Calculate stats
  const stats = useMemo(() => {
    const total = assets.length
    const available = assets.filter((asset) => asset.status === "Available").length
    const inUse = assets.filter((asset) => asset.status === "In Use").length

    return { total, available, inUse }
  }, [assets])

  // Filter and sort assets
  const filteredAndSortedAssets = useMemo(() => {
    const filtered = assets.filter((asset) => {
      const matchesSearch =
        asset.serialNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        asset.assetName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        asset.currentLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (asset.assignedTo && asset.assignedTo.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesCategory = categoryFilter === "all" || asset.category === categoryFilter
      const matchesStatus = statusFilter === "all" || asset.status === statusFilter

      return matchesSearch && matchesCategory && matchesStatus
    })

    // Sort
    filtered.sort((a, b) => {
      let aValue = a[sortField]
      let bValue = b[sortField]

      if (aValue === null) aValue = ""
      if (bValue === null) bValue = ""

      if (typeof aValue === "string") aValue = aValue.toLowerCase()
      if (typeof bValue === "string") bValue = bValue.toLowerCase()

      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1
      return 0
    })

    return filtered
  }, [assets, searchQuery, sortField, sortOrder, categoryFilter, statusFilter])

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedAssets.length / itemsPerPage)
  const paginatedAssets = filteredAndSortedAssets.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortOrder("asc")
    }
  }

  const handleRefreshStatus = (assetId: string) => {
    setAssets((prevAssets) =>
      prevAssets.map((asset) => {
        if (asset.id === assetId) {
          const statuses: Asset["status"][] = ["Available", "In Use", "Maintenance", "Retired"]
          const currentIndex = statuses.indexOf(asset.status)
          const nextStatus = statuses[(currentIndex + 1) % statuses.length]

          return {
            ...asset,
            status: nextStatus,
            assignedTo: nextStatus === "Available" || nextStatus === "Maintenance" ? null : asset.assignedTo,
          }
        }
        return asset
      }),
    )
  }

  const handleQrCodeClick = (asset: Asset) => {
    setSelectedAsset(asset)
    setQrDialogOpen(true)
  }

  const getStatusColor = (status: Asset["status"]) => {
    switch (status) {
      case "Available":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case "In Use":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100"
      case "Maintenance":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
      case "Retired":
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  const getCategoryColor = (category: Asset["category"]) => {
    switch (category) {
      case "IT Equipment":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100"
      case "Vehicle":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
      case "Machinery":
        return "bg-purple-100 text-purple-800 hover:bg-purple-100"
      case "Tools":
        return "bg-orange-100 text-orange-800 hover:bg-orange-100"
      case "Furniture":
        return "bg-teal-100 text-teal-800 hover:bg-teal-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-foreground">Asset Tracking</h1>
        <Button className="gap-2 bg-purple-600 hover:bg-purple-700">
          <Plus className="h-4 w-4" />
          Add Asset
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-4xl font-bold text-purple-600">{stats.total}</p>
              <p className="mt-2 text-sm text-muted-foreground">Total Assets</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-4xl font-bold text-green-600">{stats.available}</p>
              <p className="mt-2 text-sm text-muted-foreground">Available</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-4xl font-bold text-blue-600">{stats.inUse}</p>
              <p className="mt-2 text-sm text-muted-foreground">In Use</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search assets..."
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
            <SelectItem value="IT Equipment">IT Equipment</SelectItem>
            <SelectItem value="Vehicle">Vehicle</SelectItem>
            <SelectItem value="Machinery">Machinery</SelectItem>
            <SelectItem value="Tools">Tools</SelectItem>
            <SelectItem value="Furniture">Furniture</SelectItem>
          </SelectContent>
        </Select>
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
            <SelectItem value="Available">Available</SelectItem>
            <SelectItem value="In Use">In Use</SelectItem>
            <SelectItem value="Maintenance">Maintenance</SelectItem>
            <SelectItem value="Retired">Retired</SelectItem>
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
                  onClick={() => handleSort("serialNo")}
                  className="flex items-center gap-1 px-0 hover:bg-transparent"
                >
                  Serial No.
                  <ArrowUpDown className="h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("assetName")}
                  className="flex items-center gap-1 px-0 hover:bg-transparent"
                >
                  Asset Name
                  <ArrowUpDown className="h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("category")}
                  className="flex items-center gap-1 px-0 hover:bg-transparent"
                >
                  Category
                  <ArrowUpDown className="h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("currentLocation")}
                  className="flex items-center gap-1 px-0 hover:bg-transparent"
                >
                  Current Location
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
                  onClick={() => handleSort("assignedTo")}
                  className="flex items-center gap-1 px-0 hover:bg-transparent"
                >
                  Assigned To
                  <ArrowUpDown className="h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>QR Code</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedAssets.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center text-muted-foreground">
                  No assets found
                </TableCell>
              </TableRow>
            ) : (
              paginatedAssets.map((asset) => (
                <TableRow key={asset.id}>
                  <TableCell className="font-medium">{asset.serialNo}</TableCell>
                  <TableCell>{asset.assetName}</TableCell>
                  <TableCell>
                    <Badge className={getCategoryColor(asset.category)}>{asset.category}</Badge>
                  </TableCell>
                  <TableCell>{asset.currentLocation}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(asset.status)}>{asset.status}</Badge>
                  </TableCell>
                  <TableCell>{asset.assignedTo || "-"}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-green-600 hover:text-green-700"
                      onClick={() => handleQrCodeClick(asset)}
                    >
                      <QrCode className="h-5 w-5" />
                    </Button>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:text-blue-700">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-green-600 hover:text-green-700"
                        onClick={() => handleRefreshStatus(asset.id)}
                      >
                        <RefreshCw className="h-4 w-4" />
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
        {paginatedAssets.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">No assets found</CardContent>
          </Card>
        ) : (
          paginatedAssets.map((asset) => (
            <Card key={asset.id}>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Serial No.</p>
                      <p className="font-semibold">{asset.serialNo}</p>
                    </div>
                    <Badge className={getStatusColor(asset.status)}>{asset.status}</Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Asset Name</p>
                    <p className="font-medium">{asset.assetName}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Category</p>
                      <Badge className={getCategoryColor(asset.category)}>{asset.category}</Badge>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Location</p>
                      <p className="text-sm">{asset.currentLocation}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Assigned To</p>
                    <p className="text-sm">{asset.assignedTo || "-"}</p>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 gap-2 text-green-600 bg-transparent"
                      onClick={() => handleQrCodeClick(asset)}
                    >
                      <QrCode className="h-3.5 w-3.5" />
                      QR Code
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 gap-2 text-blue-600 bg-transparent">
                      <Eye className="h-3.5 w-3.5" />
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 gap-2 text-green-600 bg-transparent"
                      onClick={() => handleRefreshStatus(asset.id)}
                    >
                      <RefreshCw className="h-3.5 w-3.5" />
                      Refresh
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
            {Math.min(currentPage * itemsPerPage, filteredAndSortedAssets.length)} of {filteredAndSortedAssets.length}{" "}
            assets
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
                let page
                if (totalPages <= 5) {
                  page = i + 1
                } else if (currentPage <= 3) {
                  page = i + 1
                } else if (currentPage >= totalPages - 2) {
                  page = totalPages - 4 + i
                } else {
                  page = currentPage - 2 + i
                }
                return (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className="h-8 w-8 p-0"
                  >
                    {page}
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

      {/* QR Code Dialog */}
      <Dialog open={qrDialogOpen} onOpenChange={setQrDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Asset QR Code</DialogTitle>
            <DialogDescription>Scan this QR code to view asset details: {selectedAsset?.serialNo}</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center gap-4 py-4">
            {selectedAsset && (
              <>
                <div className="rounded-lg border-2 border-gray-200 bg-white p-4">
                  <Image
                    src={`/qr-code-for-.jpg?height=200&width=200&query=QR+code+for+${selectedAsset.serialNo}`}
                    width={192}
                    height={192}
                    alt={`QR Code for ${selectedAsset.serialNo}`}
                    className="h-48 w-48"
                  />
                </div>
                <div className="text-center">
                  <p className="font-semibold">{selectedAsset.assetName}</p>
                  <p className="text-sm text-muted-foreground">{selectedAsset.serialNo}</p>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
