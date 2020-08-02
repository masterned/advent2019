import {
  readFile
} from 'fs'

import {
  fileOpts
} from '../utils/utils'

readFile('../../res/day5/air-conditioner.txt', fileOpts, (err, data) => {
  if (err) throw err

  data
})
