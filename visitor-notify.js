/* ============================================================
   VISITOR NOTIFICATION SCRIPT
   Paste this <script> block (or link this file) right before
   the closing </body> tag of your site's HTML.
   ============================================================ */

(function () {
  // Basic visitor info to send along with the notification
  const visitorInfo = {
    page: window.location.href,
    referrer: document.referrer || "Direct / unknown",
    time: new Date().toLocaleString(),
    userAgent: navigator.userAgent,
  };

  // ------------------------------------------------------------
  // OPTION 1: Formspree (sends you an email, but also works as
  // a silent background "ping" if you just want the record)
  // ------------------------------------------------------------
  fetch("https://formspree.io/f/mrboelvj", {
    method: "POST",
    headers: { Accept: "application/json" },
    body: JSON.stringify({
      message: `New visit on ${visitorInfo.page}`,
      referrer: visitorInfo.referrer,
      time: visitorInfo.time,
      userAgent: visitorInfo.userAgent,
    }),
    // Note: we don't set Content-Type: application/json manually
    // because Formspree needs it auto-detected — using FormData
    // instead is more reliable, see below.
  }).catch((err) => console.error("Formspree notify failed:", err));

  // ------------------------------------------------------------
  // OPTION 2: ntfy.sh — free push notifications, no email, no
  // signup. Just pick a hard-to-guess topic name (acts like a
  // password) and subscribe to it in the ntfy app or browser.
  //
  // Setup (takes 1 minute):
  // 1. Go to https://ntfy.sh, or install the ntfy app (iOS/Android).
  // 2. Choose a unique topic name, e.g. "abdul-mysite-8271".
  //    Don't use something guessable like "mysite" — anyone who
  //    knows the topic name can send you notifications too.
  // 3. In the app: tap "+", enter that same topic name, subscribe.
  // 4. Replace YOUR-UNIQUE-TOPIC below with your topic name.
  // ------------------------------------------------------------
  fetch("https://ntfy.sh/242322206", {
    method: "POST",
    body: `New visitor on your site!\nPage: ${visitorInfo.page}\nFrom: ${visitorInfo.referrer}\nTime: ${visitorInfo.time}`,
    headers: {
      Title: "🌐 New Site Visit",
      Priority: "default",
      Tags: "eyes",
    },
  }).catch((err) => console.error("ntfy notify failed:", err));
})();
