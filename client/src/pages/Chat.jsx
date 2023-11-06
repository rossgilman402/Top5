import { useState, useEffect } from "react";
import io from "socket.io-client";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // Replace with your Socket.IO server URL
  // const socket = io("http://localhost:3001"); // Change the URL accordingly

  // useEffect(() => {
  //   // Listen for incoming messages from the server
  //   socket.on("chat message", (message) => {
  //     setMessages([...messages, message]);
  //   });

  //   return () => {
  //     socket.disconnect();
  //   };
  // }, [messages, socket]);

  // const sendMessage = (e) => {
  //   e.preventDefault();

  //   // Emit the message to the server
  //   socket.emit("chat message", message);

  //   // Clear the input field
  //   setMessage("");
  // };

  const handleChange = (event) => {
    const { value } = event.target;
    setMessage(value);
  };

  return (
    <>
      <div>
        <h1>Socket.IO chat</h1>
        <div>
          <ul id="messages">
            {messages.map((msg, index) => (
              <li key={index}>{msg}</li>
            ))}
          </ul>
          <form
            // onSubmit={sendMessage}
            id="form"
            action=""
          >
            <input
              id="input"
              placeholder="Send a message..."
              value={message}
              onChange={handleChange}
            />
            <button>Send</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Chat;
