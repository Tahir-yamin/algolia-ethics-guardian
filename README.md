# 🛡️ Ethics Guardian: Proactive AI Governance

[![Powered by Algolia](https://img.shields.io/badge/Powered%20by-Algolia%20Agent%20Studio-electricblue?style=for-the-badge&logo=algolia)](https://www.algolia.com/products/ai-search/agent-studio/)
[![Next.js](https://img.shields.io/badge/Built%20With-Next.js%2016-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Status](https://img.shields.io/badge/System-Nominal-green?style=for-the-badge)](https://ethics-guardian-demo.vercel.app)

**Ethics Guardian** is a "Mission Control" dashboard for AI governance. It transforms static regulatory frameworks (GDPR, NIST AI RMF, ISO 42001) into live, actionable intelligence using **Algolia Agent Studio**.

![Ethics Guardian Dashboard](https://github.com/user-attachments/assets/41e3afc3-4660-4121-92bc-5bf882def37e)



## 🚀 The Mission
Developers are building AI faster than they can audit it. "Compliance Hallucinations" occur when AI agents ignore safety guidelines. **Ethics Guardian** solves this with **Grounded RAG**—using Algolia as the unshakeable source of truth for regulatory data.

## 💎 Key Features

- **🧠 Advisor Relay**: A conversational agent that *cannot* hallucinate laws. It searches Algolia first, then answers citing specific Article IDs.
- **⚡ sub-50ms Telemetry**: Real-time "Safe Score" and latency metrics powered by Algolia's global DSN.
- **🛡️ Proactive Audits**: Drop a spec, get a multi-framework audit (GDPR, NIST, ISO) instantly.
- **🔍 Knowledge Repo**: Manually browse the indexed frameworks that power the AI's decision-making.

## 🛠️ Technical Stack

This project leverages the bleeding edge of the React ecosystem:

- **Core**: [Next.js 16](https://nextjs.org/) (App Router)
- **UI Architecture**: React 19 (Server Components + Actions)
- **AI Orchestration**: [Algolia Agent Studio](https://www.algolia.com/products/ai-search/agent-studio/)
- **Search Engine**: Algolia InstantSearch.js
- **Styling**: Tailwind CSS v3 (Mission Control / HUD Theme)
- **Icons**: Lucide React

## 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Tahir-yamin/algolia-ethics-guardian.git
   cd algolia-ethics-guardian
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment**
   Create a `.env.local` file with your Algolia credentials:
   ```env
   NEXT_PUBLIC_ALGOLIA_APP_ID=YourAppID
   ALGOLIA_WRITE_KEY=YourWriteKey
   NEXT_PUBLIC_ALGOLIA_AGENT_ID=YourAgentID
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```
   Access mission control at `http://localhost:3000`.

## 🤖 Algolia Agent Setup

To replicate the **Advisor Relay**, you must configure an Agent in Algolia Studio:

1. Create a new Index: `ethics_standards`.
2. Upload the JSON datasets from `/docs/standards`.
3. Create an Agent with the **"Search-First"** system prompt found in `prompts/agent-system-prompt.txt`.
4. Copy the Agent ID to your `.env.local`.

## 🤝 Contribution

This project was built for the **Algolia Agent Studio Challenge**. PRs are welcome for:
- Adding new Regulatory Frameworks (HIPAA, CCPA).
- Enhancing the Telemetry visualizations.

## 📜 License

MIT License. Built by [Tahir-yamin](https://github.com/Tahir-yamin).
