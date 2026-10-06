import { CheckIcon, FlagIcon } from "@/components/icons";
import { MotionToggle, type MotionText } from "@/components/MotionToggle";
import type { Dictionary } from "@/content/i18n/types";

// Field names only: the illustration never shows invented invoice data.
const fieldWidths = ["82%", "54%", "44%", "62%"] as const;

const FORK_PASS = "M200 0 V10 Q200 17 190 17 H110 Q100 17 100 24 V34";
const FORK_HELD = "M200 0 V10 Q200 17 210 17 H290 Q300 17 300 24 V34";

type WorkflowIllustrationProps = {
  t: Dictionary["home"]["illustration"];
  media: MotionText;
};

export function WorkflowIllustration({ t, media }: WorkflowIllustrationProps) {
  return (
    <figure id="hero-workflow" className="wf" aria-labelledby="wf-caption" data-paused="false">
      <div className="wf-head">
        <span className="wf-chip">{t.chip}</span>
        <MotionToggle targetId="hero-workflow" t={media} />
      </div>

      <p className="sr-only">{t.summary}</p>

      <ol className="wf-flow">
        <li className="wf-stage" data-step="1">
          <span className="wf-step" aria-hidden="true">01</span>
          <div>
            <p className="wf-kicker">{t.intake.kicker}</p>
            <p className="wf-title">{t.intake.title}</p>
            <p className="wf-meta">{t.intake.meta}</p>
          </div>
        </li>

        <li className="wf-stage" data-step="2">
          <span className="wf-link" data-link="1" aria-hidden="true" />
          <span className="wf-step" aria-hidden="true">02</span>
          <div>
            <p className="wf-kicker">{t.extraction.kicker}</p>
            <p className="wf-title">{t.extraction.title}</p>
            <dl className="wf-fields">
              {t.extraction.fields.map((label, i) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>
                    <span className="wf-bar" style={{ width: fieldWidths[i] }} aria-hidden="true" />
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </li>

        <li className="wf-stage" data-step="3">
          <span className="wf-link" data-link="2" aria-hidden="true" />
          <span className="wf-step" aria-hidden="true">03</span>
          <div>
            <p className="wf-kicker">{t.validation.kicker}</p>
            <p className="wf-title">{t.validation.title}</p>
            <ul className="wf-checks">
              <li>
                <CheckIcon />
                {t.validation.required}
              </li>
              <li className="wf-swap">
                <span className="wf-swap-a">
                  <CheckIcon />
                  {t.validation.poMatched}
                </span>
                <span className="wf-swap-b" aria-hidden="true">
                  <FlagIcon />
                  {t.validation.poMissing}
                </span>
              </li>
              <li>
                <CheckIcon />
                {t.validation.totals}
              </li>
            </ul>
          </div>
        </li>

        <li>
          <svg className="wf-fork" viewBox="0 0 400 34" preserveAspectRatio="none" aria-hidden="true">
            <path className="wf-fork-base" d={FORK_PASS} />
            <path className="wf-fork-base wf-fork-base--held" d={FORK_HELD} />
            <path className="wf-fork-pass" d={FORK_PASS} pathLength={100} />
            <path className="wf-fork-held" d={FORK_HELD} pathLength={100} />
          </svg>
          <div className="wf-outcomes">
            <div className="wf-outcome wf-outcome--pass">
              <p className="wf-state">{t.passed.state}</p>
              <p className="wf-title">{t.passed.title}</p>
              <p className="wf-meta">{t.passed.meta}</p>
            </div>
            <div className="wf-outcome wf-outcome--held">
              <p className="wf-state">{t.failed.state}</p>
              <p className="wf-title">{t.failed.title}</p>
              <p className="wf-meta">{t.failed.meta}</p>
            </div>
          </div>
        </li>
      </ol>

      <figcaption id="wf-caption" className="wf-caption">
        {t.caption}
      </figcaption>
    </figure>
  );
}
