import React, { useState, useEffect } from 'react';
import ticketService from '../services/TicketService';
import './TicketComponent.css';
import { useNavigate } from "react-router-dom";

const TicketComponent = () => {
    const [tickets, setTickets] = useState([]);
    const [newTicket, setNewTicket] = useState({ description: '', genreProblem: '', nomClient: '', serviceDedie: '', statut: 0 });
    const [additionalInputs, setAdditionalInputs] = useState([{ personneAssocie: '', volumeHoraire: '' }]);
    const [menuOpen, setMenuOpen] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const fetchedTickets = await ticketService.getTickets();
                setTickets(fetchedTickets);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchTickets();
    }, []);

    const handleCreateTicket = async (e) => {
        e.preventDefault();
        try {
            const updatedTickets = await ticketService.createTicket(newTicket);
            setTickets(updatedTickets);
            setNewTicket({ description: '', genreProblem: '', nomClient: '', serviceDedie: '', statut: 0 });
        } catch (err) {
            setError(err.message); 
        }
    };

    const handleAddInputs  =() =>{
        setAdditionalInputs([...additionalInputs, { personneAssocie: '', volumeHoraire: '' }]);
    }

    const handleAdditionalInputChange = (e, index, key) => {
        const newInputs = [...additionalInputs];
        newInputs[index][key] = e.target.value;
        setAdditionalInputs(newInputs);
    };
    
    const handleRemoveInput = (index) => {
        const newInputs = [...additionalInputs];
        newInputs.splice(index, 1);
        setAdditionalInputs(newInputs);
    };

    const handleDeleteTicket = async (id) => {
        try {
            await ticketService.deleteTicket(id);
            setTickets(tickets.filter(ticket => ticket.idTicket !== id));
        } catch (err) {
            setError(err.message);
        }
    };
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div>
            <div className={`burger-menu ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
                <div className="burger-menu-line"> </div>
                <div className="burger-menu-line"></div>
                <div className="burger-menu-line"></div>
                
            </div>

            <h1>Gestionnaire de Tickets</h1>

            <div className={`menu-links ${menuOpen ? 'open' : ''}`}>
                <a>Gestionnaire de Ticket</a>
                <a href="/Personnes">Gestionnaire de Personnes</a>
                
                
            </div>

            <form id="TicketCreation" onSubmit={handleCreateTicket}>
                <h2>Créer un Ticket</h2>
                <input
                    type="text"
                    placeholder="Description"
                    value={newTicket.description}
                    onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                    required="required"
                />
                <input
                    type="text"
                    placeholder="Service concerné"
                    value={newTicket.serviceDedie}
                    onChange={(e) => setNewTicket({ ...newTicket, serviceDedie: e.target.value })}
                    required="required"
                />
                <input
                    type="text"
                    placeholder="Nom du client"
                    value={newTicket.nomClient}
                    onChange={(e) => setNewTicket({ ...newTicket, nomClient: e.target.value })}
                    required="required"
                />
                <input
                    type="text"
                    placeholder="Genre"
                    value={newTicket.genreProblem}
                    onChange={(e) => setNewTicket({ ...newTicket, genreProblem: e.target.value })}
                    required="required"
                />
                <input
                    type="text"
                    placeholder="Personne Associée"
                    value={newTicket.$personneAssocie}
                    required="required"
                    // onChange={(e) => setNewTicket({ ...newTicket, $personneAssocie: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Volume horaire"
                    value={newTicket.$volumeHoraire}
                    required="required"
                    //  onChange={(e) => setNewTicket({ ...newTicket, $volumeHoraire: e.target.value })}
                />
                {additionalInputs.map((input, index) => (
    <div id ="AddedInputs" key={index}>
        <input
            type="text"
            placeholder="Personne Associée"
            value={input.personneAssocie}
            onChange={(e) => handleAdditionalInputChange(e, index, 'personneAssocie')}
            required="required"
        />
        <input
            type="text"
            placeholder="Volume horaire"
            value={input.volumeHoraire}
            onChange={(e) => handleAdditionalInputChange(e, index, 'volumeHoraire')}
            required="required"
        />
        <button id="remove" type="button" onClick={() => handleRemoveInput(index)}>-</button>
    </div>
))}
                <button type="button" id="add"  onClick={handleAddInputs}> + </button>
                <button type="submit" id="submit">Créer</button>
            </form>

            <div id="table">
                <table>
                    <thead>
                        <tr>
                            <th>Identifiant ticket</th>
                            <th>Description</th>
                            <th>Service concerné</th>
                            <th>Nom du client</th>
                            <th>Type de problème</th>
                            <th id="icons">Actions</th>
                        </tr>
                    </thead>
                    <tbody id="tickets">
                        {tickets.map(ticket => (
                            <tr key={ticket.idTicket}>
                                <td>{ticket.idTicket}</td>
                                <td>{ticket.description}</td>
                                <td>{ticket.serviceDedie}</td>
                                <td>{ticket.nomClient}</td>
                                <td>{ticket.genreProblem}</td>
                                <td>{ticket.statut}</td>
                                <td>
                                    <img
                                        style={{ width: '1.3em', margin: '0 5px 0 0' }}
                                        src={`${process.env.PUBLIC_URL}/images/modify.png`}
                                        alt="modify"
                                    />
                                    <img
                                        style={{ width: '1.3em' }}
                                        src={`${process.env.PUBLIC_URL}/images/trash.png`}
                                        alt="remove"
                                        onClick={() => handleDeleteTicket(ticket.idTicket)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default TicketComponent;
