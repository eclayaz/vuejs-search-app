<template>
  <div v-if="errors.length > 0" class="alert alert-danger" role="alert">
    {{ errors }}
  </div>
</template>

<script src="./Errors.js"></script>
