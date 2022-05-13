export function getNetworkShape(preset: number[]): number[] {
  const n = [];
  preset.forEach(() => n.push(8));
  return n;
}
