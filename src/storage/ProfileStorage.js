import {makeAutoObservable} from "mobx";
import NetworkService from "../network/NetworkService";

class ProfileStorage {
  credits = []
  filterStatus = ""

  constructor() {
    makeAutoObservable(this)
  }

  async fetchCredits() {
    let credits = await NetworkService.fetchCredits()
    this.setCredits([])

    for (let credit of credits) {
      this.addCredit(credit)
    }
  }

  async payCredit(creditId) {
    await NetworkService.payCredit(creditId)
    await this.fetchCredits()
  }

  addCredit(credit) {
    this.credits.push(credit)
  }

  setCredits(credits) {
    this.credits = credits
  }

  setFilter(status) {
    this.filterStatus = status
  }
}

export default new ProfileStorage()