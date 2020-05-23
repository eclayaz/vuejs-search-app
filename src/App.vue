<template>
  <div id="app" class="container">
    <h1>Search App</h1>
    <Search v-on:search="searchEntity" />
    <hr />
    <Result v-if="!results.lenth" v-bind:results="results" />
  </div>
</template>

<script src="./App.js"></script>

<style src="./App.css"></style>
