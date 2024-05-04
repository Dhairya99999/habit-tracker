const mongoose = require('mongoose');
const habitModel = require('../models/habit.schema');


//getting 7 days
function getDate(n) {
    let date = new Date();
    date.setDate(date.getDate() + n);
    var newDate = date.toLocaleDateString('pt-br').split('/').reverse().join('-');
    var day;
    switch (date.getDay()) {
        case 0: day = 'Sun';
            break;
        case 1: day = 'Mon';
            break;
        case 2: day = 'Tue';
            break;
        case 3: day = 'Wed';
            break;
        case 4: day = 'Thu';
            break;
        case 5: day = 'Fri';
            break;
        case 6: day = 'Sat';
            break;
    }
    return { date: newDate, day };
}


class habitController{

//retrieving a habit from database
async getHabit(req,res){
    await habitModel.find().select('-updatedAt -createdAt -__v').sort({ _id: -1 })
    .then(habits => {
        var days = [];
        days.push(getDate(0));
        days.push(getDate(1));
        days.push(getDate(2));
        days.push(getDate(3));
        days.push(getDate(4));
        days.push(getDate(5));
        days.push(getDate(6));
        res.render('home', { habit: habits, days });
    })
    .catch(err => {
        console.log(err);
    });
}
//appending habit form
async getForm(req,res){
    res.render('create-habit');
}
//appending a habit
async  addHabit(req,res){
    const { content } = req.body;
    console.log(content)
    await habitModel.findOne({ content:content }).then(habit => {
        if (habit) {
            // Update Existing Habit Status
            let dates = habit.dates, timezoneOffSet = (new Date()).getTimezoneOffset() * 60000;
            var today = (new Date(Date.now() - timezoneOffSet)).toISOString().slice(0, 10);
            dates.find(function (item, index) {
                if (item.date === today) {
                    console.log("Habit Already inserted in Database")
                    
                    res.redirect('/');
                }
                else {
                    dates.push({ date: today, complete: 'none' });
                    habit.dates = dates;
                    habit.save()
                        .then(habit => {
                            console.log(habit);
                            res.redirect('/');
                        })
                        .catch(err => console.log(err));
                }
            });
        }
        else {
            let dates = [], timezoneOffSet = (new Date()).getTimezoneOffset() * 60000;
            var localISOTime = (new Date(Date.now() - timezoneOffSet)).toISOString().slice(0, 10);
            dates.push({ date: localISOTime, complete: 'none' });
            const newHabit = new habitModel({
               content,
                dates
            });

           
             newHabit
                .save()
                .then(habit => {
                    console.log(habit);
                    res.redirect('/');
                })
                .catch(err => console.log(err));
        }
         
    })
  
}
    

//toggling status of the habit(done, not done, default)
async  toggleHabit(req,res){
    try {
        var d = req.query.date;
        var id = req.query.id;
        
        console.log("Date:", d);
        console.log("ID:", id);

        const habit = await habitModel.findById(id);
        if (!habit) {
            throw new Error("Habit not found");
        }

        let dates = habit.dates;
        let found = false;

        dates.find(function(item, index) {
            if (item.date === d) {
                if (item.complete === 'yes') {
                    item.complete = 'no';
                } else if (item.complete === 'no') {
                    item.complete = 'none';
                } else if (item.complete === 'none') {
                    item.complete = 'yes';
                }
                found = true;
            }
        });

        if (!found) {
            dates.push({ date: d, complete: 'yes' });
        }

        habit.dates = dates;
        const updatedHabit = await habit.save();
        console.log("Updated Habit:", updatedHabit);

        res.redirect('/');
    } catch (err) {
        console.error("Error toggling habit:", err.message);
        res.status(500).send("Error updating habit status");
    }
}

//deleting a habit
async deleteHabit(req,res){
    const documentProduct = await habitModel.findByIdAndDelete({ _id: req.params.id });
    if (!documentProduct) {
        res.status(500).json(err);
    } res.redirect('/')
}
   
}

module.exports = habitController;