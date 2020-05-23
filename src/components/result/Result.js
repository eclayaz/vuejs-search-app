export default {
  name: 'result',
  props: ['results'],
  methods: {
    formatObjectValue(value) {
      if (typeof value !== 'object') {
        return value;
      }

      return Object.keys(value)
        .map(function(key) {
          if (typeof value[key] === 'object') {
            return Object.values(value[key]).join(', ');
          }
          return value[key];
        })
        .join(', ');
    },
  },
};
