# 🏗️ FrootAI Bicep Registry

> Reusable Azure infrastructure modules extracted from FrootAI solution plays.

## Available Modules

| Module | Description | Source Play |
|--------|------------|------------|
| `ai-landing-zone` | VNet + Private Endpoints + RBAC + GPU quota | Play 02, 11 |
| `openai-deployment` | Azure OpenAI with managed identity + model deployment | Play 01, 03 |
| `ai-search-index` | Azure AI Search with semantic ranking + hybrid config | Play 01, 09 |
| `container-app-ai` | Container App optimized for AI workloads | Play 01, 03, 07 |
| `apim-ai-gateway` | APIM with AI-specific policies (caching, token limits) | Play 14 |
| `aks-gpu-cluster` | AKS with GPU node pools for model serving | Play 12 |
| `doc-intelligence` | Document Intelligence + Blob Storage pipeline | Play 06, 15 |
| `speech-services` | Communication Services + Speech for voice AI | Play 04 |

## Usage

Reference any module in your own Bicep:

```bicep
module aiLandingZone 'br:frootairegistry.azurecr.io/bicep/ai-landing-zone:1.0' = {
  name: 'aiLandingZone'
  params: {
    location: 'eastus2'
    environment: 'production'
  }
}
```

## Status

🚧 **Coming Soon** — Modules are being extracted and validated from the 20 solution plays.
Each module will be published to a public Azure Container Registry (ACR).

## Contributing

Extract a reusable module from any solution play's `infra/main.bicep` and submit a PR.
See [CONTRIBUTING.md](../CONTRIBUTING.md) for guidelines.
