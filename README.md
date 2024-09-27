# Credit Tracker

Credit Tracker is a React TypeScript application that allows users to calculate monthly loan installments, manage their repayment plans, track Euribor interest rates, and store data using Redux and Local Storage.

## Key Features

- **Monthly Installment Calculation:** The application allows users to enter basic loan information (principal, interest rate, repayment period) and calculate monthly installments.
- **CRUD Operations:** Users can add, edit, and delete installment information.
- **Annual Plan Display:** Displays a list of all payments, allowing users to track their financial obligations.
- **Euribor Rates:** Fetches current Euribor interest rates via an API and allows users to use them in their installment calculations.
- **Redux for State Management:** Uses Redux to store application state and facilitate data sharing between components.
- **Local Storage:** Stores repayment plan data so that it remains accessible even after refreshing the page.

## Technologies

- **React:** Library for building user interfaces.
- **TypeScript:** For static type analysis and better development support.
- **Sass:** For styling the application and easier style management.
- **Redux:** For managing application state.
- **Axios:** For sending HTTP requests to the API.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/jeka400/credit-tracker.git
   cd credit-tracker
   ```

2. Switch to the `develop` branch:

   ```bash
   git checkout develop
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Run the application:

   ```bash
   npm start
   ```

5. Open your browser and go to `http://localhost:3000`.
