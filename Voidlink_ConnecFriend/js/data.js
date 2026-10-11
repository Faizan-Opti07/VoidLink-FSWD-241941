/* Demo data and browser-local state. No server calls are made. */
(function () {
  const people = [
    { id: "alex", name: "Alex Morgan", username: "alex", role: "You · Explorer", location: "Islamabad, Pakistan", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&h=160&fit=crop&crop=faces", lastLogin: 1000, online: true, isFriend: true, ignores: [], bio: "Collecting ideas, night skies, and conversations that make the universe feel a little smaller.", rating: 3 },
    { id: "maya", name: "Maya Chen", username: "mayachen", role: "Visual storyteller", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&h=160&fit=crop&crop=faces", lastLogin: 5, online: true, isFriend: true, ignores: [], bio: "Finding patterns in ordinary things.", rating: 2 },
    { id: "noah", name: "Noah Williams", username: "noahw", role: "Sound designer", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=160&h=160&fit=crop&crop=faces", lastLogin: 18, online: false, isFriend: true, ignores: [], bio: "Somewhere between sound and silence.", rating: 3 },
    { id: "amara", name: "Amara Okafor", username: "amarao", role: "Research & wonder", avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=160&h=160&fit=crop&crop=faces", lastLogin: 45, online: false, isFriend: true, ignores: [], bio: "Curiosity is a compass.", rating: 1 },
    { id: "leo", name: "Leo Park", username: "leopark", role: "Night-sky enthusiast", avatar: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=160&h=160&fit=crop&crop=faces", lastLogin: 120, online: false, isFriend: true, ignores: [], bio: "The sky is a story that never ends.", rating: 2 },
    { id: "sana", name: "Sana Rahman", username: "sanar", role: "Product thinker", avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=160&h=160&fit=crop&crop=faces", lastLogin: 240, online: true, isFriend: true, ignores: [], bio: "Building thoughtful things with thoughtful people.", rating: 3 },
    { id: "ethan", name: "Ethan Cole", username: "ethanc", role: "Indie maker", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&h=160&fit=crop&crop=faces", lastLogin: 360, online: false, isFriend: false, ignores: [], bio: "Making small things with a lot of heart.", rating: 0 },
    { id: "zara", name: "Zara Ali", username: "zaraa", role: "Writer & daydreamer", avatar: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=160&h=160&fit=crop&crop=faces", lastLogin: 480, online: true, isFriend: false, ignores: [], bio: "Notes from the edge of the ordinary.", rating: 0 },
    { id: "owen", name: "Owen Brooks", username: "owenb", role: "Developer", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=160&h=160&fit=crop&crop=faces", lastLogin: 600, online: false, isFriend: false, ignores: ["alex"], bio: "A little logic, a little magic.", rating: 0 },
    { id: "ivy", name: "Ivy Laurent", username: "ivyl", role: "Photographer", avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=160&h=160&fit=crop&crop=faces", lastLogin: 720, online: false, isFriend: false, ignores: [], bio: "Chasing light in quiet places.", rating: 0 }
  ];

  const seedPosts = [
    { id: "p1", authorId: "maya", text: "Spent the evening photographing the city after rain. Every streetlight looked like a tiny galaxy. Maybe wonder is just paying attention.", time: "18 min ago", image: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=1000&auto=format&fit=crop", likes: 18, dislikes: 1, audience: "all", reaction: null },
    { id: "p2", authorId: "noah", text: "Made a soundscape from recordings of wind, train tracks, and an old ceiling fan. It sounds like a memory of a place I've never been.", time: "42 min ago", image: "", likes: 12, dislikes: 0, audience: "all", reaction: null },
    { id: "p3", authorId: "amara", text: "A small reminder: you don't have to understand the whole universe to be amazed by one little part of it.", time: "1 hr ago", image: "", likes: 31, dislikes: 2, audience: "all", reaction: null },
    { id: "p4", authorId: "leo", text: "Clear skies tonight. If you can, step outside for two minutes and look up. It helps put the noisy stuff in perspective.", time: "3 hrs ago", image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1000&auto=format&fit=crop", likes: 24, dislikes: 0, audience: "all", reaction: null },
    { id: "p5", authorId: "sana", text: "Best part of building something is when someone tells you it made their day easier. That's the whole point, isn't it?", time: "5 hrs ago", image: "", likes: 9, dislikes: 1, audience: "all", reaction: null }
  ];

  const defaultState = () => ({
    currentUser: "alex",
    people: people.map(p => ({ ...p })),
    posts: seedPosts.map(p => ({ ...p })),
    messages: {},
    invited: [],
    loginTime: Date.now()
  });

  function getState() {
    try {
      const saved = localStorage.getItem("voidlink-state");
      if (saved) return JSON.parse(saved);
    } catch (error) {
      console.warn("Demo state could not be read; using seed data.", error);
    }
    const state = defaultState();
    saveState(state);
    return state;
  }

  function saveState(state) {
    try {
      localStorage.setItem("voidlink-state", JSON.stringify(state));
      return true;
    } catch (error) {
      console.warn("Demo state could not be saved.", error);
      return false;
    }
  }

  function person(id) {
    return getState().people.find(p => p.id === id);
  }

  function currentUser(state) {
    return state.people.find(p => p.id === state.currentUser) || state.people[0];
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, char => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[char]);
  }

  function timeSince(minutes) {
    if (minutes < 1) return "just now";
    if (minutes < 60) return `${minutes} min ago`;
    if (minutes < 1440) return `${Math.floor(minutes / 60)} hr ago`;
    return `${Math.floor(minutes / 1440)} days ago`;
  }

  window.VoidData = { getState, saveState, person, currentUser, escapeHtml, timeSince };
})();
