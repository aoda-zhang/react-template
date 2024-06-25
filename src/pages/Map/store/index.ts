import { create } from "zustand";

import { MapInfo } from "@/typings/map.types";
type MapState = {
  mapdData: MapInfo[];
  formData: MapInfo[];
  mapdDate: string[];
  currentDate: string;
  repeathospital: string[];
  setForm: (data: any[]) => void;
  setDate: (date: string) => void;
  setCurrentDate: (date: string) => void;
};

const initState = {
  mapdData: [],
  formData: [],
  mapdDate: [],
  currentDate: "",
  repeathospital: [],
};

const mapStore = create<MapState>(set => ({
  ...initState,
  setForm: (data = []) =>
    set(state => ({
      mapdData: [state.mapdData, ...data],
      formData: [...data],
    })),
  setDate: (date: string) =>
    set(state => ({ mapdDate: [...state.mapdDate, date] })),
  setCurrentDate: (date: string) => set(() => ({ currentDate: date })),
}));

export default mapStore;
