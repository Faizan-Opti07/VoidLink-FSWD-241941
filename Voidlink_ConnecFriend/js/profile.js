/* Profile friend cards and the assignment's three-level friend rating. */
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("profile-friends");
  if (!container) return;

  const labels = {
    1: { text: "Stupid", icon: "bi-emoji-frown" },
    2: { text: "Cool", icon: "bi-emoji-sunglasses" },
    3: { text: "Trustworthy", icon: "bi-shield-check" }
  };

  function render() {
    const state = VoidData.getState();
    const user = VoidData.currentUser(state);
    const friends = state.people.filter(p => p.isFriend && p.id !== user.id);
    container.innerHTML = friends.map(friend => {
      const selected = labels[friend.rating] || null;
      return `<article class="glass-panel friend-card"><div class="friend-card-top"><img src="${friend.avatar}" alt="${VoidData.escapeHtml(friend.name)}"><span class="online-dot ${friend.online ? "is-online" : ""}" title="${friend.online ? "Online" : "Offline"}"></span></div><h3>${VoidData.escapeHtml(friend.name)}</h3><p>${VoidData.escapeHtml(friend.role)}</p><div class="rating-current">${selected ? `<i class="bi ${selected.icon}"></i> ${selected.text}` : "Not rated yet"}</div><label class="rating-label" for="rating-${friend.id}">YOUR RATING</label><select id="rating-${friend.id}" class="form-select rating-select" data-rating-id="${friend.id}"><option value="0">Choose a rating</option><option value="1" ${friend.rating === 1 ? "selected" : ""}>☹ 1 · Stupid</option><option value="2" ${friend.rating === 2 ? "selected" : ""}>😎 2 · Cool</option><option value="3" ${friend.rating === 3 ? "selected" : ""}>🛡 3 · Trustworthy</option></select><a href="messages.html" class="text-link friend-message-link">Message <i class="bi bi-arrow-up-right"></i></a></article>`;
    }).join("");
    document.querySelector(".profile-metrics strong").textContent = String(friends.length).padStart(2, "0");
  }

  container.addEventListener("change", event => {
    const select = event.target.closest("[data-rating-id]");
    if (!select) return;
    const state = VoidData.getState();
    const friend = state.people.find(p => p.id === select.dataset.ratingId);
    if (!friend) return;
    friend.rating = Number(select.value);
    VoidData.saveState(state);
    render();
  });

  render();
});
