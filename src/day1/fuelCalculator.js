import {
  readFile,
} from 'fs'

import {
  compose,
  map,
  sum
} from 'ramda'

import {
  fuelFuel, moduleFuel
} from './fuel'

import {
  toNum,
  split,
  trim
} from '../utils/utils'

const splitLines = split('\n')

readFile('./res/day1/fuel_input.txt', { encoding: 'ascii', flag: 'r' }, (err, data) => {
  if (err) throw err

  const array = map(toNum)(compose(splitLines, trim)(data))

  const baseFuel = sum(map(moduleFuel)(array))
  const recurFuel = sum(map(fuelFuel)(array))

  console.log(`Fuel for modules: ${baseFuel}`)
  console.log(`Fuel for fuel and modules: ${recurFuel}`)
})
