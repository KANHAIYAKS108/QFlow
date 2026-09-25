package com.qflow.backend.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDateTime;

@Entity
@Table(name = "tickets")
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String ticketCode;

    @Column(nullable = false)
    private String customerName;

    @Column(nullable = false)
    private String locationName;

    @Column(nullable = false)
    private String serviceName;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TicketStatus status = TicketStatus.WAITING;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PriorityLevel priority = PriorityLevel.NORMAL;

    @Column(nullable = false)
    private Integer queuePosition = 1;

    @Column(nullable = false)
    private Integer estimatedWaitMinutes = 5;

    private String assignedCounter;
    private String assignedStaff;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(nullable = false)
    private LocalDateTime updatedAt = LocalDateTime.now();

    protected Ticket() {
    }

    public Ticket(String ticketCode, String customerName, String locationName, String serviceName,
                  TicketStatus status, PriorityLevel priority, Integer queuePosition,
                  Integer estimatedWaitMinutes, String assignedCounter, String assignedStaff) {
        this.ticketCode = ticketCode;
        this.customerName = customerName;
        this.locationName = locationName;
        this.serviceName = serviceName;
        this.status = status;
        this.priority = priority;
        this.queuePosition = queuePosition;
        this.estimatedWaitMinutes = estimatedWaitMinutes;
        this.assignedCounter = assignedCounter;
        this.assignedStaff = assignedStaff;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public String getTicketCode() {
        return ticketCode;
    }

    public String getCustomerName() {
        return customerName;
    }

    public String getLocationName() {
        return locationName;
    }

    public String getServiceName() {
        return serviceName;
    }

    public TicketStatus getStatus() {
        return status;
    }

    public PriorityLevel getPriority() {
        return priority;
    }

    public Integer getQueuePosition() {
        return queuePosition;
    }

    public Integer getEstimatedWaitMinutes() {
        return estimatedWaitMinutes;
    }

    public String getAssignedCounter() {
        return assignedCounter;
    }

    public String getAssignedStaff() {
        return assignedStaff;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setStatus(TicketStatus status) {
        this.status = status;
        this.updatedAt = LocalDateTime.now();
    }

    public void setQueuePosition(Integer queuePosition) {
        this.queuePosition = queuePosition;
        this.updatedAt = LocalDateTime.now();
    }

    public void setAssignedCounter(String assignedCounter) {
        this.assignedCounter = assignedCounter;
        this.updatedAt = LocalDateTime.now();
    }

    public void setAssignedStaff(String assignedStaff) {
        this.assignedStaff = assignedStaff;
        this.updatedAt = LocalDateTime.now();
    }
}

