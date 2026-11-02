import { it } from "./fixture.mjs";

it("uses the global expect", ({ big }) => {
  expect(big.payload.length).toBe(2_000_000);
});

it("uses the expect of its context", ({ big, expect }) => {
  expect(big.payload.length).toBe(2_000_000);
});
