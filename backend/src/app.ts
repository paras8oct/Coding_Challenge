import express from 'express'
import bodyParser from 'body-parser'
import { Task } from './task-types.js'
import mongoose from 'mongoose';
import cors from 'cors'
import connectDB from './config/db';
import taskTodo from './model/task';
import validatation from './validation/task'

const app = express()
const tasks: Array<Task> = [{
  name: 'Default task',
  due: new Date(Date.now() + 3600),
  description: 'A default task from the backend',
  complete: false
}]
app.use(express.json());
mongoose.connect('mongodb://localhost:27017/tasks', {
  useNewUrlParser: true,
  useUnifiedTopology: true
} as mongoose.ConnectOptions)
  .then(() => console.log('MongoDB connected'))

app.use(bodyParser.json())
app.use(
  cors({
    origin: ['http://localhost:4200'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin', 'Set-Cookie'],
    credentials: true,
  }),
)

app.get('/healthcheck', function (req, res) {
  res.status(200).json({ success: true })
  return
})

app.use(function (req, res, next) {
  console.log(req.method + ' request at route ' + req.url)
  next()
})

app.get('/api/tasks', async (req, res) => {
  res.json(tasks)
  return
})

app.post('/api/tasks', async (req, res) => {


  const todo = new taskTodo(req.body);
  const saved = await todo.save();
  const { task } = req.body
  tasks.push(task)
  res.status(201).json(saved)
  return
})

/* Create your new route here */

app.put('/api/tasks/:id', async (req, res, next) => {
  try {
    await validatation(req)
    const updatedTaskTodo = await taskTodo.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!updatedTaskTodo) throw 'Invalid task Id';
    return res.status(200).send({message:"Updated successfully"})
  } catch (error) {
      next(error)
  }



})

app.delete('/api/tasks/:index', async (req, res) => {
  const { index } = req.params
  try {
    tasks.splice(parseInt(index))
    res.status(204).send()
    return
  } catch (e) {
    console.log(e)
    res.status(404).send()
    return
  }
})

app.use((err: any, req: any, res: any, next: any) => {
  const status = err.status || 400;
  return res.status(status).send({  message: err });
})

app.listen(5200, () => console.log('Listening on port 5200'))
export default app;
