# SubspacePath Pruner Website

High-quality project website draft for the `slm_agent` paper:
**SubspacePath Pruner: Inference-time Pruning via Probe-based Representation-Parameter Coupling**.

## Local Preview

```bash
cd /scratch/gongzhiren/slm_agent/papers/website
python -m http.server 8090
```

Open `http://localhost:8090`.

## Structure

- `index.html`: full project page content and section layout
- `styles.css`: sci-fi styled visual system (deep blue / cyan / violet)
- `script.js`: citation copy, lightbox, nav highlight, section linkage effects
- `assets/`: PNGs converted from paper PDF figures for web display

## Figure Sources

Most images are loaded directly from `../figs/` (paper assets).
Some PDF charts were converted to PNG and stored in `assets/` for browser compatibility.

## Release Notes

- This draft is intended for internal/private use first.
- When public links are ready, update the `Resources` section in `index.html`.
