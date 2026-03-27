"""FrootAI CLI — Python edition."""

import sys
from frootai import FrootAI, __version__
from frootai.plays import SolutionPlay


def main():
    """Entry point for `frootai` Python CLI."""
    args = sys.argv[1:]
    command = args[0] if args else "help"

    if command == "plays":
        plays = SolutionPlay.all()
        print(f"\n  🌳 FrootAI Solution Plays ({len(plays)} total)\n")
        for p in plays:
            status = "✅" if p.status == "Ready" else "📋"
            print(f"  {status} {p.id} — {p.name} ({p.complexity})")
        print()

    elif command == "search" and len(args) > 1:
        query = " ".join(args[1:])
        with FrootAI() as client:
            result = client.search_plays(query)
            print(f"\n  Search: {query}\n  {result}\n")

    elif command == "cost" and len(args) > 1:
        play = args[1]
        scale = args[2] if len(args) > 2 else "dev"
        with FrootAI() as client:
            result = client.estimate_cost(play, scale)
            print(f"\n  Cost estimate: {result}\n")

    elif command == "version":
        print(f"frootai {__version__}")

    else:
        print(f"""
  🌳 FrootAI Python SDK v{__version__}
  From the Roots to the Fruits. It's simply Frootful.

  Commands:
    frootai plays           List all 20 solution plays
    frootai search <query>  Search plays via REST API
    frootai cost <play>     Estimate costs via REST API
    frootai version         Show version

  Python API:
    from frootai import FrootAI
    client = FrootAI()
    client.search_plays("RAG")

  Website: https://frootai.dev
""")


if __name__ == "__main__":
    main()
