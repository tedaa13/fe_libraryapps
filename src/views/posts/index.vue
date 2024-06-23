<template>
  <div class="container mt-custom">
    <div class="row">
      <div class="col-md-12">
        <div class="card border-0 rounded shadow">
          <div class="card-body">
            <h4>DATA BOOK</h4>
            <hr>
            <router-link :to="{name: 'posts.create'}" class="btn btn-md btn-success">NEW BOOK</router-link>
            <hr>
            <table id="booksTable" class="table table-striped table-bordered mt-4" style="width: 100%" name="turbolinks-cache-control" content="no-cache">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">BOOK TITLE</th>
                  <th scope="col">ISBN</th>
                  <th scope="col">AUTHOR</th>
                  <th scope="col">LOCATION</th>
                  <th scope="col">STATUS</th>
                </tr>
              </thead>
            </table>

            <!-- <table class="table table-striped table-bordered mt-4">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">BOOK TITLE</th>
                  <th scope="col">ISBN</th>
                  <th scope="col">AUTHOR</th>
                  <th scope="col">LOCATION</th>
                  <th scope="col">STATUS</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(post, index) in posts" :key="index">
                  <td>{{ post.title }}</td>
                  <td>{{ post.isbn }}</td>
                  <td>{{ post.author }}</td>
                  <td>{{ post.location_name }} - {{ post.row_location }} - {{ post.col_location }}</td>
                  <td>{{ post.status_desc }}</td>
                </tr>
              </tbody>
            </table> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import $ from "jquery";
import { onMounted, ref } from 'vue';

export default {
  setup() {
    //reactive state
    let posts = ref([]);

    //mounted
    onMounted(() => {
        getDataBooks();
    })

    function getDataBooks() {
      //get API from Express Backend
      axios.get('http://localhost:4000/books').then(response => {
        
        $("#booksTable").DataTable({
          data: response.data.data,
          bDestroy: true,
          columns: [
              { data: "title" },
              { data: "isbn" },
              { data: "author" },
              { data: "location_name" },
              { data: "status_desc" }
          ],
        });
        // posts.value = response.data.data;
      }).catch(error => {
        console.log(error.response.data)
      })
    }

    //return
    return {
      posts,
      getDataBooks
    }
  }
}
</script>
<style>
</style>