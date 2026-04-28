const supabase = window.supabase.createClient(
  "https://hkjmiuymldozjgyfinef.supabase.co",
  "PASTE_ANON_PUBLIC_KEY_HERE"
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
  }
});

// INIT
loadUser();
