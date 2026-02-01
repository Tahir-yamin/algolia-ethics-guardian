# AI Ethics Guardian: Visual Workflow

This diagram illustrates how the system leverages Algolia Agent Studio to provide real-time, grounded ethical auditing.

```mermaid
graph TD
    A["[User] Drafts PRD/Feature Spec"] --> B["[Frontend] Live Editor (Next.js)"]
    B --> C["[Agent Studio] Targeted Prompting Middleware"]
    
    subgraph "Algolia Retrieval Engine (RAG)"
        D2[("Index: Misalignment Patterns")]
        D1[("Index: AI Regulations & Standards")]
        C -->|Extracts Keywords/Semantic Context| D1
        C -->|Scans for Intent Patterns| D2
    end
    
    D1 --> E["[Context Injection] Grounded Regulatory Facts"]
    D2 --> F["[Context Injection] Goal Conflict Cards"]
    
    E & F --> G["[LLM] Ethics Synthesis (No Hallucinations)"]
    G --> H["[UI] Real-time Highlighting & Ethics Panel"]
    
    H --> I{"[Decision]"}
    I -->|Fix Recommended| A
    I -->|Compliant| J["[Final] One-Click Ethics Report (NIST/ISO)"]
```

## Step-by-Step Logic
1.  **Drafting**: The user enters text (e.g., "Add user sentiment tracking to maximize app retention").
2.  **Extraction**: The system sends chunks of text to Algolia.
3.  **Retrieval**: Algolia retrieves **Article 6 (High-Risk Systems)** and **GDPR Profiling** rules.
4.  **Synthesis**: The LLM, constrained by the retrieved context, explains the risk: *"Tracking sentiment for retention may lead to 'dark patterns' prohibited by IEEE 7000 value-based design."*
5.  **Audit**: The UI highlights the text in yellow and provides a direct link to the regulation.
6.  **Certification**: When the SPEC is finalized, the system generates a traceability report citing every standard it complied with.
