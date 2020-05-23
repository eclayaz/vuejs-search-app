import { keyData } from '@/searchJson/JsonKeyMap';
export default {
  name: 'search',
  data() {
    return {
      entity: '',
      searchKey: '',
      searchTerm: '',
      errors: { entity: false, field: false },
      searchableFields: keyData,
    };
  },
  watch: {
    entity: function() {
      this.searchKey = '';
      this.searchTerm = '';
    },
  },
  methods: {
    checkForm: function(e) {
      e.preventDefault();

      if (this.entity && this.searchKey) {
        this.$emit('search', this.entity, this.searchKey, this.searchTerm);
      }

      this.errors = { entity: false, field: false };

      if (!this.entity) {
        this.errors.entity = true;
      }
      if (!this.searchKey) {
        this.errors.field = true;
      }
    },
  },
};
