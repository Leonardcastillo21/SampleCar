const supabase = window.supabase.createClient(
  "https://hkjmiuymldozjgyfinef.supabase.co",
  "sb_publishable_PzkCLOqYUr8eLZtShppSrQ_K97F-rnX"
);

// LOGIN GOOGLE
async function login() {
  await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: "https://sample-car.vercel.app"
    }
  });
}

// LOGOUT
async function logout() {
  await supabase.auth.signOut();
  location.reload();
}

// SHOW USER
async function loadUser() {
  const { data } = await supabase.auth.getUser();

  if (data.user) {
    document.getElementById("login").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
    document.getElementById("user").innerText = data.user.email;
  }
}

// AUTO DETECT LOGIN
supabase.auth.onAuthStateChange((event, session) => {
  if (session) {
    loadUser();
  } else {
    document.getElementById("login").style.display = "block";
    document.getElementById("dashboard").style.display = "none";
  }
});

// INIT
loadUser();
