export default {
  template: `
    <div class="min-h-screen bg-indigo-50">
      <div class="max-w-4xl mx-auto py-16 px-6">
        <div class="text-center mb-12">
          <h1 class="text-4xl font-bold text-indigo-700 mb-3">📚 E-Library Digital</h1>
          <p class="text-gray-500">Sistem Informasi Rental Buku & Komik Digital</p>
          <router-link to="/login"
            class="mt-6 inline-block bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700">
            Login Admin
          </router-link>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div v-for="item in stats" :key="item.label"
            class="bg-white rounded-xl shadow p-5 text-center">
            <div class="text-3xl font-bold text-indigo-600">{{ item.value }}</div>
            <div class="text-gray-500 mt-1 text-sm">{{ item.label }}</div>
          </div>
        </div>
      </div>
    </div>
  `,
  data() {
    return { stats: [] };
  },
  async mounted() {
    try {
      const res = await axios.get('/api/summary');
      this.stats = [
        { label: 'Total Buku',       value: res.data.total_buku },
        { label: 'Kategori',         value: res.data.total_kategori },
        { label: 'Anggota',          value: res.data.total_anggota },
        { label: 'Peminjaman Aktif', value: res.data.peminjaman_aktif },
      ];
    } catch(e) {}
  }
};