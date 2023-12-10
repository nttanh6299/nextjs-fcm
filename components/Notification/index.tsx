import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useFirebase } from "../Firebase";

const Notification = () => {
  const { onMessageListener } = useFirebase();
  const [notification, setNotification] = useState({ title: "", body: "" });
  const notify = () => toast(<ToastDisplay />);
  function ToastDisplay() {
    return (
      <div>
        <p>
          <b>{notification?.title}</b>
        </p>
        <p>{notification?.body}</p>
      </div>
    );
  }

  useEffect(() => {
    if (notification?.title) {
      notify();
    }
  }, [notification]);

  onMessageListener()
    .then((payload) => {
      if (payload) {
        console.log("go tehre", payload);
        setNotification({
          title: payload?.notification?.title || "",
          body: payload?.notification?.body || "",
        });
      }
    })
    .catch((err) => console.log("failed: ", err));

  return <Toaster />;
};

export default Notification;
