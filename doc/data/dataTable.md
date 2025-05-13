¡Perfecto! Vamos a **agregar filtros adicionales** a tu tabla de productos:

### ✅ Lo que vamos a agregar:

1. **Filtro por categoría**
2. **Filtro por marca**
3. **Filtro por rango de precios**

Y todo esto lo haremos dentro del componente `DataTableProductos.tsx`, manteniendo la integración con `@tanstack/react-table`.

---

## 🧱 Paso 1: Actualizar `columns.tsx` (opcional)

No necesitas cambiar nada en `columns.tsx` porque ya tienes definidas las columnas.

---

## 📦 Paso 2: Modificar `DataTableProductos.tsx`

Vamos a modificar este archivo para incluir los nuevos filtros.

### 📄 `resources/js/Components/Productos/DataTableProductos.tsx`

```tsx
// resources/js/Components/Productos/DataTableProductos.tsx
"use client"

import * as React from "react"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, Filter } from "lucide-react"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTableProductos<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    // Obtener categorías únicas y marcas únicas
    const uniqueCategories = Array.from(new Set(data.map((item: any) => item.categoria)))
    const uniqueBrands = Array.from(new Set(data.map((item: any) => item.marca_producto)))

    // Manejar filtro de categoría
    const handleCategoryFilter = (value: string) => {
        setColumnFilters(prev =>
            prev.filter(f => f.id !== 'categoria').concat({
                id: 'categoria',
                value: value
            })
        )
    }

    // Manejar filtro de marca
    const handleBrandFilter = (value: string) => {
        setColumnFilters(prev =>
            prev.filter(f => f.id !== 'marca_producto').concat({
                id: 'marca_producto',
                value: value
            })
        )
    }

    // Manejar filtro de precio
    const [priceRange, setPriceRange] = React.useState({ min: '', max: '' })

    const handlePriceFilter = () => {
        if (priceRange.min || priceRange.max) {
            setColumnFilters(prev =>
                prev.filter(f => f.id !== 'precio_compra_producto').concat({
                    id: 'precio_compra_producto',
                    value: {
                        min: priceRange.min ? parseFloat(priceRange.min) : undefined,
                        max: priceRange.max ? parseFloat(priceRange.max) : undefined
                    }
                })
            )
        }
    }

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    return (
        <div>
            {/* Filtros */}
            <div className="flex flex-wrap items-center gap-4 py-4">
                {/* Filtro global por nombre */}
                <Input
                    placeholder="Buscar por nombre..."
                    value={(table.getColumn("nombre_producto")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("nombre_producto")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />

                {/* Filtro por categoría */}
                <select
                    onChange={(e) => handleCategoryFilter(e.target.value)}
                    className="rounded border-gray-300 p-2 dark:bg-gray-800 dark:text-white"
                >
                    <option value="">Todas las Categorías</option>
                    {uniqueCategories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>

                {/* Filtro por marca */}
                <select
                    onChange={(e) => handleBrandFilter(e.target.value)}
                    className="rounded border-gray-300 p-2 dark:bg-gray-800 dark:text-white"
                >
                    <option value="">Todas las Marcas</option>
                    {uniqueBrands.map(brand => (
                        <option key={brand} value={brand}>{brand}</option>
                    ))}
                </select>

                {/* Filtro por rango de precio */}
                <div className="flex items-center gap-2">
                    <Input
                        type="number"
                        placeholder="Min"
                        value={priceRange.min}
                        onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                        className="w-24"
                    />
                    <span>-</span>
                    <Input
                        type="number"
                        placeholder="Max"
                        value={priceRange.max}
                        onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                        className="w-24"
                    />
                    <Button onClick={handlePriceFilter} size="sm" variant="outline">
                        <Filter className="h-4 w-4" />
                    </Button>
                </div>

                {/* Selector de columnas */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="ml-auto">
                            Columnas <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* Tabla */}
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No se encontraron resultados.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Paginación */}
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="text-sm text-muted-foreground">
                    Página {table.getState().pagination.pageIndex + 1} de{" "}
                    {table.getPageCount()}
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Anterior
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Siguiente
                    </Button>
                </div>
            </div>
        </div>
    )
}
```

---

## ✅ Paso 3: Asegurarte que tus columnas acepten filtros

En `columns.tsx`, asegúrate de que las columnas tengan el atributo `filterFn` si quieres hacer filtrado personalizado, por ejemplo:

```ts
{
    accessorKey: "categoria",
    header: "Categoría",
    filterFn: (row, id, value) => value === "" || row.getValue(id) === value
},
{
    accessorKey: "marca_producto",
    header: "Marca",
    filterFn: (row, id, value) => value === "" || row.getValue(id) === value
},
{
    accessorKey: "precio_compra_producto",
    header: "Precio",
    cell: ({ row }) => {...},
    filterFn: (row, id, value) => {
        const precio = row.getValue(id)
        const min = value?.min
        const max = value?.max
        return (
            (min === undefined || precio >= min) &&
            (max === undefined || precio <= max)
        )
    }
}
```

---

## ✅ Resultado final

Tu tabla ahora tiene:


| Filtro                          | Estado       |
| ------------------------------- | ------------ |
| 🔍 Búsqueda global por nombre  | ✅ Listo     |
| 🏷️ Filtrar por categoría     | ✅ Listo     |
| 🛠 Filtrar por marca            | ✅ Listo     |
| 💰 Filtrar por rango de precios | ✅ Listo     |
| 👁‍🗨 Visibilidad de columnas  | ✅ Ya estaba |
| 📄 Paginación                  | ✅ Ya estaba |

---

## ¿Qué sigue?

Si lo deseas, podemos:

- Agregar **botón para limpiar todos los filtros**
- Mostrar **indicadores visuales cuando hay filtros activos**
- Usar **filtros server-side** si planeas paginar desde Laravel

¿Quieres agregar alguna de estas mejoras ahora?
