import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import ErrorBoundary from './components/errors/ErrorBoundary.vue';
import Errors from './components/errors/Errors.vue';
import Search from './components/search/Search.vue';
import Result from './components/result/Result.vue';
import searchEntity from './searchJson/SearchEntity.js';

export default {
  name: 'App',
  components: {
    ErrorBoundary,
    Errors,
    Search,
    Result,
  },
  data() {
    return {
      results: [],
      errors: '',
    };
  },
  methods: {
    async searchEntity(entity, searchKey, searchTerm) {
      try {
        this.results = await searchEntity(entity, searchKey, searchTerm);
        this.errors = '';
      } catch (err) {
        this.results = '';
        this.errors = err.message;
      }
    },
    clearResults() {
      this.results = '';
    },
  },
};
