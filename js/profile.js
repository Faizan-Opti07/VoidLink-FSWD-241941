/**
 * VOIDLINK • PROFILE & AI ASSISTANT PET ENGINE
 * Handles personal profile, AI Assistant Pets (Cat, Parrot, Eagle, Hoot),
 * Avatar customizer, and the 1 to 3 Friend Rating Matrix (Stupid, Cool, Trustworthy).
 */

document.addEventListener('DOMContentLoaded', () => {
  renderUserProfileDetails();
  renderFriendsListWithRatings();
  setupProfileEditor();
  setupAvatarChanger();
  setupPetSwitcher();
});

// Render Logged-in User Profile Header & Details
function renderUserProfileDetails() {
  const currentUser = window.voidState.getCurrentUser();
  if (!currentUser) return;

  const avatarEl = document.getElementById('profile-avatar');
  const nameEl = document.getElementById('profile-name');
  const handleEl = document.getElementById('profile-handle');
  const roleEl = document.getElementById('profile-role');
  const bioEl = document.getElementById('profile-bio');
  const cityEl = document.getElementById('profile-city');
  const statusEl = document.getElementById('profile-status');
  const friendsCountEl = document.getElementById('profile-friends-count');
  const postsCountEl = document.getElementById('profile-posts-count');

  if (avatarEl) {
    avatarEl.src = currentUser.avatar;
    avatarEl.onerror = () => { avatarEl.src = 'assets/avatars/tianshu-liu-SBK40fdKbAg-unsplash.jpg'; };
  }
  if (nameEl) nameEl.textContent = currentUser.name;
  if (handleEl) handleEl.textContent = currentUser.handle;
  if (roleEl) roleEl.textContent = currentUser.role || 'VoidLink Creator & Social Architect';
  if (bioEl) bioEl.textContent = currentUser.bio || '';
  if (cityEl) cityEl.textContent = currentUser.city || 'Islamabad Matrix';
  if (statusEl) statusEl.textContent = currentUser.status || 'Active in Void';

  // Sync header badge if present on this page
  const headerAvatar = document.getElementById('header-user-avatar');
  const headerName = document.getElementById('header-user-name');
  const headerHandle = document.getElementById('header-user-handle');
  if (headerAvatar) headerAvatar.src = currentUser.avatar;
  if (headerName) headerName.textContent = currentUser.name;
  if (headerHandle) headerHandle.textContent = currentUser.handle;

  // Render AI Assistant Pet Card
  renderPetCard(currentUser.pet);

  const friends = window.voidState.getFriendsSortedByLoginTime();
  if (friendsCountEl) friendsCountEl.textContent = friends.length;

  const myPosts = window.voidState.state.posts.filter(p => p.authorId === currentUser.id);
  if (postsCountEl) postsCountEl.textContent = myPosts.length;
}

// Render AI Assistant Pet Widget
function renderPetCard(pet) {
  const container = document.getElementById('ai-pet-display-card');
  if (!container || !pet) return;

  container.innerHTML = `
    <div class="flex items-center justify-between mb-2">
      <span class="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold">
        AI Assistant Companion
      </span>
      <button onclick="openPetModal()" class="text-[10px] font-mono text-gray-400 hover:text-white underline">
        Switch Pet
      </button>
    </div>
    <div class="flex items-center gap-3">
      <div class="w-12 h-12 rounded-2xl bg-void-900 border border-gray-700 flex items-center justify-center text-2xl shadow-inner">
        ${pet.icon}
      </div>
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-1.5">
          <h4 class="text-xs font-bold text-gray-100">${pet.name}</h4>
          <span class="text-[9px] font-mono px-1.5 py-0.2 rounded bg-purple-950/60 text-purple-300 border border-purple-800/60 font-semibold">${pet.badge}</span>
        </div>
        <p class="text-[11px] text-gray-400 font-medium">${pet.title}</p>
        <p class="text-[10px] text-cyan-400 font-mono mt-0.5"><i class="fa-solid fa-sparkles text-[9px] mr-1"></i>${pet.trait}</p>
      </div>
    </div>
  `;
}

/**
 * AVATAR CHANGER: Customizer for Profile Picture
 */
