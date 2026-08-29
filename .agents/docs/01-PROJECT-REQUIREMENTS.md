# Rentora — Project Requirements

## Objective
Build a polished, responsive car-rental assessment MVP that demonstrates customer UI, admin dashboard, API-driven behavior, meaningful AI, automation, and clean engineering.

## Source of Truth
Use the provided Figma and reference screenshots as the primary UI/UX references. Preserve their information architecture and section hierarchy, while upgrading typography, spacing, imagery, accessibility, interactions, and responsive behavior. Do not reproduce gray wireframe placeholders in the final UI.

## Existing Setup
The frontend application is already `web`. The current backend/SSR setup already exists. Inspect the repository before changing architecture. Do not recreate or replace working setup.

## Customer Frontend
Implement:
- Header/navigation
- Hero
- Rental search
- How It Works
- Popular rental deals
- Vehicle category tabs
- Why Choose Us
- Promotional sections
- Testimonials
- Footer

Rental search fields:
- Pick-up location/date/time
- Drop-off location/date/time
- Search action

Search must actually affect vehicle results. Validate required fields, invalid dates, and drop-off before pick-up.

Vehicle cards must be data-driven and support:
- Name
- Image
- Category/type
- Price per day
- Seats
- Transmission
- Fuel
- Location
- Availability
- Favorite
- Rent/view action

Implement category filtering, favorite interaction, show-more/pagination behavior, loading, and empty states.

Testimonials must be data-driven and have a working responsive carousel.

## Admin Dashboard
Follow the supplied dashboard screenshot closely.

Implement:
- Sidebar
- Header
- Greeting
- Date filter
- Weekly earnings
- Total sales
- Purchased goods
- Best sellers
- Recent transactions
- Sales analytics chart
- Sales by countries

Dashboard values must come from a data/API layer. Charts must use a real charting implementation.

The sidebar should reflect the reference sections such as Main, Inventory, Stock, and Sales. Not every secondary destination needs a complete business module; prioritize the dashboard.

## AI
Implement one meaningful AI feature. Recommended: AI Vehicle Recommendation Assistant.

Example:
"I need a comfortable SUV for five people for four days. My budget is around $300."

The system should:
1. Receive natural-language requirements.
2. Extract structured preferences.
3. Match against actual vehicle data.
4. Rank vehicles.
5. Return recommendations.
6. Allow continuation toward rental/inquiry.

The AI must affect application behavior. A generic chatbot is insufficient.

Include loading, error, empty states, example prompts, and recommendation explanations.

## API
Use the existing backend/SSR architecture consistently.

Recommended capabilities:
- Vehicles
- Vehicle details
- Bookings/rental inquiries
- Leads
- Dashboard
- AI recommendations

Suggested contracts:
```text
GET  /api/vehicles
GET  /api/vehicles/:id
GET  /api/dashboard
GET  /api/dashboard/transactions
GET  /api/dashboard/bestsellers
POST /api/bookings
POST /api/leads
POST /api/ai/recommend
```

Use validation, typed inputs/outputs, and appropriate HTTP status codes.

## Automation
Implement at least one meaningful automation flow:

```text
Customer
  -> AI Recommendation
  -> Vehicle Selection
  -> Rental Inquiry
  -> Lead Creation
  -> Automation/Webhook
       -> Admin Notification
       -> Customer Confirmation
```

Document the trigger, payload, steps, and result in the README.

## UX / Responsive / Accessibility
Every major interaction should have appropriate loading, success, error, empty, and disabled states.

Support desktop, laptop, tablet, and mobile. Verify approximately 1440px, 1280px, 1024px, 768px, and 390px. No horizontal overflow.

Use semantic HTML, accessible controls, labels, focus states, meaningful alt text, and appropriate ARIA attributes.

## SEO
For public pages implement title, description, Open Graph metadata where practical, semantic headings, descriptive alt text, and crawlable content.

## Assessment Priority
1. UI/UX
2. Admin dashboard
3. Customer frontend
4. Meaningful AI
5. API + automation
6. Code quality

Do not sacrifice these priorities for unnecessary infrastructure.
