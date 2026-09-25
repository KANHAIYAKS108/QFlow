import { useMemo, useState } from 'react'
import './App.css'

const branchOptions = ['Noida Sector 18', 'Greater Noida', 'Delhi Central']
const serviceOptions = [
  'Account Opening',
  'KYC',
  'Loan Consultation',
  'Cash Deposit',
  'Card Replacement',
  'Priority Desk',
]

const initialStaff = [
  {
    id: 1,
    name: 'Aarav Sharma',
    email: 'aarav@qflow.group',
    phone: '+91 98765 43210',
    employeeId: 'QF-101',
    role: 'Agent',
    assignedLocation: 'Noida Sector 18',
    assignedServices: ['Account Opening', 'KYC'],
    workingSchedule: 'Mon-Fri 09:00 - 18:00',
    status: 'Available',
  },
  {
    id: 2,
    name: 'Priya Nair',
    email: 'priya@qflow.group',
    phone: '+91 98123 45678',
    employeeId: 'QF-204',
    role: 'Supervisor',
    assignedLocation: 'Greater Noida',
    assignedServices: ['Loan Consultation', 'Priority Desk'],
    workingSchedule: 'Mon-Sat 10:00 - 19:00',
    status: 'On duty',
  },
  {
    id: 3,
    name: 'Rohit Verma',
    email: 'rohit@qflow.group',
    phone: '+91 99887 33445',
    employeeId: 'QF-310',
    role: 'Manager',
    assignedLocation: 'Delhi Central',
    assignedServices: ['Cash Deposit', 'Card Replacement'],
    workingSchedule: 'Mon-Fri 08:00 - 17:00',
    status: 'Break',
  },
]

const initialCounters = [
  {
    id: 1,
    number: '01',
    name: 'Counter 01',
    location: 'Noida Sector 18',
    supportedServices: ['Account Opening', 'KYC'],
    assignedStaff: 'Aarav Sharma',
    status: 'Open',
  },
  {
    id: 2,
    number: '02',
    name: 'Counter 02',
    location: 'Noida Sector 18',
    supportedServices: ['Loan Consultation', 'Priority Desk'],
    assignedStaff: 'Priya Nair',
    status: 'Busy',
  },
  {
    id: 3,
    number: '03',
    name: 'Counter 03',
    location: 'Greater Noida',
    supportedServices: ['Cash Deposit'],
    assignedStaff: 'Rohit Verma',
    status: 'Open',
  },
]

const initialAppointments = [
  {
    id: 1,
    customer: 'Neha Kapoor',
    location: 'Noida Sector 18',
    service: 'Account Opening',
    date: '2026-09-28',
    timeSlot: '10:30 AM',
    appointmentType: 'In-person',
    status: 'Confirmed',
    reminderSchedule: '24h before + 2h before',
    priorityLevel: 'High',
    source: 'Website',
    notes: 'Needs passport and address proof ready.',
    queueGenerated: true,
  },
  {
    id: 2,
    customer: 'Rahul Mehta',
    location: 'Delhi Central',
    service: 'Loan Consultation',
    date: '2026-09-28',
    timeSlot: '12:00 PM',
    appointmentType: 'Virtual',
    status: 'Checked-In',
    reminderSchedule: '1h before',
    priorityLevel: 'Normal',
    source: 'Call center',
    notes: 'Digital meeting link already shared.',
    queueGenerated: true,
  },
  {
    id: 3,
    customer: 'Sana Ali',
    location: 'Greater Noida',
    service: 'KYC',
    date: '2026-09-29',
    timeSlot: '09:15 AM',
    appointmentType: 'Priority',
    status: 'Scheduled',
    reminderSchedule: 'Same-day confirmation',
    priorityLevel: 'VIP',
    source: 'Branch walk-in',
    notes: 'Request priority lane and quick verification.',
    queueGenerated: false,
  },
]

const appointmentStatusOptions = [
  'Scheduled',
  'Confirmed',
  'Checked-In',
  'In-Service',
  'Completed',
  'Cancelled',
  'No-Show',
]

const overviewStats = [
  { label: 'On-duty staff', value: '18', change: '+2 this week', tone: 'blue' },
  { label: 'Active counters', value: '11', change: '4 under watch', tone: 'green' },
  { label: 'Queue balance', value: '1.2:1', change: 'Stable load', tone: 'amber' },
  { label: 'Coverage rate', value: '96%', change: 'High routing fit', tone: 'purple' },
]

const appointmentSummary = [
  { label: 'Today', value: '26', change: 'upcoming bookings', tone: 'blue' },
  { label: 'Confirmed', value: '18', change: 'ready for check-in', tone: 'green' },
  { label: 'Queue ready', value: '14', change: 'tickets generated', tone: 'amber' },
  { label: 'Priority', value: '4', change: 'high urgency', tone: 'purple' },
]

