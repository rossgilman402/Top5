// import { useState, useEffect } from "react";
// import io from "socket.io-client";

// const Chat = () => {
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   console.log(message);
//   console.log(messages);

//   // Replace with your Socket.IO server URL
//   const socket = io.connect("http://localhost:5000");

//   useEffect(() => {
//     // Listen for incoming messages from the server
//     socket.on("chat message", (message) => {
//       setMessages([...messages, message]);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, [messages, socket]);

//   const sendMessage = (e) => {
//     e.preventDefault();

//     // Emit the message to the server
//     socket.emit("chat message", message);

//     // Clear the input field
//     setMessage("");
//   };

//   const handleChange = (event) => {
//     const { value } = event.target;
//     setMessage(value);
//   };

//   return (
//     <>
//       <div>
//         <h1>Socket.IO chat</h1>
//         <div>
//           <ul id="messages">
//             {messages.map((msg, index) => (
//               <li key={index}>{msg}</li>
//             ))}
//           </ul>
//           <form onSubmit={sendMessage} id="form" action="">
//             <input
//               id="input"
//               placeholder="Send a message..."
//               value={message}
//               onChange={handleChange}
//             />
//             <button>Send</button>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Chat;

// import { useState, useEffect } from "react";
// import io from "socket.io-client";
// import "./Chat.css";

// const Chat = () => {
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState("");
//   const [socket, setSocket] = useState(null);

//   const userToken = localStorage.getItem("id_token");
//   const email = JSON.parse(atob(userToken.split(".")[1])).data.email;
//   console.log(email);

//   useEffect(() => {
//     // Connect to the WebSocket server
//     const socket = io("http://localhost:5000");
//     setSocket(socket);

//     // Load stored messages from local storage
//     const storedMessages =
//       JSON.parse(localStorage.getItem("chatMessages")) || [];
//     setMessages(storedMessages);

//     // Cleanup on unmount
//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   // Handle sending a message
//   const sendMessage = () => {
//     if (socket && message.trim() !== "") {
//       const newMessage = { text: message, timestamp: new Date().toISOString() };
//       socket.emit("message", newMessage);

//       // Update the state and save to local storage
//       setMessages([...messages, newMessage]);
//       localStorage.setItem(
//         "chatMessages",
//         JSON.stringify([...messages, newMessage])
//       );
//       setMessage("");
//     }
//   };

//   // Daily reset logic
//   useEffect(() => {
//     const resetChatAtNoon = () => {
//       const now = new Date();
//       const noon = new Date();
//       noon.setHours(12, 0, 0, 0);

//       if (now >= noon) {
//         // Reset the chat
//         setMessages([]);
//         localStorage.removeItem("chatMessages");
//       }
//     };

//     // Check and reset the chat every minute
//     const resetInterval = setInterval(resetChatAtNoon, 60000);

//     return () => {
//       clearInterval(resetInterval);
//     };
//   }, []);

//   // Rendering the chat interface
//   return (
//     <div className="chat-container">
//       <div>
//         {messages.map((msg, index) => (
//           <div key={index}>
//             {msg.text} - {msg.timestamp}
//           </div>
//         ))}
//       </div>
//       <input
//         type="text"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//       />
//       <button onClick={sendMessage}>Send</button>
//     </div>
//   );
// };

// export default Chat;

import { useState, useEffect } from "react";
import io from "socket.io-client";
import "./Chat.css";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Connect to the WebSocket server
    const socket = io("http://localhost:5000");
    setSocket(socket);

    // Load stored messages from local storage
    const storedMessages =
      JSON.parse(localStorage.getItem("chatMessages")) || [];
    setMessages(storedMessages);

    // Load the user's name from JWT token in localStorage
    const userToken = localStorage.getItem("id_token");
    if (userToken) {
      const decodedToken = JSON.parse(atob(userToken.split(".")[1])).data.email;
      setUserName(decodedToken);
    }

    // Listen for user-connected events from the server
    socket.on("user-connected", (user) => {
      setUserName(user.name);
    });

    // Cleanup on unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  // Handle sending a message
  const sendMessage = () => {
    if (socket && message.trim() !== "") {
      const newMessage = {
        text: message,
        user: userName, // Include the user's name
      };
      socket.emit("message", newMessage);

      // Update the state and save to local storage
      setMessages([...messages, newMessage]);
      localStorage.setItem(
        "chatMessages",
        JSON.stringify([...messages, newMessage])
      );
      setMessage("");
    }
  };

  // Daily reset logic
  useEffect(() => {
    const resetChatAtNoon = () => {
      const now = new Date();
      const noon = new Date();
      noon.setHours(12, 0, 0, 0);

      if (now >= noon) {
        // Reset the chat
        setMessages([]);
        localStorage.removeItem("chatMessages");
      }
    };

    // Check and reset the chat every minute
    const resetInterval = setInterval(resetChatAtNoon, 60000);

    return () => {
      clearInterval(resetInterval);
    };
  }, []);

  // Rendering the chat interface
  return (
    <div className="chat-container">
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{userName}: </strong>
            {msg.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
