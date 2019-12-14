import {
  createCriteria,
  parseRangeArray
} from '../../src/day4/passwords'

test(
  'parseRangeArray: basic test',
  () => {
    expect(
      parseRangeArray('0-999999')
    ).toStrictEqual([0, 999999])
  }
)


const meetsCriteria = createCriteria([0, 999999])

test(
  'meetsCriteria: double digit, no decrease',
  () => {
    expect(
      meetsCriteria(111111)
    ).toBe(true)
  }
)

test(
  'meetsCriteria: breaks ascending',
  () => {
    expect(
      meetsCriteria(223450)
    ).toBe(false)
  }
)

test(
  'meetsCriteria: breaks double digit',
  () => {
    expect(
      meetsCriteria(123789)
    ).toBe(false)
  }
)
