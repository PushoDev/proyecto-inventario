¡Entendido! Vamos a modificar el `Sidebar` para que las **agrupaciones** sean **desplegables** (collapsible). Esto significa que cada grupo tendrá un botón para expandir o colapsar su contenido, mejorando la organización y usabilidad del sidebar.

---

### Cambios Necesarios

1. **Estado de Colapso por Grupo:**

   - Agregaremos un estado local para controlar si cada grupo está expandido o colapsado.
   - Este estado será independiente para cada grupo.
2. **Botón Desplegable:**

   - Añadiremos un botón en el `SidebarGroupLabel` que permita alternar entre expandir y colapsar el contenido del grupo.
3. **Animación de Transición:**

   - Usaremos una animación suave para mostrar/ocultar el contenido del grupo.
4. **Estilos Adicionales:**

   - Aseguraremos que los estilos se adapten correctamente cuando un grupo esté colapsado.

---

### Código Modificado para Grupos Desplegables

Aquí está el código actualizado para implementar grupos desplegables:

```tsx
import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import { type NavItem } from "@/types";
import { Link } from "@inertiajs/react";
import {
  BookOpenText,
  BoxesIcon,
  ChartNoAxesCombinedIcon,
  CheckCircleIcon,
  Computer,
  Github,
  IdCardIcon,
  Landmark,
  LucideShoppingCart,
  NotebookText,
  Repeat,
  StoreIcon,
} from "lucide-react";
import AppLogo from "./app-logo";
import { SearchForm } from "./extras/search-form";
import { NavFooter } from "@/components/nav-footer";
import { NavUser } from "@/components/nav-user";

// Definición de las agrupaciones
const navGroups = [
  {
    title: "General",
    items: [
      { title: "Caja Principal", href: "/dashboard", icon: Computer },
      { title: "Logística General", href: "/logistica", icon: ChartNoAxesCombinedIcon },
    ],
  },
  {
    title: "Inventario",
    items: [
      { title: "Categorías", href: "/categorias", icon: CheckCircleIcon },
      { title: "Productos Disponibles", href: "/productos", icon: BoxesIcon },
      { title: "Almacenes o Tiendas", href: "/almacenes", icon: StoreIcon },
    ],
  },
  {
    title: "Operaciones",
    items: [
      { title: "Movimientos", href: "/movimientos", icon: Repeat },
      { title: "Proveedores", href: "/proveedores", icon: LucideShoppingCart },
      { title: "Clientes", href: "/clientes", icon: IdCardIcon },
    ],
  },
  {
    title: "Finanzas",
    items: [
      { title: "Cuentas Monetarias", href: "/cuentas", icon: Landmark },
      { title: "Reportes", href: "/reportes", icon: NotebookText },
    ],
  },
];

const footerNavItems: NavItem[] = [
  {
    title: "Repositorio (Privado)",
    href: "https://github.com/PushoDev",
    icon: Github,
  },
  {
    title: "Documentación",
    href: "#",
    icon: BookOpenText,
  },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard" prefetch>
                <AppLogo />
              </Link>
            </SidebarMenuButton>
            <SearchForm />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Contenido con agrupaciones */}
      <SidebarContent>
        {navGroups.map((group, groupIndex) => (
          <CollapsibleNavGroup key={groupIndex} group={group} />
        ))}
      </SidebarContent>

      <SidebarFooter>
        <NavFooter items={footerNavItems} className="mt-auto" />
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}

// Componente CollapsibleNavGroup
interface CollapsibleNavGroupProps {
  group: {
    title: string;
    items: NavItem[];
  };
}

function CollapsibleNavGroup({ group }: CollapsibleNavGroupProps) {
  const [isExpanded, setIsExpanded] = React.useState(true);

  return (
    <SidebarGroup>
      {/* Título del grupo con botón desplegable */}
      <SidebarGroupLabel>
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span>{group.title}</span>
          <span className="text-xs">{isExpanded ? "▼" : "▶"}</span>
        </div>
      </SidebarGroupLabel>

      {/* Contenido del grupo */}
      {isExpanded && (
        <SidebarGroupContent>
          <SidebarMenu>
            {group.items.map((item, itemIndex) => (
              <SidebarMenuItem key={itemIndex}>
                <SidebarMenuButton asChild>
                  <Link href={item.href} prefetch>
                    {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      )}
    </SidebarGroup>
  );
}
```

---

### Explicación de los Cambios

1. **Estado Local (`isExpanded`):**

   - Cada grupo tiene su propio estado `isExpanded` para controlar si está expandido o colapsado.
   - El estado se alterna al hacer clic en el título del grupo.
2. **Botón Desplegable:**

   - Se añade un indicador visual (`▼` o `▶`) junto al título del grupo para mostrar si está expandido o colapsado.
3. **Renderizado Condicional:**

   - El contenido del grupo (`SidebarGroupContent`) solo se renderiza si `isExpanded` es `true`.
4. **Animación (Opcional):**

   - Puedes agregar una animación suave usando CSS o bibliotecas como `framer-motion`. Aquí tienes un ejemplo básico con CSS:
     ```css
     .sidebar-group-content {
       transition: max-height 0.3s ease-in-out;
       overflow: hidden;
     }
     ```
5. **Compatibilidad con Sidebar Colapsado:**

   - Si el sidebar está colapsado (`collapsible="icon"`), los tooltips seguirán funcionando correctamente.

---

### Resultado Final

Con estos cambios:

- Los grupos son desplegables, lo que mejora la organización y usabilidad.
- El diseño sigue siendo limpio y profesional.
- Es fácil de usar y escalable: puedes agregar más grupos sin complicar el código.

Si necesitas ajustes adicionales o quieres implementar animaciones más avanzadas, ¡avísame! 😊
