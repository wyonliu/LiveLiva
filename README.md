# LiveLiva website

Bilingual public website for LiveLiva. Static HTML/CSS, no runtime dependencies.

- `index.html`: English homepage
- `zh.html`: Chinese homepage
- `product.html` / `product-zh.html`: public product blueprint
- `brief/`: bilingual one-page briefs and vector system diagrams
- `build.py`: generates public HTML; `studio.py`, `studio.css` and `studio.js` define the homepages
- `style.css`: shared blueprint and privacy styles
- `assets/studio/`: original concept artwork, explicitly marked as non-gameplay
- The experience interaction is an illustrative rule demonstration, not a running game.

Preview: `python3 -m http.server 8884 --bind 127.0.0.1`

GitHub Pages URL: https://wyonliu.github.io/LiveLiva/
Publish the root of this dedicated website repository. Never include private product source or internal review records. Concept visuals are marked and do not represent gameplay footage.
