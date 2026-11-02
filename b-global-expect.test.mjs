import { it } from "./fixture.mjs";

it("uses the global expect", ({ big }) => {
  expect(big.payload.length).toBe(2_000_000);
});

it("uses the global expect again", ({ big }) => {
  expect(big.payload.length).toBe(2_000_000);
});
