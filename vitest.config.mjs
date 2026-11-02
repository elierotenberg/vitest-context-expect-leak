// Run the files by name in one process, so z-check.test.mjs runs last.
class ByNameSequencer {
  async shard(specificationList) {
    return specificationList;
  }
  async sort(specificationList) {
    return [...specificationList].sort((a, b) => a.moduleId.localeCompare(b.moduleId));
  }
}

export default {
  test: {
    globals: true,
    isolate: false,
    pool: "forks",
    maxWorkers: 1,
    execArgv: ["--expose-gc"],
    sequence: { sequencer: ByNameSequencer },
    include: ["*.test.mjs"],
  },
};
