/**
 * DebugBear API Test Application
 * 
 * This application demonstrates how to use the DebugBear API to retrieve project information.
 * Make sure to set up your API key in a .env file before running.
 * 
 * @author Your Name
 * @version 1.0.0
 */

// Load environment variables from .env file
require('dotenv').config();

// Import DebugBear SDK
const { DebugBear } = require('debugbear');

/**
 * Configuration object for the application
 */
const config = {
    apiKey: process.env.DEBUGBEAR_API_KEY,
    baseUrl: process.env.DEBUGBEAR_API_BASE_URL || 'https://www.debugbear.com/api/v1'
};

/**
 * Validates the configuration before initializing the client
 * @returns {boolean} True if configuration is valid
 * @throws {Error} If configuration is invalid
 */
function validateConfig() {
    if (!config.apiKey) {
        throw new Error(
            'DebugBear API key is required. Please:\n' +
            '1. Copy .env.example to .env\n' +
            '2. Set DEBUGBEAR_API_KEY in your .env file\n' +
            '3. Get your API key from: https://www.debugbear.com/account/api-keys'
        );
    }
    
    if (config.apiKey === 'your_actual_api_key_here' || config.apiKey === 'YOUR_API_KEY') {
        throw new Error(
            'Please replace the placeholder API key with your actual DebugBear API key.\n' +
            'Get your API key from: https://www.debugbear.com/account/api-keys'
        );
    }
    
    return true;
}

/**
 * Creates and returns a configured DebugBear client
 * @returns {DebugBear} Configured DebugBear client instance
 */
function createClient() {
    try {
        validateConfig();
        console.log('✅ Configuration validated successfully');
        return new DebugBear(config.apiKey);
    } catch (error) {
        console.error('❌ Configuration Error:', error.message);
        process.exit(1);
    }
}

/**
 * Handles different types of API errors with specific messaging
 * @param {Error} error - The error object from the API call
 */
function handleApiError(error) {
    console.error('\n❌ API Error Details:');
    
    // Check for specific error types
    if (error.message.includes('API key not found')) {
        console.error('🔑 Authentication Error: Invalid or missing API key');
        console.error('   Please check your DEBUGBEAR_API_KEY in the .env file');
        console.error('   Get your API key from: https://www.debugbear.com/account/api-keys');
    } else if (error.message.includes('Network Error') || error.code === 'ECONNREFUSED') {
        console.error('🌐 Network Error: Unable to connect to DebugBear API');
        console.error('   Please check your internet connection and try again');
    } else if (error.message.includes('403')) {
        console.error('🚫 Permission Error: API key lacks required permissions');
        console.error('   Please verify your API key has the correct scopes');
    } else if (error.message.includes('429')) {
        console.error('⏰ Rate Limit Error: Too many requests');
        console.error('   Please wait a moment before trying again');
    } else {
        console.error('💥 Unexpected Error:', error.message);
    }
    
    // Log full error for debugging
    if (process.env.NODE_ENV === 'development') {
        console.error('\n🔍 Full Error Stack:', error);
    }
}

/**
 * Fetches and displays project information from DebugBear
 * @param {DebugBear} client - The configured DebugBear client
 */
async function fetchProjects(client) {
    try {
        console.log('📊 Fetching projects from DebugBear...');
        
        const projects = await client.projects.list();
        
        if (!projects || projects.length === 0) {
            console.log('📝 No projects found in your DebugBear account');
            return;
        }
        
        console.log(`\n🎉 Successfully retrieved ${projects.length} project(s):\n`);
        
        projects.forEach((project, index) => {
            console.log(`${index + 1}. Project: ${project.name || 'Unnamed Project'}`);
            if (project.id) console.log(`   ID: ${project.id}`);
            if (project.url) console.log(`   URL: ${project.url}`);
            if (project.created_at) console.log(`   Created: ${new Date(project.created_at).toLocaleDateString()}`);
            console.log('');
        });
        
    } catch (error) {
        handleApiError(error);
    }
}

/**
 * Main application function
 * Orchestrates the entire flow of the application
 */
async function main() {
    console.log('🚀 DebugBear API Test Application Starting...\n');
    
    try {
        // Create client with validation
        const client = createClient();
        
        // Fetch and display projects
        await fetchProjects(client);
        
        console.log('✅ Application completed successfully!');
        
    } catch (error) {
        console.error('💥 Application failed:', error.message);
        process.exit(1);
    }
}

/**
 * Handle unhandled promise rejections
 */
process.on('unhandledRejection', (reason, promise) => {
    console.error('⚠️  Unhandled Promise Rejection:', reason);
    process.exit(1);
});

/**
 * Handle uncaught exceptions
 */
process.on('uncaughtException', (error) => {
    console.error('💥 Uncaught Exception:', error.message);
    process.exit(1);
});

// Run the application if this file is executed directly
if (require.main === module) {
    main();
}

// Export for potential use as a module
module.exports = {
    main,
    createClient,
    fetchProjects,
    validateConfig
};
