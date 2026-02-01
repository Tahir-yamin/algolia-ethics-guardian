# Algolia Index Schema Design (AI Ethics Guardian)

## 1. Ethics & Regulations Index (`ethics_regulations`)
This index stores the core knowledge retrieved via RAG.

| Attribute | Type | Purpose |
| :--- | :--- | :--- |
| `objectID` | String | Unique ID (e.g., `eu-ai-act-art-5`) |
| `source` | String | Source name (EU AI Act, GDPR, OECD) |
| `category` | String | High-risk, Transparency, Bias, etc. |
| `title` | String | Clause or Article title |
| `content` | String | **The searchable text (Searchable)** |
| `urn` | String | URL to official source |
| `tags` | Array | Keywords for filtering |
| `risk_level` | Integer | 0-3 (Low to Prohibited) |
| `standard_refs` | Array | References to ISO 42001, NIST, IEEE, etc. |
| `audit_weight` | Float | Importance for compliance reporting |

## 2. Misalignment Patterns Index (`goal_misalignment`)
This index stores patterns that flag potential ethical goal conflicts.

| Attribute | Type | Purpose |
| :--- | :--- | :--- |
| `objectID` | String | Unique ID |
| `intent_pattern` | String | Text pattern (e.g. "Maximize screen time") |
| `ethical_conflict` | String | The conflict (e.g. "User addiction/Mental Health") |
| `suggestion` | String | Better alternative |

## Search Settings (Algolia)
- **Searchable Attributes**: `content`, `title`, `tags`, `intent_pattern`.
- **Attributes for Faceting**: `source`, `category`, `risk_level`.
- **Custom Ranking**: `risk_level` (descending).
