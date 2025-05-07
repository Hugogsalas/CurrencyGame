# React Native Cryptocurrency Price Tracker

This project was created as a **mini project for React Native Engineers** to demonstrate proficiency in mobile development. The goal was to build a small application that displays live cryptocurrency prices using the public [Coinbase API](https://docs.cloud.coinbase.com/sign-in-with-coinbase/docs/api-prices) and WebSocket feed.

## Problem Statement

The application solves the following problem:

- Fetches and displays live prices of 6 cryptocurrencies from the Coinbase API.
- Updates the prices in real-time when prompted by the user.
- Provides a styled and user-friendly interface to view cryptocurrency information.

## Features

### Core Features

1. **Fetch Cryptocurrency Data**:

   - On application launch, the app fetches data for 6 cryptocurrencies from the Coinbase API.
   - Displays the following details in a list:
     - **Name**
     - **Icon**
     - **Price**

2. **Real-Time Updates**:

   - Connects to the Coinbase WebSocket price feed on user prompt (button press).
   - Updates the cryptocurrency details in real-time as new messages are received.

3. **Styling**:

   - The application is styled following design standards to ensure a clean and intuitive user experience.

4. **Error Handling**:
   - Considered edge cases and implemented error handling for API and WebSocket interactions.

### Bonus Features (Optional Enhancements)

- **Native Module Integration**:
  - Introduced a native module to enhance the React Native project.
- **Dynamic Background Color**:
  - Clicking on a cryptocurrency changes the background color to match its icon.
- **Native Features**:
  - Added haptic feedback for user interactions.
- **State Management**:
  - Used Redux to persist and render cryptocurrency information.

## Challenges and Considerations

During development, the following challenges and considerations were addressed:

- **API Integration**:
  - Ensured proper handling of API rate limits and error responses.
- **WebSocket Management**:
  - Managed WebSocket connections efficiently to avoid memory leaks.
- **Design Creativity**:
  - Styled the app to balance aesthetics and usability.
- **Time Constraints**:
  - Focused on delivering core functionality within the two-hour time limit.

## How to Run the Project

1. Clone the repository and navigate to the project directory.
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the Metro server:
   ```sh
   npm start
   ```
4. Build and run the app:
   - **Android**:
     ```sh
     npm run android
     ```
   - **iOS**:
     ```sh
     npm run ios
     ```

## Resources

- [Coinbase API Documentation](https://docs.cloud.coinbase.com/sign-in-with-coinbase/docs/api-prices)
- [Coinbase WebSocket Overview](https://docs.cloud.coinbase.com/exchange/docs/websocket-overview)

## Notes

- The project was completed within the two-hour time limit. Any unfinished features or additional enhancements are documented in the code comments.
