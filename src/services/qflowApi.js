const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api'

async function fetchJson(url, options = {}) {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  })

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  return response.json()
}

export async function fetchDashboardData() {
  try {
    const [staff, counters, appointments, tickets, health] = await Promise.all([
      fetchJson(`${API_BASE_URL}/staff`),
      fetchJson(`${API_BASE_URL}/counters`),
      fetchJson(`${API_BASE_URL}/appointments`),
      fetchJson(`${API_BASE_URL}/tickets`),
      fetchJson(`${API_BASE_URL}/health`),
    ])

    return {
      staff,
      counters,
      appointments,
      tickets,
      health,
    }
  } catch (error) {
    console.warn('Backend not reachable, using local dashboard data.', error)
    return null
  }
}

export async function loginToQFlow(email, password) {
  const response = await fetchJson(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })

  return response
}

export { API_BASE_URL }
