export default {
  template: `
    <div class="p-8">
      <div class="flex justify-between items-center mb-4">
        <h1 class="text-2xl font-bold text-indigo-700">👥 Anggota</h1>
        <button @click="openModal()" class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
          + Tambah Anggota
        </button>
      </div>
      <div class="bg-white rounded-xl shadow overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="bg-indigo-600 text-white">
            <tr>
              <th class="px-4 py-3 text-left">No</th>
              <th class="px-4 py-3 text-left">Nama</th>
              <th class="px-4 py-3 text-left">Email</th>
              <th class="px-4 py-3 text-left">No HP</th>
              <th class="px-4 py-3 text-left">Alamat</th>
              <th class="px-4 py-3 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(a, i) in list" :key="a.id" class="border-b hover:bg-gray-50">
              <td class="px-4 py-2">{{ i + 1 }}</td>
              <td class="px-4 py-2">{{ a.nama }}</td>
              <td class="px-4 py-2">{{ a.email }}</td>
              <td class="px-4 py-2">{{ a.no_hp }}</td>
              <td class="px-4 py-2">{{ a.alamat }}</td>
              <td class="px-4 py-2 flex gap-2">
                <button @click="openModal(a)" class="bg-yellow-400 text-white px-3 py-1 rounded text-xs">Edit</button>
                <button @click="hapus(a.id)" class="bg-red-500 text-white px-3 py-1 rounded text-xs">Hapus</button>
              </td>
            </tr>
            <tr v-if="list.length === 0">
              <td colspan="6" class="text-center py-4 text-gray-400">Belum ada data</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
          <h2 class="text-lg font-bold mb-4">{{ form.id ? 'Edit' : 'Tambah' }} Anggota</h2>
          <input v-model="form.nama" placeholder="Nama"
            class="w-full border rounded px-3 py-2 mb-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none"/>
          <input v-model="form.email" type="email" placeholder="Email"
            class="w-full border rounded px-3 py-2 mb-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none"/>
          <input v-model="form.no_hp" placeholder="No HP"
            class="w-full border rounded px-3 py-2 mb-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none"/>
          <textarea v-model="form.alamat" placeholder="Alamat"
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
      form: { id: null, nama: '', email: '', no_hp: '', alamat: '' }
    };
  },
  async mounted() { await this.load(); },
  methods: {
    async load() {
      const res = await axios.get('/api/anggota');
      this.list = res.data;
    },
    openModal(data = null) {
      this.form = data ? { ...data } : { id: null, nama: '', email: '', no_hp: '', alamat: '' };
      this.showModal = true;
    },
    async simpan() {
      if (this.form.id) {
        await axios.put(`/api/anggota/${this.form.id}`, this.form);
      } else {
        await axios.post('/api/anggota', this.form);
      }
      this.showModal = false;
      await this.load();
    },
    async hapus(id) {
      if (confirm('Yakin hapus anggota ini?')) {
        await axios.delete(`/api/anggota/${id}`);
        await this.load();
      }
    }
  }
};