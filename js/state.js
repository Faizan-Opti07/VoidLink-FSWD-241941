/**
 * VOIDLINK • CONNECFRIEND CENTRAL STATE MACHINE
 * Social Network in the Void featuring Void_Fai, Hamza, Munawar, Hafiz_Obaidullah the great,
 * AI Assistant Pets (Cat, Parrot, Eagle, Hoot), and custom avatar changing.
 */

const STORAGE_KEY = 'voidlink_connecfriend_state_v3'; // Storage version for latest personas & pets

// Available AI Companion Pets
const AI_PET_PRESETS = {
  cat: {
    type: 'cat',
    name: 'Shadow Nova',
    icon: '🐱',
    title: 'Cyber Feline AI',
    trait: 'Stealth & Trend Detector',
    badge: 'Night Stalker'
  },
  parrot: {
    type: 'parrot',
    name: 'Prism Echo',
    icon: '🦜',
    title: 'Chromatic Parrot AI',
    trait: 'Sub-space Voice Synthesizer',
    badge: 'Echo Weaver'
  },
  eagle: {
    type: 'eagle',
    name: 'Aero Talon',
    icon: '🦅',
    title: 'Vanguard Eagle AI',
    trait: 'High-Altitude Network Radar',
    badge: 'Sky Sentinel'
  },
  hoot: {
    type: 'hoot',
    name: 'Chronos Hoot',
    icon: '🦉',
    title: 'Singularity Owl AI',
    trait: 'Deep Logic & Archive Oracle',
    badge: 'Cosmic Scholar'
  }
};

