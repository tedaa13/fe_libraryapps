<template>
  <div class="container mt-custom">
    <div class="row">
      <div class="col-md-12">
        <div class="card border-0 rounded shadow">
          <div class="card-body">
            <h4>NEW BOOK</h4>
            <hr>
            <form @submit.prevent="addBook">
                <div class="form-group">
                    <label for="title" class="font-weight-bold mb-2">ISBN</label>
                    <input type="text" class="form-control" v-model="post.isbn" placeholder="ISBN Number ...">
                </div>
                <div class="form-group">
                    <label for="title" class="font-weight-bold mb-2">Title</label>
                    <input type="text" class="form-control" v-model="post.title" placeholder="Title ...">
                </div>
                <div class="form-group">
                    <label for="title" class="font-weight-bold mb-2">Subtitle</label>
                    <input type="text" class="form-control" v-model="post.subtitle" placeholder="Subtitle ...">
                </div>
                <div class="form-group">
                    <label for="title" class="font-weight-bold mb-2">Author</label>
                    <input type="text" class="form-control" v-model="post.author" placeholder="Author ...">
                </div>
                <div class="form-group">
                    <label for="title" class="font-weight-bold mb-2">Published</label>
                    <input type="date" class="form-control" v-model="post.published" >
                </div>
                <div class="form-group">
                    <label for="title" class="font-weight-bold mb-2">Publisher</label>
                    <input type="text" class="form-control" v-model="post.publisher" placeholder="Publisher ...">
                </div>
                <div class="form-group">
                    <label for="title" class="font-weight-bold mb-2">Pages</label>
                    <input type="text" class="form-control" v-model="post.pages" placeholder="Pages ...">
                </div>
                <div class="form-group mt-3">
                    <label for="content" class="font-weight-bold mb-2">Description</label>
                    <textarea class="form-control" rows="4" v-model="post.description" placeholder="Description ..."></textarea>
                </div>
                <div class="form-group">
                    <label for="title" class="font-weight-bold mb-2">Website</label>
                    <input type="text" class="form-control" v-model="post.website" placeholder="Website ...">
                </div>
                <div class="form-group">
                    <label for="title" class="font-weight-bold mb-2">Location (Name - Row - Column)</label>
                    <select class="form-select" v-model="selected" aria-label="Default select example">
                      <option v-for="option in options" :key="option.id_location" :value="option.id_location">
                        {{ option.name }} - {{ option.row_location }} - {{ option.col_location }}
                      </option>
                    </select>
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
import { reactive, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import Swal from 'sweetalert2/dist/sweetalert2';

export default {
  setup() {
    const selected = ref('A');
    let options = ref([]);
    onMounted(() => {
        getDataLocation();
    });

    function getDataLocation() {
      axios.get('http://localhost:4000/locations')
      .then(response => {
        options.value = response.data.data;
      }).catch(error => {
        console.log(error.response.data)
      });
    }

    //state posts
    const post = reactive({
      isbn       : '',
      title      : '',
      subtitle   : '',
      author     : '',
      published  : '',
      publisher  : '',
      pages      : '',
      description: '',
      website    : '',
      location   : ''
    })

    //vue router
    const router = useRouter()

    //method addBook
    function addBook() {
      let isbn        = post.isbn;
      let title       = post.title;
      let subtitle    = post.subtitle;
      let author      = post.author;
      let published   = post.published;
      let publisher   = post.publisher;
      let pages       = post.pages;
      let description = post.description;
      let website     = post.website;
      let location    = selected.value;

      axios.post('http://localhost:4000/books', {
          isbn       : isbn       ,
          title      : title      ,
          subtitle   : subtitle   ,
          author     : author     ,
          published  : published  ,
          publisher  : publisher  ,
          pages      : pages      ,
          description: description,
          website    : website    ,
          id_location   : location
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
              name: 'posts.index'
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

    //return
    return {
        post,
        router,
        addBook,
        getDataLocation,
        options,
        selected
    }
  }
}
</script>