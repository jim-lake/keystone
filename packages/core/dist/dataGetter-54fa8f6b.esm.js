function dataGetterWithNoErrors(data, path) {
  return {
    data,
    path,
    get(field) {
      var _data$field;
      return dataGetterWithNoErrors((_data$field = data === null || data === void 0 ? void 0 : data[field]) !== null && _data$field !== void 0 ? _data$field : null, path.concat(field));
    }
  };
}
function dataGetterWithErrors(data, errors, path) {
  return {
    data,
    errors,
    path,
    get(field) {
      var _data$field2;
      const newPath = path.concat(field);
      const newItem = (_data$field2 = data === null || data === void 0 ? void 0 : data[field]) !== null && _data$field2 !== void 0 ? _data$field2 : null;
      const errorsForField = errors.filter(error => {
        if (error.path === undefined) return true;
        const errorPath = error.path; // needed for Typescript
        return newPath.every((newSubPath, i) => errorPath[i] === undefined || errorPath[i] === newSubPath);
      });
      if (errorsForField.length) {
        return dataGetterWithErrors(newItem, errors, newPath);
      }
      return dataGetterWithNoErrors(newItem, newPath);
    }
  };
}
function makeDataGetter(data, errors) {
  if (errors !== null && errors !== void 0 && errors.length) {
    return dataGetterWithErrors(data, errors, []);
  }
  return dataGetterWithNoErrors(data, []);
}

export { makeDataGetter as m };
