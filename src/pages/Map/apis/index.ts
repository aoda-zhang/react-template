import httpService from "@/shared/libs/http";
export type HospitalType = {
  id: string;
  name: string;
};
class MapAPI {
  getHospitalList = async () => {
    return httpService.getAPI<HospitalType[]>("/hospital/list");
  };

  addHospitals = async (hospitals: unknown[]) => {
    return httpService.postAPI<number>("/hospital/add", hospitals);
  };
}
const mapAPI = new MapAPI();
export default mapAPI;
