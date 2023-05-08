import NavBar from "../../features/nav/NavBar";
import EventDashboard from "../../features/events/eventDashboard/EventDashboard";
import { Container } from "semantic-ui-react";
import { useState } from "react";

function App() {
  const [formOpen, setFormOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  function handleSelectEvent(event) {
    setSelectedEvent(event);
    setFormOpen(true);
  }

  function handleCreateFormOpen(){
    setSelectedEvent(null);
    setFormOpen(true);
  }
  return (
    <div>
        <NavBar setFormOpen={handleCreateFormOpen}/>
        <Container className="main">
          <EventDashboard formOpen={formOpen} setFormOpen={setFormOpen} selectEvent={handleSelectEvent} selectedEvent={selectedEvent}/>
        </Container>
        

    </div>
  );
}

export default App;
