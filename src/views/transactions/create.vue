<template>
    <div class="container mt-custom">
      <div class="row">
        <div class="col-md-12">
          <div class="card border-0 rounded shadow">
            <div class="card-body">
              <h4>NEW TRANSACTION</h4>
              <hr>
              <form @submit.prevent="addTransaction">
                  <div class="form-group">
                    <label for="title" class="font-weight-bold mb-2">Name</label>
                    <select class="form-select" v-model="selectedName" aria-label="Default select example">
                      <option v-for="data in options" :key="data.id_user" :value="data.id_user">
                        {{ data.name }}
                      </option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="title" class="font-weight-bold mb-2">Book</label>
                    <select name="id_book[]" class="form-select" v-model="selectedBook" aria-label="Default select example" multiple="true">
                      <option v-for="data in optBook" :key="data.id_book" :value="data.id_book">
                        {{ data.title }}
                      </option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="title" class="font-weight-bold mb-2">Day(s)</label>
                    <input type="number" min="1" max="14" value="1" class="form-control" v-model="post.days" placeholder="Day(s) ...">
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
  import { reactive, ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import axios from 'axios';
  import Swal from 'sweetalert2/dist/sweetalert2';
  
  export default {
    setup() {
      const selectedName = ref('');
      const selectedBook = ref([]);
      let options = ref([]);
      let optBook = ref([]);
      onMounted(() => {
          getDataNameUser();
          getDataBook();
      });
  
      function getDataNameUser() {
        axios.get('http://localhost:4000/users/trx/active')
        .then(response => {
          options.value = response.data.data;
        }).catch(error => {
          console.log(error.response.data)
        });
      }

      function getDataBook() {
        axios.get('http://localhost:4000/books/trx/available')
        .then(response => {
          optBook.value = response.data.data;
        }).catch(error => {
          console.log(error.response.data)
        });
      }
  
      //state posts
      const post = reactive({
        name   : '',
        book   : '',
        days   : ''
      })
  
      //vue router
      const router = useRouter()
  
      //method addTransaction
      function addTransaction() {
        let name    = selectedName.value;
        let book    = selectedBook.value;
        let days    = post.days;

        axios.post('http://localhost:4000/transactions', {
          name   : name,
          book   : book,
          days   : days   
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

            //redirect ke post index
            router.push({
                path: '/'
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
            text: error
          });
        });
      }
  
      //return
      return {
          post,
          router,
          addTransaction,
          getDataNameUser,
          options,
          selectedName,
          optBook,
          selectedBook
      }
    }
  }
  </script>