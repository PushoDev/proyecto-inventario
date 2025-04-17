Para solucionar los problemas que mencionas, vamos a abordarlos uno por uno:

---

### **1. El problema de la categoría no agregándose correctamente a la tabla**

El problema parece estar relacionado con el `name` del campo `Select` para las categorías. En tu código, el `name` del `Select` está definido como `"categoria"`, pero en el estado `formData`, estás utilizando el nombre `"categorias"` (con "s" al final). Esto crea una inconsistencia, ya que el valor seleccionado no se asigna correctamente al estado.

#### Solución:

Cambia el `name` del `Select` de categorías para que coincida con el nombre en el estado `formData`. Es decir, cambia esto:

```tsx
<Select
    name="categoria"
    value={formData.categorias}
    onValueChange={(value) => setFormData({ ...formData, categorias: value })}
>
```

Por esto:

```tsx
<Select
    name="categorias"
    value={formData.categorias}
    onValueChange={(value) => setFormData({ ...formData, categorias: value })}
>
```

Esto asegurará que el valor seleccionado se guarde correctamente en el estado y pueda ser agregado a la tabla cuando presiones el botón "Agregar Producto".

---

### **2. Calcular la cantidad total de productos en el footer de la tabla**

En el footer de la tabla, necesitas calcular dos cosas:

1. **La cantidad total de productos distintos**: Esto ya lo tienes implementado con `producto.length`.
2. **La cantidad total de unidades compradas**: Esto implica sumar todas las cantidades (`cantidad`) de los productos en la tabla.

Actualmente, el cálculo que intentaste hacer en el footer tiene un error. La función `reduce` no está configurada correctamente. Vamos a corregirlo.

#### Código actualizado para el footer:

```tsx
<TableFooter>
    <TableRow>
        <TableCell colSpan={2}>Total de la Compra</TableCell>
        <TableCell className="bg-amber-300 text-amber-950">
            {producto.length} Productos
        </TableCell>
        <TableCell className="bg-amber-800 text-amber-300">
            {producto.reduce((total, item) => total + item.cantidad, 0)} Unidades
        </TableCell>
        <TableCell className="bg-emerald-700 text-emerald-950">
            $ {producto.reduce((total, item) => total + item.precio * item.cantidad, 0).toFixed(2)}
        </TableCell>
        <TableCell className="text-sidebar-accent text-right">Acciones</TableCell>
    </TableRow>
</TableFooter>
```

#### Explicación:

1. **Cantidad total de productos distintos**:

   ```tsx
   {producto.length} Productos
   ```

   Esto sigue siendo correcto.
2. **Cantidad total de unidades compradas**:

   ```tsx
   {producto.reduce((total, item) => total + item.cantidad, 0)} Unidades
   ```

   Aquí usamos `reduce` para iterar sobre cada producto y sumar su `cantidad`.
3. **Total del precio**:

   ```tsx
   $ {producto.reduce((total, item) => total + item.precio * item.cantidad, 0).toFixed(2)}
   ```

   Calculamos el precio total multiplicando el `precio` por la `cantidad` de cada producto y sumamos los resultados.

---

### **Resultado esperado**

Con estos cambios:

1. La categoría seleccionada se agregará correctamente a la tabla.
2. El footer mostrará:
   - La cantidad total de productos distintos (`producto.length`).
   - La cantidad total de unidades compradas (suma de `cantidad`).
   - El total del precio (suma de `precio * cantidad`).

---

### **Código completo corregido**

Aquí están las partes relevantes del código corregido:

```tsx
// Select para categorías
<Select
    name="categorias"
    value={formData.categorias}
    onValueChange={(value) => setFormData({ ...formData, categorias: value })}
>
    <SelectTrigger className="w-full">
        <SelectValue placeholder="Seleccione Categoría" />
    </SelectTrigger>
    <SelectContent>
        {categorias.map((categoria: CategoriasProps) => (
            <SelectItem key={categoria.id} value={categoria.nombre_categoria}>
                {categoria.nombre_categoria}
            </SelectItem>
        ))}
    </SelectContent>
</Select>

// Footer de la tabla
<TableFooter>
    <TableRow>
        <TableCell colSpan={2}>Total de la Compra</TableCell>
        <TableCell className="bg-amber-300 text-amber-950">
            {producto.length} Productos
        </TableCell>
        <TableCell className="bg-amber-800 text-amber-300">
            {producto.reduce((total, item) => total + item.cantidad, 0)} Unidades
        </TableCell>
        <TableCell className="bg-emerald-700 text-emerald-950">
            $ {producto.reduce((total, item) => total + item.precio * item.cantidad, 0).toFixed(2)}
        </TableCell>
        <TableCell className="text-sidebar-accent text-right">Acciones</TableCell>
    </TableRow>
</TableFooter>
```

---

Con estos cambios, tu aplicación debería funcionar correctamente. ¡Espero que esto te ayude! 😊
