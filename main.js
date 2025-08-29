// main.js
// Forum logic for OpenBoards prototype

let state = {
    currentUser: null,
    users: [], // {username, password}
    posts: []  // {title, content, user}
};

function $(id) { return document.getElementById(id); }
function showView(view) {
    ['feed','create','profile','login','signup'].forEach(v => {
        $(v+'View').classList.add('hidden');
        if ($("nav"+v.charAt(0).toUpperCase()+v.slice(1))) $("nav"+v.charAt(0).toUpperCase()+v.slice(1)).classList.remove('active');
    });
    $(view+'View').classList.remove('hidden');
    if ($("nav"+view.charAt(0).toUpperCase()+view.slice(1))) $("nav"+view.charAt(0).toUpperCase()+view.slice(1)).classList.add('active');
}

function signup() {
    const username = $('signupUsername').value;
    const password = $('signupPassword').value;
    if (!username || !password) return alert("Enter username and password");
    if (state.users.find(u => u.username === username)) return alert("Username already exists");
    state.users.push({username, password});
    alert("Signup successful! You can now log in.");
    showView('login');
}

function login() {
    const username = $('loginUsername').value;
    const password = $('loginPassword').value;
    const user = state.users.find(u => u.username === username && u.password === password);
    if (!user) return alert("Invalid credentials");
    state.currentUser = user;
    $('profileUsername').textContent = user.username;
    updateProfilePosts();
    $('navCreate').classList.remove('hidden');
    $('navProfile').classList.remove('hidden');
    $('navLogout').classList.remove('hidden');
    $('navLogin').classList.add('hidden');
    $('navSignup').classList.add('hidden');
    showView('feed');
}

function logout() {
    state.currentUser = null;
    $('navCreate').classList.add('hidden');
    $('navProfile').classList.add('hidden');
    $('navLogout').classList.add('hidden');
    $('navLogin').classList.remove('hidden');
    $('navSignup').classList.remove('hidden');
    showView('login');
}

function createPost() {
    if (!state.currentUser) return alert("You must be logged in");
    const title = $('postTitle').value;
    const content = $('postContent').value;
    if (!title || !content) return alert("Please fill in both fields");
    state.posts.unshift({title, content, user: state.currentUser.username});
    $('postTitle').value = '';
    $('postContent').value = '';
    renderPosts();
    updateProfilePosts();
    showView('feed');
}

function renderPosts() {
    $('posts').innerHTML = '';
    state.posts.forEach(post => {
        const div = document.createElement('div');
        div.className = 'post';
        div.innerHTML = `<h3>${post.title}</h3><p>${post.content}</p><small>Posted by: ${post.user}</small>`;
        $('posts').appendChild(div);
    });
}

function updateProfilePosts() {
    if (!state.currentUser) return;
    const userPosts = state.posts.filter(p => p.user === state.currentUser.username);
    $('profilePosts').textContent = userPosts.length;
}

// Initial render
showView('feed');
renderPosts();