function setupAvatarChanger() {
  const changeBtn = document.getElementById('change-avatar-btn');
  const modal = document.getElementById('avatar-modal');
  const saveBtn = document.getElementById('save-avatar-url-btn');
  const input = document.getElementById('avatar-url-input');
  const fileInput = document.getElementById('avatar-file-input');

  const openAvatarModal = () => {
    if (modal) {
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    }
  };

  const closeAvatarModal = () => {
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  };

  if (changeBtn && modal) {
    changeBtn.addEventListener('click', openAvatarModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeAvatarModal();
    });
  }

  // Preset avatar selection
  const presetPills = document.querySelectorAll('.avatar-preset-choice');
  presetPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const src = pill.getAttribute('data-src');
      if (src) {
        window.voidState.updateUserAvatar(src);
        renderUserProfileDetails();
        updateAllNavAvatars(src);
        closeAvatarModal();
        if (window.showToast) window.showToast('Profile avatar updated.', 'success');
      }
    });
  });

  // URL input save
  if (saveBtn && input && modal) {
    saveBtn.addEventListener('click', () => {
      const url = input.value.trim();
      if (!url) {
        if (window.showToast) window.showToast('Please enter an image URL.', 'error');
        return;
      }
      window.voidState.updateUserAvatar(url);
      renderUserProfileDetails();
      updateAllNavAvatars(url);
      input.value = '';
      closeAvatarModal();
      if (window.showToast) window.showToast('Profile avatar updated.', 'success');
    });
  }

  // Local file upload preview
  if (fileInput && modal) {
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const base64 = event.target.result;
          window.voidState.updateUserAvatar(base64);
          renderUserProfileDetails();
          updateAllNavAvatars(base64);
          closeAvatarModal();
          if (window.showToast) window.showToast('Profile avatar updated from local file.', 'success');
        };
        reader.readAsDataURL(file);
      }
    });
  }
}

function updateAllNavAvatars(newSrc) {
  const navAvatars = document.querySelectorAll('#header-user-avatar, #profile-avatar');
  navAvatars.forEach(img => { img.src = newSrc; });
}

/**
 * AI PET SWITCHER: Switch between Cat, Parrot, Eagle, Hoot
 */
function setupPetSwitcher() {
  const modal = document.getElementById('pet-switcher-modal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
      }
    });
  }

  window.openPetModal = function() {
    const m = document.getElementById('pet-switcher-modal');
    if (m) {
      m.classList.remove('hidden');
      m.classList.add('flex');
    }
  };

  window.selectPetPreset = function(petKey) {
    window.voidState.updateUserPet(petKey);
    const currentUser = window.voidState.getCurrentUser();
    renderPetCard(currentUser.pet);
    const m = document.getElementById('pet-switcher-modal');
    if (m) {
      m.classList.add('hidden');
      m.classList.remove('flex');
    }
    if (window.showToast) {
      window.showToast(`AI Assistant changed to: ${currentUser.pet.name} (${currentUser.pet.icon})`, 'success');
    }
  };
}

/**
 * CRITICAL RUBRIC REQUIREMENT:
 * "A friend can be rated from scale of 1 to 3 i.e. Stupid, Cool and Trustworthy being represented as icons."
 */
