/* Feed, audience selection, post sharing, and reactions. */
document.addEventListener("DOMContentLoaded", () => {
  const feed = document.getElementById("feed-list");
  const form = document.getElementById("share-form");
  if (!feed || !form) return;

  const state = VoidData.getState();
  const user = VoidData.currentUser(state);
  const friendIds = state.people.filter(p => p.isFriend && p.id !== user.id).map(p => p.id);
  const audience = document.getElementById("share-audience");
  const selectedWrap = document.getElementById("selected-friends-wrap");
  const selectedFriends = document.getElementById("selected-friends");

  document.querySelector(".welcome-banner h2").innerHTML = `Good to have you back, <em>${VoidData.escapeHtml(user.name.split(" ")[0])}.</em>`;
  document.getElementById("friend-count").textContent = String(friendIds.length).padStart(2, "0");
  const mini = document.getElementById("mini-friends");
  mini.innerHTML = friendIds.slice(0, 5).map(id => {
    const p = state.people.find(person => person.id === id);
    return `<img src="${p.avatar}" alt="${VoidData.escapeHtml(p.name)}" title="${VoidData.escapeHtml(p.name)}">`;
  }).join("") + `<a href="connections.html" aria-label="Explore connections">+</a>`;

  selectedFriends.innerHTML = friendIds.map(id => {
    const p = state.people.find(person => person.id === id);
    return `<label><input type="checkbox" value="${p.id}" checked> ${VoidData.escapeHtml(p.name.split(" ")[0])}</label>`;
  }).join("");

  audience.addEventListener("change", () => selectedWrap.classList.toggle("d-none", audience.value !== "selected"));

  function renderFeed() {
    const fresh = VoidData.getState();
    const activeUser = VoidData.currentUser(fresh);
    const posts = fresh.posts.filter(post => {
      if (post.authorId === activeUser.id) return true;
      const author = fresh.people.find(p => p.id === post.authorId);
      if (!author || !author.isFriend) return false;
      // Selected-audience posts only appear for the friends chosen by the author.
      if (post.audience === "selected") return (post.selectedFriends || []).includes(activeUser.id);
      return true;
    }).sort((a, b) => {
      const pa = fresh.people.find(p => p.id === a.authorId);
      const pb = fresh.people.find(p => p.id === b.authorId);
      return (pa ? pa.lastLogin : 999999) - (pb ? pb.lastLogin : 999999);
    });

    feed.innerHTML = posts.map(post => {
      const author = fresh.people.find(p => p.id === post.authorId) || activeUser;
      const image = post.image ? `<img class="post-image" src="${post.image}" alt="Shared scene by ${VoidData.escapeHtml(author.name)}" loading="lazy">` : "";
      const reaction = post.reaction || "";
      return `<article class="glass-panel post-card" data-post-id="${post.id}">
        <div class="post-head"><img class="post-avatar" src="${author.avatar}" alt="${VoidData.escapeHtml(author.name)}"><div class="post-author"><b>${VoidData.escapeHtml(author.name)}</b><span>${VoidData.escapeHtml(author.role)} <i class="bi bi-dot"></i> ${VoidData.escapeHtml(post.time)}</span></div><button class="post-menu" type="button" aria-label="More post options"><i class="bi bi-three-dots"></i></button></div>
        <p class="post-text">${VoidData.escapeHtml(post.text)}</p>${image}
        <div class="post-meta"><span><i class="bi bi-activity"></i> Last login ${VoidData.timeSince(author.lastLogin)}</span><span><i class="bi bi-globe2"></i> ${post.audience === "selected" ? "Selected friends" : "Friends orbit"}</span></div>
        <div class="post-actions"><button type="button" class="reaction-btn ${reaction === "like" ? "chosen" : ""}" data-reaction="like"><i class="bi bi-hand-thumbs-up${reaction === "like" ? "-fill" : ""}"></i> Like <span>${post.likes}</span></button><button type="button" class="reaction-btn ${reaction === "dislike" ? "chosen dislike-chosen" : ""}" data-reaction="dislike"><i class="bi bi-hand-thumbs-down${reaction === "dislike" ? "-fill" : ""}"></i> Dislike <span>${post.dislikes}</span></button><button type="button" class="reaction-share" data-share-post="${post.id}"><i class="bi bi-send"></i> Signal</button></div>
      </article>`;
    }).join("");
  }

  form.addEventListener("submit", event => {
    event.preventDefault();
    const text = document.getElementById("post-text").value.trim();
    const feedback = document.getElementById("share-feedback");
    if (!text) {
      VoidUI.showNotice(feedback, "Write a signal before transmitting.", "error");
      return;
    }
    const chosen = [...selectedFriends.querySelectorAll("input:checked")].map(input => input.value);
    if (audience.value === "selected" && chosen.length === 0) {
      VoidUI.showNotice(feedback, "Choose at least one friend, or switch to All friends.", "error");
      selectedWrap.classList.remove("d-none");
      return;
    }
    const fresh = VoidData.getState();
    fresh.posts.unshift({ id: `p${Date.now()}`, authorId: fresh.currentUser, text, time: "just now", image: "", likes: 0, dislikes: 0, audience: audience.value, selectedFriends: chosen, reaction: null });
    VoidData.saveState(fresh);
    document.getElementById("post-text").value = "";
    VoidUI.showNotice(feedback, "Signal transmitted to your local demo orbit.", "success");
    renderFeed();
  });

  feed.addEventListener("click", event => {
    const button = event.target.closest("[data-reaction]");
    if (!button) {
      const signal = event.target.closest("[data-share-post]");
      if (signal) {
        const post = VoidData.getState().posts.find(p => p.id === signal.dataset.sharePost);
        if (post) {
          navigator.clipboard?.writeText(post.text).then(() => {
            signal.innerHTML = '<i class="bi bi-check2"></i> Copied';
          }).catch(() => { VoidUI.showNotice(document.getElementById("share-feedback"), "Signal text: " + post.text, "success"); });
        }
      }
      return;
    }
    const card = button.closest("[data-post-id]");
    const fresh = VoidData.getState();
    const post = fresh.posts.find(p => p.id === card.dataset.postId);
    if (!post) return;
    const next = button.dataset.reaction;
    if (post.reaction === next) {
      post[next === "like" ? "likes" : "dislikes"] = Math.max(0, post[next === "like" ? "likes" : "dislikes"] - 1);
      post.reaction = null;
    } else {
      if (post.reaction) post[post.reaction === "like" ? "likes" : "dislikes"] = Math.max(0, post[post.reaction === "like" ? "likes" : "dislikes"] - 1);
      post[next === "like" ? "likes" : "dislikes"]++;
      post.reaction = next;
    }
    VoidData.saveState(fresh);
    renderFeed();
  });

  renderFeed();
});
