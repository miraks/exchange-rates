export default (pairs) =>
  pairs.reduce((result, [key, value]) => {
    result[key] = value
    return result
  }, {})
