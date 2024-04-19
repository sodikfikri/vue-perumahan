<script setup>

    import ArgonButton from "@/components/ArgonButton.vue";
    import { ref, onMounted } from 'vue';
    import Api from "../../../api";

    const data = ref([])

    const getData = async () => {
        try {
            const response = await Api.get('api/payment/list')

            data.value = response.data.data
        } catch (error) {
            console.log(error);
        }
    }

    onMounted(() => {
        getData()
    })

</script>
<template>
    <div class="table-responsive p-0 mt-3">
      <router-link to="/payment/trx" style="float: right;">
          <argon-button color="success" size="sm" variant="gradient">Tambah Pembayaran</argon-button>
      </router-link>
      <table class="table table-striped align-items-center mb-0">
        <thead>
            <tr>
                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                    Nama Penghuni
                </th>
                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                    Nama Rumah
                </th>
                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                    Pembayaran
                </th>
                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" style="text-align: right;">
                    Nominal
                </th>
                <th class="text-uppercase text-center text-secondary text-xxs font-weight-bolder opacity-7">
                    Tanggal Pembayaran
                </th>
                <th class="text-uppercase text-center text-secondary text-xxs font-weight-bolder opacity-7">
                    Batas Pemabayaran
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(val, index) in data" :key="index">
                <td class="text-xs text-secondary">{{ val.recident_name }}</td>
                <td class="text-xs text-secondary">{{ val.house_name }}</td>
                <td class="text-xs text-secondary">{{ val.type }}</td>
                <td class="text-xs text-secondary" style="text-align: right;">Rp. {{ new Intl.NumberFormat().format(val.nominal) }}</td>
                <td class="text-xs text-secondary text-center">{{ val.payment_start }}</td>
                <td class="text-xs text-secondary text-center">{{ val.payment_end }}</td>
            </tr>
        </tbody>
      </table>
  </div>
</template>
  
  