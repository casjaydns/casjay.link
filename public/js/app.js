const app = new Vue({
  el: '#app',
  data: {
    url: '',
    slug: '',
    error: '',
    formVisible: true,
    created: null,
  },
  methods: {
    async createUrl() {
      this.error = '';
      const response = await fetch('/url', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          url: this.url,
          slug: this.slug || undefined,
        }),
      });
      if (response.ok) {
        const protocol = window.location.protocol;
        const domain = window.location.host;
        const result = await response.json();
        this.formVisible = false;
        this.created = `${protocol}//${domain}/${result.slug}`;
      } else if (response.status === 429) {
        this.error = 'You are sending too many requests. Try again in a few seconds.';
      } else {
        const result = await response.json();
        this.error = result.message;
      }
    },
  },
});
