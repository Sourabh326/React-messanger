import React, { useEffect, useState } from "react";
import Layout from "../../components/layout";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import {
  getRealtimeConversations,
  getRealtimeUsers,
  updateMessage,
} from "../../action";

const User = (props) => {
  const { user, onClick } = props;
  return (
    <>
      <div className="displayName" onClick={() => onClick(user)}>
        <div className="displayPic">
          <img
            src="https://cdn.pixabay.com/photo/2020/05/08/02/55/african-american-5143919_960_720.png"
            alt=""
          />
        </div>
        <div
          style={{
            margin: "0 10px",
            display: "flex",
            justifyContent: "space-between",
            flex: 1,
          }}
        >
          <span style={{ fontWeight: 500 }}>
            {" "}
            {user.firstName} {user.lastName}{" "}
          </span>
          <span style={user.isOnline ? { color: "lime" } : { color: "black" }}>
            {" "}
            <span
              className={user.isOnline ? "onlineStatus" : "onlineStatusOff"}
            ></span>
          </span>
        </div>
      </div>
    </>
  );
};

const HomePage = (props) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  const [chatStarted, setChatStarted] = useState(false);
  const [chatUser, setChatUser] = useState("");
  const [message, setMessage] = useState("");
  const [userUid, setUserUid] = useState(null);
  let unsubscribe;

  useEffect(() => {
    unsubscribe = dispatch(getRealtimeUsers(auth.uid))
      .then((unsubscribe) => {
        return unsubscribe;
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // component will mount
  useEffect(() => {
    return () => {
      // clearup
      unsubscribe.then((f) => f).catch((error) => console.log(error));
    };
  }, []);

  const initChat = (user) => {
    setChatStarted(true);
    setChatUser(`${user.firstName} ${user.lastName}`);
    setUserUid(user.uid);

    dispatch(getRealtimeConversations({ uid_1: auth.uid, uid_2: user.uid }));
  };
  const submitMessage = (e) => {
    const msgObj = {
      user_uid_1: auth.uid,
      user_uid_2: userUid,
      message,
    };
    if (message !== "") {
      dispatch(updateMessage(msgObj)).then(()=>{
        setMessage(' ');
      });
    }
  };
  return (
    <Layout>
      <section className="container">
        {/* chat user area here */}
        <div className="listOfUsers">
          {user.users.length > 0
            ? user.users.map((user) => {
                return <User key={user.uid} user={user} onClick={initChat} />;
              })
            : null}
        </div>

        {/* chat area here */}
        <div className="chatArea">
          <div className="chatHeader">
            {" "}
            {chatStarted ? chatUser : "Wellcome to web messenger"}{" "}
          </div>
          <div className="messageSections">
            {chatStarted
              ? user.conversations.map((con) => (
                  <div style={con.user_uid_1 === auth.uid ? {textAlign:'right'} : {textAlign:'left'} }>
                    <p className="messageStyle"> {con.message} </p>
                  </div>
                ))
              : null}
          </div>

          {/* chat control area here */}
          {chatStarted ? (
            <div className="chatControls">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write Message..."
              />
              <button className='sendMessageBtn' onClick={submitMessage}>Send</button>
            </div>
          ) : null}
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
