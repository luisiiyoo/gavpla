export const getPolygonCenter = (geo) => {
  const geoCoordinates = geo.geometry.coordinates;
  const coordinates: number[][] = [];
  flatArray(geoCoordinates, coordinates);
  const coordinatesCenter = calculatePolygonCenter(coordinates);
  return coordinatesCenter;
};

export const flatArray = (array: Array<any>, result: number[][]) => {
  if (
    array.length === 2 &&
    !Array.isArray(array[0]) &&
    !Array.isArray(array[1])
  ) {
    result.push(array);
    return;
  }
  array.forEach((elem) => {
    flatArray(elem, result);
  });
};

export const calculatePolygonCenter = (arr: number[][]) => {
  const x: number[] = arr.map((xy) => xy[0]);
  const y: number[] = arr.map((xy) => xy[1]);
  const cx: number = (Math.min(...x) + Math.max(...x)) / 2;
  const cy: number = (Math.min(...y) + Math.max(...y)) / 2;
  return [cx, cy];
};
