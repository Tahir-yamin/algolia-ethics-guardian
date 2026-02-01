const { algoliasearch } = require('algoliasearch');

const APP_ID = 'T117OG9HRC';
const WRITE_KEY = '5b1e6ab817d280ec02de23e9c79f8fcf';
const INDEX_NAME = 'ethics_standards';

const ETHICS_DATA = [
    {
        objectID: 'eu-ai-act-01',
        name: 'EU AI Act Article 9',
        category: 'Regulation',
        description: 'Risk management system for high-risk AI systems. Requires iterative process throughout the entire lifecycle.',
        severity: 'High',
        source: 'EU Parliament'
    },
    {
        objectID: 'nist-ai-rmf-01',
        name: 'NIST AI Risk Management Framework',
        category: 'Framework',
        description: 'Guidance on managing AI risks, focusing on safety, bias, and transparency in machine learning models.',
        severity: 'Medium',
        source: 'NIST'
    },
    {
        objectID: 'iso-42001-01',
        name: 'ISO/IEC 42001:2023',
        category: 'Standard',
        description: 'International standard for AI Management Systems (AIMS), detailing governance and accountability requirements.',
        severity: 'Critical',
        source: 'ISO'
    },
    {
        objectID: 'gdpr-ai-01',
        name: 'GDPR Article 22',
        category: 'Law',
        description: 'Automated individual decision-making, including profiling. Users have the right not to be subject to decisions based solely on automated processing.',
        severity: 'High',
        source: 'European Union'
    },
    {
        objectID: 'ethics-guideline-01',
        name: 'Ethics Guidelines for Trustworthy AI',
        category: 'Guidelines',
        description: 'Focuses on 7 key requirements: Human agency, Technical robustness, Privacy, Transparency, Diversity, Well-being, and Accountability.',
        severity: 'Medium',
        source: 'AI HLEG'
    }
];

async function seed() {
    console.log(`Seeding index: ${INDEX_NAME}...`);
    const client = algoliasearch(APP_ID, WRITE_KEY);

    try {
        // Correct v5 method to save objects
        await client.saveObjects({
            indexName: INDEX_NAME,
            objects: ETHICS_DATA
        });
        console.log('Successfully seeded 5 ethics records!');

        // Configure settings for searchable attributes
        await client.setSettings({
            indexName: INDEX_NAME,
            indexSettings: {
                searchableAttributes: ['name', 'description', 'category', 'source']
            }
        });
        console.log('Index settings configured.');
    } catch (error) {
        console.error('Seeding failed:', error.message);
    }
}

seed();
