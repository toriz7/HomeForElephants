const mongoose = require('mongoose');

// Define Schemes
const BoardSchema = new mongoose.Schema({
  userid: { type: String, required: true, unique: true },//네이버 id
  date: { type: Date, required: true, default: Date.now()},//작성일
  room_area: { type: Number, required: true },//소수점 까지 내려가는 방 크기
  location: { type: String, default: true }, //맵 api 로 보내야 하는 내용. 위치
  content: { type: String, default: false },//후기
  isGood:{ type: Boolean, default: true} //좋은지 안 좋은지
},
{
  timestamps: true
});

// Create Model & Export
module.exports = mongoose.model('student_board', BoardSchema);

db.student_board.insert({"userid":"toriz7","date":"2019-05-08","room_area":"17.5","location":"서애로","title":"히히","content":"굿굿","isGood":"true","howmayGood":"0"})
