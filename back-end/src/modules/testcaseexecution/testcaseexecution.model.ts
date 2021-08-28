// import mongoose from 'mongoose';
// import { ITestCaseExecution} from './testcaseexecution.interface';

// const TestCaseExecutionSchema = new mongoose.Schema({
//   testcase_id: {
//     type: String
//   },
//   testcaseName: {
//     type: String
//   },
//   description: {
//     type: String
//   },
//   testsuite:{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'testsuite',   
//   }, 
//   priority: {
//     type: String,
//   },
//   type: {
//     type: String,
//     default: "TC"
//   },
//   listStep: [
//     {
//       stepDefine: {
//         type: String,
//         required: true,
//       },
//       expectResult: {
//         type: String,
//         required: true,
//       },
//       type: {
//         type: String,
//         required: true,
//       }
//     },
//   ], 
//   created_date: {
//     type: Date,
//     default: Date.now,
//   },
//   updated_date: {
//     type: Date,
//     default: Date.now,
//   },
//   created_user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'user',
//   },
//   updated_user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'user',
//   },
// });

// export default mongoose.model<ITestCaseExecution & mongoose.Document>('testcaseexecution', TestCaseExecutionSchema);