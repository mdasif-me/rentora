# Rentora — Architecture Instructions

## Principle
Use pragmatic separation of concerns. The current project setup is authoritative; inspect it first and extend it instead of rebuilding it.

Preferred conceptual flow:

```text
UI
 -> API / Server Layer
 -> Service / Business Logic
 -> Data / External Services
```

## Frontend Responsibilities
`web` owns:
- Customer UI
- Admin UI
- Routing
- Page composition
- Client interactions
- Forms
- Loading/error/success UI
- API consumption
- SEO
- Responsive behavior

Do not place complex business rules in presentation components.

## Backend / SSR Responsibilities
The existing backend/SSR layer owns:
- Business rules
- Validation
- Vehicle search/matching
- Booking/inquiry processing
- Lead processing
- Dashboard aggregation
- AI orchestration
- Automation/webhooks
- External service communication
- Secrets

Never expose AI/API credentials to the browser.

## Domain Organization
Organize backend functionality by domain:
```text
vehicles
bookings
leads
dashboard
ai
automation
```

Keep controller/route, service, validation DTO/input, repository/data access, and domain types close to their domain where the existing architecture permits.

## Frontend Organization
Prefer feature/domain grouping:
```text
app/
components/
  customer/
  admin/
  vehicles/
  booking/
  ai/
  shared/
lib/
services/
types/
data/
config/
```

Do not create a huge generic component folder for unrelated features.

## Data Access
Prefer:
```text
Page
 -> Feature service / API client
 -> Backend
 -> Service
 -> Repository/data source
```

Do not duplicate business logic in multiple pages.

Mock data is acceptable for assessment scope. Keep it in dedicated data modules and make it replaceable by a real database later.

## State
Use local state for local UI state, URL/search params for shareable filters/search, and API/server data for remote state. Do not add global state unless cross-feature requirements justify it.

## Server vs Client
Prefer server rendering/server components where useful. Use client components only for genuinely interactive behavior such as forms, carousels, filters, charts, favorites, AI input, or browser APIs.

## API Contracts
Every endpoint should have:
- Explicit input
- Validation
- Explicit response
- Consistent errors
- Correct status codes

Do not expose internal implementation details.

## AI
Never call the AI provider directly from the browser.

```text
Browser
 -> AI endpoint
 -> AI service
 -> AI provider
 -> Validate structured output
 -> Match/rank application data
 -> Safe response
```

AI output is untrusted external data and must be validated before use.

## Automation
Trigger automation from a backend-controlled event:
```text
Lead Created
 -> Automation Service
 -> Webhook / provider
 -> Notification / confirmation
```

Keep credentials server-side.

## Shared Types
Share only stable contracts between frontend and backend:
- Vehicle response
- Booking request/response
- Lead request/response
- Dashboard response
- AI recommendation response

Do not expose internal backend types merely for convenience.

## Dependency Discipline
Before adding a dependency, verify that it is necessary and materially improves the assessment. Avoid infrastructure-heavy patterns such as microservices, CQRS, event buses, or complex caching unless a real requirement demands them.

## Architecture Decision Rule
When multiple solutions work, choose the simplest one that is easy to explain, test, replace, and complete within the deadline.
