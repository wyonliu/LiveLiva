# -*- coding: utf-8 -*-
from pathlib import Path
R=Path(__file__).parent
for name in ["build_support.py", "research_map.py", "research.py"]:
 p=R/name
 exec(compile(p.read_text(),str(p),"exec"),{"__file__":str(p),"PUBLISH":True})
