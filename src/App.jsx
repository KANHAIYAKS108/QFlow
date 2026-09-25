import { useMemo, useState } from 'react'
import './App.css'

const initialOrganization = {
  organizationName: 'QFlow Group',
  businessType: 'Financial Services',
  phone: '+971 4 555 2080',
  email: 'support@qflow.group',
  website: 'www.qflow.group',
  timezone: 'Asia/Dubai',
  currency: 'AED',
}

const initialBranches = [
  {
    id: 1,
    name: 'Downtown Branch',
    code: 'DXB-01',
    city: 'Dubai',
    country: 'UAE',
    status: 'Open',
    counters: 5,
    queueHealth: 'Stable',
    address: 'Al Wasl Road, Dubai International Financial Centre',
    coordinates: '25.1972, 55.2744',
  },
  {
    id: 2,
    name: 'Business Bay Branch',
    code: 'DXB-02',
    city: 'Dubai',
    country: 'UAE',
    status: 'Busy',
    counters: 6,
    queueHealth: 'Watch',
    address: 'Marina Walk, Business Bay',
    coordinates: '25.1850, 55.2747',
  },
  {
    id: 3,
    name: 'Sharjah Central',
    code: 'SHJ-03',
    city: 'Sharjah',
    country: 'UAE',
    status: 'Open',
    counters: 4,
    queueHealth: 'Stable',
    address: 'Al Majaz Square, Sharjah',
    coordinates: '25.3180, 55.3977',
  },
]

const initialOperatingHours = [
  { day: 'Monday', hours: '09:00 → 18:00' },
  { day: 'Tuesday', hours: '09:00 → 18:00' },
  { day: 'Wednesday', hours: '09:00 → 18:00' },
  { day: 'Thursday', hours: '09:00 → 18:00' },
  { day: 'Friday', hours: '09:00 → 18:00' },
  { day: 'Saturday', hours: '09:00 → 14:00' },
  { day: 'Sunday', hours: 'Closed' },
]

const overviewStats = [
  { label: 'Active branches', value: '14', change: '+2 this week', tone: 'blue' },
  { label: 'Average wait', value: '11–16 min', change: 'Down 4 mins', tone: 'green' },
  { label: 'Queue load', value: '76%', change: 'Peak 12:30 PM', tone: 'amber' },
  { label: 'Satisfaction', value: '94.6%', change: '+1.8% this month', tone: 'purple' },
]

const liveQueue = [
  { token: 'A-214', service: 'Account opening', status: 'In service', eta: '03 min' },
  { token: 'W-117', service: 'Card replacement', status: 'Waiting', eta: '18 min' },
  { token: 'A-208', service: 'Loan review', status: 'Ready', eta: '01 min' },
  { token: 'W-119', service: 'KYC verification', status: 'Waiting', eta: '09 min' },
  { token: 'A-199', service: 'Priority desk', status: 'Skipped', eta: 'N/A' },
]

