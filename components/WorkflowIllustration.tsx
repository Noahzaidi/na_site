import { CheckIcon, FlagIcon } from "@/components/icons";
import { MotionToggle } from "@/components/MotionToggle";

// Field names only: the illustration never shows invented invoice data.
const fields = [
  { label: "Supplier", width: "82%" },
  { label: "Invoice no.", width: "54%" },
  { label: "Total and VAT", width: "44%" },
  { label: "PO reference", width: "62%" },
];

const FORK_PASS = "M200 0 V10 Q200 17 190 17 H110 Q100 17 100 24 V34";
const FORK_HELD = "M200 0 V10 Q200 17 210 17 H290 Q300 17 300 24 V34";

export function WorkflowIllustration() {
  return (
    <figure id="hero-workflow" className="wf" aria-labelledby="wf-caption" data-paused="false">
      <div className="wf-head">
        <span className="wf-chip">Illustrative workflow</span>
        <MotionToggle targetId="hero-workflow" />
      </div>

      <p className="sr-only">
        An invoice moves through intake, extraction and validation. Items that pass
        validation become a proposed ERP entry that waits for approval. Items that fail
        validation are held for human review.
      </p>

      <ol className="wf-flow">
        <li className="wf-stage" data-step="1">
          <span className="wf-step" aria-hidden="true">01</span>
          <div>
            <p className="wf-kicker">Intake</p>
            <p className="wf-title">Supplier invoice received</p>
            <p className="wf-meta">PDF attached to an email in the accounts inbox</p>
          </div>
        </li>

        <li className="wf-stage" data-step="2">
          <span className="wf-link" data-link="1" aria-hidden="true" />
          <span className="wf-step" aria-hidden="true">02</span>
          <div>
            <p className="wf-kicker">Extraction</p>
            <p className="wf-title">Fields read from the document</p>
            <dl className="wf-fields">
              {fields.map((field) => (
                <div key={field.label}>
                  <dt>{field.label}</dt>
                  <dd>
                    <span className="wf-bar" style={{ width: field.width }} aria-hidden="true" />
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
            <p className="wf-kicker">Validation</p>
            <p className="wf-title">Checked against business rules</p>
            <ul className="wf-checks">
              <li>
                <CheckIcon />
                Required fields present
              </li>
              <li className="wf-swap">
                <span className="wf-swap-a">
                  <CheckIcon />
                  PO reference matched
                </span>
                <span className="wf-swap-b" aria-hidden="true">
                  <FlagIcon />
                  PO reference not found
                </span>
              </li>
              <li>
                <CheckIcon />
                Totals and VAT consistent
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
              <p className="wf-state">Passed</p>
              <p className="wf-title">Proposed ERP entry</p>
              <p className="wf-meta">Waits for approval before posting</p>
            </div>
            <div className="wf-outcome wf-outcome--held">
              <p className="wf-state">Failed</p>
              <p className="wf-title">Human review</p>
              <p className="wf-meta">Item held until a person resolves it</p>
            </div>
          </div>
        </li>
      </ol>

      <figcaption id="wf-caption" className="wf-caption">
        Illustrative workflow design. Not a live system or a client deployment.
      </figcaption>
    </figure>
  );
}
