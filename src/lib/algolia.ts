import { algoliasearch } from 'algoliasearch';

const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || 'latency';
const apiKey = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY || '6be0576ff61c053d5f9a3225e2a90f76';

// Initialize the Algolia client
export const searchClient = algoliasearch(appId, apiKey);

export const ALGOLIA_INDEX_NAME = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME || 'instant_search';

// Algolia Agent Studio Configuration
// Replace with your actual Agent ID from the Algolia Dashboard
export const ALGOLIA_AGENT_ID = process.env.NEXT_PUBLIC_ALGOLIA_AGENT_ID || '8f7c4a2d-3b1e-4d5f-9a6c-e2b1f5d0c3e9';

export const agentConfig = {
    appId,
    apiKey,
    agentId: ALGOLIA_AGENT_ID,
};
