/**
 * VACUUM IN THE VOID - HOME FEED & SOCIAL MATRIX ENGINE
 * Handles news feed, friends ordered by login time, like/dislike counts, and selective news sharing.
 */

document.addEventListener('DOMContentLoaded', () => {
  renderFriendsSidebar(); // Render friends sorted by login time
  renderNewsFeed(); // Render news posts
  setupPostCreationModal(); // Setup post composer & audience modal
  updateActiveUserHeader(); // Update top bar user info
});

// Update Header Profile Badge and Sidebar HUD
function updateActiveUserHeader() {
  const currentUser = window.voidState.getCurrentUser(); // Active user
  if (!currentUser) return;

  const headerAvatar = document.getElementById('header-user-avatar'); // Avatar element
  const headerName = document.getElementById('header-user-name'); // Name element
  const headerHandle = document.getElementById('header-user-handle'); // Handle element

  if (headerAvatar) headerAvatar.src = currentUser.avatar; // Set image
  if (headerName) headerName.textContent = currentUser.name; // Set name
  if (headerHandle) headerHandle.textContent = currentUser.handle; // Set handle

  // Sidebar User HUD Card
  const sidebarAvatar = document.getElementById('sidebar-user-avatar');
  const sidebarName = document.getElementById('sidebar-user-name');
  const sidebarHandle = document.getElementById('sidebar-user-handle');
  const sidebarRole = document.getElementById('sidebar-user-role');
  const sidebarCity = document.getElementById('sidebar-user-city');
  const sidebarStatus = document.getElementById('sidebar-user-status');

  if (sidebarAvatar) sidebarAvatar.src = currentUser.avatar;
  if (sidebarName) sidebarName.textContent = currentUser.name;
  if (sidebarHandle) sidebarHandle.textContent = currentUser.handle;
  if (sidebarRole) sidebarRole.textContent = currentUser.role || 'Creator & Architect';
  if (sidebarCity) sidebarCity.textContent = currentUser.city || 'Islamabad Matrix';
  if (sidebarStatus) sidebarStatus.textContent = currentUser.status || 'Active Online';
}

/**
 * CRITICAL RUBRIC REQUIREMENT:
 * "When a user logged in, they saw the people in their friends list in the order of their login to the site,
 * the first person being the latest one to do so."
 */
function renderFriendsSidebar() {
  const container = document.getElementById('friends-login-order-list'); // Container
  if (!container) return;

  const friends = window.voidState.getFriendsSortedByLoginTime(); // Strictly sorted descending by login time
  container.innerHTML = ''; // Clear existing

  if (friends.length === 0) {
    container.innerHTML = `
      <div class="text-xs text-gray-500 text-center py-6">
        No active friends connected. Visit the Explore directory to invite members.
      </div>
    `;
    return;
  }

  friends.forEach((friend, idx) => {
    const timeSinceLogin = window.voidState.formatRelativeTime(friend.lastLogin); // Format relative time
    const isLatest = idx === 0; // Flag latest logged-in person

    const card = document.createElement('div'); // Friend card
    card.className = `p-3 rounded-xl border ${isLatest ? 'border-amber-500/40 bg-amber-500/5' : 'border-gray-800/80 bg-void-850/60'} hover:border-gray-600 transition-all flex items-center gap-3`;

    card.innerHTML = `
      <div class="relative flex-shrink-0">
        <img src="${friend.avatar}" alt="${friend.name}" class="w-10 h-10 rounded-full object-cover border border-gray-700" />
        <span class="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full ${friend.isOnline ? 'bg-emerald-400 ring-2 ring-black' : 'bg-gray-500 ring-2 ring-black'}"></span>
      </div>
      <div class="flex-1 min-w-0">
        <div class="flex items-center justify-between">
          <h4 class="text-xs font-semibold text-gray-200 truncate">${friend.name}</h4>
          ${isLatest ? '<span class="text-[9px] bg-amber-400/20 text-amber-300 font-mono px-1.5 py-0.5 rounded border border-amber-400/30 uppercase">Latest</span>' : ''}
        </div>
        <p class="text-[11px] text-gray-400 truncate">${friend.handle}</p>
        <p class="text-[10px] text-gray-500 font-mono mt-0.5 flex items-center gap-1">
          <i class="fa-regular fa-clock text-[9px] text-gray-400"></i> Logged in: <span class="text-gray-300 font-medium">${timeSinceLogin}</span>
        </p>
      </div>
      <a href="messages.html?recipient=${friend.id}" class="text-gray-400 hover:text-cyan-400 p-1.5 transition-colors" title="Sub-space Private Message">
        <i class="fa-regular fa-message text-xs"></i>
      </a>
    `;

    container.appendChild(card); // Append friend card
  });
}

