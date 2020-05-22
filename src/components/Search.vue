<template>
  <div>
    <h1>Search App</h1>
    <button>Organizations</button>
    <button>Users</button>
    <button>Tickets</button>

    <div>
      <p>Select field to search</p>
      <input type="radio" id="one" value="One" v-model="picked" />
      <label for="one">One</label>
      <br />
      <input type="radio" id="two" value="Two" v-model="picked" />
      <label for="two">Two</label>
    </div>

    <div>
      <p>Search Term</p>
      <input v-model="message" placeholder="search..." />
      <button>Search</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'search',
};
</script>

<style></style>
