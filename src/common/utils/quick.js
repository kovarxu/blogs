export const trim = (target) => {
  if (typeof target === 'string') {
    return target.replace(/^\s*|\s*$/g, '');
  }
  return target;
}
