// 🔐 CONNECT SUPABASE
const supabase = window.supabase.createClient(
  "https://hkjmiuymldozjgyfinef.supabase.co",
  "sb_publishable_PzkCLOqYUr8eLZtShppSrQ_K97F-rnX"
);

// 🔐 LOGIN WITH GOOGLE
async function login() {
  await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: "https://sample-car.vercel.app" // ⚠️ PALITAN kung iba URL mo
    }
  });
}

// 🔐 LOGOUT
async function logout() {
  await supabase.auth.signOut();
  location.reload();
}

// 📱 MENU TOGGLE
function toggleMenu() {
  const menu = document.getElementById("menu");
  menu.style.display = menu.style.display === "block" ? "none" : "block";
}

// 📄 PAGE CHANGE
function show(name) {
  document.getElementById("content").innerHTML = `<h2>${name}</h2>`;
}

// 🔍 CHECK USER (on load)
async function checkUser() {
  const { data } = await supabase.auth.getSession();

  if (data.session) {
    showDashboard();
  } else {
    showLogin();
  }
}

// 🔁 LISTEN LOGIN STATE (IMPORTANT FIX)
supabase.auth.onAuthStateChange((event, session) => {
  if (session) {
    showDashboard();
  } else {
    showLogin();
  }
});

// 🎯 UI HANDLERS
function showDashboard() {
  document.getElementById("loginPage").style.display = "none";
  document.getElementById("dashboard").style.display = "block";
}

function showLogin() {
  document.getElementById("loginPage").style.display = "block";
  document.getElementById("dashboard").style.display = "none";
}

// 🚀 RUN
checkUser();
