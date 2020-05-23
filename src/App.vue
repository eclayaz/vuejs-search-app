<template>
  <div id="app" class="container">
    <ErrorBoundary>
      <h1>Search App</h1>
      <Errors v-bind:errors="errors" />
      <Search v-on:search="searchEntity" v-on:formError="clearResults" />
      <hr />
      <Result v-bind:results="results" />
    </ErrorBoundary>
  </div>
</template>

<script src="./App.js"></script>

<style src="./App.css"></style>
