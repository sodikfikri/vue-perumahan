<script setup>
    import ArgonButton from "@/components/ArgonButton.vue";
    import Swal from "sweetalert2";

    import { ref, onMounted } from 'vue';
    import api from "../../../api";

    const recidents = ref([]);
    const getRecident = async () => {
        try {
            const response = await api.get(`/api/recident/list`);
            recidents.value = response.data.data;
        } catch (error) {
            console.error('Terjadi kesalahan saat mengambil data penghuni:', error);
        }
    }

    onMounted(() => {
        getRecident()
    })

    const DeleteData = async (id) => {
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
                await api.delete(`api/recident/delete/${id}`)
                .then(response => {
                    if (response.data.meta.code === 200) {
                        getRecident()
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
    }


</script>
<template>
    <div class="card">
        <div class="card-header pb-0">
            <div class="row">
                <div class="col-6 d-flex align-items-center">
                    <h6>Data Penghuni</h6>
                </div>
                <div class="col-6 text-end">
                    <router-link to="/recident/create">
                        <argon-button color="success" size="sm" variant="gradient">Tambah Penghuni</argon-button>
                    </router-link>
                </div>
            </div>
        </div>
        <div class="card-body pt-4 p-3">
            <ul class="list-group">
                <li class="list-group-item border-0 p-4 mb-2 bg-gray-100 border-radius-lg">
                    <div class="row mt-3" v-for="(rc, index) in recidents" :key="index">
                        <div class="col-4">
                            <div class="d-flex flex-column">
                                <h6 class="mb-3 text-sm">{{ rc.name }}</h6>
                                <span class="mb-2 text-xs"> Status Penghuni:
                                    <span class="text-dark font-weight-bold ms-sm-2">{{ rc.status }}</span>
                                </span>
                                <span class="mb-2 text-xs"> Nomor Telepon:
                                    <span class="text-dark ms-sm-2 font-weight-bold" >{{ rc.phone }}</span>
                                </span>
                                <span class="text-xs"> Status Perkawinan:
                                    <span class="text-dark ms-sm-2 font-weight-bold">{{ rc.is_merried }}</span>
                                </span>
                            </div>
                        </div>
                        <div class="col-4">
                                <img
                                :src="rc.image_ktp"
                                alt="user1"
                                style="height: 7rem; border-radius: 20px;"
                                />
                        </div>
                        <div class="col-4">
                            <div class="ms-auto text-end">
                                <a class="btn btn-link text-danger text-gradient px-3 mb-0" href="javascript:;" @click="DeleteData(rc.id)">
                                    <i class="far fa-trash-alt me-2" aria-hidden="true"></i>Delete
                                </a>
                                <router-link :to="'/recident/update/' + rc.id">
                                    <a class="btn btn-link text-dark px-3 mb-0" href="javascript:;">
                                        <i class="fas fa-pencil-alt text-dark me-2" aria-hidden="true"></i>Edit
                                    </a>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>