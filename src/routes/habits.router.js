const express = require('express');
const habitController = require('../controller/habit.controller');

const habitRouter = express.Router();

const habitInstance = new habitController();
//retrieving habits from db for home
habitRouter.get('',(req,res)=>{
    habitInstance.getHabit(req,res);
})

//appending habits form
habitRouter.get('/habit-form',(req,res)=>{
    habitInstance.getForm(req,res);
});


//appending habits
habitRouter.post('',(req,res)=>{
    habitInstance.addHabit(req,res);
})

//toggling habits
habitRouter.get('/habitStatus',(req,res)=>{
    habitInstance.toggleHabit(req,res);
})

//deleting habits
habitRouter.get('/:id',(req,res)=>{
    habitInstance.deleteHabit(req,res);
})

module.exports = habitRouter;


