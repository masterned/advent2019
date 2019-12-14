import {
  readFile
} from 'fs'

import {
  moduleFuel,
  fuelFuel,
  parseModuleArray,
  calc
} from './fuel'

import {
  fileOpts
} from '../utils/utils'

readFile('./res/day1/fuel_input.txt', fileOpts, (err, data) => {
  if (err) throw err

  const array = parseModuleArray(data)

  const baseFuel = calc(moduleFuel)(array)
  const recurFuel = calc(fuelFuel)(array)

  console.log(`Fuel for modules: ${baseFuel}`)
  console.log(`Fuel for fuel and modules: ${recurFuel}`)
})
