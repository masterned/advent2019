import {
  compose,
  map,
  tail,
  reduce,
  append,
  head,
  last,
  split,
  trim,
  add,
  sum
} from 'ramda'

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
  d: Number.parseInt(tail(magnitude))
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

export const parseWires = str =>
  compose(
    map(chainVectors),
    map(split(',')),
    split('\n'),
    trim
  )(str)

export const point_lineCollide = point => line => {
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
  const crossCheck = point_lineCollide(cross)
  return (
    crossCheck(vert)
    && crossCheck(hori)
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

export const closestIntersection = (w0, w1) =>
  Math.min(
    ...compose(
      map(manhattan(Point(0, 0))),
      tail,
      getCollisions
    )(w0, w1)
  )

export const getNumSteps = point => wire => {
  const next = head(wire)
  if (point_lineCollide(point)(next)) {
    return manhattan(point)({ x: next.x, y: next.y })
  }
  return next.d + getNumSteps(point)(tail(wire))
}

export const shortestIntersection = (wire0, wire1) => {
  const firstFinder = compose(
    getNumSteps,
    head,
    tail,
    getCollisions
  )(wire0, wire1)
  return sum(map(firstFinder)([wire0, wire1]))
}
