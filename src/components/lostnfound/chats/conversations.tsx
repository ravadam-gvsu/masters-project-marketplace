import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import Talk from "talkjs";
import {
  addChatsToFirestore,
  auth,
  getUserChat,
} from "../../../services/firebaseapi";
import { useUIContext } from "../../../hooks/context";

declare global {
  interface Window {
    talkSession: any;
  }
}

function ConversationPage({ itemOwnerId = "" }) {
  const chatContainerRef = useRef(null);
  const params = useParams();
  let userid: any = itemOwnerId;
  if (!itemOwnerId) {
    userid = params.itemOwnerId;
  }
  const [otherUser, setOtherUser] = useState({});
  const { userDetails } = useUIContext();

  useEffect(() => {
    async function createChat() {
      try {
        // get current user from local storage
        const currentUser: any = auth.currentUser;
        const otherUserDoc = await getUserChat(userid);
        setOtherUser(otherUserDoc);

        const me = new Talk.User({
          id: currentUser?.uid || (userDetails.user && userDetails.user["uid"]),
          name: currentUser?.displayName || "Anonymous",
          email: currentUser?.email,
          // photoUrl: currentUser.photoURL || defaultImage,
          welcomeMessage: "Hello!",
          role: "default",
        });

        const other = new Talk.User({
          id: otherUserDoc?.uid || userid,
          name: otherUserDoc?.displayName || "Anonymous",
          email: otherUserDoc?.email || "Anonymous",
          // photoUrl: otherUserDoc.photoURL || defaultImage,
          welcomeMessage: "Hello!",
          role: "default",
        });

        if (!window.talkSession) {
          window.talkSession = new Talk.Session({
            appId: "tEufQKsK",
            me,
          });
        }
        console.log(me);
        console.log(other);
        const conversationId = `${userid}-${Talk.oneOnOneId(me, other)}`;
        const conversation =
          window.talkSession.getOrCreateConversation(conversationId);
        conversation.setParticipant(me);
        conversation.setParticipant(other);
        let chatbox: any = null;
        setTimeout(() => {
          chatbox = window.talkSession.createChatbox(conversation);
          chatbox.mount(chatContainerRef.current);
          // chatbox = window.talkSession.createPopup(conversation);
          // chatbox.mount({ show: false });
          addChatsToFirestore(conversationId, me.id, other.id);
        }, 2000); // Adds a delay of 2 seconds (2000 milliseconds)

        return () => {
          chatbox && chatbox.destroy();
        };
      } catch (error) {
        console.error("Failed to create or fetch chat", error);
      }
    }

    createChat();
  }, [userid]);

  return (
    <div className="flex justify-center items-center">
      <div
        ref={chatContainerRef}
        style={{ height: "600px" }}
        className="h-[600px] w-[280px] sm:w-[500px] md:w-[600px] lg:w-[700px] mx-auto"
      ></div>
    </div>
  );
}

export default ConversationPage;
