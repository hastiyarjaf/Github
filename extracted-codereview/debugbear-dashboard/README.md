# DebugBear API Test Application

A Node.js application for testing the DebugBear API and retrieving project information.

## 🚀 Features

- ✅ Secure API key management using environment variables
- ✅ Comprehensive error handling with specific error types
- ✅ Input validation and configuration validation
- ✅ Detailed logging with emojis for better readability
- ✅ Modular code structure with JSDoc documentation
- ✅ Proper project configuration

## 📋 Prerequisites

- Node.js (version 14 or higher)
- A DebugBear account and API key

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Edit the `.env` file and add your actual DebugBear API key:
```env
DEBUGBEAR_API_KEY=your_actual_api_key_here
```

### 3. Get Your API Key

1. Go to [DebugBear API Keys](https://www.debugbear.com/account/api-keys)
2. Generate a new API key
3. Copy the key and paste it in your `.env` file

## 🏃‍♂️ Running the Application

### Using npm scripts:
```bash
npm start
# or
npm run dev
```

### Direct execution:
```bash
node debugTest.js
```

## 📁 Project Structure

```
├── debugTest.js        # Main application file
├── package.json        # Project configuration and dependencies
├── .env.example        # Environment variables template
├── .env               # Your actual environment variables (not in git)
├── .gitignore         # Git ignore rules
└── README.md          # This documentation
```

## 🔧 Configuration

The application supports the following environment variables:

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `DEBUGBEAR_API_KEY` | Yes | - | Your DebugBear API key |
| `DEBUGBEAR_API_BASE_URL` | No | `https://www.debugbear.com/api/v1` | API base URL |
| `NODE_ENV` | No | - | Set to 'development' for detailed error logging |

## 🚨 Error Handling

The application handles various error scenarios:

- **Authentication Errors**: Invalid or missing API key
- **Network Errors**: Connection issues
- **Permission Errors**: Insufficient API key permissions
- **Rate Limit Errors**: Too many requests
- **Validation Errors**: Missing or invalid configuration

## 🔍 Example Output

### Successful run:
```
🚀 DebugBear API Test Application Starting...

✅ Configuration validated successfully
📊 Fetching projects from DebugBear...

🎉 Successfully retrieved 2 project(s):

1. Project: My Website
   ID: 12345
   URL: https://example.com
   Created: 1/15/2024

2. Project: E-commerce Site
   ID: 67890
   URL: https://shop.example.com
   Created: 2/20/2024

✅ Application completed successfully!
```

### Error example:
```
🚀 DebugBear API Test Application Starting...

❌ Configuration Error: DebugBear API key is required. Please:
1. Copy .env.example to .env
2. Set DEBUGBEAR_API_KEY in your .env file
3. Get your API key from: https://www.debugbear.com/account/api-keys
```

## 📦 Dependencies

- **debugbear**: Official DebugBear SDK for API interactions
- **dotenv**: Loads environment variables from .env file

## 🔒 Security

- API keys are stored in environment variables (not hardcoded)
- The `.env` file is excluded from version control
- No sensitive data is logged in production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Troubleshooting

### Common Issues

**"API key not found" error:**
- Verify your API key is correctly set in the `.env` file
- Ensure there are no extra spaces or quotes around the key
- Check that you've copied the key correctly from DebugBear

**"Network Error" issues:**
- Check your internet connection
- Verify DebugBear's API status
- Try running the application again

**"Permission Error" problems:**
- Ensure your API key has the necessary scopes
- Check if your DebugBear account has access to the projects

**Environment variable issues:**
- Make sure the `.env` file is in the root directory
- Verify the file is named exactly `.env` (not `.env.txt`)
- Restart your terminal/IDE after creating the `.env` file

## 📞 Support

For DebugBear API issues, visit:
- [DebugBear Documentation](https://docs.debugbear.com/)
- [DebugBear Support](https://www.debugbear.com/contact)

For application-specific issues, please create an issue in this repository.
