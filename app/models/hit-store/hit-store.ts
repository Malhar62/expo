import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { Api } from "../../services/api"

/**
 * Model description here for TypeScript hints.
 */
const api = new Api();
api.setup()
export const HitStoreModel = types
  .model("HitStore")
  .props({
    hits: types.optional(types.frozen(), []),
    isLoading: types.optional(types.boolean, false),
    currentPage: types.optional(types.number, 0)
  })
  .views((self) => ({

  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    setHits(data: any) {
      self.hits = data;
      self.isLoading = false;
    },
    setPage() {
      self.currentPage = self.currentPage + 1
    }
  }))
  .actions((self) => ({
    getPosts: flow(function* getPosts() {
      try {
        self.isLoading = true;
        self.currentPage = self.currentPage + 1;
        const result = yield api.getData(self.currentPage)
        if (result.kind == 'ok') {
          if (self.currentPage == 1) {
            self.setHits(result.data.hits);
          } else {
            var merge = [...self.hits, ...result.data.hits];
            self.setHits(merge)
          }
        } else {
          self.isLoading = false;
        }
      } catch (erro) {
        self.isLoading = false;
      }
    }),
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type HitStoreType = Instance<typeof HitStoreModel>
export interface HitStore extends HitStoreType { }
type HitStoreSnapshotType = SnapshotOut<typeof HitStoreModel>
export interface HitStoreSnapshot extends HitStoreSnapshotType { }
export const createHitStoreDefaultModel = () => types.optional(HitStoreModel, {})
