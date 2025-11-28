# Excel Data Extractor

A Node.js-based application designed to extract data from Excel sheets, capable of handling up to 3000 sheets.

## Key Features & Benefits

-   **Efficient Excel Processing:**  Handles large volumes of Excel data (up to 3000 sheets).
-   **Data Extraction:** Extracts data from Excel files.
-   **REST API:** Provides an API for uploading and retrieving data.
-   **Database Storage:** Stores extracted data in MongoDB.
-   **File Upload:** Uses Multer to handle file uploads.

## Prerequisites & Dependencies

Before you begin, ensure you have the following installed:

-   **Node.js:** (Version >= 14 recommended)
-   **npm:** (Node Package Manager) or **yarn**
-   **MongoDB:** A running MongoDB instance.

The project uses the following dependencies:

-   **JavaScript**
-   **TypeScript**
-   **express:** Fast, unopinionated, minimalist web framework for Node.js
-   **mongoose:** Elegant mongodb object modeling for node.js
-   **cors:**  CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
-   **dotenv:** Loads environment variables from .env file.
-   **xlsx:**  Parser and writer for various spreadsheet formats
-   **multer:** Node.js middleware for handling `multipart/form-data`, which is primarily used for uploading files.
-   **joi:** Object schema description language and validator for JavaScript objects.
-   **GitHub Actions**

## Installation & Setup Instructions

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/bansalgun31/Excel-data-extractor.git
    cd Excel-data-extractor
    ```

2.  **Navigate to the Backend directory:**

    ```bash
    cd Backend
    ```

3.  **Install dependencies:**

    ```bash
    npm install  # or yarn install
    ```

4.  **Configure environment variables:**

    Create a `.env` file in the `Backend` directory and add the following:

    ```
    PORT=3000  # or any other port
    MONGO_URL=mongodb://localhost:27017/excel_data  # Your MongoDB connection string
    ```

    Replace `mongodb://localhost:27017/excel_data` with your actual MongoDB connection string.

5.  **Run the application:**

    ```bash
    node app.js  # or using nodemon: nodemon app.js
    ```

    The server should start running on the specified port (e.g., `http://localhost:3000`).

## Usage Examples & API Documentation

### API Endpoints

-   **GET /ping:**  Simple health check endpoint. Returns "hii".

    ```bash
    curl http://localhost:3000/ping
    ```

-   **POST /doc/upload:** Uploads an Excel file and extracts data. Requires a `file` field in the request.
    ```bash
    curl -X POST -F "file=@path/to/your/excel.xlsx" http://localhost:3000/doc/upload
    ```

-   **GET /doc/:fileId:** Retrieves data associated with a specific file ID.  `fileId` corresponds to the original filename of the uploaded Excel file.
    ```bash
    curl http://localhost:3000/doc/your_excel_file.xlsx
    ```

### Important Considerations

-   The file ID is the original file name of the uploaded file.
-   Error handling: the API returns a JSON with success or failure message in case of a failure

## Configuration Options

-   **PORT:**  The port the application listens on (default: `3000`). Configured in the `.env` file.
-   **MONGO_URL:** The MongoDB connection string. Configured in the `.env` file.

## Project Structure

```
├── .gitignore
└── Backend/
    ├── .env
    ├── app.js
    └── configuration/
        ├── db.js
        └── upload.js
    └── controllers/
        ├── doc.controller.js
    └── middlewares/
        ├── doc.middleware.js
    └── models/
        ├── doc.model.js
        ├── upload.model.js
    └── node_modules/
        └── .bin/
            ├── crc32
            ├── crc32.cmd
            ├── crc32.ps1
            ├── mkdirp
```

*   `.env`: Environment configuration file.
*   `app.js`: Main application file.
*   `configuration/db.js`: MongoDB connection setup.
*   `configuration/upload.js`: Multer configuration for file uploads.
*   `controllers/doc.controller.js`: Contains logic for handling document related operations.
*   `middlewares/doc.middleware.js`: Contains middlewares for handling document related operations.
*   `models/doc.model.js`: Mongoose schema for storing document data.
*   `models/upload.model.js`: Mongoose schema for storing upload data.

## Contributing Guidelines

Contributions are welcome! Here's how you can contribute:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them with clear, concise messages.
4.  Push your branch to your forked repository.
5.  Submit a pull request to the main repository.

Please follow the existing code style and conventions.  Ensure your code is well-documented and includes tests where appropriate.

## Acknowledgments

-   The project utilizes the `xlsx` library for Excel parsing, `multer` for handling file uploads and `mongoose` for working with MongoDB.

## License

This project is licensed under the MIL License - see the LICENSE file for details.
