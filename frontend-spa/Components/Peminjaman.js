export default {
  template: `
    <div class="p-8">
      <div class="flex justify-between items-center mb-4">
        <h1 class="text-2xl font-bold text-indigo-700">📋 Peminjaman</h1>
        <button @click="openModal()" class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
          + Tambah Peminjaman
        </button>
      </div>
      <div class="bg-white rounded-xl shadow overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="bg-indigo-600 text-white">
            <tr>
              <th class="px-4 py-3 text-left">No</th>
              <th class="px-4 py-3 text-left">Anggota</th>
              <th class="px-4 py-3 text-left">Buku</th>
              <th class="px-4 py-3 text-left">Tgl Pinjam</th>
              <th class="px-4 py-3 text-left">Tgl Kembali</th>
              <th class="px-4 py-3 text-left">Status</th>
              <th class="px-4 py-3 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(p, i) in list" :key="p.id" class="border-b hover:bg-gray-50">
              <td class="px-4 py-2">{{ i + 1 }}</td>
              <td class="px-4 py-2">{{ p.nama_anggota }}</td>
              <td class="px-4 py-2">{{ p.judul_buku }}</td>
              <td class="px-4 py-2">{{ p.tgl_pinjam }}</td>
              <td class="px-4 py-2">{{ p.tgl_kembali || '-' }}</td>
              <td class="px-4 py-2">
                <span :class="p.status === 'dipinjam' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'"
                  class="px-2 py-1 rounded text-xs font-semibold">
                  {{ p.status }}
                </span>
              </td>
              <td class="px-4 py-2 flex gap-2">
                <button @click="openModal(p)" class="bg-yellow-400 text-white px-3 py-1 rounded text-xs">Edit</button>
                <button @click="hapus(p.id)" class="bg-red-500 text-white px-3 py-1 rounded text-xs">Hapus</button>
              </td>
            </tr>
            <tr v-if="list.length === 0">
              <td colspan="7" class="text-center py-4 text-gray-400">Belum ada data</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
          <h2 class="text-lg font-bold mb-4">{{ form.id ? 'Edit' : 'Tambah' }} Peminjaman</h2>
          <select v-model="form.anggota_id" class="w-full border rounded px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-400">
            <option value="">-- Pilih Anggota --</option>
            <option v-for="a in anggotaList" :key="a.id" :value="a.id">{{ a.nama }}</option>
          </select>
          <select v-model="form.buku_id" class="w-full border rounded px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-400">
            <option value="">-- Pilih Buku --</option>
            <option v-for="b in bukuList" :key="b.id" :value="b.id">{{ b.judul }}</option>
          </select>
          <input v-model="form.tgl_pinjam" type="date"
            class="w-full border rounded px-3 py-2 mb-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none"/>
          <input v-model="form.tgl_kembali" type="date"
            class="w-full border rounded px-3 py-2 mb-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none"/>
          <select v-model="form.status" class="w-full border rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400">
            <option value="dipinjam">Dipinjam</option>
            <option value="dikembalikan">Dikembalikan</option>
          </select>
          <div class="flex justify-end gap-2">
            <button @click="showModal=false" class="px-4 py-2 border rounded hover:bg-gray-100">Batal</button>
            <button @click="simpan" class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">Simpan</button>
          </div>
        </div>
      </div>
    </div>
  `,
  data() {
    return {
      list: [], anggotaList: [], bukuList: [],
      showModal: false,
      form: { id: null, anggota_id: '', buku_id: '', tgl_pinjam: '', tgl_kembali: '', status: 'dipinjam' }
    };
  },
  async mounted() { await this.load(); },
  methods: {
    async load() {
      const [p, a, b] = await Promise.all([
        axios.get('/api/peminjaman'),
        axios.get('/api/anggota'),
        axios.get('/api/buku'),
      ]);
      this.list = p.data;
      this.anggotaList = a.data;
      this.bukuList = b.data;
    },
    openModal(data = null) {
      this.form = data
        ? { ...data }
        : { id: null, anggota_id: '', buku_id: '', tgl_pinjam: '', tgl_kembali: '', status: 'dipinjam' };
      this.showModal = true;
    },
    async simpan() {
      if (this.form.id) {
        await axios.put(`/api/peminjaman/${this.form.id}`, this.form);
      } else {
        await axios.post('/api/peminjaman', this.form);
      }
      this.showModal = false;
      await this.load();
    },
    async hapus(id) {
      if (confirm('Yakin hapus peminjaman ini?')) {
        await axios.delete(`/api/peminjaman/${id}`);
        await this.load();
      }
    }
  }
};