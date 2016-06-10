const FILES = require('fs');

module.exports = {
  absorb: (htmlPath) => {
    let htmlNew = FILES.readFileSync(htmlPath, 'utf8');
    let htmlReturn = htmlNew.replace(/(<absorb\s(.+)\/>)/g, function(absorbEl) {
      let filePath = '', fileType = '', jsMod = '';

      if (absorbEl.indexOf('css=') >= 0) {
        fileType = 'css';
        filePath = absorbEl.slice(
          absorbEl.indexOf('css=') + 5,
          absorbEl.indexOf('/>') - 1
        ); // filePath

      } else if (absorbEl.indexOf('js=') >= 0) {
        jsMod = absorbEl.indexOf(' defer ') >= 0 ? ' defer' : '';
        jsMod = absorbEl.indexOf(' async ') >= 0 ? ' async' : '';
        fileType = 'js';
        filePath = absorbEl.slice(
          absorbEl.indexOf('js=') + 4,
          absorbEl.indexOf('/>') -1
        ); // filePath
      }; // if/else

      let code = FILES.readFileSync(filePath, 'utf8');
      if (fileType == 'css') return `<style>${code}</style>`;
      else if (fileType == 'js') return `<script${jsMod}>${code}</script>`;
      else return `<script async>alert('ERR: ${filePath}')</script>`;
    }); // html.replace()

    return htmlReturn;
  } // absorb()
}; // module.exports
