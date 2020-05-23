<template>
  <div id="app">
    <Search v-on:search="searchEntity" />
    <hr />
    <Result v-if="!results.lenth" v-bind:results="results" />
  </div>
</template>

<script src="./App.js"></script>

<style src="./App.css"></style>
