// Each test gets a large fixture value; a WeakRef records whether it is freed.
globalThis.refList ??= [];

export const it = test.extend({
  big: async ({}, use) => {
    const value = { payload: new Array(2_000_000).fill(0).map((_, i) => i) };
    globalThis.refList.push({ file: expect.getState().testPath, ref: new WeakRef(value) });
    await use(value);
  },
});