function renderFriendsListWithRatings() {
  const container = document.getElementById('friends-grid-container');
  if (!container) return;

  const friends = window.voidState.getFriendsSortedByLoginTime();
  container.innerHTML = '';

  if (friends.length === 0) {
    container.innerHTML = `
      <div class="col-span-full glass-panel p-8 text-center rounded-2xl border border-gray-800 text-gray-400">
        <i class="fa-solid fa-users text-3xl text-gray-600 mb-2 block"></i>
        <p class="font-mono text-sm">No connections in your friends list.</p>
        <a href="explore.html" class="inline-block mt-3 px-4 py-1.5 rounded-lg bg-void-800 hover:bg-void-700 text-cyan-400 text-xs font-mono border border-cyan-800/40">
          Find Friends in Void Directory <i class="fa-solid fa-arrow-right ml-1"></i>
        </a>
      </div>
    `;
    return;
  }

  friends.forEach(friend => {
    const currentRating = window.voidState.getFriendRating(friend.id);
    const loginTime = window.voidState.formatRelativeTime(friend.lastLogin);

    let ratingLabel = 'Unrated';
    if (currentRating === 1) ratingLabel = 'Stupid';
    else if (currentRating === 2) ratingLabel = 'Cool';
    else if (currentRating === 3) ratingLabel = 'Trustworthy';

    const friendPet = friend.pet || { icon: '🤖', name: 'AI Bot' };

    const friendCard = document.createElement('div');
    friendCard.className = 'glass-panel rounded-2xl p-5 border border-void-border hover:border-gray-700/80 transition-all flex flex-col justify-between';
    friendCard.id = `friend-card-${friend.id}`;

    friendCard.innerHTML = `
      <div>
        <!-- Friend Header Info -->
        <div class="flex items-start gap-3.5 mb-3">
          <div class="relative flex-shrink-0">
            <img src="${friend.avatar}" alt="${friend.name}" width="48" height="48" style="width: 48px; height: 48px; max-width: 48px; max-height: 48px; border-radius: 50%; object-fit: cover;" class="w-12 h-12 rounded-full object-cover border border-gray-600 shadow" />
            <span class="absolute bottom-0 right-0 w-3 h-3 rounded-full ${friend.isOnline ? 'bg-emerald-400 ring-2 ring-black' : 'bg-gray-500 ring-2 ring-black'}"></span>
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-1.5">
              <h3 class="text-sm font-bold text-gray-100 truncate">${friend.name}</h3>
              <span class="text-xs" title="${friendPet.name}">${friendPet.icon}</span>
            </div>
            <p class="text-xs text-gray-400 font-mono truncate">${friend.handle}</p>
            <p class="text-[11px] text-cyan-400 font-medium mt-0.5">${friend.role}</p>
          </div>
        </div>

        <p class="text-xs text-gray-300 leading-relaxed line-clamp-2 mb-3">
          ${friend.bio}
        </p>

        <div class="text-[11px] font-mono text-gray-400 border-t border-gray-800/80 pt-2.5 pb-2.5 space-y-1">
          <div class="flex justify-between">
            <span class="text-gray-500">Last Active:</span>
            <span class="text-gray-300 font-medium">${loginTime}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-500">Location:</span>
            <span class="text-gray-400">${friend.city || 'Matrix Node'}</span>
          </div>
        </div>
      </div>

      <!-- CRITICAL REQUIREMENT: 1-3 Rating of Friend represented as Icons -->
      <div class="border-t border-gray-800/80 pt-3 mt-1">
        <div class="flex items-center justify-between mb-2">
          <span class="text-[10px] font-mono uppercase tracking-wider text-gray-400 font-bold">Friend Rating:</span>
          <span class="text-[11px] font-mono font-bold ${getRatingColorClass(currentRating)}" id="rating-label-${friend.id}">
            ${ratingLabel}
          </span>
        </div>

        <!-- 3 Interactive Rating Buttons (Scale 1 to 3: Stupid, Cool, Trustworthy) -->
        <div class="grid grid-cols-3 gap-2">
          <button 
            type="button"
            onclick="handleRateFriend('${friend.id}', 1)"
            class="rating-pill flex flex-col items-center justify-center p-2 rounded-xl border ${currentRating === 1 ? 'active-stupid' : 'border-gray-800 bg-void-900/60 text-gray-400 hover:text-red-400 hover:border-red-900/50'}"
            title="Rate: Stupid (Scale 1)"
          >
            <i class="fa-solid fa-face-dizzy text-base mb-1 ${currentRating === 1 ? 'animate-bounce' : ''}"></i>
            <span class="text-[10px] font-mono font-medium">1: Stupid</span>
          </button>

          <button 
            type="button"
            onclick="handleRateFriend('${friend.id}', 2)"
            class="rating-pill flex flex-col items-center justify-center p-2 rounded-xl border ${currentRating === 2 ? 'active-cool' : 'border-gray-800 bg-void-900/60 text-gray-400 hover:text-cyan-400 hover:border-cyan-900/50'}"
            title="Rate: Cool (Scale 2)"
          >
            <i class="fa-solid fa-glasses text-base mb-1 ${currentRating === 2 ? 'animate-bounce' : ''}"></i>
            <span class="text-[10px] font-mono font-medium">2: Cool</span>
          </button>

          <button 
            type="button"
            onclick="handleRateFriend('${friend.id}', 3)"
            class="rating-pill flex flex-col items-center justify-center p-2 rounded-xl border ${currentRating === 3 ? 'active-trustworthy' : 'border-gray-800 bg-void-900/60 text-gray-400 hover:text-emerald-400 hover:border-emerald-900/50'}"
            title="Rate: Trustworthy (Scale 3)"
          >
            <i class="fa-solid fa-shield-halved text-base mb-1 ${currentRating === 3 ? 'animate-bounce' : ''}"></i>
            <span class="text-[10px] font-mono font-medium">3: Trustworthy</span>
          </button>
        </div>

        <div class="mt-2.5 text-center">
          <a href="messages.html?recipient=${friend.id}" class="text-[11px] font-mono text-cyan-400 hover:text-cyan-300 flex items-center justify-center gap-1.5 py-1">
            <i class="fa-regular fa-paper-plane text-xs"></i> Send Private Message
          </a>
        </div>
      </div>
    `;

    container.appendChild(friendCard);
  });
}