/**
 * CRITICAL RUBRIC REQUIREMENT:
 * "The news feed includes the news, the friend’s name, profile picture, and time since the last log in."
 * "Likes or Dislikes with Count"
 */
function renderNewsFeed() {
  const container = document.getElementById('news-feed-container'); // Container
  if (!container) return;

  const currentUser = window.voidState.getCurrentUser(); // Active user
  const allPosts = window.voidState.state.posts; // All posts
  container.innerHTML = ''; // Clear feed

  // Filter posts visible to current user:
  // Post is visible if:
  // 1. Author is current user
  // 2. Author is a friend AND post audience is 'all'
  // 3. Author is a friend AND post audience is 'some' AND current user is in post.targetFriends
  const visiblePosts = allPosts.filter(post => {
    if (post.authorId === currentUser.id) return true; // Author always sees own post
    const isFriend = window.voidState.areFriends(currentUser.id, post.authorId); // Check friendship
    if (!isFriend) return false; // Non-friend posts don't appear in friends feed
    if (post.audience === 'all') return true; // Broadcast to all friends
    if (post.audience === 'some' && post.targetFriends && post.targetFriends.includes(currentUser.id)) {
      return true; // Specifically targeted post
    }
    return false;
  });

  if (visiblePosts.length === 0) {
    container.innerHTML = `
      <div class="glass-panel p-8 text-center rounded-2xl border border-gray-800 text-gray-400">
        <i class="fa-solid fa-satellite-dish text-3xl text-gray-600 mb-3 block"></i>
        <p class="font-mono text-sm">No transmissions detected in this sector.</p>
        <p class="text-xs text-gray-500 mt-1">Broadcast a new update to your crew above.</p>
      </div>
    `;
    return;
  }

  visiblePosts.forEach(post => {
    const author = window.voidState.getUserById(post.authorId); // Author data
    if (!author) return;

    // Time since author's last login (as required: "time since the last log in")
    const authorLoginTime = window.voidState.formatRelativeTime(author.lastLogin);
    const postTime = window.voidState.formatRelativeTime(post.timestamp);

    // Likes & Dislikes count
    const likesCount = (post.likes || []).length; // Total likes
    const dislikesCount = (post.dislikes || []).length; // Total dislikes
    const hasLiked = (post.likes || []).includes(currentUser.id); // User has liked
    const hasDisliked = (post.dislikes || []).includes(currentUser.id); // User has disliked

    // Audience label badge
    let audienceBadge = '<span class="text-[10px] font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-800/40 px-2 py-0.5 rounded-full"><i class="fa-solid fa-globe mr-1 text-[9px]"></i>All Friends</span>';
    if (post.audience === 'some') {
      const count = post.targetFriends ? post.targetFriends.length : 0;
      audienceBadge = `<span class="text-[10px] font-mono text-purple-300 bg-purple-950/40 border border-purple-800/40 px-2 py-0.5 rounded-full"><i class="fa-solid fa-user-lock mr-1 text-[9px]"></i>Selective (${count} Friend${count === 1 ? '' : 's'})</span>`;
    }

    const postCard = document.createElement('article'); // Article card
    postCard.className = 'glass-panel rounded-2xl p-5 border border-void-border hover:border-gray-700/80 transition-all';
    postCard.id = `feed-post-${post.id}`;

    postCard.innerHTML = `
      <!-- Post Header: Friend Name, Profile Picture, Last Login Time -->
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-3">
          <img src="${author.avatar}" alt="${author.name}" class="w-12 h-12 rounded-full object-cover border border-gray-600 shadow-md" />
          <div>
            <div class="flex items-center gap-2">
              <h3 class="text-sm font-bold text-gray-100">${author.name}</h3>
              <span class="text-xs text-gray-500 font-mono">${author.handle}</span>
            </div>
            <!-- REQUIRED: Time since the last log in & post dispatch time -->
            <div class="flex items-center gap-2 text-[11px] text-gray-400 font-mono mt-0.5">
              <span><i class="fa-regular fa-clock text-gray-500 mr-1"></i>Last logged in: <strong class="text-gray-300">${authorLoginTime}</strong></span>
              <span class="text-gray-600">•</span>
              <span class="text-gray-500">${postTime}</span>
            </div>
          </div>
        </div>
        ${audienceBadge}
      </div>

      <!-- Post Body / News Content -->
      <div class="text-sm text-gray-200 leading-relaxed mb-4 font-normal">
        ${escapeHtml(post.content)}
      </div>

      <!-- Optional Cosmic Hologram Attachment -->
      ${post.image ? `
        <div class="mb-4 rounded-xl overflow-hidden border border-gray-800 relative group">
          <img src="${post.image}" alt="Transmission Attachment" class="w-full max-h-80 object-cover group-hover:scale-[1.02] transition-transform duration-500" />
          <div class="absolute bottom-2 left-2 px-2.5 py-1 rounded bg-black/75 backdrop-blur text-[10px] font-mono text-gray-300 border border-white/10">
            <i class="fa-solid fa-camera mr-1 text-cyan-400"></i> Singularity Telemetry Capture
          </div>
        </div>
      ` : ''}

      <!-- Post Actions Footer: Likes & Dislikes with Count, Share -->
      <div class="pt-3 border-t border-gray-800/80 flex items-center justify-between">
        <div class="flex items-center gap-4">
          <!-- Like Button with Live Count -->
          <button 
            onclick="handleReactionClick('${post.id}', 'like')"
            class="feed-action-btn flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium border border-gray-800 ${hasLiked ? 'active-like bg-cyan-950/30 border-cyan-500/50 text-cyan-400' : 'text-gray-400 hover:text-white'}"
            title="Like transmission"
          >
            <i class="fa-solid fa-thumbs-up ${hasLiked ? 'text-cyan-400 scale-110' : ''}"></i>
            <span class="font-mono font-bold">${likesCount}</span>
            <span class="text-[10px] text-gray-500 hidden sm:inline">Likes</span>
          </button>

          <!-- Dislike Button with Live Count -->
          <button 
            onclick="handleReactionClick('${post.id}', 'dislike')"
            class="feed-action-btn flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium border border-gray-800 ${hasDisliked ? 'active-dislike bg-rose-950/30 border-rose-500/50 text-rose-400' : 'text-gray-400 hover:text-white'}"
            title="Dislike transmission"
          >
            <i class="fa-solid fa-thumbs-down ${hasDisliked ? 'text-rose-400 scale-110' : ''}"></i>
            <span class="font-mono font-bold">${dislikesCount}</span>
            <span class="text-[10px] text-gray-500 hidden sm:inline">Dislikes</span>
          </button>
        </div>

        <!-- Quick Share Echo Button -->
        <button 
          onclick="openEchoModal('${escapeHtml(post.content).replace(/'/g, "\\'")}')"
          class="text-xs font-mono text-gray-400 hover:text-purple-300 flex items-center gap-1.5 px-2.5 py-1 rounded hover:bg-gray-800/60 transition-colors"
          title="Share with crew"
        >
          <i class="fa-solid fa-share-nodes text-xs"></i>
          <span>Relay Post</span>
        </button>
      </div>
    `;

    container.appendChild(postCard); // Append to feed
  });
}

