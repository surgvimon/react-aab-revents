import EventDashboard from "../../features/events/eventDashboard/EventDashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import EventDetailedPage from "../../features/events/eventDetailed/EventDetailedPage";
import EventFrom from "../../features/events/eventFrom/EventFrom";
import Layout from "./Layout";
import Sandbox from "../../features/sanbox/Sandbox";
import CreateEventFrom from "../../features/events/eventFrom/CreateEventFrom";
import ScrollToTop from "./ScrollToTop";


function App() {
   return (
    <>
      <Router>
      <ScrollToTop />

        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />}/>
            <Route path="/events" element={<EventDashboard />}/>
            <Route path="/sandbox" element={<Sandbox />}/>
            <Route path="/events/:id" element={<EventDetailedPage />}/>
            <Route path={"/create-event"} element={<CreateEventFrom />}/>
            <Route path={"/manage/:id"} element={<EventFrom />}/>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
