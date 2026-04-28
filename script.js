const supabase = window.supabase.createClient(
  "https://hkjmiuymldozjgyfinef.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhram1pdXltbGRvempneWZpbmVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcxNzkwODEsImV4cCI6MjA5Mjc1NTA4MX0.GconMr2mPWrvFvDFkPb4bLNbqTzObfx2r_k_IK9pSfw"
);

// 🔥 VERY IMPORTANT (para gumana button)
window.login = async function () {
  console.log("LOGIN CLICKED");

  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: window.location.origin
    }
  });

  if (error) {
    console.error("LOGIN ERROR:", error);
  }
};

window.logout = async function () {
  await supabase.auth.signOut();
  location.reload();
};

async function loadUser() {
  const { data } = await supabase.auth.getUser();

  if (data.user) {
    document.getElementById("login").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
    document.getElementById("user").innerText = data.user.email;
  } else {
    document.getElementById("login").style.display = "block";
    document.getElementById("dashboard").style.display = "none";
  }
}

supabase.auth.onAuthStateChange(() => {
  loadUser();
});

loadUser();
