# vitest-context-expect-leak

Minimal reproduction: the `expect` of a test context prevents the garbage
collection of its test file and fixture values.

## Run

```bash
npm install
npm test
```

## What the tests do

- `fixture.mjs` gives each test a large fixture value and records a `WeakRef` to
  it.
- `a-context-expect.test.mjs` has 2 tests, and one of them reads `expect` from
  its context.
- `b-global-expect.test.mjs` has 2 tests that use only the global `expect`.
- `z-check.test.mjs` runs last in the same worker (`isolate: false`,
  `maxWorkers: 1`), runs the garbage collector, and prints which fixture values
  are still alive.

## Expected

The garbage collector frees the fixture values of both earlier files:

```text
FIXTURE VALUES AFTER GC {"a-context-expect.test.mjs":{"alive":0,"freed":2},"b-global-expect.test.mjs":{"alive":0,"freed":2}}
```

## Actual

Both fixture values of `a-context-expect.test.mjs` are still alive, including
the value of the test that uses the global `expect`:

```text
FIXTURE VALUES AFTER GC {"a-context-expect.test.mjs":{"alive":2,"freed":0},"b-global-expect.test.mjs":{"alive":0,"freed":2}}
```
