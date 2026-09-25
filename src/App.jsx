import { useMemo, useState } from 'react'
import './App.css'

const branchOptions = ['Downtown Branch', 'Business Bay Branch', 'Sharjah Central']

const initialServices = [
  {
    id: 1,
    name: 'Account Opening',
    code: 'S001',
    category: 'Banking',
    description: 'New customer onboarding and account creation for personal and business clients.',
    estimatedDuration: 18,
    bufferTime: 5,
    priority: 'High',
    queueEnabled: true,
    appointmentEnabled: true,
    remoteJoin: true,
    maxQueueSize: 30,
    appointmentDuration: 20,
    requiredDocuments: 'Passport, Emirates ID, residency proof',
    status: 'Active',
    branches: ['Downtown Branch', 'Business Bay Branch'],
  },
  {
    id: 2,
    name: 'Cash Deposit',
    code: 'S002',
    category: 'Transactions',
    description: 'Processing large cash deposits and counter transaction support.',
    estimatedDuration: 12,
    bufferTime: 3,
    priority: 'Medium',
    queueEnabled: true,
    appointmentEnabled: false,
    remoteJoin: true,
    maxQueueSize: 25,
    appointmentDuration: 10,
    requiredDocuments: 'Account number or checkbook',
    status: 'Active',
    branches: ['Downtown Branch', 'Sharjah Central'],
  },
  {
    id: 3,
    name: 'Loan Consultation',
    code: 'S003',
    category: 'Finance',
    description: 'Consultation and eligibility review for personal and SME funding.',
    estimatedDuration: 25,
    bufferTime: 7,
    priority: 'High',
    queueEnabled: true,
    appointmentEnabled: true,
    remoteJoin: true,
    maxQueueSize: 18,
    appointmentDuration: 30,
    requiredDocuments: 'Income proof, ID, application details',
    status: 'Active',
    branches: ['Business Bay Branch'],
  },
]

const overviewStats = [
  { label: 'Active services', value: '24', change: '+3 this month', tone: 'blue' },
  { label: 'Avg handling time', value: '16 min', change: '-2 min better', tone: 'green' },
  { label: 'Queue-enabled', value: '19', change: '79% coverage', tone: 'amber' },
  { label: 'Appointments', value: '86%', change: 'Strong adoption', tone: 'purple' },
]

