<script setup>
    import ArgonInput from "@/components/ArgonInput.vue";
    import ArgonButton from "@/components/ArgonButton.vue";

    import { onMounted, ref } from 'vue';
    import Api from "../../api";
    import Swal from "sweetalert2";

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
        blog: '',
        desc: '',
        status: 1,
        recident_id: ''
    });
    const recident = ref([])

    const updateName = (value) => {
        inputParams.value.name = value;
    };
    const updateBlog = (value) => {
        inputParams.value.blog = value;
    };
    const updateDescription = (value) => {
        inputParams.value.desc = value;
    };
    const updateStatus = (value) => {
        inputParams.value.status = value;
    };
    const updateRecident = (value) => {
        inputParams.value.recident_id = value;
    };

    const getRecident = async () => {
        try {
            const response = await Api.get(`api/recident/list`)

            recident.value = response.data.data
            if (response.data.meta.code === 200) {
                inputParams.value.recident_id = response.data.data[0].id
            }
        } catch (error) {
            console.log('error: ', error);
        }
    }

    onMounted(() => {
        getRecident()
    })

    const Save = async () => {
        try {
            
            let formData = new FormData()

            formData.append('name', inputParams.value.name)
            formData.append('blog', inputParams.value.blog)
            formData.append('description', inputParams.value.desc)
            formData.append('status', inputParams.value.status)
            formData.append('recident_id', inputParams.value.recident_id)

            await Api.post(`api/house/store`, formData)
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
                        <router-link to="/house">
                            <argon-button color="success" size="sm" class="ms-auto mt-3">Kembali</argon-button>
                        </router-link>
                    </div>
                    <div class="card-body">
                        <p class="text-uppercase text-sm">Form Tambah Data Rumah</p>
                        <div class="row">
                            <div class="col-md-6">
                                <label for="example-text-input" class="form-control-label">Nama</label>
                                <argon-input type="text" @keyup="(updateName($event.target.value))" />
                            </div>
                            <div class="col-md-6">
                                <label for="example-text-input" class="form-control-label">Blog</label>
                                <argon-input type="text" @keyup="(updateBlog($event.target.value))" />
                            </div>
                            <div class="col-md-6">
                                <label for="example-text-input" class="form-control-label">Description</label>
                                <argon-input type="text" @change="(updateDescription($event.target.value))" />
                            </div>
                            <div class="col-md-6">
                                <label for="example-text-input" class="form-control-label">Status</label>
                                <select class="form-control" name="" id="" @change="(updateStatus($event.target.value))">
                                    <option value="1">Dihuni</option>
                                    <option value="0">Tidak Dihuni</option>
                                </select>
                            </div>
                            <div class="col-md-6">
                                <label for="example-text-input" class="form-control-label">Penghuni</label>
                                <select class="form-control" name="" id="" @change="(updateRecident($event.target.value))">
                                    <option v-for="(rc, index) in recident" :key="index" :value="rc.id">{{ rc.name }}</option>
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