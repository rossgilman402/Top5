import { useState, useEffect } from "react";
import io from "socket.io-client";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import { GET_MESSAGES } from "../../utils/query";
import { ADD_MESSAGE } from "../../utils/mutations";
import "./Chat.css";

const Chat = () => {
  const { loading, error, data } = useQuery(GET_MESSAGES);
  const messages = data?.getMessages || [];
  // ?.getMessages?.messages || [];
  console.log(messages);
  const [addMessage] = useMutation(ADD_MESSAGE, {
    refetchQueries: [GET_MESSAGES, "getMessages"],
  });
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [userName, setUserName] = useState("");
  const [getMessages] = useLazyQuery(GET_MESSAGES);
  useEffect(() => {
    // Connect to the WebSocket server
    const socket = io("http://localhost:5000");
    setSocket(socket);

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
    socket.on("message", () => {
      console.log("HERE");
      getMessages();
    });

    // Cleanup on unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = (e) => {
    // e.preventDefault();
    if (socket && message.trim() !== "") {
      const newMessage = {
        text: message.trim(),
        user: userName.trim(),
      };
      socket.emit("message", newMessage);

      // Use the addMessage mutation to add the message to the GraphQL server
      addMessage({ variables: { ...newMessage } });

      setMessage("");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="chat-container">
      <div>
        {" "}
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.user?.email}: </strong>
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
