<template>
  <form @submit="checkForm">
    <h1>Search App</h1>

    <div v-if="errors.length">
      <b>Please correct the following error(s):</b>
      <ul>
        <li v-bind:key="id" v-for="(error, id) in errors">{{ error }}</li>
      </ul>
    </div>Entity :
    <select v-model="entity">
      <option disabled value>Please select..</option>
      <option value="organizations">Organizations</option>
      <option value="users">Users</option>
      <option value="tickets">Tickets</option>
    </select>
    <div v-if="entity !== '' && searchableFields.hasOwnProperty(entity)">
      <p>Select field:</p>
      <span v-bind:key="key" v-for="key in searchableFields[entity]">
        <input type="radio" :value="key" v-model="searchKey" /> &nbsp;
        <label for="one">{{ key }}</label>
      </span>
    </div>
    <div>
      Search Term :
      <input v-model="searchTerm" placeholder="search..." />
    </div>
    <input type="submit" value="Search" />
  </form>
</template>

<script>
import { keyData } from "../searchJson/JsonKeyMap";
export default {
  name: "search",
  data() {
    return {
      entity: "",
      searchKey: "",
      searchTerm: "",
      errors: [],
      searchableFields: keyData
    };
  },
  watch: {
    entity: function() {
      this.searchKey = "";
    }
  },
  methods: {
    checkForm: function(e) {
      e.preventDefault();

      if (this.entity && this.searchKey) {
        this.$emit("search", this.entity, this.searchKey, this.searchTerm);
      }

      this.errors = [];

      if (!this.entity) {
        this.errors.push("entity required.");
      }
      if (!this.searchKey) {
        this.errors.push("searchKey required.");
      }
    }
  }
};
</script>

<style></style>
