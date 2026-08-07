let counter = 0;

export function nextLogoId(prefix = 'logo'): string {
  counter += 1;
  return `${prefix}-${counter}`;
}
