<script setup>

    import ArgonInput from "@/components/ArgonInput.vue";
    import ArgonButton from "@/components/ArgonButton.vue";

    import { onMounted, ref } from 'vue';
    import Api from "../../api";
    import { useRoute } from "vue-router";
    import Swal from "sweetalert2";

    const route = useRoute();
    const id = route.params.id;

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

    const detailData = async () => {
        try {
            const response = await Api.get(`api/house/find/${id}`)
            const dataX = response.data.data

            inputParams.value.name = dataX.name
            inputParams.value.blog = dataX.blog
            inputParams.value.desc = dataX.description
            inputParams.value.status = dataX.status

            inputParams.value.recident_id = dataX.recident_id
        } catch (error) {
            console.log(error)
        }
    }

    const Save = async () => {
        try {
            
            let formData = new FormData()

            formData.append('id', id)
            formData.append('name', inputParams.value.name)
            formData.append('blog', inputParams.value.blog)
            formData.append('description', inputParams.value.desc)
            formData.append('status', inputParams.value.status)
            formData.append('recident_id', inputParams.value.recident_id)

            await Api.put(`api/house/update`, formData)
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

    onMounted(() => {
        getRecident()
        detailData()
    })

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
                        <p class="text-uppercase text-sm">Form Ubah Data Rumah</p>
                        <div class="row">
                            <div class="col-md-6">
                                <label for="example-text-input" class="form-control-label">Nama</label>
                                <argon-input type="text" v-model="inputParams.name" @keyup="(updateName($event.target.value))" />
                            </div>
                            <div class="col-md-6">
                                <label for="example-text-input" class="form-control-label">Blog</label>
                                <argon-input type="text" v-model="inputParams.blog" @keyup="(updateBlog($event.target.value))" />
                            </div>
                            <div class="col-md-6">
                                <label for="example-text-input" class="form-control-label">Description</label>
                                <argon-input type="text" v-model="inputParams.desc" @change="(updateDescription($event.target.value))" />
                            </div>
                            <div class="col-md-6">
                                <label for="example-text-input" class="form-control-label">Status</label>
                                <select class="form-control" name="" id="" @change="(updateStatus($event.target.value))">
                                    <option value="1" :selected="inputParams.status == '1'" >Dihuni</option>
                                    <option value="0" :selected="inputParams.status == '0'">Tidak Dihuni</option>
                                </select>
                            </div>
                            <div class="col-md-6">
                                <label for="example-text-input" class="form-control-label">Penghuni</label>
                                <select class="form-control" name="" id="" @change="(updateRecident($event.target.value))">
                                    <option selected>Pilih Penghuni</option>
                                    <option v-for="(rc, index) in recident" :key="index" :value="rc.id" :selected="inputParams.recident_id !== null && inputParams.recident_id === rc.id">{{ rc.name }}</option>
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