import {makeAutoObservable} from "mobx";
import NetworkService from "../network/NetworkService";

class ApplianceStorage {
  plans = []

  constructor() {
    makeAutoObservable(this)
  }

  loadPlans = async () => {
    let plans = await NetworkService.fetchPlans()
    this.setPlans([])

    for (let plan of plans) {
      this.addPlan(plan)
    }
  }

  applyCredit = async (creditRequest) => {
    return await NetworkService
      .requestCredit(creditRequest)
      .catch(e => {
        console.log(e)
      })
  }

  getPlan = (planId) => {
    return this.plans.find(p => p.id === planId)
  }

  setPlans = (plans) => {
    this.plans = plans
  }

  addPlan = (plan) => {
    this.plans.push(plan)
  }
}

export default new ApplianceStorage()