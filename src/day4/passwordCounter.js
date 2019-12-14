import {
  parseRangeArray,
  countPasswords
} from './passwords'

const data = '372037-905157'

const numPasswords = countPasswords(parseRangeArray(data))

console.log(`number of passing passwords: ${numPasswords}`)
