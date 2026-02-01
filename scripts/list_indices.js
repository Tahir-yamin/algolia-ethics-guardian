const { algoliasearch } = require('algoliasearch');
require('dotenv').config({ path: '.env.local' });

async function listIndices() {
    const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID;
    const apiKey = process.env.ALGOLIA_WRITE_KEY || process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY;

    if (!appId || !apiKey) {
        console.error("Missing App ID or API Key");
        return;
    }

    const client = algoliasearch(appId, apiKey);
    try {
        const { items } = await client.listIndices();
        console.log("Available Indices:");
        items.forEach(index => {
            console.log(`- ${index.name} (${index.entries} records)`);
        });
    } catch (error) {
        console.error("Failed to list indices:", error.message);
    }
}

listIndices();
