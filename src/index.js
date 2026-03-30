import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";

document.addEventListener("click", (e) => {
  const anchor = e.target.closest("a");
  if (!anchor) return;
  const href = anchor.href || "";
  if (/wa\.me|whatsapp/i.test(href)) {
    window.gtag?.("event", "whatsapp_click", { event_category: "contact", event_label: "waterproofing" });
  } else if (href.includes("tel:")) {
    window.gtag?.("event", "phone_click", { event_category: "contact", event_label: "phone" });
  }
});

const rootElement = document.getElementById("root");
const app = (
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
);

// Hydrate pre-rendered HTML from react-snap; otherwise do a fresh render
if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, app);
} else {
  createRoot(rootElement).render(app);
}
