import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import Search from './components/search/Search.vue';
import Result from './components/result/Result.vue';
import searchEntity from './searchJson/SearchEntity.js';

export default {
  name: 'App',
  components: {
    Search,
    Result,
  },
  data() {
    return {
      results: [],
    };
  },
  methods: {
    async searchEntity(entity, searchKey, searchTerm) {
      try {
        this.results = await searchEntity(entity, searchKey, searchTerm);
      } catch (err) {
        this.results = '';
        console.log(err);
      }
    },
  },
};
