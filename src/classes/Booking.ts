export default class Booking {

  lot: any;
  userId: any;
  startTime: any;
  duration: any;

  constructor(lot, userId, startTime, duration){
    this.lot = lot;
    this.userId = userId;
    this.startTime = startTime;
    this.duration = duration;
  }

}
