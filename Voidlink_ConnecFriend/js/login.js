/* Demo sign-in: validates fields and creates a local-only session. */
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("login-form");
  if (!form) return;

  form.addEventListener("submit", event => {
    event.preventDefault();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const feedback = document.getElementById("login-error");

    if (!username || !password) {
      VoidUI.showNotice(feedback, "Both fields are required to enter the orbit.", "error");
      return;
    }

    const state = VoidData.getState();
    const match = state.people.find(person => person.username.toLowerCase() === username.toLowerCase());
    if (!match) {
      VoidUI.showNotice(feedback, "Member not found in this demo directory. Try the demo username alex.", "error");
      return;
    }

    state.currentUser = match.id;
    state.loginTime = Date.now();
    match.lastLogin = 0;
    VoidData.saveState(state);
    try { localStorage.setItem("voidlink-session", "active"); } catch (_) {}
    VoidUI.navigateWithTransition("home.html");
  });
});
