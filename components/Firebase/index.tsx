import {
  createContext,
  useCallback,
  useEffect,
  useState,
  useContext,
} from "react";
import { initializeApp, FirebaseApp } from "firebase/app";
import {
  getMessaging,
  getToken,
  onMessage,
  Messaging,
  MessagePayload,
} from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyC6QBNagigB9fwIro7pjCN9DASggyLC-jQ",
  authDomain: "fcm-demo-201e6.firebaseapp.com",
  projectId: "fcm-demo-201e6",
  storageBucket: "fcm-demo-201e6.appspot.com",
  messagingSenderId: "128130080479",
  appId: "1:128130080479:web:400622beea71c8b129536a",
};

const vapidKey =
  "BNyx7yExxScWFE_yKW64WgZR1uOr_lERXhrk3wA5WZ5UNNw9EquvwnZtyKwb8PPTe5t0rwXLbNsHjTSzc5hIikI";

type MessageListener = () => Promise<MessagePayload | undefined>;

interface FirebaseContextType {
  app?: FirebaseApp;
  messaging?: Messaging;
  onMessageListener: MessageListener;
}

const firebaseContext = createContext<FirebaseContextType>({
  app: undefined,
  messaging: undefined,
  onMessageListener: () => Promise.resolve(undefined),
});

const FirebaseProvider = ({ children }: React.PropsWithChildren) => {
  const [app, setApp] = useState<FirebaseApp>();
  const [messaging, setMessaging] = useState<Messaging>();

  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const messaging = getMessaging(app);

    setApp(app);
    setMessaging(messaging);

    const requestPerrmission = () => {
      navigator.permissions.query({ name: "notifications" }).then((result) => {
        if (result.state === "granted") {
          requestForToken(messaging);
        } else if (result.state === "prompt") {
          Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
              requestForToken(messaging);
            }
          });
        }
      });
    };

    const requestForToken = (m: Messaging) => {
      return getToken(m, { vapidKey })
        .then((currentToken) => {
          if (currentToken) {
            console.log("current token for client: ", currentToken);
            // Perform any other neccessary action with the token
          } else {
            // Show permission request UI
            console.log(
              "No registration token available. Request permission to generate one."
            );
          }
        })
        .catch((err) => {
          console.log("An error occurred while retrieving token. ", err);
        });
    };

    requestPerrmission();
  }, []);

  const onMessageListener: MessageListener = () => {
    console.log("go there first", messaging);
    return new Promise((resolve) => {
      if (messaging) {
        onMessage(messaging, (payload) => {
          console.log("payload", payload);
          resolve(payload as MessagePayload);
        });
      }
    });
  };

  return (
    <firebaseContext.Provider value={{ app, messaging, onMessageListener }}>
      {children}
    </firebaseContext.Provider>
  );
};

export default FirebaseProvider;

export const useFirebase = () => useContext(firebaseContext);
