# LiveLiva — Wyon Liu

Bilingual public founder and venture website, designed for introductions through LinkedIn to investors, research leaders and platform decision-makers.

The homepage connects the founder’s track record, personal agents / world models / RSI research agenda, LiveLiva platform architecture and investment / incubation / founding-leadership opportunities. It distinguishes past-company evidence, proposed systems and unvalidated research.

## Build and preview

`python3 build.py` generates supporting pages, the bilingual research diagrams and homepages.

- `research.py`: homepage content and structure
- `research.css`: responsive visual system
- `research_map.py`: bilingual architecture figures
- `contact-en.html`, `contact-zh.html`: private contact form templates
- `site.js`, `config.js`: existing aggregate analytics and private messaging
- `share-card.html`: source for the LinkedIn preview image
- `brief/`, `product.html`, `product-zh.html`: deeper reading

Preview: `python3 -m http.server 8887 --bind 127.0.0.1`.

The homepage uses no decorative product-character art. The existing concept film is a secondary, user-initiated material, labelled as non-gameplay. Earlier design sources remain for history; `build.py` selects only the current research/founder homepage.

Public URL: https://wyonliu.github.io/LiveLiva/

Deploy only this dedicated static-site repository. The messaging service and credentials are separate. Never upload private context or product-development source.
