// Firebase Analytics, loaded only after the page has finished loading so it
// never competes with the photos for bandwidth. The site uses no other
// Firebase service, so only the app and analytics SDKs are bundled.
const firebaseConfig = {
  apiKey: "AIzaSyAehZJpf2q2G8eN4sXbI2a_4AD9aJBywf4",
  authDomain: "portfolio-76487.firebaseapp.com",
  projectId: "portfolio-76487",
  storageBucket: "portfolio-76487.appspot.com",
  messagingSenderId: "798677173768",
  appId: "1:798677173768:web:bba9186c31cddffbeab3bd",
  measurementId: "G-SCB2CMW3QM"
};

async function start() {
  try {
    const [{ initializeApp }, { getAnalytics, isSupported }] = await Promise.all([
      import("firebase/app"),
      import("firebase/analytics"),
    ]);
    if (await isSupported()) getAnalytics(initializeApp(firebaseConfig));
  } catch {
    // Blocked by an ad blocker or offline: the site works the same without analytics.
  }
}

export function initAnalytics() {
  const whenIdle = () =>
    "requestIdleCallback" in window ? requestIdleCallback(start, { timeout: 5000 }) : setTimeout(start, 2000);
  if (document.readyState === "complete") whenIdle();
  else window.addEventListener("load", whenIdle, { once: true });
}
