"""FrootAI SDK — Programmatic access to the FrootAI ecosystem.

From the Roots to the Fruits. It's simply Frootful.

Usage:
    from frootai import FrootAI
    
    client = FrootAI()
    plays = client.search_plays("enterprise RAG")
    cost = client.estimate_cost("01-enterprise-rag", scale="dev")
    module = client.get_module("RAG-Architecture")
"""

__version__ = "3.2.0"
__author__ = "Pavleen Bali"

from frootai.client import FrootAI
from frootai.plays import SolutionPlay
from frootai.evaluation import Evaluator

__all__ = ["FrootAI", "SolutionPlay", "Evaluator", "__version__"]