const initialTickets = [
  {
    id: 1,
    ticketId: 'QF-1001',
    ticketNumber: 'T-201',
    customerId: 'CUST-2451',
    organization: 'QFlow Banking',
    location: 'Noida Sector 18',
    service: 'Account Opening',
    source: 'Appointment',
    priority: 'High',
    createdAt: '2026-09-25 09:45',
    checkInAt: '2026-09-25 10:12',
    queuePosition: 3,
    estimatedWait: '12 min',
    status: 'Waiting',
    assignedCounter: 'Counter 01',
    assignedStaff: 'Aarav Sharma',
    calledAt: '2026-09-25 10:18',
    serviceStartedAt: '',
    serviceCompletedAt: '',
  },
  {
    id: 2,
    ticketId: 'QF-1002',
    ticketNumber: 'T-202',
    customerId: 'CUST-1187',
    organization: 'QFlow Finance',
    location: 'Delhi Central',
    service: 'Loan Consultation',
    source: 'QR',
    priority: 'Normal',
    createdAt: '2026-09-25 10:03',
    checkInAt: '2026-09-25 10:10',
    queuePosition: 1,
    estimatedWait: '5 min',
    status: 'Called',
    assignedCounter: 'Counter 02',
    assignedStaff: 'Priya Nair',
    calledAt: '2026-09-25 10:16',
    serviceStartedAt: '2026-09-25 10:20',
    serviceCompletedAt: '',
  },
  {
    id: 3,
    ticketId: 'QF-1003',
    ticketNumber: 'T-203',
    customerId: 'CUST-7820',
    organization: 'QFlow KYC',
    location: 'Greater Noida',
    service: 'KYC',
    source: 'Walk-in',
    priority: 'VIP',
    createdAt: '2026-09-25 10:20',
    checkInAt: '2026-09-25 10:26',
    queuePosition: 2,
    estimatedWait: '8 min',
    status: 'Notified',
    assignedCounter: 'Counter 03',
    assignedStaff: 'Rohit Verma',
    calledAt: '',
    serviceStartedAt: '',
    serviceCompletedAt: '',
  },
]

const queueStatusOptions = [
  'Waiting',
  'Notified',
  'Called',
  'Serving',
  'Completed',
  'Skipped',
  'Cancelled',
  'No-Show',
  'Transferred',
]

const queueSummary = [
  { label: 'Live tickets', value: '128', change: 'across all branches', tone: 'blue' },
  { label: 'Waiting now', value: '34', change: '10 high-priority', tone: 'green' },
  { label: 'Avg wait', value: '11 min', change: 'down 2 min', tone: 'amber' },
  { label: 'Serving', value: '18', change: 'currently active', tone: 'purple' },
]

const queueSignals = [
  { label: 'Priority queue', value: '8', tone: 'amber' },
  { label: 'Delayed', value: '4', tone: 'purple' },
  { label: 'Transferred', value: '2', tone: 'blue' },
  { label: 'No-shows', value: '1', tone: 'red' },
]

