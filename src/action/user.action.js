import firebase from "firebase";
import { userConstants } from "./constant";

export const getRealtimeUsers = (uid) => {
  return async (dispatch) => {
    const db = firebase.firestore();
    const unsubscribe = db.collection("users");
    dispatch({ type: `${userConstants.GET_REALTIME_USERS}_REQUEST` });

    db.collection("users").onSnapshot((querySnapshot) => {
      const users = [];
      querySnapshot.forEach((doc) => {
        if (doc.data().uid !== uid) {
          users.push(doc.data());
        }
      });
      console.log(users);
      dispatch({
        type: `${userConstants.GET_REALTIME_USERS}_SUCCESS`,
        payload: { users },
      });
    });
    return unsubscribe;
  };
};

export const updateMessage = (msgObject) => {
  return async (dispatch) => {
    const db = firebase.firestore();
    db.collection("conversations")
      .add({
        ...msgObject,
        isView: false,
        createdAt: new Date(),
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getRealtimeConversations = (user) => {
  return async (dispatch) => {
    const db = firebase.firestore();
    db.collection("conversations")
      .where("user_uid_1", "in", [user.uid_1, user.uid_2])
      .orderBy('createdAt', 'asc')
      .onSnapshot((querySnapshot) => {
        const conversations = [];
        querySnapshot.forEach((doc) => {
          if(
           ( doc.data().user_uid_1 == user.uid_1 && doc.data().user_uid_2 == user.uid_2 )||
           (doc.data().user_uid_1 == user.uid_2 && doc.data().user_uid_2 == user.uid_1 )
          ){
            conversations.push(doc.data());
          }
          if(conversations.length > 0){
            dispatch({
              type:userConstants.GET_REALTIME_MESSAGES,
              payload:{conversations}
            })
          }else{
            dispatch({
              type:`${userConstants.GET_REALTIME_MESSAGES}_FAILURE`,
              payload:{conversations}
            })
          }
        });
        console.log(conversations);
      }); 
  };
};
