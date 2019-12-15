import {
  head,
  tail,
  range,
  split,
  trim,
  map,
  filter,
  compose,
  length
} from 'ramda'

export const checkAscending = pwStr => {
  const helper = (str, prev) =>
    str === ''
      ? true
      : head(str) < prev
        ? false
        : helper(tail(str), head(str))
  return helper(tail(pwStr), head(pwStr))
}

export const checkDoubleDigit = pw => {
  const pwStr = pw.toString()

  const helper = (str, prev, flag, row) => {
    if (str === '') return flag || row === 2
    if (head(str) === prev) return helper(tail(str), head(str), flag, row + 1)
    return helper(tail(str), head(str), flag || row === 2, 1)
  }

  return helper(tail(pwStr), head(pwStr), false, 1)
}

// Using a neighbor check function to reduce Big O
export const neighborCheck = str => {
  const helper = (str, prev, flag, row) =>
    str === ''
      ? flag || row === 2
      : head(str) < prev
        ? false
        : head(str) === prev
          ? helper(tail(str), head(str), flag, row + 1)
          : helper(tail(str), head(str), flag || row === 2, 1)

  return helper(tail(str), head(str), false, 1)
}

export const createCriteria = limit => pw => {
  const pwStr = pw.toString()
  return (length(pwStr) === 6)
    && ((limit[0] <= pw) && (pw <= limit[1]))
    && neighborCheck(pwStr)
}

export const parseRangeArray = str =>
  compose(
    map(Number.parseInt),
    split('-'),
    trim
  )(str)

export const countPasswords = limit => {
  const meetsCriteria = createCriteria(limit)
  const boundsPWs = range(limit[0], limit[1] + 1)
  return length(filter(meetsCriteria, boundsPWs))
}
