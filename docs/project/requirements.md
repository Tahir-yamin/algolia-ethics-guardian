# Requirements: AI Ethics & Goal Alignment Guardian

## Goal
A non-conversational AI agent that proactively audits product specifications for ethical risks, regulatory compliance (EU AI Act, GDPR), and goal misalignment. It leverages Algolia Agent Studio to retrieve grounded legal and ethical frameworks in real-time.

## User Personas
1. **Product Managers**: Writing feature specs and wanting to ensure "Safety-by-Design".
2. **AI Ethics Officers**: Reviewing proposed features for compliance with company values.
3. **Developers**: Understanding the technical constraints imposed by AI regulations.

## Core Features (World-Class Edition)
1.  **AI Safety Guardrails (Prompt Injection Protection)**: Integrated security layer (mimicking Lakera Guard) that blocks unethical or malicious spec-writing in real-time.
2.  **Hybrid RAG + Re-ranking**: Combines Algolia Vector & Keyword search with a secondary scoring pass to ensure 100% legal precision.
3.  **In-Editor "Ethics Overlays"**: Non-intrusive floating cards that proactively suggest bias-mitigation strategies (e.g., "This dataset selection might exclude elderly users—add inclusivity check?").
4.  **One-Click Compliance Reporting**: Generates a PDF/Markdown "Ethics Statement" for the product, citing specific Algolia-retrieved Articles.
5.  **PRD Framework Integration**: Special templates for ChatPRD-style document generation but with built-in NIST AI RMF guardrails.

## Technical Stack
- **Frontend**: Next.js 15, Tailwind CSS, InstantSearch.js.
- **Search/AI**: Algolia Agent Studio (RAG), Targeted Prompting.
- **Editor**: Tiptap or simple Markdown editor with decoration support.

## Compliance & Credibility (International Standards)
The Guardian is designed to align with the core requirements of:
1. **ISO/IEC 42001:2023 (AIMS)**: Implements automated "AI System Impact Assessments" and maintains the mandatory "Documentation and Record Keeping" for audit trails.
2. **NIST AI RMF 1.0**: Focuses on the **Measure** and **Govern** functions, providing real-time metrics for *Transparency*, *Fairness*, and *Reliability*.
3. **IEEE 7000-2021 (Value-Based Engineering)**: Uses proactive "Value Protection" by flagging deviations from defined human-centric values during the design phase.
4. **GDPR/EU AI Act Consistency**: Automated retrieval of relevant articles ensures legal groundedness and prevents regulatory drift.

## Security & Ethics
- **Data Privacy**: No PII indexed; only public regulatory documents.
- **Hallucination Prevention**: Explicit "Groundedness" system prompt ensuring answers only cite retrieved indices.
- **Admin Security**: Algolia Admin API keys restricted to server-side indexing scripts.
