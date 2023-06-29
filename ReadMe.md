# Confession API

This is a simple Express.js API that allows users to submit confessions, which can be verified by an administrator. The API is built using Node.js and MongoDB.

## Prerequisites

Before running the application, make sure you have the following:

- Node.js installed on your machine
- MongoDB connection URI

## Installation

1. Clone the repository and navigate to the project directory.
2. Install the dependencies by running the following command:

   ```bash
   npm install
   ```

## Configuration

1. Create a `.env` file in the project root directory.
2. Add the following environment variables to the `.env` file:

   ```
   MONGO_URI=<your-mongodb-connection-uri>
   PORT=<optional-port-number>
   ```

## Usage

To start the server, run the following command:

```bash
npm start
```

The server will start running on the specified port (default: 3002). You can access the API endpoints through `http://localhost:<port>`.

## API Endpoints

- `POST /confessions`: Submit a confession.
- `POST /admin/verify`: Verify a confession (requires admin credentials).
- `GET /confessions/last30days`: Retrieve verified confessions sent within the last 30 days.
- `GET /confessions/unverified`: Retrieve unverified confessions sent within the last 30 days.

Please note that the `/admin/verify` endpoint requires authentication with the admin password. In this code sample, the password is set to "admin" for demonstration purposes. In a production environment, make sure to implement proper authentication and security measures.

## Database Schema

The application uses a MongoDB database to store confessions. The confession schema includes the following fields:

- `confession`: The text of the confession.
- `verified`: A boolean indicating whether the confession is verified or not.
- `timestamp`: The timestamp when the confession was submitted (automatically set to the current date and time).

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).