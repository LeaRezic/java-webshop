export const getDesiredDimensionsPic = (url: string, width: number, height: number = 0) => {
  const segments = url.split('/');
  segments.pop();
  segments.pop();
  segments.push(width.toString());
  segments.push(height ? height.toString() : width.toString());
  return segments.join('/');
};
