<template>
  <div>
    <p>Result</p>
    <div v-bind:key="result._id" v-for="result in results">
      <ul>
        <li v-bind:key="value._id" v-for="(value, propertyName) in result">
          {{ propertyName }} : {{ value }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'resut',
  props: ['results'],
};
</script>

<style></style>
