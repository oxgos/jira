interface cleanObjectArgs {
  [key: string]: unknown
}

/* 这方法有小bug，如果传入对象为 {checked: false}, 这个字段不应该删除, 所以更换为isVoid */
export const isFalsy = (value: unknown) => (value === 0 ? false : !value)
export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === ''

export const cleanObject = (object: cleanObjectArgs) => {
  const copy = { ...object }
  Object.keys(copy).forEach((key: string) => {
    // if (isFalsy(copy[key])) {
    if (isVoid(copy[key])) {
      delete copy[key]
    }
  })
  return copy
}
