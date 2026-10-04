module.exports = {
  target: (name) => {
    // FIXME: Revisit on 2027-01-04.
    // TypeScript 7 is the native (Go) port and no longer ships the JS
    // compiler API that ts-loader relies on, so the build fails with
    // "Cannot read properties of undefined (reading 'fileExists')".
    // Remove this ignore (and the typescript pin in package.json) once
    // ts-loader releases a version that supports TypeScript 7, or once the
    // build moves off ts-loader.
    if (name === "typescript") {
      return "minor";
    }
    return "latest";
  },
};
