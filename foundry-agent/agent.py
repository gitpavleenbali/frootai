"""FrootAI Enterprise RAG Agent — Azure AI Foundry Hosted Agent.

This agent uses Azure AI Agent Service (prompt agent) to answer
enterprise AI architecture questions using the FrootAI knowledge base.
"""

import os
from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential

ENDPOINT = os.environ.get(
    "AZURE_AI_PROJECT_ENDPOINT",
    "https://frootai-rag-agent.swedencentral.api.azureml.ms",
)

SYSTEM_PROMPT = """You are FrootAI Enterprise RAG Agent — an AI architecture expert powered by the FROOT framework.

FROOT = Foundations · Reasoning · Orchestration · Operations · Transformation

You help enterprise teams design, build, and optimize AI solutions on Azure. Your knowledge covers:
- GenAI Foundations (tokens, models, inference)
- RAG Architecture (chunking, embedding, hybrid retrieval, semantic ranking)
- AI Agents (Semantic Kernel, multi-agent, tool calling, MCP)
- Azure AI Platform (Landing Zones, private endpoints, managed identity)
- Production Patterns (fine-tuning, responsible AI, cost optimization)

Rules:
1. Always ground answers in Azure AI best practices
2. Cite specific Azure services when recommending architecture
3. Include cost implications (dev vs prod scale)
4. Recommend the FROOT layer relevant to the question
5. For implementation questions, reference the appropriate Solution Play (01-20)
6. Never fabricate service names or pricing — say "check Azure pricing calculator" if unsure
7. Keep responses structured with headers and bullet points

Available Solution Plays: Enterprise RAG (01), AI Landing Zone (02), Deterministic Agent (03),
Call Center Voice AI (04), IT Ticket Resolution (05), Document Intelligence (06),
Multi-Agent Service (07), Copilot Studio Bot (08), AI Search Portal (09), Content Moderation (10).
"""


def create_agent():
    """Create a prompt agent on Azure AI Foundry."""
    client = AIProjectClient(
        endpoint=ENDPOINT,
        credential=DefaultAzureCredential(),
    )

    oai = client.get_openai_client()
    agent = oai.beta.assistants.create(
        model="gpt-4o-mini",
        name="frootai-enterprise-rag",
        instructions=SYSTEM_PROMPT,
        temperature=0.2,
        top_p=0.95,
    )

    print(f"Agent created: {agent.id}")
    print(f"Name: {agent.name}")
    print(f"Model: {agent.model}")
    return agent


def chat_with_agent(agent_id: str, message: str):
    """Send a message to the agent and get a response."""
    client = AIProjectClient(
        endpoint=ENDPOINT,
        credential=DefaultAzureCredential(),
    )

    oai = client.get_openai_client()
    thread = oai.beta.threads.create()
    oai.beta.threads.messages.create(
        thread_id=thread.id,
        role="user",
        content=message,
    )

    run = oai.beta.threads.runs.create_and_poll(
        thread_id=thread.id,
        assistant_id=agent_id,
    )

    if run.status == "failed":
        print(f"Run failed: {run.last_error}")
        return None

    messages = oai.beta.threads.messages.list(thread_id=thread.id)
    for msg in messages.data:
        if msg.role == "assistant":
            for block in msg.content:
                if block.type == "text":
                    return block.text.value
    return None


if __name__ == "__main__":
    import sys

    if len(sys.argv) > 1 and sys.argv[1] == "create":
        agent = create_agent()
    elif len(sys.argv) > 2 and sys.argv[1] == "chat":
        agent_id = sys.argv[2]
        query = " ".join(sys.argv[3:]) if len(sys.argv) > 3 else "What is RAG architecture?"
        response = chat_with_agent(agent_id, query)
        print(f"\nAgent Response:\n{response}")
    else:
        print("Usage:")
        print("  python agent.py create              # Create the agent")
        print("  python agent.py chat <agent_id> <query>  # Chat with agent")