function App() {
  const [organization, setOrganization] = useState(initialOrganization)
  const [branches, setBranches] = useState(initialBranches)
  const [selectedBranchId, setSelectedBranchId] = useState(initialBranches[0].id)
  const [operatingHours, setOperatingHours] = useState(initialOperatingHours)

  const selectedBranch = useMemo(
    () => branches.find((branch) => branch.id === selectedBranchId) ?? branches[0],
    [branches, selectedBranchId],
  )

  const handleOrganizationChange = (event) => {
    const { name, value } = event.target
    setOrganization((previous) => ({ ...previous, [name]: value }))
  }

  const handleBranchChange = (field, value) => {
    setBranches((previous) =>
      previous.map((branch) =>
        branch.id === selectedBranchId ? { ...branch, [field]: value } : branch,
      ),
    )
  }

  const addBranch = () => {
    const newBranch = {
      id: Date.now(),
      name: 'New Branch',
      code: `BR-${branches.length + 1}`,
      city: 'New City',
      country: 'UAE',
      status: 'Open',
      counters: 4,
      queueHealth: 'Stable',
      address: 'New branch address',
      coordinates: '24.4539, 54.3773',
    }

    setBranches((previous) => [...previous, newBranch])
    setSelectedBranchId(newBranch.id)
  }

  const handleOperatingHoursChange = (index, value) => {
    setOperatingHours((previous) =>
      previous.map((day, dayIndex) =>
        dayIndex === index ? { ...day, hours: value } : day,
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
          <button type="button" className="nav-item active">
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
          <button type="button" className="nav-item">
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
            <span>Queue engine online</span>
          </div>
          <div className="status-row">
            <span className="dot amber" />
            <span>2 branches under watch</span>
          </div>
        </div>
      </aside>

      <main className="content">
        <header className="top-bar">
          <div>
            <p className="eyebrow">Operations control</p>
            <h1>QFlow command center</h1>
          </div>
          <div className="header-actions">
            <button type="button" className="secondary-btn">
              Preview flow
            </button>
            <button type="button" className="primary-btn">
              Publish changes
            </button>
          </div>
        </header>

        <section className="hero-banner">
          <div>
            <p className="eyebrow">Master form 1</p>
            <h2>Organization &amp; Location Master</h2>
            <p className="hero-copy">
              This foundation defines the organization, every branch, and the operating
              schedule behind the customer-flow engine.
            </p>
          </div>
          <div className="hero-badges">
            <span>Real-time queue tracking</span>
            <span>Appointment + walk-in unified</span>
            <span>Branch analytics</span>
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

        <section className="form-grid">
          <div className="panel">
            <div className="panel-header">
              <h3>Organization profile</h3>
              <span className="tag neutral">Core setup</span>
            </div>

            <div className="field-grid">
              <label>
                Organization Name
                <input
                  type="text"
                  name="organizationName"
                  value={organization.organizationName}
                  onChange={handleOrganizationChange}
                />
              </label>
              <label>
                Business Type
                <input
                  type="text"
                  name="businessType"
                  value={organization.businessType}
                  onChange={handleOrganizationChange}
                />
              </label>
              <label>
                Phone
                <input
                  type="text"
                  name="phone"
                  value={organization.phone}
                  onChange={handleOrganizationChange}
                />
              </label>
              <label>
                Email
                <input
                  type="email"
                  name="email"
                  value={organization.email}
                  onChange={handleOrganizationChange}
                />
              </label>
              <label>
                Website
                <input
                  type="text"
                  name="website"
                  value={organization.website}
                  onChange={handleOrganizationChange}
                />
              </label>
              <label>
                Timezone
                <input
                  type="text"
                  name="timezone"
                  value={organization.timezone}
                  onChange={handleOrganizationChange}
                />
              </label>
              <label>
                Currency
                <input
                  type="text"
                  name="currency"
                  value={organization.currency}
                  onChange={handleOrganizationChange}
                />
              </label>
              <label>
                Logo URL
                <input type="text" value="qflow.group/logo.png" readOnly />
              </label>
            </div>
          </div>

          <div className="panel">
            <div className="panel-header">
              <h3>Branch configuration</h3>
              <button type="button" className="mini-btn" onClick={addBranch}>
                + Add branch
              </button>
            </div>

            <div className="branch-cards">
              {branches.map((branch) => (
                <button
                  key={branch.id}
                  type="button"
                  className={`branch-select ${branch.id === selectedBranch?.id ? 'selected' : ''}`}
                  onClick={() => setSelectedBranchId(branch.id)}
                >
                  <span>{branch.name}</span>
                  <small>
                    {branch.code} • {branch.status}
                  </small>
                </button>
              ))}
            </div>

            <div className="field-grid compact-grid">
              <label>
                Branch Name
                <input
                  type="text"
                  value={selectedBranch.name}
                  onChange={(event) => handleBranchChange('name', event.target.value)}
                />
              </label>
              <label>
                Branch Code
                <input
                  type="text"
                  value={selectedBranch.code}
                  onChange={(event) => handleBranchChange('code', event.target.value)}
                />
              </label>
              <label>
                Address
                <input
                  type="text"
                  value={selectedBranch.address}
                  onChange={(event) => handleBranchChange('address', event.target.value)}
                />
              </label>
              <label>
                City
                <input
                  type="text"
                  value={selectedBranch.city}
                  onChange={(event) => handleBranchChange('city', event.target.value)}
                />
              </label>
              <label>
                Country
                <input
                  type="text"
                  value={selectedBranch.country}
                  onChange={(event) => handleBranchChange('country', event.target.value)}
                />
              </label>
              <label>
                Coordinates
                <input
                  type="text"
                  value={selectedBranch.coordinates}
                  onChange={(event) => handleBranchChange('coordinates', event.target.value)}
                />
              </label>
              <label>
                Queue Health
                <select
                  value={selectedBranch.queueHealth}
                  onChange={(event) => handleBranchChange('queueHealth', event.target.value)}
                >
                  <option>Stable</option>
                  <option>Watch</option>
                  <option>Busy</option>
                </select>
              </label>
              <label>
                Status
                <select
                  value={selectedBranch.status}
                  onChange={(event) => handleBranchChange('status', event.target.value)}
                >
                  <option>Open</option>
                  <option>Busy</option>
                  <option>Closed</option>
                </select>
              </label>
            </div>
          </div>
        </section>

        <section className="bottom-grid">
          <div className="panel">
            <div className="panel-header">
              <h3>Operating hours</h3>
              <span className="tag success">Daily schedule</span>
            </div>

            <table className="hours-table">
              <thead>
                <tr>
                  <th>Day</th>
                  <th>Hours</th>
                </tr>
              </thead>
              <tbody>
                {operatingHours.map((slot, index) => (
                  <tr key={slot.day}>
                    <td>{slot.day}</td>
                    <td>
                      <input
                        type="text"
                        value={slot.hours}
                        onChange={(event) => handleOperatingHoursChange(index, event.target.value)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="panel">
            <div className="panel-header">
              <h3>Live queue snapshot</h3>
              <span className="tag warning">Updated 4m ago</span>
            </div>

            <div className="queue-list">
              {liveQueue.map((entry) => (
                <div key={entry.token} className="queue-row">
                  <div>
                    <strong>{entry.token}</strong>
                    <span>{entry.service}</span>
                  </div>
                  <div className="queue-meta">
                    <span className={`batch ${entry.status.toLowerCase().replace(/\s+/g, '-')}`}>
                      {entry.status}
                    </span>
                    <small>{entry.eta}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
