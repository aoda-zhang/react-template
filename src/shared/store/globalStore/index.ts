import { makeAutoObservable } from 'mobx'
class FareStore {
  // 状态
  faredData = []
  formData = []
  faredDate: string[] = []
  repeatAddress: string[] = []
  constructor() {
    // mobx自动检测，状态，action和computed，绑定到实例上
    makeAutoObservable(this)
  }
  setForm = (data = []) => {
    this.faredData = [...this.faredData, ...data]
    this.formData = [...data]
  }
  // computed，mobx会将get为修饰符的方法定义为计算属性
  get getFaredAddress() {
    return this.faredData?.map(item => item?.to) ?? []
  }
  // action
  setDate = (date: string) => {
    this.faredDate = [...this.faredDate, date]
  }
}
const fareStore = new FareStore()
export default fareStore
