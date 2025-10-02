"use client"

import { useState, useMemo } from "react"
import { mockInventoryItems, type InventoryItem } from "@/data/inventory-data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Plus, Search, ArrowUpDown, Barcode, Download, ScanBarcode } from "lucide-react"
import Image from "next/image"

type SortField = "itemCode" | "itemName" | "category" | "currentStock" | "minLevel" | "status" | "unitCost"
type SortOrder = "asc" | "desc"

export function InventoryContent() {
  const [items] = useState<InventoryItem[]>(mockInventoryItems)
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [sortField, setSortField] = useState<SortField>("itemCode")
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [barcodeDialogOpen, setBarcodeDialogOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null)
  const itemsPerPage = 10

  // Calculate category stats
  const categoryStats = useMemo(() => {
    const total = items.length
    const construction = items.filter((item) => item.category === "Construction").length
    const electrical = items.filter((item) => item.category === "Electrical").length
    const itEquipment = items.filter((item) => item.category === "IT Equipment").length

    return { total, construction, electrical, itEquipment }
  }, [items])

  // Filter and sort items
  const filteredAndSortedItems = useMemo(() => {
    const filtered = items.filter((item) => {
      const matchesSearch =
        item.itemCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory = categoryFilter === "all" || item.category === categoryFilter
      const matchesStatus = statusFilter === "all" || item.status === statusFilter

      return matchesSearch && matchesCategory && matchesStatus
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
  }, [items, searchQuery, sortField, sortOrder, categoryFilter, statusFilter])

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedItems.length / itemsPerPage)
  const paginatedItems = filteredAndSortedItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortOrder("asc")
    }
  }

  const handleBarcodeClick = (item: InventoryItem) => {
    setSelectedItem(item)
    setBarcodeDialogOpen(true)
  }

  const getStatusColor = (status: InventoryItem["status"]) => {
    switch (status) {
      case "In Stock":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case "Low Stock":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
      case "Out of Stock":
        return "bg-red-100 text-red-800 hover:bg-red-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  const getCategoryColor = (category: InventoryItem["category"]) => {
    switch (category) {
      case "Construction":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100"
      case "Electrical":
        return "bg-purple-100 text-purple-800 hover:bg-purple-100"
      case "IT Equipment":
        return "bg-orange-100 text-orange-800 hover:bg-orange-100"
      case "Plumbing":
        return "bg-teal-100 text-teal-800 hover:bg-teal-100"
      case "Safety":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Construction":
        return "🏗️"
      case "Electrical":
        return "⚡"
      case "IT Equipment":
        return "💻"
      default:
        return "📦"
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-foreground">Inventory Management</h1>
        <div className="flex flex-wrap gap-2">
          <Button className="gap-2 bg-green-600 hover:bg-green-700">
            <Download className="h-4 w-4" />
            Receive Stock
          </Button>
          <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4" />
            Add Item
          </Button>
          <Button className="gap-2 bg-purple-600 hover:bg-purple-700">
            <ScanBarcode className="h-4 w-4" />
            Scan Barcode
          </Button>
        </div>
      </div>

      {/* Category Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="mb-2 text-4xl">{getCategoryIcon("All Items")}</div>
              <p className="text-4xl font-bold text-blue-600">{categoryStats.total}</p>
              <p className="mt-2 text-sm text-muted-foreground">All Items</p>
              <p className="text-xs text-muted-foreground">{categoryStats.total} items</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="mb-2 text-4xl">{getCategoryIcon("Construction")}</div>
              <p className="text-4xl font-bold text-green-600">{categoryStats.construction}</p>
              <p className="mt-2 text-sm text-muted-foreground">Construction</p>
              <p className="text-xs text-muted-foreground">{categoryStats.construction} items</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="mb-2 text-4xl">{getCategoryIcon("Electrical")}</div>
              <p className="text-4xl font-bold text-purple-600">{categoryStats.electrical}</p>
              <p className="mt-2 text-sm text-muted-foreground">Electrical</p>
              <p className="text-xs text-muted-foreground">{categoryStats.electrical} items</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="mb-2 text-4xl">{getCategoryIcon("IT Equipment")}</div>
              <p className="text-4xl font-bold text-orange-600">{categoryStats.itEquipment}</p>
              <p className="mt-2 text-sm text-muted-foreground">IT Equipment</p>
              <p className="text-xs text-muted-foreground">{categoryStats.itEquipment} items</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search inventory items..."
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
            <SelectItem value="Construction">Construction</SelectItem>
            <SelectItem value="Electrical">Electrical</SelectItem>
            <SelectItem value="IT Equipment">IT Equipment</SelectItem>
            <SelectItem value="Plumbing">Plumbing</SelectItem>
            <SelectItem value="Safety">Safety</SelectItem>
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
            <SelectItem value="In Stock">In Stock</SelectItem>
            <SelectItem value="Low Stock">Low Stock</SelectItem>
            <SelectItem value="Out of Stock">Out of Stock</SelectItem>
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
                  onClick={() => handleSort("itemCode")}
                  className="flex items-center gap-1 px-0 hover:bg-transparent"
                >
                  Item Code
                  <ArrowUpDown className="h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("itemName")}
                  className="flex items-center gap-1 px-0 hover:bg-transparent"
                >
                  Item Name
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
                  onClick={() => handleSort("currentStock")}
                  className="flex items-center gap-1 px-0 hover:bg-transparent"
                >
                  Current Stock
                  <ArrowUpDown className="h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("minLevel")}
                  className="flex items-center gap-1 px-0 hover:bg-transparent"
                >
                  Min Level
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
                  onClick={() => handleSort("unitCost")}
                  className="flex items-center gap-1 px-0 hover:bg-transparent"
                >
                  Unit Cost (KES)
                  <ArrowUpDown className="h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>Barcode</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedItems.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center text-muted-foreground">
                  No inventory items found
                </TableCell>
              </TableRow>
            ) : (
              paginatedItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.itemCode}</TableCell>
                  <TableCell>{item.itemName}</TableCell>
                  <TableCell>
                    <Badge className={getCategoryColor(item.category)}>{item.category}</Badge>
                  </TableCell>
                  <TableCell>
                    {item.currentStock} {item.unit}
                  </TableCell>
                  <TableCell>
                    {item.minLevel} {item.unit}
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                  </TableCell>
                  <TableCell>KES {item.unitCost.toLocaleString()}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-blue-600 hover:text-blue-700"
                      onClick={() => handleBarcodeClick(item)}
                    >
                      <Barcode className="h-5 w-5" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Card View */}
      <div className="grid gap-4 md:hidden">
        {paginatedItems.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">No inventory items found</CardContent>
          </Card>
        ) : (
          paginatedItems.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Item Code</p>
                      <p className="font-semibold">{item.itemCode}</p>
                    </div>
                    <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Item Name</p>
                    <p className="font-medium">{item.itemName}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Category</p>
                      <Badge className={getCategoryColor(item.category)}>{item.category}</Badge>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Unit Cost</p>
                      <p className="text-sm font-semibold">KES {item.unitCost.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Current Stock</p>
                      <p className="text-sm">
                        {item.currentStock} {item.unit}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Min Level</p>
                      <p className="text-sm">
                        {item.minLevel} {item.unit}
                      </p>
                    </div>
                  </div>
                  <div className="pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full gap-2 text-blue-600 bg-transparent"
                      onClick={() => handleBarcodeClick(item)}
                    >
                      <Barcode className="h-3.5 w-3.5" />
                      View Barcode
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
            {Math.min(currentPage * itemsPerPage, filteredAndSortedItems.length)} of {filteredAndSortedItems.length}{" "}
            items
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

      {/* Barcode Dialog */}
      <Dialog open={barcodeDialogOpen} onOpenChange={setBarcodeDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Item Barcode</DialogTitle>
            <DialogDescription>Scan this barcode to track item: {selectedItem?.itemCode}</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center gap-4 py-4">
            {selectedItem && (
              <>
                <div className="rounded-lg border-2 border-gray-200 bg-white p-4">
                  <Image
                    src={`/barcode-for-.jpg?height=150&width=300&query=Barcode+for+${selectedItem.itemCode}`}
                    alt={`Barcode for ${selectedItem.itemCode}`}
                    width={256}
                    height={128}
                    className="h-32 w-64"
                  />
                </div>
                <div className="text-center">
                  <p className="font-semibold">{selectedItem.itemName}</p>
                  <p className="text-sm text-muted-foreground">{selectedItem.itemCode}</p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Stock: {selectedItem.currentStock} {selectedItem.unit}
                  </p>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