function App() {
  const [staff, setStaff] = useState(initialStaff)
  const [counters, setCounters] = useState(initialCounters)
  const [appointments, setAppointments] = useState(initialAppointments)
  const [tickets, setTickets] = useState(initialTickets)
  const [selectedStaffId, setSelectedStaffId] = useState(initialStaff[0].id)
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(initialAppointments[0].id)
  const [selectedTicketId, setSelectedTicketId] = useState(initialTickets[0].id)
  const [staffFilter, setStaffFilter] = useState('All')
  const [appointmentFilter, setAppointmentFilter] = useState('All')
  const [ticketFilter, setTicketFilter] = useState('All')

  const filteredStaff = useMemo(
    () =>
      staffFilter === 'All'
        ? staff
        : staff.filter((member) => member.role === staffFilter),
    [staff, staffFilter],
  )

  const selectedStaff = useMemo(
    () => staff.find((member) => member.id === selectedStaffId) ?? staff[0],
    [selectedStaffId, staff],
  )

  const updateSelectedStaff = (field, value) => {
    setStaff((previous) =>
      previous.map((member) =>
        member.id === selectedStaffId ? { ...member, [field]: value } : member,
      ),
    )
  }

  const toggleAssignedService = (service) => {
    setStaff((previous) =>
      previous.map((member) => {
        if (member.id !== selectedStaffId) return member

        const alreadyAssigned = member.assignedServices.includes(service)

        return {
          ...member,
          assignedServices: alreadyAssigned
            ? member.assignedServices.filter((item) => item !== service)
            : [...member.assignedServices, service],
        }
      }),
    )
  }

  const addStaffMember = () => {
    const newMember = {
      id: Date.now(),
      name: 'New Staff Member',
      email: 'new.staff@qflow.group',
      phone: '+91 90000 00000',
      employeeId: `QF-${String(staff.length + 100)}`,
      role: 'Agent',
      assignedLocation: 'Noida Sector 18',
      assignedServices: ['Account Opening'],
      workingSchedule: 'Mon-Fri 09:00 - 17:00',
      status: 'Available',
    }

    setStaff((previous) => [newMember, ...previous])
    setSelectedStaffId(newMember.id)
  }

  const updateCounter = (counterId, field, value) => {
    setCounters((previous) =>
      previous.map((counter) =>
        counter.id === counterId ? { ...counter, [field]: value } : counter,
      ),
    )
  }

  const addCounter = () => {
    const newCounter = {
      id: Date.now(),
      number: String(counters.length + 1).padStart(2, '0'),
      name: `Counter ${String(counters.length + 1).padStart(2, '0')}`,
      location: 'Noida Sector 18',
      supportedServices: ['Account Opening'],
      assignedStaff: 'Aarav Sharma',
      status: 'Open',
    }

    setCounters((previous) => [...previous, newCounter])
  }

  const filteredAppointments = useMemo(
    () =>
      appointmentFilter === 'All'
        ? appointments
        : appointments.filter((appointment) => appointment.status === appointmentFilter),
    [appointmentFilter, appointments],
  )

  const selectedAppointment = useMemo(
    () =>
      appointments.find((appointment) => appointment.id === selectedAppointmentId) ??
      appointments[0],
    [appointments, selectedAppointmentId],
  )

  const updateSelectedAppointment = (field, value) => {
    setAppointments((previous) =>
      previous.map((appointment) =>
        appointment.id === selectedAppointmentId ? { ...appointment, [field]: value } : appointment,
      ),
    )
  }

  const addAppointment = () => {
    const newAppointment = {
      id: Date.now(),
      customer: 'New Visitor',
      location: 'Noida Sector 18',
      service: 'KYC',
      date: '2026-09-30',
      timeSlot: '11:00 AM',
      appointmentType: 'In-person',
      status: 'Scheduled',
      reminderSchedule: '2h before',
      priorityLevel: 'Normal',
      source: 'Website',
      notes: 'Awaiting customer confirmation.',
      queueGenerated: false,
    }

    setAppointments((previous) => [newAppointment, ...previous])
    setSelectedAppointmentId(newAppointment.id)
  }

  const toggleQueueGeneration = () => {
    setAppointments((previous) =>
      previous.map((appointment) =>
        appointment.id === selectedAppointmentId
          ? { ...appointment, queueGenerated: !appointment.queueGenerated }
          : appointment,
      ),
    )
  }

  const filteredTickets = useMemo(
    () =>
      ticketFilter === 'All'
        ? tickets
        : tickets.filter((ticket) => ticket.status === ticketFilter),
    [ticketFilter, tickets],
  )

  const selectedTicket = useMemo(
    () => tickets.find((ticket) => ticket.id === selectedTicketId) ?? tickets[0],
    [selectedTicketId, tickets],
  )

  const updateSelectedTicket = (field, value) => {
    setTickets((previous) =>
      previous.map((ticket) =>
        ticket.id === selectedTicketId ? { ...ticket, [field]: value } : ticket,
      ),
    )
  }

  const addTicket = () => {
    const newTicket = {
      id: Date.now(),
      ticketId: `QF-${String(tickets.length + 1005)}`,
      ticketNumber: `T-${String(tickets.length + 210).padStart(3, '0')}`,
      customerId: `CUST-${String(tickets.length + 3000)}`,
      organization: 'QFlow Banking',
      location: 'Noida Sector 18',
      service: 'KYC',
      source: 'Web',
      priority: 'Normal',
      createdAt: '2026-09-25 11:00',
      checkInAt: '2026-09-25 11:05',
      queuePosition: tickets.length + 1,
      estimatedWait: '15 min',
      status: 'Waiting',
      assignedCounter: 'Counter 01',
      assignedStaff: 'Aarav Sharma',
      calledAt: '',
      serviceStartedAt: '',
      serviceCompletedAt: '',
    }

    setTickets((previous) => [newTicket, ...previous])
    setSelectedTicketId(newTicket.id)
  }

  const autoAssignTicket = () => {
    const bestMatch = counters.find(
      (counter) =>
        counter.location === selectedTicket.location &&
        counter.supportedServices.includes(selectedTicket.service),
    ) ?? counters[0]

    const assignedStaff = bestMatch ? bestMatch.assignedStaff : staff[0]?.name

    setTickets((previous) =>
      previous.map((ticket) =>
        ticket.id === selectedTicketId
          ? {
              ...ticket,
              assignedCounter: bestMatch ? bestMatch.name : 'Counter 01',
              assignedStaff,
              status: ticket.status === 'Waiting' ? 'Notified' : ticket.status,
            }
          : ticket,
      ),
    )
  }

  const advanceTicketStatus = () => {
    const cycle = queueStatusOptions
    const currentIndex = cycle.indexOf(selectedTicket.status)
    const nextStatus = cycle[(currentIndex + 1) % cycle.length]

    setTickets((previous) =>
      previous.map((ticket) =>
        ticket.id === selectedTicketId ? { ...ticket, status: nextStatus } : ticket,
      ),
    )
  }

  const updateTicketLifecycle = (nextStatus) => {
    setTickets((previous) =>
      previous.map((ticket) =>
        ticket.id === selectedTicketId
          ? {
              ...ticket,
              status: nextStatus,
              calledAt: nextStatus === 'Called' ? new Date().toLocaleString() : ticket.calledAt,
              serviceStartedAt:
                nextStatus === 'Serving' ? new Date().toLocaleString() : ticket.serviceStartedAt,
              serviceCompletedAt:
                nextStatus === 'Completed' ? new Date().toLocaleString() : ticket.serviceCompletedAt,
            }
          : ticket,
      ),
    )
  }

  return (
    <div className="qflow-app">
      <aside className="sidebar">
        <div className="brand-block">
          <div className="brand-mark">Q</div>
          <div>
            <p className="brand-label">QFlow</p>
            <small>Queue operating platform</small>
          </div>
        </div>

        <nav className="nav-panel">
          <span className="nav-title">Workspace</span>
          <button type="button" className="nav-item">
            Organization
          </button>
          <button type="button" className="nav-item">
            Locations
          </button>
          <button type="button" className="nav-item">
            Services
          </button>
          <button type="button" className="nav-item">
            Queues
          </button>
          <button type="button" className="nav-item active">
            Staff
          </button>
          <button type="button" className="nav-item">
            Reports
          </button>
        </nav>

        <div className="status-panel">
          <span className="nav-title">System health</span>
          <div className="status-row">
            <span className="dot green" />
            <span>Routing engine online</span>
          </div>
          <div className="status-row">
            <span className="dot amber" />
            <span>3 counters need coverage</span>
          </div>
        </div>
      </aside>

      <main className="content">
        <header className="top-bar">
          <div>
            <p className="eyebrow">Master form 3</p>
            <h1>Staff &amp; Counter Master</h1>
          </div>
          <div className="header-actions">
            <button type="button" className="secondary-btn">
              Review workload
            </button>
            <button type="button" className="primary-btn">
              Save staffing plan
            </button>
          </div>
        </header>

        <section className="hero-banner">
          <div>
            <p className="eyebrow">Operational staffing</p>
            <h2>Who can serve whom</h2>
            <p className="hero-copy">
              This master form connects staff capabilities, assigned services, branch coverage,
              and counter routing so queue distribution remains efficient and controlled.
            </p>
          </div>
          <div className="hero-badges">
            <span>Capacity planning</span>
            <span>Counter routing</span>
            <span>Live staffing</span>
          </div>
        </section>

        <section className="stats-grid">
          {overviewStats.map((stat) => (
            <article key={stat.label} className={`stat-card ${stat.tone}`}>
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
              <small>{stat.change}</small>
            </article>
          ))}
        </section>

        <section className="staff-layout">
          <div className="panel roster-panel">
            <div className="panel-header">
              <h3>Staff roster</h3>
              <button type="button" className="mini-btn" onClick={addStaffMember}>
                + Add staff
              </button>
            </div>

            <div className="catalog-actions">
              <select value={staffFilter} onChange={(event) => setStaffFilter(event.target.value)}>
                <option value="All">All roles</option>
                <option value="Agent">Agents</option>
                <option value="Supervisor">Supervisors</option>
                <option value="Manager">Managers</option>
                <option value="Admin">Admins</option>
              </select>
              <span className="catalog-count">{filteredStaff.length} employees</span>
            </div>

            <div className="roster-list">
              {filteredStaff.map((member) => (
                <button
                  key={member.id}
                  type="button"
                  aria-pressed={member.id === selectedStaff?.id}
                  className={`staff-card ${member.id === selectedStaff?.id ? 'selected' : ''}`}
                  onClick={() => setSelectedStaffId(member.id)}
                >
                  <div className="staff-card-head">
                    <strong>{member.name}</strong>
                    <span className={`status-badge ${member.status.toLowerCase().replace(/\s+/g, '-')}`}>
                      {member.status}
                    </span>
                  </div>
                  <small>
                    {member.role} • {member.employeeId}
                  </small>
                  <p>{member.assignedLocation}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="panel details-panel">
            <div className="panel-header">
              <h3>Staff details</h3>
              <span className="tag success">{selectedStaff.status}</span>
            </div>

            <div className="staff-focus">
              <div className="focus-pill">
                <span>Role</span>
                <strong>{selectedStaff.role}</strong>
              </div>
              <div className="focus-pill">
                <span>Location</span>
                <strong>{selectedStaff.assignedLocation}</strong>
              </div>
              <div className="focus-pill">
                <span>Skills</span>
                <strong>{selectedStaff.assignedServices.length}</strong>
              </div>
            </div>

            <div className="field-grid">
              <label>
                Name
                <input
                  type="text"
                  value={selectedStaff.name}
                  onChange={(event) => updateSelectedStaff('name', event.target.value)}
                />
              </label>
              <label>
                Email
                <input
                  type="email"
                  value={selectedStaff.email}
                  onChange={(event) => updateSelectedStaff('email', event.target.value)}
                />
              </label>
              <label>
                Phone
                <input
                  type="tel"
                  value={selectedStaff.phone}
                  onChange={(event) => updateSelectedStaff('phone', event.target.value)}
                />
              </label>
              <label>
                Employee ID
                <input
                  type="text"
                  value={selectedStaff.employeeId}
                  onChange={(event) => updateSelectedStaff('employeeId', event.target.value)}
                />
              </label>
              <label>
                Role
                <select
                  value={selectedStaff.role}
                  onChange={(event) => updateSelectedStaff('role', event.target.value)}
                >
                  <option>Agent</option>
                  <option>Supervisor</option>
                  <option>Manager</option>
                  <option>Admin</option>
                </select>
              </label>
              <label>
                Assigned Location
                <select
                  value={selectedStaff.assignedLocation}
                  onChange={(event) =>
                    updateSelectedStaff('assignedLocation', event.target.value)
                  }
                >
                  {branchOptions.map((branch) => (
                    <option key={branch}>{branch}</option>
                  ))}
                </select>
              </label>
              <label>
                Working Schedule
                <input
                  type="text"
                  value={selectedStaff.workingSchedule}
                  onChange={(event) =>
                    updateSelectedStaff('workingSchedule', event.target.value)
                  }
                />
              </label>
              <label>
                Status
                <select
                  value={selectedStaff.status}
                  onChange={(event) => updateSelectedStaff('status', event.target.value)}
                >
                  <option>Available</option>
                  <option>On duty</option>
                  <option>Break</option>
                  <option>Offline</option>
                </select>
              </label>
            </div>

            <div className="availability-panel">
              <h4>Assigned services</h4>
              <div className="branch-chips">
                {serviceOptions.map((service) => (
                  <button
                    key={service}
                    type="button"
                    aria-pressed={selectedStaff.assignedServices.includes(service)}
                    className={`chip ${selectedStaff.assignedServices.includes(service) ? 'active' : ''}`}
                    onClick={() => toggleAssignedService(service)}
                  >
                    {service}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="counter-panel panel">
          <div className="panel-header">
            <h3>Counter configuration</h3>
            <button type="button" className="mini-btn" onClick={addCounter}>
              + Add counter
            </button>
          </div>

          <div className="counter-grid">
            {counters.map((counter) => (
              <div key={counter.id} className="counter-card">
                <div className="counter-head">
                  <strong>{counter.name}</strong>
                  <span className={`counter-status ${counter.status.toLowerCase()}`}>
                    {counter.status}
                  </span>
                </div>

                <div className="counter-form">
                  <label>
                    Counter Number
                    <input
                      type="text"
                      value={counter.number}
                      onChange={(event) => updateCounter(counter.id, 'number', event.target.value)}
                    />
                  </label>
                  <label>
                    Location
                    <select
                      value={counter.location}
                      onChange={(event) => updateCounter(counter.id, 'location', event.target.value)}
                    >
                      {branchOptions.map((branch) => (
                        <option key={branch}>{branch}</option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Supported Services
                    <select
                      multiple
                      value={counter.supportedServices}
                      onChange={(event) =>
                        updateCounter(
                          counter.id,
                          'supportedServices',
                          Array.from(event.target.selectedOptions, (option) => option.value),
                        )
                      }
                    >
                      {serviceOptions.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Assigned Staff
                    <select
                      value={counter.assignedStaff}
                      onChange={(event) =>
                        updateCounter(counter.id, 'assignedStaff', event.target.value)
                      }
                    >
                      {staff.map((member) => (
                        <option key={member.id}>{member.name}</option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Status
                    <select
                      value={counter.status}
                      onChange={(event) => updateCounter(counter.id, 'status', event.target.value)}
                    >
                      <option>Open</option>
                      <option>Busy</option>
                      <option>Paused</option>
                      <option>Closed</option>
                    </select>
                  </label>
                </div>

                <div className="service-pills">
                  {counter.supportedServices.map((service) => (
                    <span key={service} className="mini-pill">
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="appointment-panel panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Master form 4</p>
              <h3>Appointment Master</h3>
            </div>
            <button type="button" className="mini-btn" onClick={addAppointment}>
              + Add appointment
            </button>
          </div>

          <div className="queue-flow">
            <div className="flow-node">Appointment</div>
            <span className="flow-arrow">→</span>
            <div className="flow-node">Check-in</div>
            <span className="flow-arrow">→</span>
            <div className="flow-node">Queue Ticket</div>
            <span className="flow-arrow">→</span>
            <div className="flow-node">Unified Queue</div>
          </div>

          <div className="appointment-stats">
            {appointmentSummary.map((stat) => (
              <article key={stat.label} className={`summary-card ${stat.tone}`}>
                <span>{stat.label}</span>
                <strong>{stat.value}</strong>
                <small>{stat.change}</small>
              </article>
            ))}
          </div>

          <div className="appointment-layout">
            <div className="panel appointment-list-panel">
              <div className="catalog-actions">
                <select
                  value={appointmentFilter}
                  onChange={(event) => setAppointmentFilter(event.target.value)}
                >
                  <option value="All">All statuses</option>
                  {appointmentStatusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
                <span className="catalog-count">{filteredAppointments.length} bookings</span>
              </div>

              <div className="appointment-list">
                {filteredAppointments.map((appointment) => (
                  <button
                    key={appointment.id}
                    type="button"
                    className={`appointment-card ${appointment.id === selectedAppointment?.id ? 'selected' : ''}`}
                    onClick={() => setSelectedAppointmentId(appointment.id)}
                  >
                    <div className="appointment-card-head">
                      <strong>{appointment.customer}</strong>
                      <span className={`appointment-status ${appointment.status.toLowerCase().replace(/\s+/g, '-')}`}>
                        {appointment.status}
                      </span>
                    </div>
                    <small>
                      {appointment.service} • {appointment.location}
                    </small>
                    <p>
                      {appointment.date} • {appointment.timeSlot}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            <div className="panel appointment-detail-panel">
              <div className="panel-header">
                <h3>Appointment details</h3>
                <span className="tag success">{selectedAppointment.status}</span>
              </div>

              <div className="appointment-focus">
                <div className="focus-pill">
                  <span>Customer</span>
                  <strong>{selectedAppointment.customer}</strong>
                </div>
                <div className="focus-pill">
                  <span>Service</span>
                  <strong>{selectedAppointment.service}</strong>
                </div>
                <div className="focus-pill">
                  <span>Type</span>
                  <strong>{selectedAppointment.appointmentType}</strong>
                </div>
                <div className="focus-pill">
                  <span>Priority</span>
                  <strong>{selectedAppointment.priorityLevel}</strong>
                </div>
              </div>

              <div className="field-grid">
                <label>
                  Customer
                  <input
                    type="text"
                    value={selectedAppointment.customer}
                    onChange={(event) => updateSelectedAppointment('customer', event.target.value)}
                  />
                </label>
                <label>
                  Location
                  <select
                    value={selectedAppointment.location}
                    onChange={(event) => updateSelectedAppointment('location', event.target.value)}
                  >
                    {branchOptions.map((branch) => (
                      <option key={branch}>{branch}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Service
                  <select
                    value={selectedAppointment.service}
                    onChange={(event) => updateSelectedAppointment('service', event.target.value)}
                  >
                    {serviceOptions.map((service) => (
                      <option key={service}>{service}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Appointment Type
                  <select
                    value={selectedAppointment.appointmentType}
                    onChange={(event) =>
                      updateSelectedAppointment('appointmentType', event.target.value)
                    }
                  >
                    <option>In-person</option>
                    <option>Virtual</option>
                    <option>Priority</option>
                  </select>
                </label>
                <label>
                  Date
                  <input
                    type="date"
                    value={selectedAppointment.date}
                    onChange={(event) => updateSelectedAppointment('date', event.target.value)}
                  />
                </label>
                <label>
                  Time Slot
                  <input
                    type="text"
                    value={selectedAppointment.timeSlot}
                    onChange={(event) => updateSelectedAppointment('timeSlot', event.target.value)}
                  />
                </label>
                <label>
                  Priority Level
                  <select
                    value={selectedAppointment.priorityLevel}
                    onChange={(event) =>
                      updateSelectedAppointment('priorityLevel', event.target.value)
                    }
                  >
                    <option>Normal</option>
                    <option>High</option>
                    <option>VIP</option>
                  </select>
                </label>
                <label>
                  Status
                  <select
                    value={selectedAppointment.status}
                    onChange={(event) => updateSelectedAppointment('status', event.target.value)}
                  >
                    {appointmentStatusOptions.map((status) => (
                      <option key={status}>{status}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Reminder Schedule
                  <input
                    type="text"
                    value={selectedAppointment.reminderSchedule}
                    onChange={(event) =>
                      updateSelectedAppointment('reminderSchedule', event.target.value)
                    }
                  />
                </label>
                <label>
                  Source
                  <select
                    value={selectedAppointment.source}
                    onChange={(event) => updateSelectedAppointment('source', event.target.value)}
                  >
                    <option>Website</option>
                    <option>Call center</option>
                    <option>Branch walk-in</option>
                    <option>Mobile app</option>
                  </select>
                </label>
                <label className="full-width">
                  Notes
                  <textarea
                    rows="3"
                    value={selectedAppointment.notes}
                    onChange={(event) => updateSelectedAppointment('notes', event.target.value)}
                  />
                </label>
              </div>

              <div className="queue-box">
                <div>
                  <span className="queue-title">Queue generation</span>
                  <strong>
                    {selectedAppointment.queueGenerated
                      ? 'Queue ticket is ready for unified service flow.'
                      : 'Appointment → Check-in → Queue Ticket → Unified Queue'}
                  </strong>
                </div>
                <button type="button" className="primary-btn small-btn" onClick={toggleQueueGeneration}>
                  {selectedAppointment.queueGenerated ? 'Remove queue' : 'Generate queue entry'}
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="ticket-panel panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Master form 5</p>
              <h3>Queue / Ticket Master</h3>
            </div>
            <button type="button" className="mini-btn" onClick={addTicket}>
              + Add ticket
            </button>
          </div>

          <div className="queue-flow">
            <div className="flow-node">Ticket</div>
            <span className="flow-arrow">→</span>
            <div className="flow-node">Check-in</div>
            <span className="flow-arrow">→</span>
            <div className="flow-node">Called</div>
            <span className="flow-arrow">→</span>
            <div className="flow-node">Serving</div>
            <span className="flow-arrow">→</span>
            <div className="flow-node">Completed</div>
          </div>

          <div className="appointment-stats">
            {queueSummary.map((stat) => (
              <article key={stat.label} className={`summary-card ${stat.tone}`}>
                <span>{stat.label}</span>
                <strong>{stat.value}</strong>
                <small>{stat.change}</small>
              </article>
            ))}
          </div>

          <div className="signal-grid">
            {queueSignals.map((signal) => (
              <div key={signal.label} className={`signal-card ${signal.tone}`}>
                <span>{signal.label}</span>
                <strong>{signal.value}</strong>
              </div>
            ))}
          </div>

          <div className="appointment-layout">
            <div className="panel appointment-list-panel">
              <div className="catalog-actions">
                <select value={ticketFilter} onChange={(event) => setTicketFilter(event.target.value)}>
                  <option value="All">All statuses</option>
                  {queueStatusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
                <span className="catalog-count">{filteredTickets.length} tickets</span>
              </div>

              <div className="appointment-list">
                {filteredTickets.map((ticket) => (
                  <button
                    key={ticket.id}
                    type="button"
                    className={`appointment-card ${ticket.id === selectedTicket?.id ? 'selected' : ''}`}
                    onClick={() => setSelectedTicketId(ticket.id)}
                  >
                    <div className="appointment-card-head">
                      <strong>{ticket.ticketId}</strong>
                      <span className={`appointment-status ${ticket.status.toLowerCase().replace(/\s+/g, '-')}`}>
                        {ticket.status}
                      </span>
                    </div>
                    <small>
                      {ticket.service} • {ticket.location}
                    </small>
                    <p>
                      {ticket.customerId} • Queue #{ticket.queuePosition}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            <div className="panel appointment-detail-panel">
              <div className="panel-header">
                <h3>Ticket details</h3>
                <span className="tag success">{selectedTicket.status}</span>
              </div>

              <div className="appointment-focus">
                <div className="focus-pill">
                  <span>Ticket ID</span>
                  <strong>{selectedTicket.ticketId}</strong>
                </div>
                <div className="focus-pill">
                  <span>Customer</span>
                  <strong>{selectedTicket.customerId}</strong>
                </div>
                <div className="focus-pill">
                  <span>Service</span>
                  <strong>{selectedTicket.service}</strong>
                </div>
                <div className="focus-pill">
                  <span>Priority</span>
                  <strong>{selectedTicket.priority}</strong>
                </div>
              </div>

              <div className="field-grid">
                <label>
                  Ticket ID
                  <input
                    type="text"
                    value={selectedTicket.ticketId}
                    onChange={(event) => updateSelectedTicket('ticketId', event.target.value)}
                  />
                </label>
                <label>
                  Ticket Number
                  <input
                    type="text"
                    value={selectedTicket.ticketNumber}
                    onChange={(event) => updateSelectedTicket('ticketNumber', event.target.value)}
                  />
                </label>
                <label>
                  Customer ID
                  <input
                    type="text"
                    value={selectedTicket.customerId}
                    onChange={(event) => updateSelectedTicket('customerId', event.target.value)}
                  />
                </label>
                <label>
                  Organization
                  <input
                    type="text"
                    value={selectedTicket.organization}
                    onChange={(event) => updateSelectedTicket('organization', event.target.value)}
                  />
                </label>
                <label>
                  Location
                  <select
                    value={selectedTicket.location}
                    onChange={(event) => updateSelectedTicket('location', event.target.value)}
                  >
                    {branchOptions.map((branch) => (
                      <option key={branch}>{branch}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Service
                  <select
                    value={selectedTicket.service}
                    onChange={(event) => updateSelectedTicket('service', event.target.value)}
                  >
                    {serviceOptions.map((service) => (
                      <option key={service}>{service}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Source
                  <select
                    value={selectedTicket.source}
                    onChange={(event) => updateSelectedTicket('source', event.target.value)}
                  >
                    <option>Walk-in</option>
                    <option>QR</option>
                    <option>Web</option>
                    <option>Appointment</option>
                    <option>Kiosk</option>
                    <option>Staff</option>
                  </select>
                </label>
                <label>
                  Priority
                  <select
                    value={selectedTicket.priority}
                    onChange={(event) => updateSelectedTicket('priority', event.target.value)}
                  >
                    <option>Normal</option>
                    <option>High</option>
                    <option>VIP</option>
                  </select>
                </label>
                <label>
                  Created At
                  <input
                    type="text"
                    value={selectedTicket.createdAt}
                    onChange={(event) => updateSelectedTicket('createdAt', event.target.value)}
                  />
                </label>
                <label>
                  Check-in At
                  <input
                    type="text"
                    value={selectedTicket.checkInAt}
                    onChange={(event) => updateSelectedTicket('checkInAt', event.target.value)}
                  />
                </label>
                <label>
                  Queue Position
                  <input
                    type="number"
                    value={selectedTicket.queuePosition}
                    onChange={(event) =>
                      updateSelectedTicket('queuePosition', Number(event.target.value))
                    }
                  />
                </label>
                <label>
                  Estimated Wait
                  <input
                    type="text"
                    value={selectedTicket.estimatedWait}
                    onChange={(event) => updateSelectedTicket('estimatedWait', event.target.value)}
                  />
                </label>
                <label>
                  Status
                  <select
                    value={selectedTicket.status}
                    onChange={(event) => updateSelectedTicket('status', event.target.value)}
                  >
                    {queueStatusOptions.map((status) => (
                      <option key={status}>{status}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Assigned Counter
                  <select
                    value={selectedTicket.assignedCounter}
                    onChange={(event) => updateSelectedTicket('assignedCounter', event.target.value)}
                  >
                    {counters.map((counter) => (
                      <option key={counter.id}>{counter.name}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Assigned Staff
                  <select
                    value={selectedTicket.assignedStaff}
                    onChange={(event) => updateSelectedTicket('assignedStaff', event.target.value)}
                  >
                    {staff.map((member) => (
                      <option key={member.id}>{member.name}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Called At
                  <input
                    type="text"
                    value={selectedTicket.calledAt}
                    onChange={(event) => updateSelectedTicket('calledAt', event.target.value)}
                  />
                </label>
                <label>
                  Service Started At
                  <input
                    type="text"
                    value={selectedTicket.serviceStartedAt}
                    onChange={(event) => updateSelectedTicket('serviceStartedAt', event.target.value)}
                  />
                </label>
                <label>
                  Service Completed At
                  <input
                    type="text"
                    value={selectedTicket.serviceCompletedAt}
                    onChange={(event) =>
                      updateSelectedTicket('serviceCompletedAt', event.target.value)
                    }
                  />
                </label>
              </div>

              <div className="queue-box">
                <div>
                  <span className="queue-title">Ticket progression</span>
                  <strong>
                    {selectedTicket.status} • Queue position {selectedTicket.queuePosition}
                  </strong>
                </div>
                <div className="queue-actions">
                  <button type="button" className="secondary-btn small-btn" onClick={autoAssignTicket}>
                    Auto assign
                  </button>
                  <button type="button" className="secondary-btn small-btn" onClick={() => updateTicketLifecycle('Notified')}>
                    Notify
                  </button>
                  <button type="button" className="secondary-btn small-btn" onClick={() => updateTicketLifecycle('Called')}>
                    Call
                  </button>
                  <button type="button" className="primary-btn small-btn" onClick={() => updateTicketLifecycle('Serving')}>
                    Serve
                  </button>
                  <button type="button" className="primary-btn small-btn" onClick={advanceTicketStatus}>
                    Advance status
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
