package com.projets.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

import com.projets.repository.PersonneProjection;
import com.projets.repository.PersonneRepository;

public class PersonneRestController {
	@Autowired PersonneRepository personneRepository;

	@CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/personne")
    public List<PersonneProjection> getPersonnes() {
        return personneRepository.findAllPersonneData();
    }
}