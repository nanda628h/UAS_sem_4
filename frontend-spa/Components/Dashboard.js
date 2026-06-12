export default {
  template: `
    <div class="p-8">
      <h1 class="text-2xl font-bold text-indigo-700 mb-2">📊 Dashboard</h1>
      <p class="text-gray-500 mb-6">Selamat datang, {{ user.name }}</p>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div v-for="item in stats" :key="item.label"
          class="bg-white rounded-xl shadow p-5 text-center">
          <div class="text-3xl font-bold text-indigo-600">{{ item.value }}</div>
          <div class="text-gray-500 mt-1 text-sm">{{ item.label }}</div>
        </div>
      </div>
    </div>
  `,
  data() {
    return {
      stats: [],
      user: JSON.parse(localStorage.getItem('user') || '{"name":"Admin"}')
    };
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