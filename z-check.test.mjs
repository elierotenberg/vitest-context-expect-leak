test("reports which fixture values of earlier files are still alive", async () => {
  for (let i = 0; i < 5; i++) {
    globalThis.gc();
    await new Promise((resolve) => setTimeout(resolve, 20));
  }
  const summary = {};
  for (const { file, ref } of globalThis.refList) {
    const name = file.split("/").at(-1);
    summary[name] ??= { alive: 0, freed: 0 };
    summary[name][ref.deref() ? "alive" : "freed"]++;
  }
  console.log("FIXTURE VALUES AFTER GC", JSON.stringify(summary));
});
