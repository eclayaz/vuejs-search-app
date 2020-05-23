<template>
  <form @submit="checkForm">
    <div class="row">
      <div class="col">
        <div class="mb-4">
          <label v-bind:class="{ 'text-danger': errors.entity }"
            >Entity *</label
          >
          <select
            class="form-control"
            v-bind:class="{ 'is-invalid': errors.entity }"
            v-model="entity"
          >
            <option disabled value>Please select..</option>
            <option value="organizations">Organizations</option>
            <option value="users">Users</option>
            <option value="tickets">Tickets</option>
          </select>
          <small class="text-danger" v-if="errors.entity">
            Must be selected.
          </small>
        </div>
        <div class="mb-4">
          <label>Search Term</label>
          <input
            class="form-control"
            v-model="searchTerm"
            placeholder="search..."
          />
        </div>
      </div>
      <div class="col-8">
        <div v-if="entity !== '' && searchableFields.hasOwnProperty(entity)">
          <label v-bind:class="{ 'text-danger': errors.field }">Field *</label>
          <div
            class="custom-control custom-radio"
            v-bind:class="{ 'is-invalid': errors.field }"
          >
            <span
              class="form-check form-check-inline radio"
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
          <small class="text-danger" v-if="errors.field">
            Must be selected.
          </small>
        </div>
      </div>
    </div>
    <button type="submit" class="btn btn-primary">Search</button>
  </form>
</template>

<script src="./Search.js"></script>

<style src="./Search.css" scoped></style>
