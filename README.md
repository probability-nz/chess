# Chess

An example game for Probability.

The current Play setup is in `release.json`. Models use metre dimensions and every piece has an explicit `size`; resting heights and stacks are resolved by Play.

With Node.js and the `zip` command installed, run `npm run build` to package the current working tree into `dist/mod.zip`. This includes uncommitted edits. Load that ZIP with Play → File → Load game, or open this folder through a template URL.

Repeated pieces reuse one model per type and colour. Black and white models share geometry buffers while retaining separate materials.
One spare queen per colour sits beside the board for promotion.

The release uses Play release version 1 (`@patchwork.type: probability-release`)
and game format version 0 (`@patchwork.type: probability`, `formatVersion: 0`).
Schema definitions remain in Play. The build checks these format markers before
packaging, then refreshes file sizes and checksums.
