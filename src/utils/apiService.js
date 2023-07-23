import axios from "axios";
class apiService {
  async fetchData(url) {
    try {
      const responce = await axios.get(url);
      return await responce.data;
    } catch (error) {
      throw error;
    }
  }
  async postData(url, data) {
    try {
      const responce = await axios.post(url, data);
      return responce.data;
    } catch (error) {
      throw error;
    }
  }
  async deleteData(url, id) {
    try {
      const responce = await axios.post(`${url}/${id}`);
      return responce.data;
    } catch (error) {
      throw error;
    }
  }
}

export default apiService;
