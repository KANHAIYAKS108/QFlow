# Queue Engine and Event Model

## 1. Queue engine principles

The queue engine is the operational heart of the product. It coordinates:

- ticket creation
- position tracking
- service assignment
- call logic
- skip and recall rules
- no-show handling
- completion and transfer events

## 2. Core tables

### queue_tickets
- id
- organization_id
- location_id
- customer_id
- appointment_id
- service_id
- counter_id
- assigned_staff_id
- ticket_code
- queue_position
- status
- priority_level
- created_at
- checked_in_at
- called_at
- service_started_at
- completed_at
- estimated_wait_minutes

### queue_events
- event_id
- ticket_id
- event_type
- timestamp
- actor_id
- location_id
- metadata

## 3. Required queue event types

- TICKET_CREATED
- QUEUE_JOINED
- POSITION_CHANGED
- APPROACHING_TURN
- CUSTOMER_NOTIFIED
- CALLED
- SERVICE_STARTED
- SERVICE_COMPLETED
- SKIPPED
- RECALL
- TRANSFERRED
- NO_SHOW
- CANCELLED

## 4. Event model rules

Each event must record:

- ticket_id
- event_type
- timestamp
- actor_id
- location_id
- metadata JSON

This yields:

- auditability
- analytics
- debugging
- replay ability
- customer history
- future AI use cases

## 5. Queue state lifecycle

A ticket should not simply swap status; it should accumulate a history of operational events.

Example flow:

TICKET_CREATED → QUEUE_JOINED → POSITION_CHANGED → APPROACHING_TURN → CUSTOMER_NOTIFIED → CALLED → SERVICE_STARTED → SERVICE_COMPLETED

## 6. Priority and fairness logic

Priority rules should be explicit and transparent.

Example:

- appointment customer arrives within 10-minute grace period
- then priority = appointment
- but VIP does not automatically reorder everyone in the queue
- policy engine decides how many exceptions are allowed

## 7. Queue actions available to staff

- call next
- notify customer
- skip customer
- restore queue order
- transfer to alternate counter
- mark no-show
- complete service
- cancel service
- re-open after recall

## 8. Concurrency and locking

The engine must prevent duplicate assignment of the same ticket.

Required principles:

- atomic queue state updates
- database transaction boundaries
- idempotent event writes
- unique assignment checks
- event ordering for race conditions

## 9. Real-time queue health

The system should track:

- waiting count
- average wait time
- service duration
- delayed tickets
- no-show ratio
- peak-demand windows

## 10. Operational guardrails

- queue rule order is not hardcoded to VIP first
- policy thresholds should be branch-level config
- every priority override must be logged in audit trail
