# Rentora — Project Overall Summary

## Product
Rentora is a modern car-rental web platform created as a technical assessment MVP.

It combines:
- Customer-facing rental experience
- Admin dashboard
- AI-assisted vehicle recommendations
- API-driven data
- Lead/rental inquiry processing
- Automation

## Product Goal
Demonstrate the ability to transform a Figma/wireframe-driven requirement into a polished, responsive, functional application while showing strong frontend, backend/SSR, AI, API, automation, and TypeScript engineering.

The result should feel like a coherent product, not a collection of static screens.

## Customer Flow
```text
Landing
 -> Search
 -> Browse/filter vehicles
 -> AI recommendation
 -> Select vehicle
 -> Rental inquiry
 -> Confirmation
```

## Admin Flow
```text
Admin
 -> Dashboard
 -> View KPIs
 -> Review best sellers
 -> Review transactions
 -> Analyze sales
 -> Review country sales
```

## AI Flow
```text
Natural-language customer request
 -> Preference extraction
 -> Vehicle matching
 -> Ranking
 -> Recommendation
 -> Rental/inquiry continuation
```

The AI must interact with actual vehicle data and influence the product workflow.

## API / Backend
Core domains:
```text
Vehicles
Bookings
Leads
Dashboard
AI
Automation
```

The frontend consumes explicit backend/API contracts. Business-critical logic should remain server-side.

## Automation
Recommended:
```text
Customer inquiry
 -> Lead API
 -> Lead processing
 -> Automation trigger
 -> Admin notification
 -> Customer confirmation
```

Keep the implementation demonstrable and document the workflow.

## UI Direction
The customer site follows the supplied Figma/wireframe. The admin follows the supplied dashboard screenshot.

Upgrade raw wireframe placeholders into production-quality visuals while preserving the intended information architecture.

Priorities:
- Typography
- Spacing
- Visual hierarchy
- Realistic vehicle imagery
- Responsive behavior
- Interaction states
- Accessibility
- Consistent design language

## Engineering Direction
The project should communicate capability in:
- Next.js/React frontend engineering
- TypeScript
- Server-side/backend architecture
- API design
- Data-driven UI
- AI integration
- Automation
- Responsive UX
- Maintainable code

## Scope Philosophy
This is a 48-hour assessment. Optimize for:
```text
High-quality UI
+
Functional core flows
+
Meaningful AI
+
Clear API architecture
+
Demonstrable automation
+
Clean code
```

Avoid unnecessary microservices, event buses, CQRS, advanced caching, enterprise RBAC, complex payment infrastructure, and other scope that does not materially improve the assessment.

## Final Outcome
The evaluator should be able to see that the implementation can:
- Translate design into polished UI
- Build responsive customer and admin experiences
- Build and consume APIs
- Keep business logic organized
- Integrate AI into a real workflow
- Build useful automation
- Maintain strong TypeScript conventions
- Deliver under a constrained deadline

## Definition of Done
The project is submission-ready when:
- Customer frontend is polished and responsive
- Admin dashboard is functional and aligned with the reference
- Vehicle data is data-driven
- Search/filter works
- Dashboard metrics/charts use data
- AI recommendations work against vehicle data
- Rental/lead flow works
- Automation is demonstrable
- Loading/error/empty states are handled
- Accessibility and SEO basics are covered
- Production build succeeds
- No major TypeScript/lint/build issues remain
- Secrets are protected
- README documents setup, architecture, AI, API, automation, and deployment