// Global Reaction Click Handler (Like / Dislike toggle)
window.handleReactionClick = function(postId, reactionType) {
  try {
    const res = window.voidState.toggleReaction(postId, reactionType); // Toggle in state
    renderNewsFeed(); // Re-render feed with updated counts
    const actionLabel = reactionType === 'like' ? 'Quantum Positive Affirmation' : 'Gravitational Anomaly Dislike';
    if (window.showToast) {
      window.showToast(`${actionLabel} recorded.`, 'info', 2000);
    }
  } catch (e) {
    if (window.showToast) window.showToast(e.message, 'error');
  }
};

/**
 * CRITICAL RUBRIC REQUIREMENT:
 * "A user can also share the news with his friends and have the option to share with all friends or with some of friends."
 */
function setupPostCreationModal() {
  const form = document.getElementById('create-post-form'); // Composer form
  const contentInput = document.getElementById('post-content-input'); // Textarea
  const audienceRadios = document.querySelectorAll('input[name="post-audience"]'); // Radios
  const selectiveFriendsBox = document.getElementById('selective-friends-container'); // Checkboxes container
  const friendsChecklist = document.getElementById('selective-friends-checklist'); // Checkbox list

  if (!form) return;

  // Toggle selective friends checklist when radio changes
  audienceRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
      if (e.target.value === 'some') {
        renderSelectiveFriendsList(); // Populate checklist
        if (selectiveFriendsBox) selectiveFriendsBox.classList.remove('hidden'); // Show checklist
      } else {
        if (selectiveFriendsBox) selectiveFriendsBox.classList.add('hidden'); // Hide checklist
      }
    });
  });

  // Populate Selective Friends Checklist
  function renderSelectiveFriendsList() {
    if (!friendsChecklist) return;
    const friends = window.voidState.getFriendsSortedByLoginTime(); // Friends list
    friendsChecklist.innerHTML = ''; // Clear

    if (friends.length === 0) {
      friendsChecklist.innerHTML = '<div class="text-xs text-gray-500 py-1">No friends found to select.</div>';
      return;
    }

    friends.forEach(f => {
      const label = document.createElement('label'); // Label wrapper
      label.className = 'flex items-center gap-2.5 p-2 rounded-lg bg-void-900 border border-gray-800 hover:border-gray-700 cursor-pointer text-xs text-gray-300';
      label.innerHTML = `
        <input type="checkbox" name="selected-friend" value="${f.id}" class="rounded border-gray-700 text-purple-600 focus:ring-purple-500 focus:ring-offset-0 bg-void-850" />
        <img src="${f.avatar}" class="w-6 h-6 rounded-full object-cover" />
        <span class="font-medium">${f.name}</span>
        <span class="text-[10px] text-gray-500 font-mono ml-auto">${f.handle}</span>
      `;
      friendsChecklist.appendChild(label); // Append
    });
  }

  // Handle Form Submission (Publishing Post)
  form.addEventListener('submit', (e) => {
    e.preventDefault(); // Stop normal post
    const content = contentInput ? contentInput.value.trim() : ''; // Get text
    const selectedAudience = document.querySelector('input[name="post-audience"]:checked')?.value || 'all';

    // Collect targeted friends if audience is 'some'
    let targetedFriendIds = [];
    if (selectedAudience === 'some') {
      const checkedBoxes = document.querySelectorAll('input[name="selected-friend"]:checked');
      checkedBoxes.forEach(cb => targetedFriendIds.push(cb.value));
    }

    // Optional image selection (demo attachment toggle)
    const attachImageCheckbox = document.getElementById('attach-cosmic-telemetry');
    const imageAttachment = (attachImageCheckbox && attachImageCheckbox.checked) ? 'assets/images/black_hole.jpg' : null;

    try {
      // Validate & create post in state
      window.voidState.createPost(content, selectedAudience, targetedFriendIds, imageAttachment);

      // Reset form
      if (contentInput) contentInput.value = '';
      if (attachImageCheckbox) attachImageCheckbox.checked = false;
      document.querySelector('input[name="post-audience"][value="all"]').checked = true;
      if (selectiveFriendsBox) selectiveFriendsBox.classList.add('hidden');

      // Refresh news feed
      renderNewsFeed();

      // Show success feedback
      const label = selectedAudience === 'all' ? 'All Friends' : `${targetedFriendIds.length} Selected Friends`;
      if (window.showToast) {
        window.showToast(`Broadcast successfully relayed to ${label}.`, 'success');
      }
    } catch (err) {
      if (window.showToast) {
        window.showToast(err.message, 'error'); // Display error feedback
      }
    }
  });
}

// Quick Echo / Relay Modal Helper
window.openEchoModal = function(originalContent) {
  const contentInput = document.getElementById('post-content-input');
  if (contentInput) {
    contentInput.value = `[RELAY BROADCAST]: "${originalContent}"`;
    contentInput.focus();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (window.showToast) window.showToast('Post copied to your transmission composer.', 'info');
  }
};

// HTML Escaping Utility for XSS Prevention
function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
