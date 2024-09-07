import http from "../http-common";

const url = "https://644060ba792fe886a88de1b9.mockapi.io/v1/test/partners";

class TutorialDataService {
  getParceiros() {
    return http.get(url);
  }

  getParceiroById(id) {
    return http.get(`${url}/${id}`);
  }

  postParceiro(data) {
    return http.post(`${url}`, data);
  }

  putParceiro(id, data) {
    return http.put(`${url}/${id}`, data);
  }

  deleteParceiroById(id) {
    return http.delete(`${url}/${id}`);
  }
}

export default new TutorialDataService();