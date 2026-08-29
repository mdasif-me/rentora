# Rentora — Code Quality Instructions

## Standard
Write production-oriented TypeScript that is readable, type-safe, maintainable, and easy to review. Prefer clarity over excessive abstraction.

## TypeScript
Use strict TypeScript. Avoid `any`. Prefer `unknown` plus narrowing when input is genuinely unknown. Validate external data at boundaries instead of trusting type assertions.

## Type Naming — Recommended Convention
Do **not** use `IUser` / `TUser` prefixes.

Prefer semantic names:
```ts
type User = {
  id: string;
  name: string;
};

interface Vehicle {
  id: string;
  name: string;
}

type CreateUserInput = {
  name: string;
  email: string;
};

type VehicleId = string;
```

`IUser` and `TUser` are valid styles, but they add metadata about the declaration kind to the name. Modern TypeScript projects generally benefit more from semantic names.

### `type` by default
Use `type` for:
- API request/response shapes
- DTO-like object shapes
- unions
- intersections
- function types
- mapped/conditional types
- utility compositions

### `interface` when useful
Use `interface` for:
- extensible object contracts
- repository/service contracts
- class implementation contracts
- intentional declaration merging

Do not define both `User` and `IUser` for the same domain concept.

## Domain Naming
Prefer:
```text
User
UserId
Vehicle
VehicleSearchParams
CreateBookingInput
BookingResponse
DashboardMetrics
AiRecommendation
LeadStatus
```

Avoid vague names:
```text
Data
ResponseData
Payload
Item
Obj
Info
TData
TResponse
```

## File Naming
Use the existing project convention consistently. Prefer lowercase kebab-case when compatible:
```text
vehicle-card.tsx
vehicle-service.ts
vehicle-search-form.tsx
create-booking.dto.ts
ai-recommendation.service.ts
```

## Components
React components use PascalCase:
```text
VehicleCard
VehicleSearchForm
BookingDialog
AiRecommendationPanel
DashboardMetricCard
```

Keep components focused. Extract API calls, transformations, hooks, and child components when complexity justifies it.

## Functions
Use verbs:
```text
getVehicles()
searchVehicles()
createBooking()
submitLead()
getDashboardMetrics()
generateRecommendations()
```

Boolean names should communicate state:
```text
isAvailable
isLoading
hasResults
canBook
shouldShow
```

## Props
Keep props explicit and focused:
```ts
interface VehicleCardProps {
  vehicle: Vehicle;
  onRent?: (vehicleId: string) => void;
}
```

Do not pass large unrelated objects when only a few fields are needed.

## API Contracts
Separate inputs and outputs where shapes differ:
```ts
type VehicleSearchParams = {
  location?: string;
  pickupDate?: string;
};

type VehicleResponse = {
  id: string;
  name: string;
  pricePerDay: number;
};
```

Do not use one giant domain type for every layer if the shapes differ.

## Validation
Validate:
- Form input
- API request bodies
- Query parameters
- AI structured output
- External webhook payloads

The backend remains authoritative for business-critical validation.

## Business Logic
Do not duplicate business rules between customer UI, admin UI, and backend. Business-critical rules should have one authoritative implementation.

## Error Handling
Never silently swallow errors.

Avoid:
```ts
try {
  await saveLead();
} catch {}
```

Handle errors explicitly, log appropriately, and show recoverable user feedback. Never expose sensitive internal details.

## Comments
Comments should explain why, not what. Remove obvious comments and temporary debugging notes.

## Styling
Use the existing styling system consistently. Avoid random inline styles, duplicate utility classes, arbitrary one-off colors, excessive shadows, and unnecessary animations.

## Security
Never commit API keys, tokens, passwords, or production secrets. Use environment variables and keep secrets server-side.

## Git Hygiene
Before submission:
- Remove debug files
- Remove `console.log` used for debugging
- Remove dead/commented-out code
- Remove unused imports
- Keep `.env` ignored
- Keep `.env.example`
- Ensure production build succeeds

## Final Quality Gate
Before declaring completion:
- TypeScript passes
- Lint passes
- Production build passes
- Core flows work
- No avoidable `any`
- No major dead code
- API contracts are explicit
- Loading/error/empty states exist
- Secrets are protected
- Naming is consistent
