<script setup>
    import { ref, onMounted } from 'vue';
    import { useRoute } from 'vue-router';
    import Api from '../../../api';

    const historyHouuse = ref([])

    const route = useRoute();
    const id = route.params.id;

    const getHistoryHouse = async () => {
        try {
            const response = await Api.get(`api/house/history/${id}`)

            historyHouuse.value = response.data.data
        } catch (error) {
            console.log(error);
        }
    }

    onMounted(() => {
        getHistoryHouse()
    })
</script>

<template>
    <!-- <div class="card">
        <div class="card-header pb-0">
            <div class="row">
                <div class="col-6 d-flex align-items-center">
                    <h6>Data Rumah</h6>
                </div>
            </div>
        </div> -->
        <!-- <div class="card-body px-0 pt-0 pb-2"> -->
            <div class="table-responsive p-0">
                <table class="table table-striped align-items-center mb-0">
                <thead>
                    <tr>
                        <th class="text-uppercase text-center text-secondary text-xxs font-weight-bolder opacity-7">
                            No
                        </th>
                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                            Nama Penghuni
                        </th>
                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            Nama Rumah
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(hs, index) in historyHouuse" :key="index">
                        <td class="text-xs text-center text-secondary">{{ index+1 }}</td>
                        <td class="text-xs text-secondary">{{ hs.recident_name }}</td>
                        <td class="text-xs text-secondary">{{ hs.house_name }}</td>
                    </tr>
                </tbody>
                </table>
            </div>
        <!-- </div>
    </div> -->
</template>