/* Member discovery and invitation rules, including the ignore-list check. */
document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("member-grid");
  const search = document.getElementById("member-search");
  const feedback = document.getElementById("connection-feedback");
  if (!grid) return;

  function render() {
    const state = VoidData.getState();
    const user = VoidData.currentUser(state);
    const query = (search.value || "").trim().toLowerCase();
    const members = state.people.filter(p => p.id !== user.id && `${p.name} ${p.role} ${p.username}`.toLowerCase().includes(query));
    grid.innerHTML = members.map(person => {
      const invited = state.invited.includes(person.id);
      const ignoredYou = person.ignores.includes(user.id);
      const action = person.isFriend
        ? `<a class="btn btn-quiet btn-sm" href="messages.html"><i class="bi bi-chat-dots me-1"></i> Message</a>`
        : ignoredYou
          ? `<button class="btn btn-disabled btn-sm" type="button" disabled title="This member has ignored your account"><i class="bi bi-shield-lock me-1"></i> Unavailable</button>`
          : invited
            ? `<button class="btn btn-disabled btn-sm" type="button" disabled><i class="bi bi-check2 me-1"></i> Request sent</button>`
            : `<button class="btn btn-void btn-sm" type="button" data-invite="${person.id}"><i class="bi bi-person-plus me-1"></i> Connect</button>`;
      return `<article class="glass-panel member-card"><div class="member-card-art"><span class="member-orbit"></span><span class="member-index">MEMBER / ${person.id.toUpperCase()}</span></div><div class="member-card-body"><img class="member-avatar" src="${person.avatar}" alt="${VoidData.escapeHtml(person.name)}"><div class="member-online ${person.online ? "is-online" : ""}">${person.online ? "ONLINE NOW" : `LAST SEEN ${VoidData.timeSince(person.lastLogin).toUpperCase()}`}</div><h3>${VoidData.escapeHtml(person.name)}</h3><p class="member-role">${VoidData.escapeHtml(person.role)}</p><p class="member-bio">${VoidData.escapeHtml(person.bio)}</p><div class="member-card-actions">${action}<a class="member-message" href="messages.html" title="Private message"><i class="bi bi-chat-square-text"></i></a></div></div></article>`;
    }).join("") || `<div class="empty-state"><i class="bi bi-stars"></i><h3>No signals found</h3><p>Try another name or search term.</p></div>`;
  }

  search.addEventListener("input", render);
  grid.addEventListener("click", event => {
    const button = event.target.closest("[data-invite]");
    if (!button) return;
    const state = VoidData.getState();
    const user = VoidData.currentUser(state);
    const target = state.people.find(p => p.id === button.dataset.invite);
    if (!target) {
      VoidUI.showNotice(feedback, "That member is no longer available in the demo directory.", "error");
      return;
    }
    if (target.ignores.includes(user.id)) {
      VoidUI.showNotice(feedback, `Request blocked: ${target.name} has placed you on their ignore list.`, "error");
      render();
      return;
    }
    if (target.isFriend || state.invited.includes(target.id)) {
      VoidUI.showNotice(feedback, "You are already connected or have sent a request.", "error");
      return;
    }
    state.invited.push(target.id);
    VoidData.saveState(state);
    VoidUI.showNotice(feedback, `Invitation sent to ${target.name} in this local simulation.`, "success");
    render();
  });

  render();
});
