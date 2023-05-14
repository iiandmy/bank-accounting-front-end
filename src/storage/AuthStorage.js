import { makeAutoObservable } from "mobx";
import NetworkService from "../network/NetworkService";
import { LOCAL_STORAGE_IS_ADMIN_FLAG_KEY, LOCAL_STORAGE_TOKEN_KEY } from "../utils/localStorageKeys";

class AuthStorage {
  isAdmin = false
  token = ""

  constructor() {
    makeAutoObservable(this)
  }

  login = async (email, password) => {
    let loginInfo = await NetworkService.fetchToken({email, password})
    this.setToken(loginInfo.token)
    localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, this.token)
    localStorage.setItem(LOCAL_STORAGE_IS_ADMIN_FLAG_KEY, JSON.stringify(false))

    if (loginInfo.is_admin !== undefined) {
      this.setIsAdmin(true)
      localStorage.setItem(LOCAL_STORAGE_IS_ADMIN_FLAG_KEY, JSON.stringify(true))
      console.log("ADMIN")
    }

    console.log(`TOKEN ${this.token}`)
  }

  logout = () => {
    this.setToken("")
    this.setIsAdmin(false)

    localStorage.removeItem(LOCAL_STORAGE_IS_ADMIN_FLAG_KEY)
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY)

    console.log("LOGOUT")
  }

  fetchFromLocalStorage = () => {
    let token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)
    let is_admin = localStorage.getItem(LOCAL_STORAGE_IS_ADMIN_FLAG_KEY)

    if (token === null || is_admin === null) {
      return false
    }
    this.setToken(token)
    this.setIsAdmin(is_admin === "true")

    return true
  }

  setToken = (token) => {
    this.token = token
  }

  setIsAdmin = (isAdmin) => {
    this.isAdmin = isAdmin
  }
}

export default new AuthStorage()