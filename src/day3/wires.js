import {
  compose,
  map,
  tail
} from 'ramda'

import {
  split,
  trim,
  toNum
} from '../utils/utils'

export const parseWires = str => compose(map(split(',')), split('\n'), trim)(str)

export const toVector = (origin, velocity) => {
  const direction = velocity.charAt(0)
  const distance = compose(toNum, tail)(velocity)

  const to = [...origin]
  switch (direction) {
    case 'U':
      to[1] += distance
      break
    case 'D':
      to[1] -= distance
      break
    case 'L':
      to[0] -= distance
      break
    case 'R':
      to[0] += distance
      break
  }
  return [origin, to]
}

export const collide = v0 => v1 => {
  const [[ox0, oy0], [dx0, dy0]] = v0
  const [[ox1, oy1], [dx1, dy1]] = v1
  const xs = []
  const ys = []
  for (let x = Math.min(ox0, dx0); x <= Math.max(ox0, dx0); ++x) xs.push(x)
  for (let y = Math.min(oy0, dy0); y <= Math.max(oy0, dy0); ++y) ys.push(y)

  let out_x
  for (let x = Math.min(ox1, dx1); x <= Math.max(ox1, dx1); ++x) {
    if (xs.includes(x)) {
      out_x = x
      break
    }
  }

  let out_y
  for (let y = Math.min(oy1, dy1); y <= Math.max(oy1, dy1); ++y) {
    if (ys.includes(y)) {
      out_y = y
      break
    }
  }
  return (out_x && out_y) && [out_x, out_y]
}

export const attachWire = wire => {
  const segments = []
  let cur = [0, 0]
  for (const seg of wire) {
    const next = toVector(cur, seg)
    segments.push(next)
    cur = next[1]
  }
  return segments
}

export const getCollisions = (w0, w1) => {
  const collisions = []
  for (const seg1 of w1) {
    for (const seg0 of w0) {
      const potential = collide(seg0)(seg1)
      if (potential) collisions.push(potential)
    }
  }
  return collisions
}

export const manhattan = origin => point => (Math.abs(point[0]) - origin[0]) + (Math.abs(point[1]) - origin[1])

export const closestIntersection = str =>
  Math.min(
    ...compose(
      map(manhattan([0, 0])),
      getCollisions
    )(...compose(
      map(attachWire),
      parseWires)(str)
    )
  )
