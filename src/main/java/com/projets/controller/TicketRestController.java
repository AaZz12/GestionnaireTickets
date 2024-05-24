package com.projets.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.projets.model.Ticket;
import com.projets.repository.TicketRepository;
import com.projets.service.TicketService;

@RestController
public class TicketRestController {
	@Autowired TicketRepository ticketRepository;
	@Autowired TicketService ticketService;
	
	@GetMapping("/ticket")
	public List<Ticket> getTickets() {
		return ticketRepository.findAllTickets();
	}
	
	@PostMapping("/ticket")
	public List<Ticket> addTicket(@RequestBody Ticket t) {
		ticketRepository.save(t);
		return ticketRepository.findAll();
	}
	
	@DeleteMapping("/ticket/{id}")
	public ResponseEntity<Void> deleteTicket(@PathVariable("id") int id ) {
	  ticketService.deleteTicket(id);
	  return ResponseEntity.noContent().build();
	}
}
