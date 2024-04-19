<script setup>
    import ArgonInput from "@/components/ArgonInput.vue";
    import ArgonButton from "@/components/ArgonButton.vue";
    import { ref, onMounted } from 'vue';
    import Api from "../../../api";

    const data = ref([])
    const filterDate = ref('')

    const UpdateFilterDate = (data) => {
      filterDate.value = data
    }

    const getData = async (params) => {
        try {
            const response = await Api.get('api/expend/list?filter_date='+params)

            data.value = response.data.data
        } catch (error) {
            console.log(error);
        }
    }

    onMounted(() => {
        getData(filterDate.value)
    })

    const FilterData = async () => {
      getData(filterDate.value)
    }

</script>
<template>
    <div class="table-responsive p-0 mt-3">
      <div class="row">
        <div class="col-md-3">
          <argon-input type="text" @keyup="(UpdateFilterDate($event.target.value))" />
        </div>
        <div class="col-md-3">
          <argon-button color="success" size="sm" variant="gradient" @click="FilterData()">Filter</argon-button>
        </div>
        <div class="col-md-6">
          <router-link to="/expend/trx" style="float: right;">
              <argon-button color="success" size="sm" variant="gradient">Tambah Pengeluaran</argon-button>
          </router-link>
        </div>
      </div>
      <table class="table table-striped align-items-center mb-0">
        <thead>
            <tr>
                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                    No
                </th>
                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                    Deskripsi Pengeluaran
                </th>
                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" style="text-align: right;">
                    Nominal
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(val, index) in data" :key="index">
                <td class="text-xs text-secondary">{{ index+1 }}</td>
                <td class="text-xs text-secondary">{{ val.description }}</td>
                <td class="text-xs text-secondary" style="text-align: right;">Rp. {{ new Intl.NumberFormat().format(val.nominal) }}</td>
            </tr>
        </tbody>
      </table>
  </div>
</template>
  
  