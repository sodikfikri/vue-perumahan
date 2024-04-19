<script setup>
    import ArgonInput from "@/components/ArgonInput.vue";
    import ArgonButton from "@/components/ArgonButton.vue";
    import Swal from "sweetalert2";
    import { ref } from 'vue';

    import Api from "../../api";

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

    const inputParams = ref({
        name: '',
        nik: '',
        phone: '',
        is_merried: 1,
        status: 1,
        image_ktp: ''
    });

    const updateName = (value) => {
        inputParams.value.name = value;
    };
    const updateNik = (value) => {
        inputParams.value.nik = value;
    };
    const updateHp = (value) => {
        inputParams.value.phone = value;
    };
    const updateIsMerried = (value) => {
        inputParams.value.is_merried = value;
    };
    const updateStatus = (value) => {
        inputParams.value.status = value;
    };
    const updateImgKtp = (value) => {
        inputParams.value.image_ktp = value;
    };

    const Save = async () => {
        try {
            
            let formData = new FormData()

            formData.append('name', inputParams.value.name)
            formData.append('nik', parseInt(inputParams.value.nik))
            formData.append('phone', inputParams.value.phone)
            formData.append('is_merried', inputParams.value.is_merried)
            formData.append('image_ktp', inputParams.value.image_ktp)
            formData.append('status', inputParams.value.status)

            await Api.post(`api/recident/store`, formData)
                .then(response => {
                    console.log(response.data);
                    if (response.data.meta.code == 201) {
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
                    </div>
                    <div class="card-body">
                        <p class="text-uppercase text-sm">Form Tambah Data Penghuni</p>
                        <div class="row">
                            <div class="col-md-6">
                                <label for="example-text-input" class="form-control-label">Nama</label>
                                <argon-input type="text" @keyup="(updateName($event.target.value))" />
                            </div>
                            <div class="col-md-6">
                                <label for="example-text-input" class="form-control-label">NIK</label>
                                <argon-input type="number" @keyup="(updateNik($event.target.value))" />
                            </div>
                            <div class="col-md-6">
                                <label for="example-text-input" class="form-control-label">Foto Ktp</label>
                                <argon-input type="file" @change="(updateImgKtp($event.target.files[0]))" />
                            </div>
                            <div class="col-md-6">
                                <label for="example-text-input" class="form-control-label">Nomor Handphone</label>
                                <argon-input type="text" @keyup="(updateHp($event.target.value))" />
                            </div>
                            <div class="col-md-6">
                                <label for="example-text-input" class="form-control-label">Status Penikahan</label>
                                <select class="form-control" name="" id="" @change="(updateIsMerried($event.target.value))">
                                    <option value="1">Ya</option>
                                    <option value="0">Tidak</option>
                                </select>
                            </div>
                            <div class="col-md-6">
                                <label for="example-text-input" class="form-control-label">Status Penghuni</label>
                                <select class="form-control" name="" id="" @change="(updateStatus($event.target.value))">
                                    <option value="1">Tetap</option>
                                    <option value="0">Kontrak</option>
                                    <option value="2">Kontrak Habis</option>
                                </select>
                            </div>

                        </div>
                        <argon-button color="success" size="sm" class="ms-auto mt-3" @click="Save()">Create</argon-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>