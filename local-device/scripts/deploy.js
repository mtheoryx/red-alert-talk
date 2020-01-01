const fs = require("fs");
const path = require("path");

console.log("I WAS CALLED TO DEPLOY!");

// Copy one-above code.py to /VOLUMES/CIRCUITPY/code.py
const filename = "code.py";
const destinationRoot = "/Volumes/CIRCUITPY";
const source = path.join(process.cwd(), filename);
const destination = path.join(destinationRoot, filename);

console.log("Copying file...");
fs.copyFileSync(source, destination);
console.log("Done.");
