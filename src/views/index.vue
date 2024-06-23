<template>
  <main class="container mt-custom">
    <div class="row">
      <div class="col-md-12">
        <div class="card border-0 rounded shadow">
          <div class="card-body">
            <h4>HISTORY TRANSACTION</h4>
            <hr>
            <router-link :to="{name: 'transactions.create'}" class="btn btn-md btn-success">NEW TRANSACTION</router-link>
            <hr>
            <table
              id="transactionsTable"
              class="table table-striped table-bordered mt-4"
              style="width: 100%"
            >
              <thead class="thead-dark">
                <tr>
                  <th scope="col">NO TRANSACTION</th>
                  <th scope="col">REQUEST DATE</th>
                  <th scope="col">NAME USER</th>
                  <th scope="col">NAME BOOK</th>
                  <th scope="col">RETURN DATE</th>
                  <th scope="col">DAY(S)</th>
                </tr>
              </thead>
            </table>

            <!-- <table class="table table-striped table-bordered mt-4">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">NO TRANSACTION</th>
                  <th scope="col">REQUEST DATE</th>
                  <th scope="col">NAME USER</th>
                  <th scope="col">NAME BOOK</th>
                  <th scope="col">RETURN DATE</th>
                  <th scope="col">DAY(S)</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(data, index) in transactions" :key="index">
                  <td>{{ data.no_transaction }}</td>
                  <td>{{ data.created_at }}</td>
                  <td>{{ data.name }}</td>
                  <td>{{ data.title }}</td>
                  <td>{{ data.return_date }}</td>
                  <td>{{ data.days }}</td>
                </tr>
              </tbody>
            </table> -->
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import axios from 'axios';
import $ from "jquery";
import { onMounted, ref } from 'vue';

export default {
  setup() {
    let transactions = ref([]);

    onMounted(() => {
      getDataTransaction()
    })

    function getDataTransaction() {
      axios.get('http://localhost:4000/transactions').then(response => {
        $("#transactionsTable").DataTable({
          data: response.data.data,
          columns: [
              { data: "no_transaction" },
              { data: "created_at" },
              { data: "name" },
              { data: "title" },
              { data: "return_date" },
              { data: "days" }
          ],
        });

        // transactions.value = response.data.data;
      }).catch(error => {
        console.log(error.response.data);
      })
    }

    //return
    return {
      transactions,
      getDataTransaction,
    }
  }
}
</script>

<style>

</style>