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
    recident_id: '',
    house_id: '',
    house_name: '',
    type: '',
    nominal: '',
    payment_start: '',
    payment_end: ''
  });
  const updateType = (value) => {
      inputParams.value.type = value;
  };
  const updateNominal = (value) => {
      inputParams.value.nominal = value;
  };
  const updatePaymentStart = (value) => {
      inputParams.value.payment_start = value;
  };
  const updatePaymentEnd = (value) => {
      inputParams.value.payment_end = value;
  };
  const updateRecident = async (value) => {
      inputParams.value.recident_id = value;

      await Api.get(`api/payment/getHouse?recident_id=${value}`)
        .then(response => {
            if (response.data.meta.code == 200) {
              inputParams.value.house_name = response.data.data.name
              inputParams.value.house_id = response.data.data.id
            }else {
              inputParams.value.house_name = ''
              inputParams.value.house_id = ''
            }
        })
        .catch((error) => {
          console.log(error);
        })
  };

  const Save = async () => {
    try {
        let formData = new FormData()

        formData.append('recident_id', inputParams.value.recident_id)
        formData.append('house_id', inputParams.value.house_id)
        formData.append('type', inputParams.value.type)
        formData.append('nominal', inputParams.value.nominal)
        formData.append('payment_start', inputParams.value.payment_start)
        formData.append('payment_end', inputParams.value.payment_end)

        await Api.post(`api/payment`, formData)
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
                        <router-link to="/transaction">
                            <argon-button color="success" size="sm" class="ms-auto mt-3">Kembali</argon-button>
                        </router-link>
                    </div>
                    <div class="card-body">
                        <p class="text-uppercase text-sm">Form Payment</p>
                        <div class="row">
                            <div class="col-md-6">
                                <label for="example-text-input" class="form-control-label">Penghuni</label>
                                <select class="form-control" name="" id="" @change="(updateRecident($event.target.value))">
                                  <option value="">Pilih Penghuni</option>
                                    <option v-for="(rc, index) in recident" :key="index" :value="rc.id">{{ rc.name }}</option>
                                </select>
                            </div>
                            <div class="col-md-6">
                                <label for="example-text-input" class="form-control-label">Rumah</label>
                                <argon-input type="text" v-model="inputParams.house_name" />
                            </div>
                            <div class="col-md-6">
                                <label for="example-text-input" class="form-control-label">Pemabayaran</label>
                                <select class="form-control" name="" id="" @change="(updateType($event.target.value))">
                                  <option value="">Pilih Pembayaran</option>
                                  <option value="1">Iuran Satpam</option>
                                  <option value="2">Iuran Kebersihan</option>
                                  <option value="3">uang Sewa</option>
                                </select>
                            </div>
                            <div class="col-md-6">
                                <label for="example-text-input" class="form-control-label">Nominal</label>
                                <argon-input type="text" @keyup="(updateNominal($event.target.value))" />
                            </div>
                            <div class="col-md-6">
                                <label for="example-text-input" class="form-control-label">Tanggal Pembayaran</label>
                                <argon-input type="date" @change="(updatePaymentStart($event.target.value))" />
                            </div>
                            <div class="col-md-6">
                                <label for="example-text-input" class="form-control-label">Batas Pembayaran</label>
                                <argon-input type="date" @change="(updatePaymentEnd($event.target.value))" />
                            </div>
                        </div>
                        <argon-button color="success" size="sm" class="ms-auto mt-3" @click="Save()">Save</argon-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>