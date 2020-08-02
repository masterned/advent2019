import {
  readFile
} from 'fs'

import {
  parseWires,
  closestIntersection,
  shortestIntersection
} from './wires'

import {
  fileOpts
} from '../utils/utils'

readFile('./res/day3/wires_input.txt', fileOpts, (err, data) => {
  if (err) throw err

  const wires = parseWires(data)

  // should be 731
  console.log(`closest intersection to root: ${closestIntersection(...wires)}`)

  //! 22250 is too high
  //? check for looped intersections on a single wire?
  console.log(`fewest combined steps: ${shortestIntersection(...wires)}`)
})
