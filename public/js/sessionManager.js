// Constants for session extension threshold and check interval.
const SESSION_EXTENSION_THRESHOLD = 10 * 6000; // 1 minute
const CHECK_INTERVAL = 1000; // every second

//////////////////////////////////////////////////////
// FUNCTION TO EXTEND THE SESSION
//////////////////////////////////////////////////////
const extendSession = () => {
  const currentToken = localStorage.getItem("token");

  if (!currentToken) {
    console.log("❌ No token found. Logging out.");
    handleLogout();
    return;
  }

  let payload;
  try {
    payload = JSON.parse(atob(currentToken.split(".")[1]));
  } catch (error) {
    console.error("❌ Invalid token format:", error);
    handleLogout();
    return;
  }

  const userId = payload.userId; // Extract userId from token

  console.log("🔄 Attempting to extend session for userId:", userId);

  // Using fetchMethod with callback
  fetchMethod(
    "/api/extend-session",
    (status, response) => {
      console.log("📡 Response received:", status, response);

      if (status === 200 && response.token) {
        console.log("✅ New token received:", response.token);
        localStorage.setItem("token", response.token); // Save new token

        // ✅ Decode the new token immediately
        try {
          const newPayload = JSON.parse(atob(response.token.split(".")[1]));
          console.log("🔄 Token successfully refreshed. New expiry:", new Date(newPayload.exp * 1000));
        } catch (error) {
          console.error("❌ Error decoding new token:", error);
        }

        // ✅ Reset session prompt flag
        window.sessionPrompted = false;
        console.log("✅ Token updated in localStorage.");
      } else {
        console.log("❌ Failed to extend session. Status:", status);
        handleLogout();
      }
    },
    "POST",
    { userId }, // Send userId in the request body
    currentToken // Send current token for authorization
  );
};

/////////////////////////////////////////////////////////////
// FUNCTION TO LOG OUT THE USER AND REDIRECT TO LOGIN PAGE
/////////////////////////////////////////////////////////////
const handleLogout = () => {
  clearInterval(intervalId);
  sessionStorage.setItem("sessionExpired", "true");
  localStorage.removeItem("token");

  alert("⚠ Session expired. You will be redirected to the login page.");
  console.log("🚪 Redirecting to login page...");
  window.location.replace("../login.html");
};

//////////////////////////////////////////////////////
// FUNCTION TO CHECK THE SESSION PERIODICALLY
//////////////////////////////////////////////////////
const checkSession = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.log("❌ No token found. Stopping session checks.");
    clearInterval(intervalId);
    return;
  }

  if (sessionStorage.getItem("sessionExpired") === "true") {
    console.log("⚠ Session already marked as expired.");
    clearInterval(intervalId);
    return;
  }

  let payload;
  try {
    payload = JSON.parse(atob(token.split(".")[1])); // Always decode the current token
  } catch (error) {
    console.error("❌ Invalid token:", error);
    handleLogout();
    return;
  }

  const expirationTime = payload.exp * 1000;
  const timeUntilExpiry = expirationTime - Date.now();

  console.log(`⏱ Time until expiry: ${timeUntilExpiry} ms`);

  // ✅ Reset prompt if new token has sufficient time
  if (timeUntilExpiry > SESSION_EXTENSION_THRESHOLD) {
    window.sessionPrompted = false;
  }

  if (timeUntilExpiry <= 0) {
    console.log("⚠ Token expired.");
    handleLogout();
  } else if (timeUntilExpiry <= SESSION_EXTENSION_THRESHOLD && !window.sessionPrompted) {
    window.sessionPrompted = true;
    const wantsExtend = confirm(
      `Your session will expire in ${Math.floor(timeUntilExpiry / 1000)} seconds. Would you like to extend your session?`
    );
    if (wantsExtend) {
      extendSession();
    }
  }
};

//////////////////////////////////////////////////////
// RESET SESSION STATE AFTER SUCCESSFUL LOGIN
//////////////////////////////////////////////////////
if (localStorage.getItem("token")) {
  sessionStorage.removeItem("sessionExpired");
}

//////////////////////////////////////////////////////
// SET INTERVAL TO CHECK SESSION PERIODICALLY
//////////////////////////////////////////////////////
let intervalId = setInterval(checkSession, CHECK_INTERVAL);