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

const overviewStats = [
  { label: 'On-duty staff', value: '18', change: '+2 this week', tone: 'blue' },
  { label: 'Active counters', value: '11', change: '4 under watch', tone: 'green' },
  { label: 'Queue balance', value: '1.2:1', change: 'Stable load', tone: 'amber' },
  { label: 'Coverage rate', value: '96%', change: 'High routing fit', tone: 'purple' },
]

function App() {
  const [staff, setStaff] = useState(initialStaff)
  const [counters, setCounters] = useState(initialCounters)
  const [selectedStaffId, setSelectedStaffId] = useState(initialStaff[0].id)
  const [staffFilter, setStaffFilter] = useState('All')

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
      </main>
    </div>
  )
}

export default App
