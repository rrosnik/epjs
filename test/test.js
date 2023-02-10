
const EP = require('../dist');
const fs = require('fs');
const str = fs.readFileSync('test/eplustbl.csv');
const a = new EP.Parser(str);
fs.writeFileSync("./test/asdadasd.json", JSON.stringify(a.toJson()));


