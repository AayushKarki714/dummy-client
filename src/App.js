import { useState } from "react";
import { useEffect } from "react";

function App() {
  const [userName, setUserName] = useState("");
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [isStale, setIsStale] = useState(true);

  useEffect(() => {
    fetch("https://dumm-server.onrender.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data?.users);
      });
  }, [isStale]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!userName || !email) return;
    console.log({ userName, email });

    fetch("https://dumm-server.onrender.com/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName, email }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log({ data });
        setIsStale(!isStale);
      });
  };

  console.log({ users });

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            value={userName}
            onChange={(event) => setUserName(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <div>
        {users.map(({ id, userName, email }) => (
          <div>
            <h2>{userName}</h2>
            <p>{email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
