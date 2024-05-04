# Habit Tracker Web App

This is a simple habit tracker web application built using Node.js and EJS. It allows users to add habits to track, delete habits, and mark habits as done or undone. The tracking is done on a weekly basis.

## Features

- Add new habits with a form
- Delete existing habits
- Toggle habit status between done and undone

## Technologies Used

- Node.js
- Express.js
- EJS (Embedded JavaScript)
- MongoDB (optional, if using a database for persistence)
- HTML
- CSS

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/dhairya99999/habit-tracker.git
   ```

2. Navigate to the project directory:

   ```bash
   cd habit-tracker
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the server:

   ```bash
   node server.js
   ```

5. Open your web browser and go to `http://localhost:3000` to use the app.

## Usage

1. **Add Habit**: Fill out the form with the habit you want to track and click "Add Habit".

2. **Delete Habit**: Each habit has a delete button. Click it to remove the habit from your list.

3. **Toggle Status**: Click on a habit to mark it as done or undone.

4. **View Weekly Progress**: The app tracks habits on a weekly basis, so you can see your progress throughout the week.