function App() {
  const [services, setServices] = useState(initialServices)
  const [selectedServiceId, setSelectedServiceId] = useState(initialServices[0].id)

  const selectedService = useMemo(
    () => services.find((service) => service.id === selectedServiceId) ?? services[0],
    [services, selectedServiceId],
  )

  const updateSelectedService = (field, value) => {
    setServices((previous) =>
      previous.map((service) =>
        service.id === selectedServiceId ? { ...service, [field]: value } : service,
      ),
    )
  }

  const toggleBranch = (branchName) => {
    setServices((previous) =>
      previous.map((service) => {
        if (service.id !== selectedServiceId) return service

        const alreadyAdded = service.branches.includes(branchName)

        return {
          ...service,
          branches: alreadyAdded
            ? service.branches.filter((branch) => branch !== branchName)
            : [...service.branches, branchName],
        }
      }),
    )
  }

  const addService = () => {
    const newService = {
      id: Date.now(),
      name: 'New Service',
      code: `S${String(services.length + 100).padStart(3, '0')}`,
      category: 'General',
      description: 'Define a new queueable service for branch operations.',
      estimatedDuration: 15,
      bufferTime: 4,
      priority: 'Medium',
      queueEnabled: true,
      appointmentEnabled: true,
      remoteJoin: false,
      maxQueueSize: 20,
      appointmentDuration: 15,
      requiredDocuments: 'Customer ID or relevant document',
      status: 'Draft',
      branches: ['Downtown Branch'],
    }

    setServices((previous) => [newService, ...previous])
    setSelectedServiceId(newService.id)
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
          <button type="button" className="nav-item active">
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
            <span>2 services need review</span>
          </div>
        </div>
      </aside>

      <main className="content">
        <header className="top-bar">
          <div>
            <p className="eyebrow">Master form 2</p>
            <h1>Service Master</h1>
          </div>
          <div className="header-actions">
            <button type="button" className="secondary-btn">
              Preview service flow
            </button>
            <button type="button" className="primary-btn">
              Save service setup
            </button>
          </div>
        </header>

        <section className="hero-banner">
          <div>
            <p className="eyebrow">Service definition</p>
            <h2>What the organization actually provides</h2>
            <p className="hero-copy">
              This master form defines queue-enabled services, appointment rules, service
              duration, and branch-level availability across the entire QFlow platform.
            </p>
          </div>
          <div className="hero-badges">
            <span>Queue enabled</span>
            <span>Appointment ready</span>
            <span>Remote join</span>
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

        <section className="service-layout">
          <div className="panel service-panel">
            <div className="panel-header">
              <h3>Service catalog</h3>
              <button type="button" className="mini-btn" onClick={addService}>
                + Add service
              </button>
            </div>

            <div className="service-list">
              {services.map((service) => (
                <button
                  key={service.id}
                  type="button"
                  className={`service-card ${service.id === selectedService?.id ? 'selected' : ''}`}
                  onClick={() => setSelectedServiceId(service.id)}
                >
                  <div className="service-card-head">
                    <strong>{service.name}</strong>
                    <span className={`status-badge ${service.status.toLowerCase()}`}>
                      {service.status}
                    </span>
                  </div>
                  <small>
                    {service.code} • {service.category}
                  </small>
                  <p>{service.branches.join(', ')}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="panel form-panel">
            <div className="panel-header">
              <h3>Service details</h3>
              <span className="tag success">{selectedService.status}</span>
            </div>

            <div className="field-grid">
              <label>
                Service Name
                <input
                  type="text"
                  value={selectedService.name}
                  onChange={(event) => updateSelectedService('name', event.target.value)}
                />
              </label>
              <label>
                Service Code
                <input
                  type="text"
                  value={selectedService.code}
                  onChange={(event) => updateSelectedService('code', event.target.value)}
                />
              </label>
              <label>
                Category
                <select
                  value={selectedService.category}
                  onChange={(event) => updateSelectedService('category', event.target.value)}
                >
                  <option>Banking</option>
                  <option>Finance</option>
                  <option>Transactions</option>
                  <option>Support</option>
                  <option>General</option>
                </select>
              </label>
              <label>
                Status
                <select
                  value={selectedService.status}
                  onChange={(event) => updateSelectedService('status', event.target.value)}
                >
                  <option>Active</option>
                  <option>Draft</option>
                  <option>Paused</option>
                  <option>Archived</option>
                </select>
              </label>
              <label className="full-width">
                Description
                <textarea
                  rows="3"
                  value={selectedService.description}
                  onChange={(event) => updateSelectedService('description', event.target.value)}
                />
              </label>
              <label>
                Estimated Service Duration (min)
                <input
                  type="number"
                  value={selectedService.estimatedDuration}
                  onChange={(event) =>
                    updateSelectedService('estimatedDuration', Number(event.target.value))
                  }
                />
              </label>
              <label>
                Buffer Time (min)
                <input
                  type="number"
                  value={selectedService.bufferTime}
                  onChange={(event) =>
                    updateSelectedService('bufferTime', Number(event.target.value))
                  }
                />
              </label>
              <label>
                Priority Level
                <select
                  value={selectedService.priority}
                  onChange={(event) => updateSelectedService('priority', event.target.value)}
                >
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </label>
              <label>
                Maximum Queue Size
                <input
                  type="number"
                  value={selectedService.maxQueueSize}
                  onChange={(event) =>
                    updateSelectedService('maxQueueSize', Number(event.target.value))
                  }
                />
              </label>
              <label>
                Appointment Duration (min)
                <input
                  type="number"
                  value={selectedService.appointmentDuration}
                  onChange={(event) =>
                    updateSelectedService('appointmentDuration', Number(event.target.value))
                  }
                />
              </label>
              <label className="full-width">
                Required Documents
                <input
                  type="text"
                  value={selectedService.requiredDocuments}
                  onChange={(event) =>
                    updateSelectedService('requiredDocuments', event.target.value)
                  }
                />
              </label>
            </div>

            <div className="toggle-grid">
              <label className="toggle-row">
                <input
                  type="checkbox"
                  checked={selectedService.queueEnabled}
                  onChange={(event) =>
                    updateSelectedService('queueEnabled', event.target.checked)
                  }
                />
                <span>Queue Enabled</span>
              </label>
              <label className="toggle-row">
                <input
                  type="checkbox"
                  checked={selectedService.appointmentEnabled}
                  onChange={(event) =>
                    updateSelectedService('appointmentEnabled', event.target.checked)
                  }
                />
                <span>Appointment Enabled</span>
              </label>
              <label className="toggle-row">
                <input
                  type="checkbox"
                  checked={selectedService.remoteJoin}
                  onChange={(event) => updateSelectedService('remoteJoin', event.target.checked)}
                />
                <span>Remote Join</span>
              </label>
            </div>

            <div className="availability-panel">
              <h4>Available branches</h4>
              <div className="branch-chips">
                {branchOptions.map((branch) => (
                  <button
                    key={branch}
                    type="button"
                    className={`chip ${selectedService.branches.includes(branch) ? 'active' : ''}`}
                    onClick={() => toggleBranch(branch)}
                  >
                    {branch}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="policy-grid">
          <div className="panel mini-panel">
            <div className="panel-header">
              <h3>Queue readiness</h3>
              <span className="tag success">Operational</span>
            </div>
            <div className="readiness-box">
              <strong>{selectedService.queueEnabled ? 'Ready to queue' : 'Paused for queue'}</strong>
              <span>{selectedService.maxQueueSize} max customer slots</span>
            </div>
            <ul className="policy-list">
              <li>Average task duration: {selectedService.estimatedDuration} minutes</li>
              <li>Buffer time: {selectedService.bufferTime} minutes</li>
              <li>Priority: {selectedService.priority}</li>
            </ul>
          </div>

          <div className="panel mini-panel">
            <div className="panel-header">
              <h3>Service policies</h3>
              <span className="tag warning">Business rules</span>
            </div>
            <div className="policy-stack">
              <div className="policy-row">
                <span>Queue enabled</span>
                <strong>{selectedService.queueEnabled ? 'On' : 'Off'}</strong>
              </div>
              <div className="policy-row">
                <span>Appointment enabled</span>
                <strong>{selectedService.appointmentEnabled ? 'On' : 'Off'}</strong>
              </div>
              <div className="policy-row">
                <span>Remote join</span>
                <strong>{selectedService.remoteJoin ? 'Allowed' : 'Not allowed'}</strong>
              </div>
              <div className="policy-row">
                <span>Required docs</span>
                <strong>{selectedService.requiredDocuments}</strong>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
