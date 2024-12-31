import { useNavigate } from "react-router-dom";

function RequiresAccount() {
  const nav = useNavigate();

  return (
    <div
      className="main-with-margin"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        paddingTop: "60px",
      }}
    >
      <h1 className="huge-text">You have to log in to see this page</h1>
      <button
        className="primary-btn"
        onClick={() => {
          nav("/accounts");
        }}
      >
        Log in
      </button>
    </div>
  );
}

export default RequiresAccount;
