// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const debounce = <F extends (...args: any[]) => any>(
  func: F,
  ms: number
) => {
  let timeout: ReturnType<typeof setTimeout>;

  const debounced = function(...args: Parameters<F>) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), ms);
  };

  return debounced;
};