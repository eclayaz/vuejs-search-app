<template>
  <div>
    <h1>Search App</h1>

    Entity :
    <select v-model="entity">
      <option disabled value="">Please select..</option>
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
    <button>Search</button>
  </div>
</template>

<script>
export default {
  name: 'search',
  data() {
    return {
      entity: '',
      searchTerm: '',
      searchKey: '',
      searchableFields: {
        organizations: [
          '_id',
          'url',
          'external_id',
          'name',
          'domain_names',
          'created_at',
          'details',
          'shared_tickets',
          'tags',
        ],
        users: [
          '_id',
          'url',
          'external_id',
          'name',
          'alias',
          'created_at',
          'active',
          'verified',
          'shared',
          'locale',
          'timezone',
          'last_login_at',
          'email',
          'phone',
          'signature',
          'organization_id',
          'tags',
          'suspended',
          'role',
        ],
        tickets: [
          '_id',
          'url',
          'external_id',
          'created_at',
          'type',
          'subject',
          'description',
          'priority',
          'status',
          'submitter_id',
          'assignee_id',
          'organization_id',
          'tags',
          'has_incidents',
          'due_at',
          'via',
        ],
      },
    };
  },
  watch: {
    entity: function() {
      this.searchKey = '';
    },
  },
};
</script>

<style></style>
