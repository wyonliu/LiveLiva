from pathlib import Path
R=Path(__file__).parent
for name in ["build_support.py", "redesign.py"]:
 p=R/name
 exec(compile(p.read_text(),str(p),"exec"),{"__file__":str(p)})
