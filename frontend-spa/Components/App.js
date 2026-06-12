export default {
  template: `
    <div>
      <nav v-if="isLoggedIn" class="bg-indigo-700 text-white px-6 py-3 flex justify-between items-center shadow">
        <span class="font-bold text-lg">📚 E-Library Digital</span>
        <div class="flex gap-4 text-sm items-center">
          <router-link to="/dashboard"  class="hover:underline">Dashboard</router-link>
          <router-link to="/buku"       class="hover:underline">Buku</router-link>
          <router-link to="/kategori"   class="hover:underline">Kategori</router-link>
          <router-link to="/penulis"    class="hover:underline">Penulis</router-link>
          <router-link to="/anggota"    class="hover:underline">Anggota</router-link>
          <router-link to="/peminjaman" class="hover:underline">Peminjaman</router-link>
          <button @click="logout" class="bg-red-500 px-3 py-1 rounded hover:bg-red-600">Logout</button>
        </div>
      </nav>
      <router-view />
    </div>
  `,
  data() {
    return {
      isLoggedIn: !!localStorage.getItem('isLoggedIn')
    };
  },
  watch: {
    $route() {
      this.isLoggedIn = !!localStorage.getItem('isLoggedIn');
    }
  },
  methods: {
    async logout() {
      try { await axios.post('/api/auth/logout'); } catch(e) {}
      localStorage.clear();
      this.isLoggedIn = false;
      this.$router.push('/login');
    }
  }
};