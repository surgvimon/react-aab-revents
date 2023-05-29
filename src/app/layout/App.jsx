import EventDashboard from "../../features/events/eventDashboard/EventDashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import EventDetailedPage from "../../features/events/eventDetailed/EventDetailedPage";
import EventFrom from "../../features/events/eventFrom/EventFrom";
import Layout from "./Layout";
import Sandbox from "../../features/sanbox/Sandbox";
import ScrollToTop from "./ScrollToTop";
import ModalManager from "../common/modals/ModalManager";
import { ToastContainer } from "react-toastify";
import ErrorComponent from "../common/errors/ErrorComponent";
import AccountPage from "../../features/auth/AccountPage";
import ProfilePage from "../../features/profiles/profilePage/ProfilePage";


function App() {
   return (
    <>
      <Router>
      <ScrollToTop />
      <ModalManager />
      <ToastContainer position="bottom-right" hideProgressBar/>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />}/>
            <Route path="/events" element={<EventDashboard />}/>
            <Route path="/sandbox" element={<Sandbox />}/>
            <Route path="/events/:id" element={<EventDetailedPage />}/>
            <Route path={"/create-event"} element={<EventFrom />}/>
            <Route path={"/manage/:id"} element={<EventFrom />}/>
            <Route path='/error' element={<ErrorComponent />} />
            <Route path='/account' element={<AccountPage />} />
            <Route path='/profile/:id' element={<ProfilePage />} />
            <Route path='*' element={<ErrorComponent />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
