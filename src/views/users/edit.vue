<template>
  <div class="container mt-custom">
    <div class="row">
      <div class="col-md-12">
        <div class="card border-0 rounded shadow">
          <div class="card-body">
            <h4>EDIT USER</h4>
            <hr>
            <form @submit.prevent="update">
              <div class="form-group">
                <label for="title" class="font-weight-bold mb-2">Name</label>
                <input type="text" class="form-control" v-model="user.name" placeholder="Name ...">
              </div>
              <div class="form-group">
                  <label for="title" class="font-weight-bold mb-2">Email</label>
                  <input type="text" class="form-control" v-model="user.email" placeholder="Email ...">
              </div>
              <div class="form-group">
                  <label for="title" class="font-weight-bold mb-2">Address</label>
                  <input type="text" class="form-control" v-model="user.address" placeholder="Address ...">
              </div>
              <div class="form-group">
                <label for="title" class="font-weight-bold mb-2">Status</label>
                <select class="form-select" v-model="selected"  aria-label="Default select example">
                  <option value="001">ACTIVE</option>
                  <option value="002">NOT ACTIVE</option>
                </select>
              </div>
              <button type="submit" class="btn btn-primary mt-3">UPDATE</button>
            </form>                        
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';
import Swal from 'sweetalert2/dist/sweetalert2';

export default {
  setup() {
    const selected = ref('001');
    const user = reactive({
        name: '',
        email: '',
        address: '',
        status: ''
    })

    //vue router
    const router = useRouter();

    //vue router
    const route = useRoute();

    //mounted
    onMounted(() => {
        //get API from Backend
        axios.get(`http://localhost:4000/users/${route.params.id}`)
        .then(response => {
          //assign state posts with response data
          user.name     = response.data.data[0].name;  
          user.email    = response.data.data[0].email;  
          user.address  = response.data.data[0].address;
          user.status   = response.data.data[0].id_status;
        }).catch(error => {
            console.log(error.response.data)
        })
    });

    //method update
    function update() {
        let name    = user.name;
        let email   = user.email;
        let address = user.address;
        let status  = selected.value;
      console.log("STATUS : ", status);
        axios.post(`http://localhost:4000/users/${route.params.id}`, {
          name    : name,
          email   : email,
          address : address,
          id_status  : status
        }).then(() => {
          Swal.fire({
            toast: true,
            position: 'bottom-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,

            icon: 'success',
            title: 'Data Submitted'
          });
          router.push({
              name: 'users.index'
          })
        }).catch(error => {
          Swal.fire({
            toast: true,
            position: 'bottom-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,

            icon: 'warning',
            title: 'Input Validation',
            text: error.response.data.errors
          });
        })
    }
    //return
    return {
      user,
      router,
      update,
      selected
    }
  }
}
</script>