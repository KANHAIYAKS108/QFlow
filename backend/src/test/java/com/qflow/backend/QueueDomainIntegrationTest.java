package com.qflow.backend;

import static org.assertj.core.api.Assertions.assertThat;

import com.qflow.backend.domain.Ticket;
import com.qflow.backend.repository.TicketRepository;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class QueueDomainIntegrationTest {

    @Autowired
    private TicketRepository ticketRepository;

    @Test
    void shouldSeedQueueTicketsIntoDatabase() {
        List<Ticket> tickets = ticketRepository.findAll();

        assertThat(tickets)
            .isNotEmpty();
        assertThat(tickets)
            .anyMatch(ticket -> ticket.getTicketCode() != null && ticket.getTicketCode().startsWith("QF-"));
    }
}
