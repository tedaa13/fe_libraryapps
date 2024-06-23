<template>
  <div class="container mt-custom">
    <div class="row">
      <div class="col-md-12">
        <div class="card border-0 rounded shadow">
          <div class="card-body">
            <h4>DATA USER</h4>
            <hr>
            <router-link :to="{name: 'users.create'}" class="btn btn-md btn-success">NEW USER</router-link>
            <hr>
            <!-- <table
              id="usersTable"
              class="table table-striped table-bordered mt-4"
              style="width: 100%"
            >
              <thead class="thead-dark">
                <tr>
                  <th scope="col">NAME</th>
                  <th scope="col">EMAIL</th>
                  <th scope="col">ADDRESS</th>
                  <th scope="col">STATUS</th>
                  <th scope="col">ACTION</th>
                </tr>
              </thead>
            </table> -->

            <table class="table table-striped table-bordered mt-4">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">NAME</th>
                  <th scope="col">EMAIL</th>
                  <th scope="col">ADDRESS</th>
                  <th scope="col">STATUS</th>
                  <th scope="col">ACTION</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(data, index) in users" :key="index">
                  <td>{{ data.name }}</td>
                  <td>{{ data.email }}</td>
                  <td>{{ data.address }}</td>
                  <td>{{ data.status_desc }}</td>
                  <td class="text-center">
                      <router-link :to="{name: 'users.edit', params:{id: data.id_user }}" class="btn btn-sm btn-primary me-2">EDIT</router-link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
// import $ from "jquery";
import { onMounted, ref } from 'vue';

export default {
  setup() {
    let users = ref([]);

    onMounted(() => {
        getDataUsers();
    })

    function getDataUsers() {
      axios.get('http://localhost:4000/users').then(response => {
        // $("#usersTable").DataTable({
        //   data: response.data.data,
        //   columns: [
        //       { data: "name" },
        //       { data: "email" },
        //       { data: "address" },
        //       { data: "status_desc" },
        //       { 
        //         data: 'id_user',
        //         render: function (idValue) {
        //           return `<a href="#" data-item-id="${idValue}" @onClick="resolveRouteFromClick()"" class="btn btn-sm btn-primary me-2">EDIT</a>`;
        //           // return '<router-link :to="{name: users.edit, params:{id: '+idValue+' }}" class="btn btn-sm btn-primary me-2">EDIT</router-link>';
        //         }, 
        //       }
        //   ],
        // });
        users.value = response.data.data;
      }).catch(error => {
        console.log(error.response.data)
      })
    }

    function resolveRouteFromClick(){
      alert("asd");
    }

    //return
    return {
      users,
      getDataUsers,
      resolveRouteFromClick
    }
  }
}
</script>