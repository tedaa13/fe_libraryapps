<template>
  <div class="container mt-custom">
    <div class="row">
      <div class="card border-0 rounded shadow-sm">
        <div class="card-body">
          <h4>NEW USER</h4>
          <hr>
          <form @submit.prevent="addUser">
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
            <button type="submit" class="btn btn-primary mt-3">SIMPAN</button>
          </form>             
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { reactive } from 'vue';
  import { useRouter } from 'vue-router';
  import axios from 'axios'
  import Swal from 'sweetalert2/dist/sweetalert2';

  export default {
    setup() {
      const user = reactive({
        name       : '',
        email      : '',
        address    : ''
      });

      const router = useRouter();

      function addUser() {
        let name       = user.name;
        let email      = user.email;
        let address    = user.address;

        axios.post('http://localhost:4000/users', {
          name       : name       ,
          email      : email      ,
          address    : address   
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
            });
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
        });
      }

      return {
        user,
        router,
        addUser
      }
    }
  }
</script>

<style>

</style>
<!-- <template>
  <div class="container mt-custom">
    <div class="row">
      <div class="col-md-12">
        <div class="card border-0 rounded shadow">
          <div class="card-body">
            <h4>NEW USER</h4>
            <hr>
            <form @submit.prevent="addUser">
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
                <button type="submit" class="btn btn-primary mt-3">SIMPAN</button>
            </form>                        
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import Swal from 'sweetalert2/dist/sweetalert2';

export default {
  setup() {
    const user = reactive({
      name       : '',
      email      : '',
      address    : ''
    })

    const router = useRouter();

    function addUser() {
      let name       = user.name;
      let email      = user.email;
      let address    = user.address;

      axios.post('http://localhost:4000/books', {
        name       : name       ,
        email      : email      ,
        address    : address   
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
          });
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
      });
    }

    return {
      user,
      router,
      addUser
    }
  }
}
</script> -->