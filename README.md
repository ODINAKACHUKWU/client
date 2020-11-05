# Trancker Interface

This is the web interface for [Trancker](http://github.com/ODINAKACHUKWU/trancker) application.

## Features

### Users

- Sees the `Dashboard` page when the app is started containing graphical summaries of the following key metrics:

o Summary section of contributions made on trancker.
o Contributions by month for the current year.
o Total contributions by year.
o Contribution increase/decrease by year.
o Average contribution amount by month and year.

- Navigates trancker pages by clicking on the pages listed on the hamburger menu in the Navigation Bar.

- Can add/update/delete transactions on the `Transactions` page.

- View a tabular transaction ledger containing previously entered transactions.

- Can click the `About` link in the Footer bar to display information about the Developer.

# Table of Contents

- [Getting Started](#Getting-Started "Goto Getting-Started")
- [Technology Stack](#Technology-Stack "Goto Technology-Stack")
- [Installation](#Installation "Goto Installation")

## Getting Started

This is application is a frontend app built with React library.

## Technology Stack

- ReactJs
- Redux
- Bootsrap
- Nivo (Data visualization)
- Google Charts (Data visualization)

## Installation

1. Install [Node JS](https://nodejs.org) on your machine.

2. Clone the repository.

3. Change directory into the root of the project directory.

4. Run `npm install` on the terminal to install project dependecies.

5. Create a `.env` file and copy this variable in `.env.sample` into it.

6. Start the application: Different Build Environments.

- ### Production

`npm start`

- ### Development

`npm run dev`

### Note:

Ensure the backend application is running to enable this application call the API endpoints.
