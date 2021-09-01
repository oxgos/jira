export const isFalsy = (value: unknown) => (value === 0 ? false : !value)

export const cleanObject = (object: any) => {
  const copy = { ...object }
  Object.keys(copy).forEach((key) => {
    if (isFalsy(copy[key])) {
      delete copy[key]
    }
  })
  return copy
}
