import {
  head,
  tail,
  range,
  split,
  trim,
  map,
  filter,
  compose
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
  const helper = (str, prev) =>
    str === ''
      ? false
      : head(str) === prev
        ? true
        : helper(tail(str), head(str))
  return helper(tail(pw), head(pw))
}

// Using a neighbor check function to reduce Big O
export const neighborCheck = str => {
  const helper = (str, prev, flag) =>
    str === ''
      ? flag
      : head(str) < prev
        ? false
        : head(str) === prev
          ? helper(tail(str), head(str), true)
          : helper(tail(str), head(str), flag)

  return helper(tail(str), head(str), false)
}

export const createCriteria = limit => pw => {
  const pwStr = pw.toString()
  return (pwStr.length === 6)
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
  return filter(meetsCriteria, boundsPWs).length
}
