
var vEl = v$('img', {
  attrs: {
    id: 'app',
    src: 'https://media.giphy.com/media/69sRPbBQq9YgBIjAxH/giphy.gif'
  },
  children: [
    {
      tagName: 'div',
      attrs: {
        id: 'aho',
        src: 'https://media.giphy.com/media/322FvxfciE8UsYvILG/giphy.gif'
      }
    }
  ]
});

const app = vEl.render(vEl);
vEl.mount(app, document.getElementById('app'));