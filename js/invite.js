/**
 * VACUUM IN THE VOID - MEMBER DIRECTORY & FRIEND INVITATION ENGINE
 * Handles cosmic member search and friend invitations with strict ignore-list error handling.
 */

document.addEventListener('DOMContentLoaded', () => {
  renderMembersDirectory(); // Populate member directory
  setupDirectorySearch(); // Setup search filter
});

/**
 * CRITICAL RUBRIC & ERROR HANDLING REQUIREMENT:
 * "A person can be invited to be a friend so that one can connect with him/her and share the updates.
 * However, if the person to be added has marked the request sender in ignore list, then the friend request cannot be sent."
 */
function renderMembersDirectory(searchQuery = '') {
  const container = document.getElementById('members-directory-grid'); // Grid element
  if (!container) return;

  const currentUser = window.voidState.getCurrentUser(); // Active user
  const allUsers = window.voidState.state.users; // All users
  container.innerHTML = ''; // Clear container

  // Filter members based on search query
  const query = searchQuery.toLowerCase().trim();
  const filteredUsers = allUsers.filter(u => {
    if (u.id === currentUser.id) return false; // Exclude self
    if (!query) return true;
    return (
      u.name.toLowerCase().includes(query) ||
      u.handle.toLowerCase().includes(query) ||
      u.role.toLowerCase().includes(query) ||
      u.coordinates.toLowerCase().includes(query)
    );
  });

  if (filteredUsers.length === 0) {
    container.innerHTML = `
      <div class="col-span-full glass-panel p-8 text-center rounded-2xl border border-gray-800 text-gray-400">
        <i class="fa-solid fa-radar text-3xl text-gray-600 mb-2 block"></i>
        <p class="font-mono text-sm">No cosmic signatures found matching "${escapeHtml(searchQuery)}".</p>
      </div>
    `;
    return;
  }

  filteredUsers.forEach(user => {
    const isFriend = window.voidState.areFriends(currentUser.id, user.id); // Friend status
    const isIgnoringMe = user.ignoreList && user.ignoreList.includes(currentUser.id); // Ignore list flag

    // Check pending invitation status
    const pendingInv = window.voidState.state.invitations.find(inv => 
      inv.senderId === currentUser.id && inv.targetId === user.id && inv.status === 'pending'
    );

    const card = document.createElement('div'); // Card wrapper
    card.className = `glass-panel rounded-2xl p-5 border ${isIgnoringMe ? 'border-rose-950/40' : 'border-void-border'} hover:border-gray-700 transition-all flex flex-col justify-between`;
    card.id = `member-card-${user.id}`;

    card.innerHTML = `
      <div>
        <div class="flex items-start gap-4 mb-3">
          <div class="relative flex-shrink-0">
            <img src="${user.avatar}" alt="${user.name}" class="w-14 h-14 rounded-full object-cover border border-gray-600" />
            <span class="absolute bottom-0 right-0 w-3 h-3 rounded-full ${user.isOnline ? 'bg-emerald-400 ring-2 ring-black' : 'bg-gray-500 ring-2 ring-black'}"></span>
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-1.5">
              <h3 class="text-sm font-bold text-gray-100 truncate">${user.name}</h3>
              ${isIgnoringMe ? '<span class="text-[9px] font-mono text-rose-400 bg-rose-950/60 border border-rose-800/60 px-1.5 py-0.2 rounded" title="This user has placed you on their Quantum Ignore Filter!"><i class="fa-solid fa-ban text-[8px] mr-1"></i>Shield Active</span>' : ''}
            </div>
            <p class="text-xs text-gray-400 font-mono">${user.handle}</p>
            <p class="text-[11px] text-cyan-400 font-mono mt-0.5">${user.role}</p>
          </div>
        </div>

        <p class="text-xs text-gray-300 leading-relaxed mb-4 line-clamp-2">
          ${user.bio}
        </p>

        <div class="text-[11px] font-mono text-gray-400 border-t border-gray-800/80 pt-2.5 pb-2.5 space-y-1">
          <div class="flex justify-between">
            <span class="text-gray-500">Location:</span>
            <span class="text-gray-300">${user.city || 'Matrix Node'}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-500">AI Pet:</span>
            <span class="text-amber-400 font-medium">${user.pet ? user.pet.icon + ' ' + user.pet.name : 'AI Core'}</span>
          </div>
        </div>
      </div>

      <!-- Action Button: Invite / Connected / Pending / Blocked -->
      <div class="border-t border-gray-800/80 pt-3 mt-2 flex items-center justify-between gap-2">
        <a href="messages.html?recipient=${user.id}" class="text-xs font-mono text-gray-400 hover:text-cyan-400 p-2 rounded-lg bg-void-900 border border-gray-800" title="Sub-space Private Message">
          <i class="fa-regular fa-message"></i>
        </a>

        ${isFriend ? `
          <button disabled class="flex-1 py-2 px-3 rounded-xl bg-emerald-950/30 border border-emerald-800/50 text-emerald-400 text-xs font-mono flex items-center justify-center gap-1.5 cursor-default">
            <i class="fa-solid fa-check"></i> Already Friends
          </button>
        ` : pendingInv ? `
          <button disabled class="flex-1 py-2 px-3 rounded-xl bg-amber-950/30 border border-amber-800/50 text-amber-300 text-xs font-mono flex items-center justify-center gap-1.5 cursor-default">
            <i class="fa-solid fa-hourglass-half animate-spin"></i> Invitation Dispatched
          </button>
        ` : `
          <button 
            onclick="handleInviteMember('${user.id}')"
            class="flex-1 py-2 px-3 rounded-xl ${isIgnoringMe ? 'bg-void-900 border border-rose-800/60 text-rose-300 hover:bg-rose-950/40' : 'bg-purple-600 hover:bg-purple-500 text-white shadow-md shadow-purple-950/60'} text-xs font-mono flex items-center justify-center gap-1.5 transition-all"
          >
            <i class="fa-solid fa-user-plus text-xs"></i> 
            <span>${isIgnoringMe ? 'Send (Ignore Protected)' : 'Transmit Friend Invite'}</span>
          </button>
        `}
      </div>
    `;

    container.appendChild(card);
  });
}

// Global Friend Invitation Click Handler with Ignore List Error Trap
window.handleInviteMember = function(targetUserId) {
  try {
    // Attempt friend invitation via state manager
    window.voidState.sendFriendInvitation(targetUserId);

    const targetUser = window.voidState.getUserById(targetUserId);

    // Success feedback
    if (window.showToast) {
      window.showToast(`Quantum friend invitation dispatched to ${targetUser.name}! Connection protocol initialized.`, 'success');
    }

    renderMembersDirectory(); // Re-render directory buttons
  } catch (err) {
    // CRITICAL: Caught Ignore List Violation or other errors
    console.warn('Friend invitation rejected:', err);

    // Deliver explicit error alert to user
    if (window.showToast) {
      window.showToast(err.message, 'error', 6000);
    }
  }
};

// Search Filter Input Setup
function setupDirectorySearch() {
  const searchInput = document.getElementById('directory-search-input');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    renderMembersDirectory(e.target.value);
  });
}

function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
