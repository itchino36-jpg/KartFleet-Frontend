# KarFleet Frontend

Frontend de gestión de flota construido con Next.js, TypeScript y Tailwind CSS.

## Estructura

```text
src/
├── api/          Comunicación HTTP centralizada
│   ├── client/   Adaptadores usados por hooks y formularios
│   └── server/   Infraestructura compartida de los proxies
├── app/          Rutas, layouts y endpoints proxy de Next.js
├── components/   Componentes visuales y composición de pantallas
│   ├── ui/       Primitivas reutilizables sin lógica de negocio
│   └── layout/   Shell, header, sidebar y títulos
├── modules/      Lógica organizada por dominio
│   ├── auth/     Sesión, permisos y login
│   ├── inversionista/  Inversionistas y su flujo de registro
│   ├── vehiculo/ Vehículos, tipos, catálogos y exportaciones
│   ├── planilla/ Planillas y controles operativos
│   └── seguros/  Pólizas y exportaciones
├── lib/          Exportación y utilidades compartidas
└── constants/    Configuración visual y navegación global
```

## Convenciones

- Las páginas de `app` coordinan componentes; no contienen acceso directo al backend.
- Todo `fetch` de negocio vive en `src/api`, no dentro de componentes o hooks.
- Los hooks de cada módulo administran estado y casos de uso.
- Los servicios transforman contratos del backend a tipos del frontend.
- Los proxies de `app/api` resuelven CORS y nunca contienen lógica visual.
- Los componentes de `ui` no conocen dominios como inversionistas o vehículos.
- Los nombres de archivos de componentes usan PascalCase (`VehiculoForm.tsx`).
- Inversionistas y vehículos usan el backend; no deben volver a persistirse en `localStorage`.
- La sesión JWT se conserva en `localStorage`. Planillas y seguros mantienen persistencia local temporal hasta disponer de sus endpoints.

## Flujo de datos

```text
Página → Hook del módulo → api/client → app/api → api/server → Backend KarFleet
```

## Comandos

```bash
npm run dev
npm run lint
npx tsc --noEmit
npm run build
```
