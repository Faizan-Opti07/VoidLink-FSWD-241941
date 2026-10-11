/* Private messaging to friends and other members; stored only in localStorage. */
document.addEventListener("DOMContentLoaded", () => {
  const list = document.getElementById("conversation-list");
  const history = document.getElementById("chat-history");
  const header = document.getElementById("chat-header");
  const form = document.getElementById("message-form");
  const input = document.getElementById("message-input");
  const search = document.getElementById("message-search");
  const feedback = document.getElementById("message-feedback");
  if (!list || !form) return;
  let activeId = null;

  function renderList() {
    const state = VoidData.getState();
    const user = VoidData.currentUser(state);
    const query = (search.value || "").trim().toLowerCase();
    const people = state.people.filter(p => p.id !== user.id && `${p.name} ${p.role}`.toLowerCase().includes(query));
    list.innerHTML = people.map(person => {
      const key = [user.id, person.id].sort().join("__");
      const messages = state.messages[key] || [];
      const last = messages[messages.length - 1];
      return `<button type="button" class="conversation-item ${activeId === person.id ? "active" : ""}" data-conversation="${person.id}"><img src="${person.avatar}" alt=""><span class="conversation-person"><b>${VoidData.escapeHtml(person.name)}</b><small>${VoidData.escapeHtml(last ? last.text : person.role)}</small></span><span class="conversation-status ${person.online ? "online" : ""}"></span></button>`;
    }).join("");
  }

  function renderChat() {
    const state = VoidData.getState();
    const user = VoidData.currentUser(state);
    const person = state.people.find(p => p.id === activeId);
    if (!person) {
      header.innerHTML = `<div class="empty-chat-icon"><i class="bi bi-chat-heart"></i></div><div><h2>Choose a channel</h2><p>Select any member to start a private message.</p></div>`;
      history.innerHTML = `<div class="chat-empty"><div class="empty-chat-icon"><i class="bi bi-send"></i></div><h3>A signal waiting to be sent.</h3><p>Pick someone on the left. You can message friends and other members.</p></div>`;
      input.disabled = true;
      input.placeholder = "Select a member first...";
      form.querySelector("button").disabled = true;
      return;
    }
    header.innerHTML = `<img class="chat-avatar" src="${person.avatar}" alt=""><div><h2>${VoidData.escapeHtml(person.name)}</h2><p><span class="conversation-status ${person.online ? "online" : ""}"></span> ${person.online ? "Online now" : `Last login ${VoidData.timeSince(person.lastLogin)}`} · private channel</p></div><span class="ms-auto chat-lock"><i class="bi bi-lock"></i> LOCAL</span>`;
    const key = [user.id, person.id].sort().join("__");
    const messages = state.messages[key] || [];
    history.innerHTML = messages.length ? messages.map(message => `<div class="message-row ${message.from === user.id ? "mine" : ""}"><div class="message-bubble">${VoidData.escapeHtml(message.text)}<small>${message.from === user.id ? "You" : VoidData.escapeHtml(person.name.split(" ")[0])} · ${message.time}</small></div></div>`).join("") : `<div class="chat-empty"><div class="empty-chat-icon"><i class="bi bi-stars"></i></div><h3>New channel, new possibilities.</h3><p>Send the first signal to ${VoidData.escapeHtml(person.name.split(" ")[0])}.</p></div>`;
    input.disabled = false;
    input.placeholder = `Message ${person.name.split(" ")[0]}...`;
    form.querySelector("button").disabled = false;
    history.scrollTop = history.scrollHeight;
  }

  list.addEventListener("click", event => {
    const button = event.target.closest("[data-conversation]");
    if (!button) return;
    activeId = button.dataset.conversation;
    renderList();
    renderChat();
    input.focus();
  });
  search.addEventListener("input", renderList);
  form.addEventListener("submit", event => {
    event.preventDefault();
    const text = input.value.trim();
    if (!activeId) {
      VoidUI.showNotice(feedback, "Choose a member before sending a message.", "error");
      return;
    }
    if (!text) {
      VoidUI.showNotice(feedback, "Your message is empty. Write something first.", "error");
      return;
    }
    const state = VoidData.getState();
    const user = VoidData.currentUser(state);
    const key = [user.id, activeId].sort().join("__");
    if (!state.messages[key]) state.messages[key] = [];
    state.messages[key].push({ from: user.id, text, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) });
    VoidData.saveState(state);
    input.value = "";
    VoidUI.showNotice(feedback, "Message sent in the local demo.", "success");
    renderList();
    renderChat();
  });

  renderList();
  renderChat();
});
