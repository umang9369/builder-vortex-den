import Header from "./Header";
import Footer from "./Footer";
import ChatWidget from "./ChatWidget";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}
