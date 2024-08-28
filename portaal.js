// Supabase client configureren
const supabaseUrl = 'https://okmqlmletbfohewbdwnh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9rbXFsbWxldGJmb2hld2Jkd25oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ4NzQ3MzUsImV4cCI6MjA0MDQ1MDczNX0.vXtGsB5d4i7asrK85igm15em-PgoUz9zA1Xrv0LM2Is';
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

async function handleLogin(event) {
    event.preventDefault(); // Voorkom dat het formulier wordt ingediend

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Probeer in te loggen via Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (error) {
        document.getElementById('error-message').style.display = 'block';
        console.error('Login error:', error.message);
    } else {
        console.log('User logged in:', data);
        // Sla de Supabase-gebruiker op in localStorage en ga naar index.html
        localStorage.setItem('currentLoggedInUserID', data.user.id);
        window.location.href = "index.html";
    }
}

// Koppel de login-functie aan de formuliersubmit-gebeurtenis
document.getElementById('loginForm').addEventListener('submit', handleLogin);
