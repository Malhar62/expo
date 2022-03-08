import { HitStoreModel } from "./hit-store"

test("can be created", () => {
  const instance = HitStoreModel.create({})

  expect(instance).toBeTruthy()
})
