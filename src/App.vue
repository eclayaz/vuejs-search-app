<template>
  <div id="app" class="container">
    <h1>Search App</h1>
    <Errors v-bind:errors="errors" />
    <Search v-on:search="searchEntity" />
    <hr />
    <Result v-bind:results="results" />
  </div>
</template>

<script src="./App.js"></script>

<style src="./App.css"></style>
