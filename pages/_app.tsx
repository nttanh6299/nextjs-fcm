import FirebaseProvider from "@/components/Firebase";
import Notification from "@/components/Notification";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <FirebaseProvider>
      <Notification />
      <Component {...pageProps} />
    </FirebaseProvider>
  );
}
