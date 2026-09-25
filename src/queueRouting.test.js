import test from 'node:test'
import assert from 'node:assert/strict'
import { buildRoutingGuidance } from './queueRouting.js'

test('buildRoutingGuidance prioritizes services with the highest queue pressure', () => {
  const recommendations = buildRoutingGuidance({
    tickets: [
      { service: 'KYC', status: 'Waiting' },
      { service: 'KYC', status: 'Waiting' },
      { service: 'KYC', status: 'Waiting' },
      { service: 'KYC', status: 'Waiting' },
      { service: 'KYC', status: 'Waiting' },
      { service: 'KYC', status: 'Waiting' },
      { service: 'KYC', status: 'Waiting' },
      { service: 'Loan Consultation', status: 'Waiting' },
      { service: 'Loan Consultation', status: 'Waiting' },
      { service: 'Account Opening', status: 'Waiting' },
    ],
    counters: [
      { location: 'Noida Sector 18', supportedServices: ['KYC'], assignedStaff: 'Aarav Sharma' },
      { location: 'Noida Sector 18', supportedServices: ['Loan Consultation'], assignedStaff: 'Priya Nair' },
    ],
    staff: [
      { name: 'Aarav Sharma', assignedServices: ['KYC'] },
      { name: 'Priya Nair', assignedServices: ['Loan Consultation'] },
    ],
  })

  assert.equal(recommendations[0].service, 'KYC')
  assert.equal(recommendations[0].recommendedAgents, 2)
  assert.match(recommendations[0].reason, /Add 1 more agent/i)
})

test('buildRoutingGuidance returns a safe fallback when there is no live demand', () => {
  const recommendations = buildRoutingGuidance({
    tickets: [{ service: 'KYC', status: 'Completed' }],
    counters: [{ supportedServices: ['KYC'] }],
    staff: [{ assignedServices: ['KYC'] }],
  })

  assert.equal(recommendations.length, 1)
  assert.equal(recommendations[0].service, 'KYC')
  assert.equal(recommendations[0].recommendedAgents, 1)
})
