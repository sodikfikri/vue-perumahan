<script setup>
  import ArgonInput from "@/components/ArgonInput.vue";
  import ArgonButton from "@/components/ArgonButton.vue";
  import { ref, onMounted } from 'vue';
  import Api from "../../api";
  import Swal from "sweetalert2";

  const recident = ref([])

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

  const getRecident = async () => {
    try {
      const response = await Api.get(`api/recident/list`)

      recident.value = response.data.data
    } catch (error) {
      console.log(error);
    }
  }

  onMounted(() => {
      getRecident()
  })

  const inputParams = ref({
    nominal: '',
    desc: ''
  });
  const updateDescription = (value) => {
      inputParams.value.desc = value;
  };
  const updateNominal = (value) => {
      inputParams.value.nominal = value;
  };

  const Save = async () => {
    try {
        let formData = new FormData()

        formData.append('nominal', inputParams.value.nominal)
        formData.append('description', inputParams.value.desc)

        await Api.post(`api/expend`, formData)
            .then(response => {
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
                        <router-link to="/transaction">
                            <argon-button color="success" size="sm" class="ms-auto mt-3">Kembali</argon-button>
                        </router-link>
                    </div>
                    <div class="card-body">
                        <p class="text-uppercase text-sm">Form Payment</p>
                        <div class="row">
                            <div class="col-md-6">
                                <label for="example-text-input" class="form-control-label">Deskripsi Pengeluaran</label>
                                <argon-input type="text" @keyup="(updateDescription($event.target.value))" />
                            </div>
                            <div class="col-md-6">
                                <label for="example-text-input" class="form-control-label">Nominal</label>
                                <argon-input type="number" @keyup="(updateNominal($event.target.value))" />
                            </div>
                        </div>
                        <argon-button color="success" size="sm" class="ms-auto mt-3" @click="Save()">Save</argon-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>