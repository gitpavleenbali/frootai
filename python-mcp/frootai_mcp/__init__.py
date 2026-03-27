"""FrootAI MCP Server — Python Implementation.

AI architecture knowledge + compute tools.
22 tools, 18 modules, 200+ terms, 20 solution plays.

Usage:
    pip install frootai-mcp
    frootai-mcp-py

Or in Python:
    from frootai_mcp import FrootAIMCP
    server = FrootAIMCP()
    server.run()
"""

__version__ = "3.2.0"
__author__ = "Pavleen Bali"

from frootai_mcp.server import FrootAIMCP, main

__all__ = ["FrootAIMCP", "main", "__version__"]
