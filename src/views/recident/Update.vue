<script setup>
    import ArgonInput from "@/components/ArgonInput.vue";
    import ArgonButton from "@/components/ArgonButton.vue";
    import { useRoute } from 'vue-router';
    const route = useRoute();
    const id = route.params.id;

    import { onMounted, ref } from 'vue';
    import api from "../../api";
    import Swal from "sweetalert2";

    const dataRc = ref({
        name: '',
        nik: '',
        phone: '',
        is_merried: '',
        status: '',
        image_ktp: ''
    });

    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });

    const getData = async () => {
        try {
            const response = await api.get(`api/recident/find/${id}`)
            const dataX = response.data.data
            dataRc.value.name = dataX.name
            dataRc.value.nik = dataX.nik
            dataRc.value.phone = dataX.phone
            dataRc.value.is_merried = dataX.is_merried
            dataRc.value.status = dataX.status
        } catch (error) {
            console.log('error: ', error);
        }
    }

    onMounted(() => {
        getData()
    })

    const updateName = (value) => {
        dataRc.value.name = value;
    };
    const updateNik = (value) => {
        dataRc.value.nik = value;
    };
    const updateHp = (value) => {
        dataRc.value.phone = value;
    };
    const updateIsMerried = (value) => {
        dataRc.value.is_merried = value;
    };
    const updateStatus = (value) => {
        dataRc.value.status = value;
    };
    const updateImgKtp = (value) => {
        dataRc.value.image_ktp = value;
    };

    const Save = async () => {
        try {
            
            let formData = new FormData()

            formData.append('id', id)
            formData.append('name', dataRc.value.name)
            formData.append('nik', parseInt(dataRc.value.nik))
            formData.append('phone', dataRc.value.phone)
            formData.append('is_merried', dataRc.value.is_merried)
            formData.append('image_ktp', dataRc.value.image_ktp)
            formData.append('status', dataRc.value.status)

            await api.put(`api/recident/update`, formData)
                .then(response => {
                    console.log(response.data);
                    if (response.data.meta.code == 200) {
                        Toast.fire({
                            icon: "success",
                            title: response.data.meta.message
                        });
                    } else {
                        Toast.fire({
                            icon: "error",
                            title: response.data.meta.message
                        });
                    }
                })
                .catch((error) => {
                    console.log('catch error: ', error);
                })
        } catch (error) {
            console.log('error: ', error);
        }
    }
</script>

<template>
    <div class="py-4 container-fluid">
      <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header pb-0">
                        <router-link to="/recident">
                            <argon-button color="success" size="sm" class="ms-auto mt-3">Kembali</argon-button>
                        </router-link>
                        <!-- <div class="d-flex align-items-center">
                            <p class="mb-0">Tambah Penghuni</p>
                        </div> -->
                    </div>
                    <div class="card-body">
                        <p class="text-uppercase text-sm">Form Ubah Data Penghuni</p>
                        <div class="row">
                            <div class="col-md-6">
                                <label for="example-text-input" class="form-control-label">Nama</label>
                                <argon-input type="text" v-model="dataRc.name" @keyup="(updateName($event.target.value))" />
                            </div>
                            <div class="col-md-6">
                                <label for="example-text-input" class="form-control-label">NIK</label>
                                <argon-input type="number" v-model="dataRc.nik" @keyup="(updateNik($event.target.value))" />
                            </div>
                            <div class="col-md-6">
                                <label for="example-text-input" class="form-control-label">Foto Ktp</label>
                                <argon-input type="file" @change="(updateImgKtp($event.target.files[0]))" />
                            </div>
                            <div class="col-md-6">
                                <label for="example-text-input" class="form-control-label">Nomor Handphone</label>
                                <argon-input type="text" v-model="dataRc.phone" @keyup="(updateHp($event.target.value))" />
                            </div>
                            <div class="col-md-6">
                                <label for="example-text-input" class="form-control-label">Status Penikahan</label>
                                <select class="form-control" name="" id="" @change="(updateIsMerried($event.target.value))">
                                    <option value="1" :selected="dataRc.is_merried == '1'">Ya</option>
                                    <option value="0" :selected="dataRc.is_merried == '0'">Tidak</option>
                                </select>
                            </div>
                            <div class="col-md-6">
                                <label for="example-text-input" class="form-control-label">Status Penghuni</label>
                                <select class="form-control" name="" id="" @change="(updateStatus($event.target.value))">
                                    <option value="1" :selected="dataRc.status == '1'">Tetap</option>
                                    <option value="0" :selected="dataRc.status == '0'">Kontrak</option>
                                    <option value="2" :selected="dataRc.status == '2'">Kontrak Habis</option>
                                </select>
                            </div>

                        </div>
                        <argon-button color="success" size="sm" class="ms-auto mt-3" @click="Save()">Update</argon-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>