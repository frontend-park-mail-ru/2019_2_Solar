'use strict';

import './scss/base.scss';

const component = () => {
    const element = document.createElement('div');
  
    // Lodash, currently included via a script, is required for this line to work
    element.innerHTML = '<h1 class="red">Hello World!</h1>';
  
    return element;
  }
  
  document.body.appendChild(component());