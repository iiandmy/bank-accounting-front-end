import {makeAutoObservable} from "mobx";
import NetworkService from "../network/NetworkService";

class PendingCreditsStorage {
  pendings = []

  constructor() {
    makeAutoObservable(this)
  }

  async changeCreditStatus(creditId, statusId) {
    await NetworkService.changeCreditStatus(creditId, statusId)
    await this.fetchPendings()
    alert(`Successfully changed status of credit with id: ${creditId} to status id:${statusId}`)
  }

  async fetchPendings() {
    let result = await NetworkService.fetchPendingCredits()
    this.setPendings([])

    for (let credit of result) {
      this.addPending(credit)
    }
  }

  setPendings(pendings) {
    this.pendings = pendings
  }

  addPending(pending) {
    this.pendings.push(pending)
  }
}

export default new PendingCreditsStorage()