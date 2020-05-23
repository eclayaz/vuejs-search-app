<template>
  <div class="container">
    <h4>Search Result</h4>
    <div v-bind:key="result._id" v-for="result in results">
      <ul class="card plain-list">
        <li v-bind:key="value._id" v-for="(value, propertyName) in result">
          <span class="font-weight-bold upper-case">
            {{ propertyName }}
          </span>
          :
          <span>{{ formatObjectValue(value) }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script src="./Result.js"></script>

<style src="./Result.css" scoped></style>
