/**
 * VACUUM IN THE VOID - ENTRANCE AUTHENTICATION
 * Handles sign in credentials validation, session initiation & redirect.
 */

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form'); // Form element
  const usernameInput = document.getElementById('username-input'); // Username
  const passwordInput = document.getElementById('password-input'); // Password
  const errorBanner = document.getElementById('login-error-banner'); // Error banner

  // Pre-fill quick test accounts if buttons exist
  const quickAccountButtons = document.querySelectorAll('.quick-login-btn');
  quickAccountButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const u = btn.getAttribute('data-username'); // Username
      const p = btn.getAttribute('data-password'); // Password
      if (usernameInput) usernameInput.value = u; // Auto fill username
      if (passwordInput) passwordInput.value = p; // Auto fill password
      if (errorBanner) errorBanner.classList.add('hidden'); // Clear error
    });
  });

  // Handle Form Submission
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault(); // Stop normal form post
      const username = usernameInput ? usernameInput.value.trim() : ''; // Get user
      const password = passwordInput ? passwordInput.value.trim() : ''; // Get pass

      // Validate empty fields
      if (!username || !password) {
        showError('Gravitational telemetry incomplete. Please enter your Call-sign and Encryption key.');
        return;
      }

      // Check if user exists in voidState
      const users = window.voidState.state.users; // Get all users
      // Check username match (case insensitive by handle or name or id)
      const matchedUser = users.find(u => 
        u.handle.toLowerCase() === username.toLowerCase() ||
        u.handle.replace('@', '').toLowerCase() === username.toLowerCase() ||
        u.id.toLowerCase() === username.toLowerCase() ||
        u.name.toLowerCase() === username.toLowerCase()
      );

      if (!matchedUser) {
        showError('Access Denied: Quantum Call-sign not registered in the Void directory.');
        return;
      }

      // Any password is accepted for valid users as per assignment ("assume that all the users have account")
      // But validate minimum 3 characters
      if (password.length < 3) {
        showError('Access Denied: Encryption key length too weak (min 3 chars).');
        return;
      }

      // Successful login
      if (errorBanner) errorBanner.classList.add('hidden');
      const submitBtn = loginForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true; // Disable double clicks
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i> Crossing Event Horizon...';
      }

      // Set current user and update their login time to now
      window.voidState.setCurrentUser(matchedUser.id);

      // Trigger warp navigation to index.html (Home Feed)
      setTimeout(() => {
        window.navigateToPage('index.html'); // Warp to home feed
      }, 700);
    });
  }

  // Helper: Display visual error
  function showError(msg) {
    if (errorBanner) {
      errorBanner.textContent = msg; // Update text
      errorBanner.classList.remove('hidden'); // Show element
    }
    if (window.showToast) {
      window.showToast(msg, 'error'); // Fire toast
    }
  }
});
