const supabase = window.supabase.createClient(
  "https://hkjmiuymldozjgyfinef.supabase.co",
  "sb_publishable_PzkCLOqYUr8eLZtShppSrQ_K97F-rnX"
);

// LOGIN
async function login() {
  await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: window.location.origin
    }
  });
}

// LOGOUT
async function logout() {
  await supabase.auth.signOut();
  location.reload();
}

// TOGGLE MENU
function toggleMenu() {
  const menu = document.getElementById("menu");
  menu.style.display = menu.style.display === "block" ? "none" : "block";
}

// CHANGE PAGE
function show(name) {
  document.getElementById("content").innerHTML = `<h2>${name}</h2>`;
}

// CHECK USER SESSION
async function checkUser() {
  const { data } = await supabase.auth.getSession();

  if (data.session) {
    document.getElementById("loginPage").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
  }
}

checkUser();