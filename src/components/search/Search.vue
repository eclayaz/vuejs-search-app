<template>
  <form @submit="checkForm">
    <div v-if="errors.length">
      <b>Please correct the following error(s):</b>
      <ul>
        <li v-bind:key="id" v-for="(error, id) in errors">{{ error }}</li>
      </ul>
    </div>

    <div class="row">
      <div class="col">
        <div class="mb-4">
          <label>Entity :</label>
          <select class="form-control" v-model="entity">
            <option disabled value>Please select..</option>
            <option value="organizations">Organizations</option>
            <option value="users">Users</option>
            <option value="tickets">Tickets</option>
          </select>
        </div>
        <div class="mb-4">
          <label>Search Term :</label>
          <input
            class="form-control"
            v-model="searchTerm"
            placeholder="search..."
          />
        </div>
      </div>
      <div class="col-8">
        <div v-if="entity !== '' && searchableFields.hasOwnProperty(entity)">
          <label>Field:</label>
          <div class="custom-control custom-radio">
            <span
              class="form-check form-check-inline"
              v-bind:key="key"
              v-for="key in searchableFields[entity]"
            >
              <input
                class="form-check-input"
                type="radio"
                :value="key"
                v-model="searchKey"
              />
              <label class="form-check-label" for="one">{{ key }}</label>
            </span>
          </div>
        </div>
      </div>
    </div>
    <button type="submit" class="btn btn-primary">Search</button>
  </form>
</template>

<script src="./Search.js"></script>

<style src="./Search.css" scoped></style>
