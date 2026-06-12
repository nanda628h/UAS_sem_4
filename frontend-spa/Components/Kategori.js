export default {
  template: `
    <div class="p-8">
      <div class="flex justify-between items-center mb-4">
        <h1 class="text-2xl font-bold text-indigo-700">📂 Kategori</h1>
        <button @click="openModal()" class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
          + Tambah Kategori
        </button>
      </div>
      <div class="bg-white rounded-xl shadow overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="bg-indigo-600 text-white">
            <tr>
              <th class="px-4 py-3 text-left">No</th>
              <th class="px-4 py-3 text-left">Nama Kategori</th>
              <th class="px-4 py-3 text-left">Deskripsi</th>
              <th class="px-4 py-3 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(k, i) in list" :key="k.id" class="border-b hover:bg-gray-50">
              <td class="px-4 py-2">{{ i + 1 }}</td>
              <td class="px-4 py-2">{{ k.nama_kategori }}</td>
              <td class="px-4 py-2">{{ k.deskripsi }}</td>
              <td class="px-4 py-2 flex gap-2">
                <button @click="openModal(k)" class="bg-yellow-400 text-white px-3 py-1 rounded text-xs">Edit</button>
                <button @click="hapus(k.id)" class="bg-red-500 text-white px-3 py-1 rounded text-xs">Hapus</button>
              </td>
            </tr>
            <tr v-if="list.length === 0">
              <td colspan="4" class="text-center py-4 text-gray-400">Belum ada data</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
          <h2 class="text-lg font-bold mb-4">{{ form.id ? 'Edit' : 'Tambah' }} Kategori</h2>
          <input v-model="form.nama_kategori" placeholder="Nama Kategori"
            class="w-full border rounded px-3 py-2 mb-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none"/>
          <textarea v-model="form.deskripsi" placeholder="Deskripsi"
            class="w-full border rounded px-3 py-2 mb-4 focus:ring-2 focus:ring-indigo-400 focus:outline-none"></textarea>
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
      list: [], showModal: false,
      form: { id: null, nama_kategori: '', deskripsi: '' }
    };
  },
  async mounted() { await this.load(); },
  methods: {
    async load() {
      const res = await axios.get('/api/kategori');
      this.list = res.data;
    },
    openModal(data = null) {
      this.form = data ? { ...data } : { id: null, nama_kategori: '', deskripsi: '' };
      this.showModal = true;
    },
    async simpan() {
      if (this.form.id) {
        await axios.put(`/api/kategori/${this.form.id}`, this.form);
      } else {
        await axios.post('/api/kategori', this.form);
      }
      this.showModal = false;
      await this.load();
    },
    async hapus(id) {
      if (confirm('Yakin hapus kategori ini?')) {
        await axios.delete(`/api/kategori/${id}`);
        await this.load();
      }
    }
  }
};  