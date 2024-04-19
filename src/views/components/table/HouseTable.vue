<script setup>

  import ArgonButton from "@/components/ArgonButton.vue";
  import { ref, onMounted } from 'vue';
  import Api from '../../../api';
  import Swal from "sweetalert2";

  const house = ref([])

  const getHouse = async () => {
    try {
      const response = await Api.get(`api/house/list`)
      console.log(response.data);
      house.value = response.data.data
    } catch (error) {
      console.log('error: ', error);
    }
  }

  onMounted(() => {
    getHouse()
  })

  const DeleteData = async (id) => {
    try {
      Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await Api.delete(`api/house/delete/${id}`)
                .then(response => {
                    if (response.data.meta.code === 200) {
                      getHouse()
                        Swal.fire({
                            title: "Success",
                            text: "You have successfully checked out.",
                            icon: "success"
                        });
                    } else {
                        Swal.fire({
                            title: "Error",
                            text: response.data.meta.message,
                            icon: "error"
                        });
                    }
                })
                .catch((error) => {
                    console.log('error: ', error);
                })
            }
        })
    } catch (error) {
      console.log('error: ', error);
    }
  }

</script>

<template>
  <div class="card">
    <div class="card-header pb-0">
      <div class="row">
          <div class="col-6 d-flex align-items-center">
              <h6>Data Rumah</h6>
          </div>
          <div class="col-6 text-end">
            <router-link to="/house/create">
              <argon-button color="success" size="sm" variant="gradient">Tambah Rumah</argon-button>
            </router-link>
          </div>
      </div>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead>
            <tr>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                Rumah
              </th>
              <th class="text-uppercase text-center text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                Blog
              </th>
              <th class="text-center text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                Status Rumah
              </th>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                Penghuni
              </th>
              <th class="text-uppercase text-center text-secondary text-xxs font-weight-bolder opacity-7">
                Status Penghuni
              </th>
              <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(hs, index) in house" :key="index">
              <td class="text-xs text-secondary">{{ hs.name }}</td>
              <td class="text-xs text-secondary text-center">{{ hs.blog }}</td>
              <td class="text-xs text-secondary text-center">
                <span class="badge bg-success">{{ hs.status }}</span>
              </td>
              <td class="text-xs text-secondary">{{ hs.recident_name }}</td>
              <td class="text-xs text-center text-secondary">
                <span class="badge bg-info">{{ hs.recident_status }}</span>
              </td>
              <td class="text-center">
                <router-link :to="'/house/history/' + hs.id">
                  <a class="btn btn-link text-dark px-3 mb-0" href="javascript:;">
                    <i class="fas fa-history text-dark me-2" aria-hidden="true"></i>Hitory
                  </a>
                </router-link>
                <router-link :to="'/house/update/' + hs.id">
                  <a class="btn btn-link text-primary px-3 mb-0" href="javascript:;">
                    <i class="fas fa-pencil-alt text-primary me-2" aria-hidden="true"></i>Edit
                  </a>
                </router-link>
                <a class="btn btn-link text-danger text-gradient px-3 mb-0" href="javascript:;" @click="DeleteData(hs.id)">
                  <i class="far fa-trash-alt me-2" aria-hidden="true"></i>Delete
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
