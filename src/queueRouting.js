export function buildRoutingGuidance({ tickets = [], counters = [], staff = [] }) {
  const liveTickets = (tickets ?? []).filter((ticket) =>
    ['Waiting', 'Notified', 'Called', 'Serving', 'Transferred'].includes(ticket.status),
  )

  const serviceMap = new Map()

  for (const ticket of liveTickets) {
    const service = ticket.service || 'General Service'
    serviceMap.set(service, (serviceMap.get(service) ?? 0) + 1)
  }

  const serviceNames = [...new Set([...serviceMap.keys(), ...staff.flatMap((member) => member.assignedServices ?? []), ...counters.flatMap((counter) => counter.supportedServices ?? [])])]

  const recommendations = serviceNames.map((service) => {
    const waiting = serviceMap.get(service) ?? 0
    const staffedAgents = staff.filter((member) => (member.assignedServices ?? []).includes(service)).length
    const supportedCounters = counters.filter((counter) => (counter.supportedServices ?? []).includes(service)).length

    const recommendedAgents = Math.max(1, Math.ceil((waiting + 1) / 5))
    const staffingGap = recommendedAgents - staffedAgents

    let reason = 'Current staffing is aligned with demand.'
    if (waiting > 0 && staffingGap > 0) {
      reason = `Add ${staffingGap} more agent${staffingGap > 1 ? 's' : ''} to ${service} before wait times rise above target.`
    } else if (waiting === 0) {
      reason = `Keep ${Math.max(1, staffedAgents)} active lane${staffedAgents === 1 ? '' : 's'} for ${service} to preserve service continuity.`
    }

    return {
      service,
      waiting,
      staffedAgents,
      supportedCounters,
      recommendedAgents,
      reason,
    }
  })

  return recommendations.sort((first, second) => second.waiting - first.waiting || first.service.localeCompare(second.service))
}
