package com.qflow.backend.service;

import com.qflow.backend.domain.PriorityLevel;
import com.qflow.backend.domain.Ticket;
import com.qflow.backend.domain.TicketStatus;
import com.qflow.backend.repository.TicketRepository;
import java.util.List;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class QueueDataSeeder implements ApplicationRunner {

    private final TicketRepository ticketRepository;

    public QueueDataSeeder(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    @Override
    public void run(ApplicationArguments args) {
        if (ticketRepository.count() > 0) {
            return;
        }

        Ticket first = new Ticket(
            "QF-1001",
            "Neha Kapoor",
            "Noida Sector 18",
            "Account Opening",
            TicketStatus.WAITING,
            PriorityLevel.HIGH,
            3,
            12,
            "Counter 01",
            "Aarav Sharma"
        );

        Ticket second = new Ticket(
            "QF-1002",
            "Rahul Mehta",
            "Delhi Central",
            "Loan Consultation",
            TicketStatus.CALLED,
            PriorityLevel.NORMAL,
            1,
            5,
            "Counter 02",
            "Priya Nair"
        );

        ticketRepository.saveAll(List.of(first, second));
    }
}
