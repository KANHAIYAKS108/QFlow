# Real-Time Architecture and Backend Design

## 1. Preferred architecture

For the first startup-grade version, QFlow should use a modular monolith rather than creating a large microservice mesh from day one.

Recommended structure:

- React / Next.js frontend
- API Gateway
- Spring Boot backend
- MySQL as persistence layer
- Redis for hot state and queue coordination
- WebSocket/STOMP for live updates

## 2. Core backend modules

### Authentication module
- login
- JWT issuance
- refresh tokens
- roles and permissions

### Organization module
- branch configuration
- staff assignment
- services and counters

### Appointment module
- booking engine
- slot generation
- reminders
- cancellation and rescheduling

### Queue engine module
- ticket creation
- call next handling
- skip/recall and transfer logic
- no-show handling

### Notification module
- email, SMS, push, browser, WhatsApp
- templates
- triggers

### Analytics module
- KPI aggregation
- operational dashboards
- no-show, wait-time, and SLA analytics

## 3. Real-time strategy

The system should use:

- MySQL for source of truth
- Redis for live queue coordination and hot state
- WebSocket for instant UI updates

This separation avoids slow DB reads for every call-next action.

## 4. Queue operations pattern

When a staff member clicks CALL NEXT:

1. queue service validates the staff and location
2. Redis atomic queue pop or pointer update runs
3. state changes are persisted to MySQL
4. event is recorded to queue_events
5. WebSocket broadcast pushes live update to customer UI

## 5. Concurrency protection

Critical requirements:

- prevent duplicate ticket assignment
- ensure idempotent queue actions
- use transaction boundaries around queue decision logic
- unique constraints on active ticket assignment
- event ordering controls for parallel calls

## 6. Redis usage

Redis should handle:

- active queue state
- current counters and staff status
- live people-ahead values
- event stream fan-out for customers
- short-term ETA and delay notifications

## 7. WebSocket usage

Customer screens should subscribe to queue events such as:

- POSITION_UPDATED
- APPROACHING_TURN
- CUSTOMER_CALLED
- SERVICE_STARTED
- SERVICE_COMPLETED

## 8. Business rule clarity

The architecture should support explicit policy configuration rather than hardcoded dominance of any one customer type.

Example logic:

- appointment priority can be applied only within configured grace period
- VIP override is allowed only if policy permits it
- emergency access must be auditable and time-stamped

## 9. Why modular monolith first

Modular monolith keeps the product practical for the initial build because it reduces:

- service discovery overhead
- network complexity
- distributed transaction cost
- observability fragmentation

This approach keeps the codebase simple while preserving an eventual path to scale.
