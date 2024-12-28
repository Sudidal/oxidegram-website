import { useOutletContext } from "react-router-dom";
import Footer from "../../components/footer/footer.jsx";

function Dashboard() {
  const callback = useOutletContext();

  callback();

  return (
    <div className="main-with-margin" style={{ padding: "100px" }}>
      <h1 className="huge-text">Why need a dashboard in a clone??</h1>
      <p className="huge-text">
        A dashboard (also called dash, instrument panel or IP, or fascia) is a
        control panel set within the central console of a vehicle, boat, or
        cockpit of an aircraft or spacecraft. Usually located directly ahead of
        the driver (or pilot), it displays instrumentation and controls for the
        vehicle&apos;s operation. An electronic equivalent may be called an
        electronic instrument cluster, digital instrument panel, digital dash,
        digital speedometer or digital instrument cluster. By analogy, a
        succinct display of various types of related visual data in one place is
        also called a dashboard.
      </p>
      <p className="secon-text small-text">-Wikipedia</p>
      <Footer />
    </div>
  );
}

export default Dashboard;
