# Identity and Organization Design

## 1. Multi-tenant model

QFlow should be designed as a multi-tenant SaaS product from day one with every business record scoped to an organization.

Required ownership fields:

- organization_id
- tenant_id
- branch_id or location_id
- created_by
- updated_by
- created_at
- updated_at

## 2. Core database tables

### organizations
- id
- name
- legal_name
- status
- timezone
- currency
- created_at

### locations
- id
- organization_id
- name
- address
- city
- state
- zip_code
- timezone
- status

### staff
- id
- organization_id
- location_id
- name
- email
- phone
- role_id
- employee_id
- status
- working_hours

### roles
- id
- organization_id
- name
- permissions

### counters
- id
- organization_id
- location_id
- counter_number
- name
- status
- assigned_staff_id

### staff_services
- id
- staff_id
- service_id
- proficiency_level

### staff_locations
- id
- staff_id
- location_id

## 3. Access model

### Admin
- configures organization
- manages locations
- assigns roles
- creates staff and counters

### Manager
- oversees branch operations
- manages staffing and service allocations
- approves escalations

### Staff
- sees assigned queue and counter
- updates service lifecycle
- cannot change organization-level policy without permissions

## 4. Organization configuration needs

- branch list
- service list
- queue rules
- operating hours
- holidays
- late-arrival window
- escalation policies

## 5. Data validation expectations

At minimum:

- email format validation
- phone format validation
- employee ID uniqueness within organization
- counter number uniqueness per location
- branch must belong to a valid organization

## 6. Operational rule examples

- if staff location does not match counter location, flag a mismatch
- if an assigned service is not in staff skill set, warn manager
- if location is offline or closed, prevent ticket creation

## 7. Security expectation

- JWT-based authentication
- role-based access control
- tenant isolation for all query filters
- audit logging for every configuration change
