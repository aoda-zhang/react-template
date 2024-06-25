import { create } from "zustand";
import _ from "lodash";
import { createJSONStorage, persist } from "zustand/middleware";

import { MapProcessStatus, MapProcessStatusItem } from "@/typings/map.types";
import { HospitalItem } from "@/typings/hospital.types";
import StorageKeys from "@/typings/storage.types";
type GlobalStage = { hospitals: HospitalItem[]; mapStatus: MapProcessStatus };
type GlobalAction = {
  setHospital: (data: any[]) => void;
  setMapStatus: (mapStatusItem: MapProcessStatusItem) => void;
};
const initialState: GlobalStage = {
  mapStatus: {
    isFillMapDate: true,
    isEdit: false,
    isView: false,
    isInfoOpen: false,
  },
  hospitals: [],
};
const globalPersist = persist<GlobalStage & GlobalAction>(
  set => ({
    ...initialState,
    setHospital: (data = []) =>
      set(state => ({
        hospitals: _.uniqBy([...(state?.hospitals ?? []), ...data], "value"),
      })),
    setMapStatus: (mapStatusItem: MapProcessStatusItem) =>
      set(state => ({ mapStatus: { ...state.mapStatus, ...mapStatusItem } })),
  }),
  {
    name: StorageKeys.globalState,
    storage: createJSONStorage(() => sessionStorage),
  },
);

const globalStore = create<GlobalStage & GlobalAction>()(globalPersist);
export default globalStore;
