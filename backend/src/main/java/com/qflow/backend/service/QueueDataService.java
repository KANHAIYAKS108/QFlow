package com.qflow.backend.service;

import com.qflow.backend.domain.PriorityLevel;
import com.qflow.backend.domain.Ticket;
import com.qflow.backend.domain.TicketStatus;
import com.qflow.backend.repository.TicketRepository;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;

@Service
public class QueueDataService {

    private static final DateTimeFormatter TIME_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

    private final TicketRepository ticketRepository;

    public QueueDataService(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    public Map<String, Object> overview() {
        Map<String, Object> payload = new LinkedHashMap<>();
        payload.put("staff", staff());
        payload.put("counters", counters());
        payload.put("appointments", appointments());
        payload.put("tickets", tickets());
        payload.put("meta", Map.of("generatedAt", LocalDateTime.now().format(TIME_FORMATTER)));
        return payload;
    }

    public List<Map<String, Object>> staff() {
        return new ArrayList<>(List.of(
            mapOf("id", 1, "name", "Aarav Sharma", "role", "Agent", "assignedLocation", "Noida Sector 18",
                "assignedServices", List.of("Account Opening", "KYC"), "status", "Available"),
            mapOf("id", 2, "name", "Priya Nair", "role", "Supervisor", "assignedLocation", "Greater Noida",
                "assignedServices", List.of("Loan Consultation", "Priority Desk"), "status", "On duty")
        ));
    }

    public List<Map<String, Object>> counters() {
        return new ArrayList<>(List.of(
            mapOf("id", 1, "number", "01", "name", "Counter 01", "location", "Noida Sector 18",
                "supportedServices", List.of("Account Opening", "KYC"), "assignedStaff", "Aarav Sharma", "status", "Open"),
            mapOf("id", 2, "number", "02", "name", "Counter 02", "location", "Greater Noida",
                "supportedServices", List.of("Loan Consultation", "Priority Desk"), "assignedStaff", "Priya Nair", "status", "Busy")
        ));
    }

    public List<Map<String, Object>> appointments() {
        return new ArrayList<>(List.of(
            mapOf("id", 1, "customer", "Neha Kapoor", "location", "Noida Sector 18", "service", "Account Opening",
                "date", "2026-09-28", "timeSlot", "10:30 AM", "status", "Confirmed", "priorityLevel", "High", "queueGenerated", true),
            mapOf("id", 2, "customer", "Rahul Mehta", "location", "Delhi Central", "service", "Loan Consultation",
                "date", "2026-09-28", "timeSlot", "12:00 PM", "status", "Checked-In", "priorityLevel", "Normal", "queueGenerated", true)
        ));
    }

    public List<Map<String, Object>> tickets() {
        return ticketRepository.findAll().stream()
            .sorted(Comparator.comparing(Ticket::getQueuePosition))
            .map(this::toTicketMap)
            .toList();
    }

    public Map<String, Object> updateTicketStatus(Long ticketId, String action) {
        Ticket ticket = ticketRepository.findById(ticketId)
            .orElseThrow(() -> new IllegalArgumentException("Ticket not found: " + ticketId));

        TicketStatus nextStatus = switch (action) {
            case "CALL" -> TicketStatus.CALLED;
            case "START SERVICE" -> TicketStatus.SERVING;
            case "COMPLETE" -> TicketStatus.COMPLETED;
            case "NO SHOW" -> TicketStatus.NO_SHOW;
            case "CANCEL" -> TicketStatus.CANCELLED;
            case "RECALL" -> TicketStatus.CALLED;
            case "SKIP" -> TicketStatus.SKIPPED;
            case "TRANSFER" -> TicketStatus.TRANSFERRED;
            default -> TicketStatus.WAITING;
        };

        ticket.setStatus(nextStatus);
        ticketRepository.save(ticket);

        return Map.of(
            "ticketId", ticketId,
            "action", action,
            "status", nextStatus.name(),
            "updatedAt", LocalDateTime.now().format(TIME_FORMATTER)
        );
    }

    private Map<String, Object> toTicketMap(Ticket ticket) {
        return mapOf(
            "id", ticket.getId(),
            "ticketId", ticket.getTicketCode(),
            "ticketNumber", ticket.getTicketCode(),
            "customerId", ticket.getCustomerName(),
            "location", ticket.getLocationName(),
            "service", ticket.getServiceName(),
            "status", ticket.getStatus().name(),
            "priority", ticket.getPriority().name(),
            "queuePosition", ticket.getQueuePosition(),
            "estimatedWait", ticket.getEstimatedWaitMinutes() + " min",
            "assignedCounter", ticket.getAssignedCounter(),
            "assignedStaff", ticket.getAssignedStaff()
        );
    }

    private static Map<String, Object> mapOf(Object... entries) {
        Map<String, Object> payload = new LinkedHashMap<>();
        for (int i = 0; i < entries.length; i += 2) {
            payload.put(String.valueOf(entries[i]), entries[i + 1]);
        }
        return payload;
    }
}
