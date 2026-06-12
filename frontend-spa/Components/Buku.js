export default {
  template: `
    <div class="p-8">
      <div class="flex justify-between items-center mb-4">
        <h1 class="text-2xl font-bold text-indigo-700">📖 Buku</h1>
        <button @click="openModal()" class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
          + Tambah Buku
        </button>
      </div>
      <div class="bg-white rounded-xl shadow overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="bg-indigo-600 text-white">
            <tr>
              <th class="px-4 py-3 text-left">No</th>
              <th class="px-4 py-3 text-left">Judul</th>
              <th class="px-4 py-3 text-left">Kategori</th>
              <th class="px-4 py-3 text-left">Penulis</th>
              <th class="px-4 py-3 text-left">Tahun</th>
              <th class="px-4 py-3 text-left">Stok</th>
              <th class="px-4 py-3 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(b, i) in list" :key="b.id" class="border-b hover:bg-gray-50">
              <td class="px-4 py-2">{{ i + 1 }}</td>
              <td class="px-4 py-2">{{ b.judul }}</td>
              <td class="px-4 py-2">{{ b.nama_kategori }}</td>
              <td class="px-4 py-2">{{ b.nama_penulis }}</td>
              <td class="px-4 py-2">{{ b.tahun_terbit }}</td>
              <td class="px-4 py-2">{{ b.stok }}</td>
              <td class="px-4 py-2 flex gap-2">
                <button @click="openModal(b)" class="bg-yellow-400 text-white px-3 py-1 rounded text-xs">Edit</button>
                <button @click="hapus(b.id)" class="bg-red-500 text-white px-3 py-1 rounded text-xs">Hapus</button>
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
          <h2 class="text-lg font-bold mb-4">{{ form.id ? 'Edit' : 'Tambah' }} Buku</h2>
          <input v-model="form.judul" placeholder="Judul Buku"
            class="w-full border rounded px-3 py-2 mb-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none"/>
          <select v-model="form.kategori_id" class="w-full border rounded px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-400">
            <option value="">-- Pilih Kategori --</option>
            <option v-for="k in kategoriList" :key="k.id" :value="k.id">{{ k.nama_kategori }}</option>
          </select>
          <select v-model="form.penulis_id" class="w-full border rounded px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-400">
            <option value="">-- Pilih Penulis --</option>
            <option v-for="p in penulisList" :key="p.id" :value="p.id">{{ p.nama_penulis }}</option>
          </select>
          <input v-model="form.tahun_terbit" type="number" placeholder="Tahun Terbit"
            class="w-full border rounded px-3 py-2 mb-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none"/>
          <input v-model="form.stok" type="number" placeholder="Stok"
            class="w-full border rounded px-3 py-2 mb-4 focus:ring-2 focus:ring-indigo-400 focus:outline-none"/>
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
      list: [], kategoriList: [], penulisList: [],
      showModal: false,
      form: { id: null, judul: '', kategori_id: '', penulis_id: '', tahun_terbit: '', stok: 0 }
    };
  },
  async mounted() { await this.load(); },
  methods: {
    async load() {
      const [b, k, p] = await Promise.all([
        axios.get('/api/buku'),
        axios.get('/api/kategori'),
        axios.get('/api/penulis'),
      ]);
      this.list = b.data;
      this.kategoriList = k.data;
      this.penulisList = p.data;
    },
    openModal(data = null) {
      this.form = data ? { ...data } : { id: null, judul: '', kategori_id: '', penulis_id: '', tahun_terbit: '', stok: 0 };
      this.showModal = true;
    },
    async simpan() {
      if (this.form.id) {
        await axios.put(`/api/buku/${this.form.id}`, this.form);
      } else {
        await axios.post('/api/buku', this.form);
      }
      this.showModal = false;
      await this.load();
    },
    async hapus(id) {
      if (confirm('Yakin hapus buku ini?')) {
        await axios.delete(`/api/buku/${id}`);
        await this.load();
      }
    }
  }
};