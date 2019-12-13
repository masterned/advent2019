import {
  readFile
} from 'fs'

import {
  closestIntersection
} from './wires'

readFile('./res/day3/wires_input.txt', { encoding: 'ascii', flag: 'r' }, (err, data) => {
  if (err) throw err

  const closest = closestIntersection(data)

  // should be 731
  console.log(`closest intersection to root: ${closest}`)
})
