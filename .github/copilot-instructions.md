# MGX-BKPOS Development Guide

## Architecture Overview

This is a React-based Point of Sale (POS) system built with TypeScript, Vite, and shadcn/ui components. The application follows a role-based access pattern with **admin** and **rider** user roles, each with distinct workflows and UI patterns.

### Core Technology Stack
- **Frontend**: React 19.1.1 + TypeScript + Vite
- **Styling**: Tailwind CSS + shadcn/ui components
- **State**: React Context (Auth) + Zustand + TanStack Query
- **Backend**: Supabase (configured but using mock data)
- **Package Manager**: pnpm

## Key Architectural Patterns

### 1. Role-Based Access Control
The app implements strict role separation:
- **Admin**: Full access (products, warehouse, distribution, categories, reports, settings)
- **Rider**: Limited access (POS, their own dashboard, profile)

```tsx
// Pattern: Role-based rendering in components
if (user?.role !== 'admin') {
  return <div>Akses Ditolak - Hanya admin yang dapat mengakses</div>;
}
```

### 2. Mock Data Architecture
Currently uses `src/lib/mockData.ts` instead of live Supabase data. All CRUD operations modify mock arrays in memory:

```tsx
// Import pattern for mock data
import { mockProducts, mockUsers, mockTransactions, mockRiderStocks } from '@/lib/mockData';
```

### 3. Route Protection Pattern
Routes are wrapped with `ProtectedRoute` and `PublicRoute` components in `App.tsx`:
- Public routes redirect authenticated users to `/dashboard`
- Protected routes redirect unauthenticated users to `/login`
- All protected routes include the `<Navbar />` component

### 4. Toast Notifications
Uses Sonner for notifications with Indonesian language messages:
```tsx
import { toast } from 'sonner';
toast.success('Transaksi berhasil!');
toast.error('Stok tidak mencukupi');
```

## Development Workflows

### Running the Application
```bash
pnpm install      # Install dependencies
pnpm run dev      # Start development server
pnpm run build    # Production build
pnpm run lint     # ESLint check
```

### Component Import Pattern
```tsx
// UI components from shadcn/ui
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Custom components
import Navbar from '@/components/Navbar';

// Context and hooks
import { useAuth } from '@/contexts/AuthContext';

// Mock data and types
import { mockProducts, Product } from '@/lib/mockData';
```

## File Structure Conventions

### Page Components (`src/pages/`)
Each page follows this structure:
1. State management (useState hooks)
2. Auth context usage (`const { user } = useAuth()`)
3. Role-based access checks
4. Mock data imports and local state
5. Event handlers (add/edit/delete operations)
6. Render functions for complex UI sections
7. Main component render

### UI Components (`src/components/ui/`)
- Pre-configured shadcn/ui components
- Custom variants using class-variance-authority
- Consistent styling with Tailwind CSS custom properties

### Mock Data Types (`src/lib/mockData.ts`)
All business entities are defined here:
- `User`, `Product`, `Category`, `Transaction`, `RiderStock`
- Export both types and mock data arrays
- Include Indonesian language fields (`name`, `description`)

## POS-Specific Business Logic

### Stock Management
- **Warehouse Stock**: Central inventory managed by admin
- **Rider Stock**: Distributed inventory per rider
- **Distribution Flow**: Admin → Warehouse → Riders → Sales

### Transaction Flow
1. Rider selects products from their allocated stock
2. Cart management with quantity validation
3. Payment methods: Cash (with change calculation) or QRIS
4. Stock deduction from rider inventory
5. Transaction recording with detailed breakdown

### Key Business Rules
- Riders can only sell from their distributed stock
- Admins can distribute stock from warehouse to riders
- Products have category associations
- Tax calculation is configurable via settings
- All monetary values use Indonesian Rupiah formatting

## Styling Conventions

### Tailwind Configuration
- Custom color system via CSS variables in `src/index.css`
- Extended theme with sidebar, chart, and custom color variants
- Uses `cn()` utility from `src/lib/utils.ts` for conditional classes

### Responsive Design
- Mobile-first approach with responsive navigation
- Card-based layout for data display
- Sheet components for mobile navigation
- Grid layouts that collapse to single columns on mobile

## Common Debugging Notes

### AuthContext Issue
The `AuthContext.tsx` file currently has corrupted content and only exports toast utilities. This suggests the authentication system needs reconstruction.

### Mock Data Persistence
All data changes are lost on page refresh since mock data is in-memory only. For production features, integrate with Supabase queries.

### Indonesian Localization
All user-facing text is in Indonesian (Bahasa Indonesia). Maintain this pattern for consistency:
- Error messages: "Stok tidak mencukupi"
- Success messages: "Transaksi berhasil!"
- UI labels: "Tambah Produk", "Simpan", "Batal"