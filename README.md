# MeowDownloader

MeowDownloader is an open-source social media downloader powered by YT-DLP.

![MeowDownloader Preview](/preview/Screenshot%202024-10-27%20220220.png)
![MeowDownloader Preview](/preview/Screenshot%202024-10-27%20220232.png)
![MeowDownloader Preview](/preview/Screenshot%202024-10-27%20220317.png)
![MeowDownloader Preview](/preview/Screenshot%202024-10-27%20220255.png)

## Raw Api
![MeowDownloader Preview](/preview/Screenshot%202024-10-27%20221141.png)


## Features

- Multi-platform support for popular social media sites
- High-speed extraction of video and audio content
- Secure and anonymous downloads
- Cyberpunk-themed user interface
- API integration for developers

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

## Installation

To set up MeowDownloader locally, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/tas33n/MeowDownloader.git
   ```

2. Navigate to the project directory:
   ```
   cd MeowDownloader
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Create a `.env` file in the root directory and add your configuration:
   ```
   PORT=3000
   # Add any other necessary environment variables
   ```

## Usage

To run MeowDownloader locally:

1. Start the server:
   ```
   npm start
   ```

2. Open your browser and navigate to `http://localhost:3000` (or the port you specified in the `.env` file).

3. Enter the URL of the social media content you want to download in the input field.

4. Click the "Extract" button to process the URL.

5. Choose from the available download options for video or audio.

## API Documentation

MeowDownloader provides an API for developers to integrate content extraction capabilities into their own applications. For detailed API documentation, please refer to the [API Documentation](./docs/api.md) file.

## Deployment

To deploy MeowDownloader to a production environment:

1. Choose a hosting platform (e.g., Heroku, DigitalOcean, AWS).

2. Set up the necessary environment variables on your hosting platform.

3. Deploy the application using your preferred method (e.g., Git push, Docker container).

4. Ensure that your server is configured to run the application using a process manager like PM2 or systemd.

## Contributing

We welcome contributions to MeowDownloader! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them with descriptive commit messages.
4. Push your changes to your fork.
5. Submit a pull request to the main repository.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

## Author

MeowDownloader is created and maintained by [tas33n](https://github.com/tas33n).

- GitHub: [@tas33n](https://github.com/tas33n)
- Website: [https://tas33n.is-a.dev](https://tas33n.is-a.dev)

For any questions or support, please open an issue on the [GitHub repository](https://github.com/tas33n/MeowDownloader/issues).

---

Made with ❤️ and 🐱 by tas33n