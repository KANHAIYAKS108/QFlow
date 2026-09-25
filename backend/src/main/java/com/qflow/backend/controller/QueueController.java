package com.qflow.backend.controller;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class QueueController {

    private static final DateTimeFormatter TIME_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

    private static Map<String, Object> mapOf(Object... entries) {
        Map<String, Object> payload = new java.util.LinkedHashMap<>();
        for (int i = 0; i < entries.length; i += 2) {
            payload.put(String.valueOf(entries[i]), entries[i + 1]);
        }
        return payload;
    }

    private static final List<Map<String, Object>> STAFF = new ArrayList<>(List.of(
        mapOf(
            "id", 1,
            "name", "Aarav Sharma",
            "role", "Agent",
            "assignedLocation", "Noida Sector 18",
            "assignedServices", List.of("Account Opening", "KYC"),
            "status", "Available"
        ),
        mapOf(
            "id", 2,
            "name", "Priya Nair",
            "role", "Supervisor",
            "assignedLocation", "Greater Noida",
            "assignedServices", List.of("Loan Consultation", "Priority Desk"),
            "status", "On duty"
        )
    ));

    private static final List<Map<String, Object>> COUNTERS = new ArrayList<>(List.of(
        mapOf(
            "id", 1,
            "number", "01",
            "name", "Counter 01",
            "location", "Noida Sector 18",
            "supportedServices", List.of("Account Opening", "KYC"),
            "assignedStaff", "Aarav Sharma",
            "status", "Open"
        ),
        mapOf(
            "id", 2,
            "number", "02",
            "name", "Counter 02",
            "location", "Greater Noida",
            "supportedServices", List.of("Loan Consultation", "Priority Desk"),
            "assignedStaff", "Priya Nair",
            "status", "Busy"
        )
    ));

    private static final List<Map<String, Object>> APPOINTMENTS = new ArrayList<>(List.of(
        mapOf(
            "id", 1,
            "customer", "Neha Kapoor",
            "location", "Noida Sector 18",
            "service", "Account Opening",
            "date", "2026-09-28",
            "timeSlot", "10:30 AM",
            "status", "Confirmed",
            "priorityLevel", "High",
            "queueGenerated", true
        ),
        mapOf(
            "id", 2,
            "customer", "Rahul Mehta",
            "location", "Delhi Central",
            "service", "Loan Consultation",
            "date", "2026-09-28",
            "timeSlot", "12:00 PM",
            "status", "Checked-In",
            "priorityLevel", "Normal",
            "queueGenerated", true
        )
    ));

    private static final List<Map<String, Object>> TICKETS = new ArrayList<>(List.of(
        mapOf(
            "id", 1,
            "ticketId", "QF-1001",
            "ticketNumber", "T-201",
            "customerId", "CUST-2451",
            "location", "Noida Sector 18",
            "service", "Account Opening",
            "status", "Waiting",
            "priority", "High",
            "queuePosition", 3,
            "estimatedWait", "12 min",
            "assignedCounter", "Counter 01",
            "assignedStaff", "Aarav Sharma"
        ),
        mapOf(
            "id", 2,
            "ticketId", "QF-1002",
            "ticketNumber", "T-202",
            "customerId", "CUST-1187",
            "location", "Delhi Central",
            "service", "Loan Consultation",
            "status", "Called",
            "priority", "Normal",
            "queuePosition", 1,
            "estimatedWait", "5 min",
            "assignedCounter", "Counter 02",
            "assignedStaff", "Priya Nair"
        )
    ));

    @GetMapping("/health")
    public Map<String, Object> health() {
        return Map.of(
            "status", "UP",
            "service", "QFlow backend",
            "timestamp", LocalDateTime.now().format(TIME_FORMATTER),
            "queueMode", "live"
        );
    }

    @GetMapping("/overview")
    @PreAuthorize("hasAnyRole('ADMIN','OPERATOR')")
    public Map<String, Object> overview() {
        Map<String, Object> payload = new java.util.LinkedHashMap<>();
        payload.put("staff", STAFF);
        payload.put("counters", COUNTERS);
        payload.put("appointments", APPOINTMENTS);
        payload.put("tickets", TICKETS);
        payload.put("meta", java.util.Map.of("generatedAt", LocalDateTime.now().format(TIME_FORMATTER)));
        return payload;
    }

    @GetMapping("/staff")
    @PreAuthorize("hasAnyRole('ADMIN','OPERATOR')")
    public List<Map<String, Object>> staff() {
        return STAFF;
    }

    @GetMapping("/counters")
    @PreAuthorize("hasAnyRole('ADMIN','OPERATOR')")
    public List<Map<String, Object>> counters() {
        return COUNTERS;
    }

    @GetMapping("/appointments")
    @PreAuthorize("hasAnyRole('ADMIN','OPERATOR')")
    public List<Map<String, Object>> appointments() {
        return APPOINTMENTS;
    }

    @GetMapping("/tickets")
    @PreAuthorize("hasAnyRole('ADMIN','OPERATOR')")
    public List<Map<String, Object>> tickets() {
        return TICKETS;
    }

    @PostMapping("/queue/actions/{ticketId}")
    @PreAuthorize("hasAnyRole('ADMIN','OPERATOR')")
    public ResponseEntity<Map<String, Object>> queueAction(@PathVariable Long ticketId, @RequestBody Map<String, String> payload) {
        String action = payload.getOrDefault("action", "CALL");
        for (Map<String, Object> ticket : TICKETS) {
            if (Long.valueOf(ticket.get("id").toString()).equals(ticketId)) {
                ticket.put("status", switch (action) {
                    case "CALL" -> "Called";
                    case "START SERVICE" -> "Serving";
                    case "COMPLETE" -> "Completed";
                    case "NO SHOW" -> "No-Show";
                    case "CANCEL" -> "Cancelled";
                    case "RECALL" -> "Notified";
                    case "SKIP" -> "Skipped";
                    case "TRANSFER" -> "Transferred";
                    default -> "Waiting";
                });
                return ResponseEntity.ok(Map.of(
                    "ticketId", ticketId,
                    "action", action,
                    "status", ticket.get("status"),
                    "updatedAt", LocalDateTime.now().format(TIME_FORMATTER)
                ));
            }
        }

        return ResponseEntity.notFound().build();
    }
}
