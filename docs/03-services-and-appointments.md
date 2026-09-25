# Services and Appointment Design

## 1. Service master

### services
- id
- organization_id
- location_id
- name
- category
- description
- duration_minutes
- priority_level
- is_active
- requires_documentation
- sla_target_minutes

## 2. Service configuration

Each service must define:

- expected handling time
- service category
- branch availability
- counter compatibility
- optional priority handling
- SLA target

## 3. Service rules

Examples:

- loan consultation may require higher priority handling than cash deposit
- account opening may be limited to selected counters
- KYC may allow priority lane for verified customers
- emergency services may bypass normal queue rules with explicit manager approval

## 4. Appointment master

### appointments
- id
- organization_id
- location_id
- customer_id
- service_id
- appointment_datetime
- appointment_type
- status
- reminder_schedule
- priority_level
- source
- notes
- queue_generated

## 5. Appointment lifecycle

Appointment lifecycle states:

- scheduled
- confirmed
- checked_in
- in_service
- completed
- cancelled
- no_show

## 6. Appointment slot logic

### appointment_slots
- id
- location_id
- service_id
- start_time
- end_time
- capacity
- booked_count
- status

This enables the product to handle both booked slots and walk-ins with one queue model.

## 7. Check-in flow

The appointment should flow into the queue engine only after the customer checks in or is validated as present.

Rules:

- if customer arrives within grace period, keep appointment priority
- if late beyond grace period, downgrade or preserve FIFO if configured
- if VIP or emergency override is configured, allow policy-controlled prioritization

## 8. Business rules for fairness

The queue must remain transparent:

- Appointment priority is real but not absolute
- VIP should not automatically reorder all customers
- Service-specific priority should be configured by branch policy
- Emergency cases must be traceable in audit logs

## 9. Data validation

- service duration must be positive
- appointment must reference valid location and service
- customer record must exist or be created on check-in
- start time must not exceed end time

## 10. UI expectation

The appointment form should feel operational, not CRUD-only. It should clearly show booking status, service duration, queue generation, and customer notes.
