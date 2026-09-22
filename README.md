# Chess

An example game for Probability.

The current Play setup is in `release.json`. Models use metre dimensions and every piece has an explicit `size`; resting heights and stacks are resolved by Play.

Run `npm run build` to package the current working tree into `dist/mod.zip`. This includes uncommitted edits. Load that ZIP with Play → Edit → Create → Load, or open this folder through a template URL.

Repeated pieces reuse one model per type and colour. Black and white models share geometry buffers while retaining separate materials.
One spare queen per colour sits beside the board for promotion.
