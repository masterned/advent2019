import {
  compose,
  map,
  tail,
  reduce,
  append,
  head,
  last,
  add
} from 'ramda'

import {
  split,
  trim,
  toNum
} from '../utils/utils'

export const Point = (x, y) => ({
  x,
  y
})

export const manhattan = a => b =>
  reduce(
    add,
    0,
    map(Math.abs)([a.x - b.x, a.y - b.y])
  )

export const parseMagStrArray = str =>
  compose(
    map(split(',')),
    split('\n'),
    trim
  )(str)

export const charToAngle = char =>
  char === 'U'
    ? Point(0, 1)
    : char === 'D'
      ? Point(0, -1)
      : char === 'L'
        ? Point(-1, 0)
        : char === 'R'
        && Point(1, 0)

export const toVector = (magnitude, origin = { x: 0, y: 0 }) => ({
  ...origin,
  a: charToAngle(head(magnitude)),
  d: toNum(tail(magnitude))
})

export const calcDest = v => ({
  x: v.x + (v.a.x * v.d),
  y: v.y + (v.a.y * v.d)
})

export const chainVectors = magStrArr => {
  if (magStrArr.length === 0) return []
  if (magStrArr.length === 1) return [toVector(head(magStrArr))]

  const prev = chainVectors(magStrArr.slice(0, -1))
  return append(toVector(last(magStrArr), calcDest(last(prev))), prev)
}

export const point_lineCollide = line => point => {
  if (line.x === point.x) {
    if (
      ((line.y <= point.y) && (point.y <= calcDest(line).y)) ||
      ((line.y >= point.y) && (point.y >= calcDest(line).y))
    ) return true
    return false
  }
  if (line.y === point.y) {
    if (
      ((line.x <= point.x) && (point.x <= calcDest(line).x)) ||
      ((line.x >= point.x) && (point.x >= calcDest(line).x))
    ) return true
    return false
  }
  return false
}

export const collide = v0 => v1 => {
  const hori = v0.a.x ? v0 : v1
  const vert = v0.a.y ? v0 : v1
  const cross = Point(vert.x, hori.y)
  return (
    point_lineCollide(vert)(cross)
    && point_lineCollide(hori)(cross)
  ) && cross
}

export const getCollisions = (w0, w1) =>
  reduce(
    (cols0, seg0) =>
      append(
        reduce(
          (cols1, seg1) => {
            const collision = collide(seg0)(seg1)
            return collision
              ? append(
                collision,
                cols1
              )
              : cols1
          },
          [],
          w1
        ),
        cols0
      ),
    [],
    w0
  ).flat()

export const closestIntersection = str =>
  Math.min(
    ...compose(
      map(manhattan(Point(0, 0))),
      tail,
      getCollisions
    )(
      ...compose(
        map(chainVectors),
        parseMagStrArray
      )(str)
    )
  )
