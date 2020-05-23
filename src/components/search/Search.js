import { keyData } from '@/searchJson/JsonKeyMap';
export default {
  name: 'search',
  data() {
    return {
      entity: '',
      searchKey: '',
      searchTerm: '',
      errors: [],
      searchableFields: keyData,
    };
  },
  watch: {
    entity: function() {
      this.searchKey = '';
    },
  },
  methods: {
    checkForm: function(e) {
      e.preventDefault();

      if (this.entity && this.searchKey) {
        this.$emit('search', this.entity, this.searchKey, this.searchTerm);
      }

      this.errors = [];

      if (!this.entity) {
        this.errors.push('entity required.');
      }
      if (!this.searchKey) {
        this.errors.push('searchKey required.');
      }
    },
  },
};
