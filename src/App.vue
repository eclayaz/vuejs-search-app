<template>
  <div id="app">
    <Search v-on:search="searchEntity" />
    <hr />
    <Result v-if="!results.lenth" v-bind:results="results" />
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import Search from './components/Search.vue';
import Result from './components/Result.vue';
import searchEntity from './components/SearchEntity.js';

export default {
  name: 'App',
  components: {
    Search,
    Result,
  },
  data() {
    return {
      results: [],
    };
  },
  methods: {
    searchEntity(entity, searchKey, searchTerm) {
      this.results = searchEntity(entity, searchKey, searchTerm);
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
