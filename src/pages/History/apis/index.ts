import httpService from "@/shared/libs/http";
import { FormValue } from "@/typings/map.types";

class HistoryAPI {
  addmapHistory = (mapHistory: FormValue) => {
    return httpService.postAPI("/history/add", mapHistory);
  };
}
const historyAPI = new HistoryAPI();
export default historyAPI;
