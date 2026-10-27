# Trans Rhetoric Library

A research library on anti-trans rhetoric: the talking points, where they come from, who spreads them and why, and how often they appear online. Every claim traces to a source that was read on the original page, and every measurement says how it was taken.

> **Content note:** this library quotes slurs and anti-trans claims in order to document and count them. Quotes are kept to what is needed to identify a talking point.

## Contents

| File | What it holds |
|---|---|
| [talking-points.md](talking-points.md) | Each talking point or slur: what it claims, who documents it, and what we measured |
| [origins.md](origins.md) | What is documented so far about where the rhetoric comes from and why it spreads, and the open questions |
| [measurements.md](measurements.md) | Counts of the phrases on Twitter and Bluesky, with dates, method and limits |
| [sources.md](sources.md) | Every source, what it says, and whether it was checked on the original page |

## Relationship to Beth's Anti-Transphobia Library

[Beth's Anti-Transphobia Library](https://bethylamine.github.io/) already catalogues gender-critical arguments, their code words and rebuttals, and is the better place for a rebuttal to a specific argument. This library does not copy it. It links to Beth's pages where they cover a point, and adds what Beth's does not focus on: measurements of how often the rhetoric appears, and documentation of where it comes from, including organised and foreign influence campaigns.

## Rules

- **Checked sources only.** A claim is cited only after the source was read on the original page. Anything seen only in a search summary is marked *unverified* and not relied on.
- **Claims are claims.** "This account is a bot" or "this campaign is foreign" is reported as what a named source found, never as our own finding unless we measured it.
- **People.** Only public figures and organisations are named, and only for what a source documents them saying or doing. No private individuals, no account handles of ordinary users.
- **Measurements say what they can't show.** A count of a phrase includes people quoting it to object. Say so next to every number.
- **No fabricated data.** An unknown value is "—", never a guess.

## Origin

Started in October 2026 from research done for the [Bot Traffic Monitor](https://emmalegrottaglie.github.io/Russian-Bot-Monitor/), which tracks political activity online and added anti-trans searches on Twitter. That project's `docs/NARRATIVES.md` holds the original notes.

## Website

The library is also a website, built by GitHub Pages with Jekyll from these same Markdown files. Its look follows Emma's interactive CV: the trans-flag palette, Fraunces, Hanken Grotesk and JetBrains Mono, and light and dark themes.

| Path | What it does |
|---|---|
| `index.html` | The home page |
| `_layouts/default.html` | The page frame: sidebar, navigation, theme toggle |
| `_data/nav.yml` | The sidebar's list of pages, with the blurbs shown on the home page |
| `assets/css/site.css`, `assets/js/site.js` | Styles, and the script that turns each `###` entry into a card and builds the on-page list |
| `_config.yml` | Site settings, including `baseurl`, which must match the repository name |

Each Markdown page starts with a short front matter block (`title`, `eyebrow`, `description`). Link between pages with relative links to the `.md` files, as now; GitHub Pages turns them into links between pages.

To preview locally, install Jekyll once (`gem install jekyll jekyll-relative-links kramdown-parser-gfm`), then run `jekyll serve` in this folder and open http://127.0.0.1:4000/trans-rhetoric-library/.
