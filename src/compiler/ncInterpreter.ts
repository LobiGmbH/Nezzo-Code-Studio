export const runNC = (code: string): string[] => {
  const lines = code.split('\n');
  const out: string[] = [];
  for (const line of lines) {
    const m = line.match(/sage\("(.*)"\)/);
    if (m) out.push(m[1]);
  }
  return out;
};
