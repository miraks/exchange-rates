import toObject from '@/helpers/to-object'

export default (obj, fn) => toObject(Object.entries(obj).map(([key, value]) => [key, fn(value)]))
