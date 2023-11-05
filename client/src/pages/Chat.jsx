const Chat = () => {
  return (
    <>
      <div>
        <h1>Socket.IO chat</h1>
        <div>
          <ul id="messages"></ul>
          <form id="form" action="">
            <input id="input" />
            <button>Send</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Chat;
