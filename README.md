# dtdlaw.co.uk

This repository holds the website of Davies & Co Solicitors. The site is one page of plain HTML, CSS and JavaScript. It has no framework and no build step. Nginx serves it from a Docker image.

Davies & Co is the trading name of Davies & Co Solicitors Limited which is authorised and regulated by the Solicitors Regulation Authority (SRA number 646937). Companies House number 11216023

## Files

| Path | Contents |
|---|---|
| `static-site/index.html` | The whole page |
| `static-site/assets/css/site.css` | The only stylesheet |
| `static-site/assets/js/site.js` | Mobile menu, team bios, testimonial rotation and header scroll |
| `static-site/assets/img/` | Photos, team photos, office maps and logos |
| `static-site/assets/fonts/` | Self-hosted fonts, each with its licence |
| `static-site/*.pdf` | Complaints procedure, pricing and privacy policy |
| `Dockerfile` | The Nginx image that serves `static-site/` |

## Run it locally

To preview the files directly, start any static server:

```sh
python3 -m http.server 8080 --directory static-site
```

To run the same image that production uses, build it with Docker:

```sh
docker build -t dtdlaw .
docker run --rm -p 8080:80 dtdlaw
```

Then open <http://localhost:8080>.

## Deployment

Every push to `master` starts the Docker workflow. The workflow builds the image for `linux/amd64` and `linux/arm64` and pushes it to `ghcr.io/mavi0/dtdlaw:latest`.

## Updates

The image uses `nginx:stable-alpine-slim`, pinned by digest. Dependabot checks the tag every day. When the Nginx maintainers publish a new image for that tag, Dependabot opens a PR that changes the digest. This includes security fixes and new stable releases.

Dependabot also opens one grouped PR each week for GitHub Actions updates.

The `dependabot-automerge.yaml` workflow merges each Dependabot PR. A merge made with `GITHUB_TOKEN` does not start push workflows, so the workflow then starts the Docker build itself. Nobody needs to review these PRs. If a build fails, GitHub sends the usual failure email.

On 2 January each year, the `update-year.yaml` workflow updates the year in the footer.

## Licence and credits

The code uses the [AGPL-3.0](LICENSE) licence. The firm's content is all rights reserved. [NOTICE](NOTICE) lists the fonts, icons, photographs and other material from third parties, and the terms for each. Versions before the 2026 rebuild used the Rage template by BootstrapthemesCo, with thanks.

### Photographs

The photographs are from Unsplash, under the [Unsplash Licence](https://unsplash.com/license).

[Caernarfon Castle, by Neil Mark Thomas](https://unsplash.com/photos/HTpvyy64KSM)
![Caernarfon Castle][castle]

[Glasses, by Trent Erwin](https://unsplash.com/photos/UgA3Xvi3SkA)
![Glasses][glasses]

[Bikes, by Everton Vila](https://unsplash.com/photos/AsahNlC0VhQ)
![Bikes][bikes]

[Jump!, by Austin Schmid](https://unsplash.com/photos/hRdVSYpffas)
![Jump!][jump]

[Money, by Michael Longmire](https://unsplash.com/photos/lhltMGdohc8)
![Money][money]

[castle]:https://raw.githubusercontent.com/mavi0/dtdlaw/master/static-site/assets/img/hero.jpg
[glasses]:https://raw.githubusercontent.com/mavi0/dtdlaw/master/static-site/assets/img/about.jpg
[bikes]:https://raw.githubusercontent.com/mavi0/dtdlaw/master/static-site/assets/img/cta.jpg
[jump]:https://raw.githubusercontent.com/mavi0/dtdlaw/master/static-site/assets/img/testimonials.jpg
[money]:https://raw.githubusercontent.com/mavi0/dtdlaw/master/static-site/assets/img/pricing.jpg
