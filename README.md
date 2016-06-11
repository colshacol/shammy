# shammy

Shammy takes in a HTML file, finds all of the specified locally hosted dependencies, and absorbs them into the file so that there is but one single http request required to present a web page to a user. `npm i --save shammy`

```
// Require Shammy's absorb function.
let shammy = require('shammy').absorb;

// Specify an HTML file to absorb its dependencies.
let allInclusiveHTML = shammy('./dist/index.html');
```

In our HTML files we use special tags to specify an absorbed dependency. They are
easily written, easily understood, and made even easier with [these snippets](https://gist.github.com/colshacol/c13ddbd2f425d48be1121b164a9cc02f) for Atom.
```
// ./dist/index.html
<!DOCTYPE html>
<html>
<head>
  <title>Sham Wow!</title>
  <!-- ABSORB ELEMENTS -->
  <absorb css='./dist/css/reset.css'/>
  <absorb css='./dist/css/styles.css'/>
  <absorb js='./dist/js/this.js'/>
</head>
<body>
  <h1>Sham Wow!</h1>
  <h2>It's for cleaning stuff!</h2>
  <p>Why clean with a towel when you have a <strong>SHAM WOW</strong>!?</p>
  <!-- ONE MORE HERE! -->
  <absorb js='./dist/js/app.js'/>
</body>
</html>
```

With the code above, given that the files are present where we specified in our absorb attributes, the variable allInclusiveHTML will now contain the contents of all of the files and be ready to be sent off to the client as a single http request, rather than five.


## CHANGE LOG

### 6/10/2016
- v0.0.4 | Fixed error caused by space preceeding '/>'.
- v0.0.3 | Added support for script `async` and `defer` attributes.
- v0.0.2 | Fixed undiagnosed `unidentified` error.
- v0.0.1 | Initial release.
