<template>
  <div>
    <p>Search Result</p>
    <div v-bind:key="result._id" v-for="result in results">
      <ul>
        <li v-bind:key="value._id" v-for="(value, propertyName) in result">
          {{ propertyName }} : {{ value }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script src="./Result.js"></script>

<style src="./Result.css" scoped></style>
