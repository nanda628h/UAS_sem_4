export default {
  template: `
    <div class="min-h-screen flex items-center justify-center bg-indigo-50">
      <div class="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
        <h2 class="text-2xl font-bold text-indigo-700 mb-6 text-center">🔐 Login Admin</h2>
        <div v-if="error" class="bg-red-100 text-red-600 text-sm px-3 py-2 rounded mb-3">{{ error }}</div>
        <input v-model="email" type="email" placeholder="Email"
          class="w-full border rounded px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"/>
        <input v-model="password" type="password" placeholder="Password"
          class="w-full border rounded px-3 py-2 mb-5 focus:outline-none focus:ring-2 focus:ring-indigo-400"/>
        <button @click="login"
          class="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 font-semibold">
          Login
        </button>
      </div>
    </div>
  `,
  data() {
    return { email: '', password: '', error: '' };
  },
  methods: {
    async login() {
      try {
        const res = await axios.post('/api/auth/login', {
          email: this.email, password: this.password
        });
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        this.$router.push('/dashboard');
      } catch(e) {
        this.error = 'Email atau password salah!';
      }
    }
  }
};