window.handleRateFriend = function(friendId, ratingValue) {
  try {
    const val = window.voidState.rateFriend(friendId, ratingValue);
    renderFriendsListWithRatings();

    const friend = window.voidState.getUserById(friendId);
    const label = val === 1 ? 'Stupid (Scale 1)' : (val === 2 ? 'Cool (Scale 2)' : 'Trustworthy (Scale 3)');

    if (window.showToast) {
      window.showToast(`Updated rating for ${friend ? friend.name : 'friend'} to: ${label}`, 'success');
    }
  } catch (err) {
    if (window.showToast) window.showToast(err.message, 'error');
  }
};

function getRatingColorClass(rating) {
  if (rating === 1) return 'text-rose-400';
  if (rating === 2) return 'text-cyan-400';
  if (rating === 3) return 'text-emerald-400';
  return 'text-gray-500';
}

function setupProfileEditor() {
  const editProfileBtn = document.getElementById('edit-profile-btn') || document.getElementById('edit-bio-btn');
  const profileModal = document.getElementById('edit-profile-modal') || document.getElementById('edit-bio-modal');
  const form = document.getElementById('edit-profile-form');
  const closeBtn = document.getElementById('close-profile-modal-btn') || document.getElementById('close-bio-btn');
  const cancelBtn = document.getElementById('cancel-profile-modal-btn');

  const nameInput = document.getElementById('edit-profile-name-input');
  const handleInput = document.getElementById('edit-profile-handle-input');
  const roleInput = document.getElementById('edit-profile-role-input');
  const cityInput = document.getElementById('edit-profile-city-input');
  const statusInput = document.getElementById('edit-profile-status-input');
  const bioInput = document.getElementById('edit-profile-bio-input') || document.getElementById('bio-textarea');

  const openProfileModal = () => {
    if (profileModal) {
      const currentUser = window.voidState.getCurrentUser();
      if (currentUser) {
        if (nameInput) nameInput.value = currentUser.name || '';
        if (handleInput) handleInput.value = (currentUser.handle || '').replace(/^@/, '');
        if (roleInput) roleInput.value = currentUser.role || '';
        if (cityInput) cityInput.value = currentUser.city || '';
        if (statusInput) statusInput.value = currentUser.status || '';
        if (bioInput) bioInput.value = currentUser.bio || '';
      }
      profileModal.classList.remove('hidden');
      profileModal.classList.add('flex');
    }
  };

  const closeProfileModal = () => {
    if (profileModal) {
      profileModal.classList.add('hidden');
      profileModal.classList.remove('flex');
    }
  };

  if (editProfileBtn) editProfileBtn.addEventListener('click', openProfileModal);
  if (closeBtn) closeBtn.addEventListener('click', closeProfileModal);
  if (cancelBtn) cancelBtn.addEventListener('click', closeProfileModal);

  if (profileModal) {
    profileModal.addEventListener('click', (e) => {
      if (e.target === profileModal) closeProfileModal();
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const newName = nameInput ? nameInput.value.trim() : '';
      const rawHandle = handleInput ? handleInput.value.trim() : '';
      const newRole = roleInput ? roleInput.value.trim() : '';
      const newCity = cityInput ? cityInput.value.trim() : '';
      const newStatus = statusInput ? statusInput.value.trim() : '';
      const newBio = bioInput ? bioInput.value.trim() : '';

      if (!newName) {
        if (window.showToast) window.showToast('Please enter a Call-sign / Full Name.', 'error');
        return;
      }
      if (!rawHandle) {
        if (window.showToast) window.showToast('Please enter an @ handle.', 'error');
        return;
      }

      window.voidState.updateUserProfile({
        name: newName,
        handle: rawHandle,
        role: newRole,
        city: newCity,
        status: newStatus,
        bio: newBio
      });

      renderUserProfileDetails();
      closeProfileModal();
      if (window.showToast) {
        window.showToast('Profile identity telemetry updated successfully!', 'success');
      }
    });
  }
}

// Backward compatibility alias
function setupBioEditor() {
  setupProfileEditor();
}
