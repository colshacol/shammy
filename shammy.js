const FILES = require('fs');

module.exports = {

  // TODO: Add support for async file read.

/* GUIDE //////////////////////////////////////

  |1| Retrieve data contained inside user-specified file.

  |2| For each <absorb ... /> elements found in the file...

      |- Remove excess space before tag close. (i.e 'app.js"__/>')
      |- Determine if absorbed data needs <style> or <script> tags.
      |
      |----- CSS? Slice file path from css attribute, retrieve file contents,
      |      and replace <absorb> element with the data inside <style> tags.
      |
      |----- JS? Slice file path from js attribute, retrieve file contents,
      |      and replace <absorb> element with the data inside <script> tags.
      |      + IF <absorb> element contained async or defer attribute indicators,
      |      + add the async|defer attribute inside of opening <script> tag.
      |
      |----- OTHERWISE, place <script> containing invalidity alert.

  |3| Return modified file.

*/

  absorb: (htmlPath) => {
    let htmlNew = FILES.readFileSync(htmlPath, 'utf8');
    let htmlReturn = htmlNew.replace(/(<absorb\s(.+?)\/>)/g, function(absorbEl) {
      let filePath = '', fileType = '', jsMod = '';
      if (absorbEl.search(/('|")(\s+)\/>/g)) absorbEl = absorbEl.replace(/('|")(\s+)\/>/g, '\'/>');
      if (absorbEl.includes('css=')) {
        fileType = 'css';
        filePath = absorbEl.slice(
          absorbEl.indexOf('css=') + 5,
          absorbEl.indexOf('/>') - 1
        ); // filePath
      } else if (absorbEl.includes('js=')) {
        if (absorbEl.includes(' defer')) jsMod = ' defer';
        else if (absorbEl.includes(' async')) jsMod = ' async';
        else jsMod = '';
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
