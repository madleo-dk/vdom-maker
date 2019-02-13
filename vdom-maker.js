/* 
Wrap library in an IIFE.
Our IIFE is invoked and creates a new execution context.
We've ensured that our code, by wrapping it in an immediately invoked function,
does not interfere with any other code that might be included inside our application. */
(function(global) {

  const { document } = global;

  // Vdom is our main function that returns an instance of a virtual DOM element.
  // Destructure our options property and set default values, including the options object itself.
  const Vdom = (tagName, { attrs = {}, children = [] } = {}) => {

    /* 
     return instance of virtual DOM element.

     UNDER THE HOOD:
     1. We invoke Vdom.init function with the 'new' operator.
     2. An empty object (our instance) is created and
        'this' points to the newly created object in memory.
        Any property we defined in our constructor with the 'this' keyword,
        is added to the empty object.
        Because we're not returning anything from our constructor,
        the JavaScript engine will return the newly created object. */
    return new Vdom.init(tagName, { attrs, children });
  };

  // Save memory/space O(n) by defining methods on prototype object, 
  // n being the number of instances we end up creating in our application
  Vdom.prototype = {
    render(vnode) {
      // create DOM element (not virtual DOM)
      const el = document.createElement(vnode.tagName);

      // Set Attributes
      // Destructure and assign key/value to k/v | https://dev.to/sarah_chima/destructuring-assignment---arrays-16f
      // Loop through each attribute [key, value], and use
      // the Object.entries method to return an array of a given object's [key, value] pairs
      for(const [k,v] of Object.entries(vnode.attrs)) {
        // set attributes to DOM element
        el.setAttribute(k,v);
      };

      // Set Children
      // Loop through each child, create another DOM element, and set attributes.
      vnode.children.forEach(vchild => {
        // create DOM element (not virtual DOM)
        const el = document.createElement(vchild.tagName);

        // Destructure and assign key/value to k/v | https://dev.to/sarah_chima/destructuring-assignment---arrays-16f
        // Loop through each attribute [key, value], and use
        // the Object.entries method to return an array of a given object's [key, value] pairs
        for(const [k,v] of Object.entries(vchild.attrs)) {
          // set attributes to DOM element
          el.setAttribute(k,v);
        }
      });

      return el;
    },
    // replace contents of target DOM element with
    // the contents of our virtual DOM element.
    mount(vnode, targetEl) {
      targetEl.replaceWith(vnode);
      return vnode;
    }
  };

  // Constructor function object to create new virtual DOM elements
  Vdom.init = function(tagName, options) {
    /* 
      Objects in JS are set by reference.
      Use this fact to ensure that we set the right context of 'this'
      for future implementations (ex: method defined in constructor using 'this').

      'self' points to same location in memory as 'this'.
      Any functions using the self/this will look up the 
      scope chain (outer lexical reference), and will find 'self'. */
    const self = this;
    self.tagName = tagName;
    self.attrs = options.attrs || {}; // default value not necessary
    self.children = options.children || [];  // default value not necessary
  };

  // Point all object's prototype created with Vdom.init
  // to Vdom.prototype for its parent prototype chain.
  Vdom.init.prototype = Vdom.prototype;


  // make Vdom accessible on global object with Vdom or 
  // through our alias, v$. 
  global.Vdom = global.v$ = Vdom;

}(window)); // pass in global window object.