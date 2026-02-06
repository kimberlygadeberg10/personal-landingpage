// Copilot: user list + search (clean single implementation)
// - Safely waits for DOMContentLoaded
// - Guards missing elements
// - Uses DocumentFragment and textContent to avoid XSS
// - Debounces input and precomputes lowercase fields for performance
document.addEventListener('DOMContentLoaded', () => {
  const userList = document.getElementById('user-list');
  const searchInput = document.getElementById('search-input');

  if (!userList || !searchInput) {
    // Not every page may include these elements; fail gracefully
    // eslint-disable-next-line no-console
    console.warn('Copilot script: user-list or search-input not found.');
    return;
  }

  const users = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com' },
    { id: 3, name: 'Charlie Brown', email: 'charlie@example.com' },
    { id: 4, name: 'Diana Prince', email: 'diana@example.com' },
    { id: 5, name: 'Eve Wilson', email: 'eve@example.com' },
  ];

  // Precompute lowercase fields for efficient filtering
  const usersProcessed = users.map((u) => ({
    ...u,
    nameLower: u.name.toLowerCase(),
    emailLower: u.email.toLowerCase(),
  }));

  function renderUsers(list) {
    userList.innerHTML = '';
    userList.setAttribute('role', 'list');

    const frag = document.createDocumentFragment();

    if (list.length === 0) {
      const p = document.createElement('p');
      p.textContent = 'No users found.';
      frag.appendChild(p);
    } else {
      list.forEach((u) => {
        const item = document.createElement('div');
        item.className = 'user-card';
        item.setAttribute('role', 'listitem');

        const h3 = document.createElement('h3');
        h3.textContent = u.name;

        const p = document.createElement('p');
        p.textContent = u.email;

        item.appendChild(h3);
        item.appendChild(p);
        frag.appendChild(item);
      });
    }

    userList.appendChild(frag);
  }

  // Debounce helper
  function debounce(fn, wait = 180) {
    let t = null;
    return (...args) => {
      if (t) clearTimeout(t);
      t = setTimeout(() => fn(...args), wait);
    };
  }

  const onInput = debounce(() => {
    const term = searchInput.value.trim().toLowerCase();
    if (!term) {
      renderUsers(usersProcessed);
      return;
    }

    const filtered = usersProcessed.filter((u) => u.nameLower.includes(term) || u.emailLower.includes(term));
    renderUsers(filtered);
  }, 150);

  // Initial render
  renderUsers(usersProcessed);

  // Event
  searchInput.addEventListener('input', onInput);
});
