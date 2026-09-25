package com.qflow.backend.controller;

import com.qflow.backend.service.QueueDataService;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
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

    private final QueueDataService queueDataService;

    public QueueController(QueueDataService queueDataService) {
        this.queueDataService = queueDataService;
    }

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
        return queueDataService.overview();
    }

    @GetMapping("/staff")
    @PreAuthorize("hasAnyRole('ADMIN','OPERATOR')")
    public List<Map<String, Object>> staff() {
        return queueDataService.staff();
    }

    @GetMapping("/counters")
    @PreAuthorize("hasAnyRole('ADMIN','OPERATOR')")
    public List<Map<String, Object>> counters() {
        return queueDataService.counters();
    }

    @GetMapping("/appointments")
    @PreAuthorize("hasAnyRole('ADMIN','OPERATOR')")
    public List<Map<String, Object>> appointments() {
        return queueDataService.appointments();
    }

    @GetMapping("/tickets")
    @PreAuthorize("hasAnyRole('ADMIN','OPERATOR')")
    public List<Map<String, Object>> tickets() {
        return queueDataService.tickets();
    }

    @PostMapping("/queue/actions/{ticketId}")
    @PreAuthorize("hasAnyRole('ADMIN','OPERATOR')")
    public ResponseEntity<Map<String, Object>> queueAction(@PathVariable Long ticketId, @RequestBody Map<String, String> payload) {
        String action = payload.getOrDefault("action", "CALL");

        try {
            Map<String, Object> response = queueDataService.updateTicketStatus(ticketId, action);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.notFound().build();
        }
    }
}