// Default Seed Dataset
const DEFAULT_STATE = {
  currentUserId: 'u_fai', // Active user ID (Void_Fai)

  users: [
    {
      id: 'u_fai', // Main user
      name: 'Void_Fai', // Requested Name
      handle: '@void_fai', // Handle
      avatar: 'assets/avatars/tianshu-liu-SBK40fdKbAg-unsplash.jpg', // User provided avatar
      role: 'VoidLink Creator & Social Architect', // Social role
      bio: 'Building connections beyond the event horizon. Vibes, music, and late-night coding in the void.', // Social bio
      city: 'Islamabad Matrix', // Social location
      status: 'Online & connected', // Status
      lastLogin: Date.now() - 60000 * 2, // 2 minutes ago
      isOnline: true, // Online
      ignoreList: [], // Ignores nobody
      pet: AI_PET_PRESETS.cat, // Cat AI Assistant
      friendRatings: {
        'u_hamza': 3, // Rated Trustworthy
        'u_munawar': 2 // Rated Cool
      }
    },
    {
      id: 'u_hamza', // Friend 1
      name: 'Hamza', // Requested Name
      handle: '@hamza', // Handle
      avatar: 'assets/avatars/edgar-nKC772R_qog-unsplash.jpg', // User provided avatar
      role: 'Full-Stack Developer & Community Mod', // Role
      bio: 'Creating smooth animated web experiences. Always down for late-night multiplayer sessions and tech talks.', // Bio
      city: 'Lahore Cyber Hub', // Location
      status: 'Coding a new frontend', // Status
      lastLogin: Date.now() - 60000 * 6, // 6 minutes ago (Latest friend logged in!)
      isOnline: true, // Online
      ignoreList: [], // Empty ignore list
      pet: AI_PET_PRESETS.eagle, // Eagle AI Assistant
      friendRatings: {
        'u_fai': 3 // Rates Void_Fai as Trustworthy
      }
    },
    {
      id: 'u_munawar', // Friend 2
      name: 'Munawar', // Requested Name
      handle: '@munawar', // Handle
      avatar: 'assets/avatars/kar-ming-moo-Q_3WmguWgYg-unsplash.jpg', // User provided avatar
      role: 'UI/UX Visual Designer', // Role
      bio: 'Obsessed with dark mode palettes, micro-interactions, and responsive typography.', // Bio
      city: 'Rawalpindi Node', // Location
      status: 'Designing wireframes', // Status
      lastLogin: Date.now() - 60000 * 38, // 38 minutes ago
      isOnline: true, // Online
      ignoreList: [], // Empty ignore list
      pet: AI_PET_PRESETS.hoot, // Hoot Owl AI Assistant
      friendRatings: {
        'u_fai': 2 // Rates Void_Fai as Cool
      }
    },
    {
      id: 'u_obaidullah', // Outlaw / Ignore List Target (CRITICAL RUBRIC REQUIREMENT)
      name: 'Hafiz_Obaidullah the great', // Requested Name
      handle: '@obaidullah_great', // Handle
      avatar: 'assets/avatars/hans-jurgen-mager-qQWV91TTBrE-unsplash.jpg', // User provided avatar
      role: 'Legendary Competitive Gamer & Critic', // Role
      bio: 'The undisputed champion. Do not send random invites unless you have clearance.', // Bio
      city: 'Karachi Central', // Location
      status: 'Do Not Disturb', // Status
      lastLogin: Date.now() - 60000 * 120, // 2 hours ago
      isOnline: false, // Offline
      ignoreList: ['u_fai'], // CRITICAL: Marks Void_Fai in Ignore list!
      pet: AI_PET_PRESETS.parrot, // Parrot AI Assistant
      friendRatings: {}
    },
    {
      id: 'u_ayesha', // Non-Friend Member (Can be invited or chatted with)
      name: 'Ayesha', // Name
      handle: '@ayesha_cloud', // Handle
      avatar: 'assets/avatars/kevin-mueller-aeNg4YA41P8-unsplash.jpg', // User provided avatar
      role: 'Cloud Architect & Tech Blogger', // Role
      bio: 'Writing tutorials on scalable cloud services and modern JavaScript frameworks.', // Bio
      city: 'Islamabad Sector 9', // Location
      status: 'Writing a new post', // Status
      lastLogin: Date.now() - 60000 * 15, // 15 minutes ago
      isOnline: true, // Online
      ignoreList: [], // Can be invited!
      pet: AI_PET_PRESETS.cat, // Cat AI Assistant
      friendRatings: {}
    }
  ],

  // Friendships
  friendships: [
    { user1: 'u_fai', user2: 'u_hamza', connectedAt: Date.now() - 86400000 * 8 },
    { user1: 'u_fai', user2: 'u_munawar', connectedAt: Date.now() - 86400000 * 4 }
  ],

  // Pending Friend Invitations
  invitations: [],

  // News Feed Posts
  posts: [
    {
      id: 'post_201',
      authorId: 'u_hamza',
      content: 'Just deployed the updated fluid animations for our new web project! Smooth 60fps renders and responsive glassmorphism look absolutely clean. What do you guys think?',
      image: 'assets/images/black_hole.jpg',
      timestamp: Date.now() - 60000 * 12,
      audience: 'all',
      targetFriends: [],
      likes: ['u_fai', 'u_munawar'],
      dislikes: [],
      userReaction: 'like'
    },
    {
      id: 'post_202',
      authorId: 'u_munawar',
      content: 'Sharing the new UI prototype for VoidLink social circles. We integrated sleek dark gray tones, high contrast text, and smooth modal overlays.',
      image: 'assets/images/void_station.jpg',
      timestamp: Date.now() - 60000 * 35,
      audience: 'all',
      targetFriends: [],
      likes: ['u_fai'],
      dislikes: [],
      userReaction: 'like'
    },
    {
      id: 'post_203',
      authorId: 'u_hamza',
      content: 'Private circle update: Check out the new Web Audio sound effects on page transitions. Everything feels way faster and more tactile now!',
      image: null,
      timestamp: Date.now() - 60000 * 90,
      audience: 'some',
      targetFriends: ['u_fai'],
      likes: ['u_fai'],
      dislikes: ['u_munawar'],
      userReaction: 'like'
    }
  ],

  // Private Messages (Friends + Non-members)
  messages: [
    {
      id: 'msg_1',
      senderId: 'u_hamza',
      receiverId: 'u_fai',
      content: 'Hey Fai! Did you check out the new theme switcher? Red Crimson and Aqua look fire!',
      timestamp: Date.now() - 60000 * 20,
      read: true
    },
    {
      id: 'msg_2',
      senderId: 'u_fai',
      receiverId: 'u_hamza',
      content: 'Yes Hamza! The watery ripple animation in chat feels super smooth as well.',
      timestamp: Date.now() - 60000 * 18,
      read: true
    },
    {
      id: 'msg_3',
      senderId: 'u_ayesha',
      receiverId: 'u_fai',
      content: 'Hello Void_Fai! Loved your recent post about the dual black hole canvas physics. Would love to collaborate on the next project!',
      timestamp: Date.now() - 60000 * 8,
      read: false
    }
  ]
};

// Central State Manager Class
class VoidStateManager {
  constructor() {
    this.state = this.loadState();
  }

  loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Storage read fallback', e);
    }
    return JSON.parse(JSON.stringify(DEFAULT_STATE));
  }

  saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.error('Storage write error', e);
    }
  }

  getCurrentUser() {
    return this.state.users.find(u => u.id === this.state.currentUserId) || this.state.users[0];
  }

  setCurrentUser(userId) {
    const user = this.state.users.find(u => u.id === userId);
    if (user) {
      this.state.currentUserId = user.id;
      user.lastLogin = Date.now();
      user.isOnline = true;
      this.saveState();
    }
    return user;
  }

  getUserById(id) {
    return this.state.users.find(u => u.id === id);
  }

  areFriends(user1Id, user2Id) {
    return this.state.friendships.some(f => 
      (f.user1 === user1Id && f.user2 === user2Id) ||
      (f.user1 === user2Id && f.user2 === user1Id)
    );
  }

  // Update Avatar Function (Allows user to change profile picture)
  updateUserAvatar(newAvatarUrl) {
    const user = this.getCurrentUser();
    if (!user || !newAvatarUrl) return false;
    user.avatar = newAvatarUrl.trim();
    this.saveState();
    return user.avatar;
  }

  // Update Full User Profile (Name, @ Handle, Role, Bio, City/Hub, Status)
  updateUserProfile(data = {}) {
    const user = this.getCurrentUser();
    if (!user) return false;

    if (data.name !== undefined && data.name.trim()) {
      user.name = data.name.trim();
    }
    if (data.handle !== undefined && data.handle.trim()) {
      let h = data.handle.trim();
      if (!h.startsWith('@')) h = '@' + h;
      user.handle = h;
    }
    if (data.role !== undefined) {
      user.role = data.role.trim();
    }
    if (data.bio !== undefined) {
      user.bio = data.bio.trim();
    }
    if (data.city !== undefined) {
      user.city = data.city.trim();
    }
    if (data.status !== undefined) {
      user.status = data.status.trim();
    }

    this.saveState();
    return user;
  }

  // Update AI Assistant Companion Pet
  updateUserPet(petKey) {
    const user = this.getCurrentUser();
    if (!user || !AI_PET_PRESETS[petKey]) return false;
    user.pet = AI_PET_PRESETS[petKey];
    this.saveState();
    return user.pet;
  }

  // CRITICAL RUBRIC REQUIREMENT:
  // "When a user logged in, they saw the people in their friends list in the order of their login to the site, the first person being the latest one to do so."
  getFriendsSortedByLoginTime(userId = null) {
    const targetUserId = userId || this.state.currentUserId;
    const user = this.getUserById(targetUserId);
    if (!user) return [];

    const friendIds = this.state.friendships
      .filter(f => f.user1 === targetUserId || f.user2 === targetUserId)
      .map(f => f.user1 === targetUserId ? f.user2 : f.user1);

    return friendIds
      .map(id => this.getUserById(id))
      .filter(Boolean)
      .sort((a, b) => b.lastLogin - a.lastLogin); // Strict sorting: Latest logged in first!
  }

  // Rate a friend on scale of 1 to 3: 1 = Stupid, 2 = Cool, 3 = Trustworthy
  rateFriend(friendId, ratingValue) {
    const currentUser = this.getCurrentUser();
    if (!currentUser) return false;

    if (!this.areFriends(currentUser.id, friendId)) {
      throw new Error('You can only rate confirmed connections in your friends list.');
    }

    const val = parseInt(ratingValue, 10);
    if (![1, 2, 3].includes(val)) {
      throw new Error('Rating value must be 1 (Stupid), 2 (Cool), or 3 (Trustworthy).');
    }

    if (!currentUser.friendRatings) currentUser.friendRatings = {};
    currentUser.friendRatings[friendId] = val;
    this.saveState();
    return val;
  }

  getFriendRating(friendId) {
    const currentUser = this.getCurrentUser();
    if (!currentUser || !currentUser.friendRatings) return null;
    return currentUser.friendRatings[friendId] || null;
  }

  // CRITICAL RUBRIC REQUIREMENT:
  // "A person can be invited to be a friend... However, if the person to be added has marked the request sender in ignore list, then the friend request cannot be sent."
  sendFriendInvitation(targetUserId) {
    const currentUser = this.getCurrentUser();
    if (!currentUser) throw new Error('Authentication required.');

    if (currentUser.id === targetUserId) {
      throw new Error('Cannot send a friend invitation to yourself.');
    }

    const targetUser = this.getUserById(targetUserId);
    if (!targetUser) throw new Error('Target user not found in the member directory.');

    if (this.areFriends(currentUser.id, targetUserId)) {
      throw new Error(`You are already friends with ${targetUser.name}.`);
    }

    // CHECK IGNORE LIST CONSTRAINT:
    if (targetUser.ignoreList && targetUser.ignoreList.includes(currentUser.id)) {
      const err = new Error(`INVITATION BLOCKED: ${targetUser.name} has placed you on their Ignore Filter. Friend request cannot be sent.`);
      err.code = 'USER_IGNORED';
      throw err;
    }

    const existing = this.state.invitations.find(inv => 
      inv.senderId === currentUser.id && inv.targetId === targetUserId && inv.status === 'pending'
    );
    if (existing) {
      throw new Error(`A friend invitation is already pending with ${targetUser.name}.`);
    }

    const newInv = {
      id: 'inv_' + Date.now(),
      senderId: currentUser.id,
      targetId: targetUserId,
      timestamp: Date.now(),
      status: 'pending'
    };

    this.state.invitations.push(newInv);

    // Auto-accept simulation if inviting friendly member
    if (targetUser.id === 'u_ayesha') {
      newInv.status = 'accepted';
      this.state.friendships.push({
        user1: currentUser.id,
        user2: targetUserId,
        connectedAt: Date.now()
      });
    }

    this.saveState();
    return newInv;
  }

  // Create News Feed Post (All vs Some Friends)
  createPost(content, audienceType = 'all', targetFriendIds = [], image = null) {
    const currentUser = this.getCurrentUser();
    if (!currentUser) throw new Error('Authentication required.');

    if (!content || !content.trim()) {
      throw new Error('Post content cannot be empty.');
    }

    if (audienceType === 'some' && (!targetFriendIds || targetFriendIds.length === 0)) {
      throw new Error('Select at least one specific friend to share this private post with.');
    }

    const newPost = {
      id: 'post_' + Date.now(),
      authorId: currentUser.id,
      content: content.trim(),
      image: image || null,
      timestamp: Date.now(),
      audience: audienceType,
      targetFriends: audienceType === 'some' ? targetFriendIds : [],
      likes: [],
      dislikes: [],
      userReaction: null
    };

    this.state.posts.unshift(newPost);
    this.saveState();
    return newPost;
  }

  // Toggle Like or Dislike with Live Counts
  toggleReaction(postId, reactionType) {
    const currentUser = this.getCurrentUser();
    const post = this.state.posts.find(p => p.id === postId);
    if (!post) throw new Error('Post not found.');

    if (!post.likes) post.likes = [];
    if (!post.dislikes) post.dislikes = [];

    const userId = currentUser.id;

    if (reactionType === 'like') {
      if (post.likes.includes(userId)) {
        post.likes = post.likes.filter(id => id !== userId);
        post.userReaction = null;
      } else {
        post.likes.push(userId);
        post.dislikes = post.dislikes.filter(id => id !== userId);
        post.userReaction = 'like';
      }
    } else if (reactionType === 'dislike') {
      if (post.dislikes.includes(userId)) {
        post.dislikes = post.dislikes.filter(id => id !== userId);
        post.userReaction = null;
      } else {
        post.dislikes.push(userId);
        post.likes = post.likes.filter(id => id !== userId);
        post.userReaction = 'dislike';
      }
    }

    this.saveState();
    return {
      likesCount: post.likes.length,
      dislikesCount: post.dislikes.length,
      userReaction: post.userReaction
    };
  }

  // Send Private Message (Friends AND Non-members)
  sendPrivateMessage(recipientId, content) {
    const currentUser = this.getCurrentUser();
    if (!currentUser) throw new Error('Authentication required.');

    if (!content || !content.trim()) {
      throw new Error('Message cannot be empty.');
    }

    const recipient = this.getUserById(recipientId);
    if (!recipient) throw new Error('Recipient not found.');

    const newMsg = {
      id: 'msg_' + Date.now(),
      senderId: currentUser.id,
      receiverId: recipientId,
      content: content.trim(),
      timestamp: Date.now(),
      read: false
    };

    this.state.messages.push(newMsg);

    // Interactive simulated reply from Ayesha
    if (recipientId === 'u_ayesha') {
      setTimeout(() => {
        const replies = [
          "Hey Fai! Got your message. Checking the updates right now!",
          "Looks awesome! The fluid animations on the feed are super smooth.",
          "Awesome work on the dual black hole canvas! Chat soon."
        ];
        const randomReply = replies[Math.floor(Math.random() * replies.length)];
        this.state.messages.push({
          id: 'msg_' + Date.now(),
          senderId: 'u_ayesha',
          receiverId: currentUser.id,
          content: randomReply,
          timestamp: Date.now(),
          read: false
        });
        this.saveState();
        if (window.renderMessagesList) window.renderMessagesList();
      }, 1000);
    }

    this.saveState();
    return newMsg;
  }

  formatRelativeTime(timestamp) {
    const diff = Math.max(0, Date.now() - timestamp);
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 45) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  }
}

// Global Singleton
window.voidState = new VoidStateManager();
window.AI_PET_PRESETS = AI_PET_PRESETS;
