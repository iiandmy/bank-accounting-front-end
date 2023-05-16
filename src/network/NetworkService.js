import axios from "axios";
import { LOCAL_STORAGE_TOKEN_KEY } from "../utils/localStorageKeys";

class NetworkService {
  BASE_URL = "http://localhost:8080/"
  CREDITS_URL = this.BASE_URL + "api/v1/credit/"
  LOGIN_URL = this.BASE_URL + "api/v1/auth/login"
  REGISTER_URL = this.BASE_URL + "api/v1/auth/register"
  ADMIN_URL = this.BASE_URL + "api/v1/admin/"

  fetchCredits = async () => {
    let token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)
    if (token === "") {
      throw new Error("Login required")
    }
    let response = await axios.get(this.CREDITS_URL, {
      headers: {
        "Authorization": "Bearer_" + token
      }
    }).catch((e) => {
      console.log(e)
    })
    return response.data
  }

  fetchPendingCredits = async () => {
    let token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)
    if (token === "") {
      throw new Error("Login required")
    }
    let response = await axios.get(this.ADMIN_URL + "pending", {
      headers: {
        "Authorization": "Bearer_" + token
      }
    }).catch(e => {
      console.log(e)
    })
    return response.data
  }

  register = async (registerDto) => {
    let response = await axios.post(
        this.REGISTER_URL,
        registerDto
    ).catch(e => {
      console.log(e)
    })
    return response.data
  }

  payCredit = async (creditId) => {
    let token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)
    if (token === "") {
      throw new Error("Login required")
    }
    let response = await axios.patch(this.CREDITS_URL + "pay/" + creditId, {}, {
      headers: {
        "Authorization": "Bearer_" + token
      }
    }).catch(e => {
      console.log(e)
    })
    return response.data
  }

  changeCreditStatus = async (creditId, statusId) => {
    let token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)
    if (token === "") {
      throw new Error("Login required")
    }
    let response = await axios.patch(this.ADMIN_URL + `status/${creditId}/${statusId}`, {}, {
      headers: {
        "Authorization": "Bearer_" + token
      }
    }).catch(e => {
      console.log(e)
    })
    return response.data
  }

  requestCredit = async (creditRequest) => {
    let token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)
    if (token === "") {
      throw new Error("Login required")
    }
    let response = await axios.post(this.CREDITS_URL + "request", creditRequest, {
      headers: {
        "Authorization": "Bearer_" + token
      }
    }).catch(e => {
      console.log(e)
    })
    return response.data
  }

  createPlan = async (planRequest) => {
    let token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)
    if (token === "") {
      throw new Error("Login required")
    }
    let response = await axios.post(this.ADMIN_URL + "credit_plan", planRequest, {
      headers: {
        "Authorization": "Bearer_" + token
      }
    }).catch(e => {
      console.log(e)
    })
    return response.data
  }

  fetchPlans = async () => {
    let token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)
    if (token === "") {
      throw new Error("Login required")
    }
    let response = await axios.get(this.CREDITS_URL + "plans", {
      headers: {
        "Authorization": "Bearer_" + token
      }
    }).catch(e => {
      console.log(e)
    })
    return response.data
  }

  fetchToken = async (loginDto) => {
    let resp = await axios.post(
      this.LOGIN_URL, loginDto
    ).catch((e) => {
      console.log(e)
    })
    return resp.data
  }
}

export default new NetworkService()
