import Link from "next/link";

export default function TermsAndConditions() {
  return (
    <div className="section">
      <div className="content-readable">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">Terms and Conditions</h1>

        <div className="space-y-6 text-gray-700">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Introduction</h2>
            <p>
              Welcome to Onyx Renders LLC. By accessing and using our website, products, and services, you agree to
              comply with and be bound by the following Terms and Conditions, which, together with our Privacy Policy,
              govern our relationship with you in relation to this website. If you do not agree with any part of these
              Terms and Conditions, please refrain from using our website or services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Definitions</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <span className="font-bold">Company:</span> Onyx Renders LLC, registered in Texas, United States.
              </li>
              <li>
                <span className="font-bold">Client:</span> The individual or entity purchasing products or services
                from Onyx Renders LLC.
              </li>
              <li>
                <span className="font-bold">Project:</span> The agreed scope of work, including digital
                visualizations, animations, and related services.
              </li>
              <li>
                <span className="font-bold">Order:</span> A legally binding agreement outlining the project details,
                deliverables, and fees.
              </li>
              <li>
                <span className="font-bold">Product:</span> The final deliverable, which may include digital
                renderings, animations, or interactive visual tools. Work files and assets used during development are
                not included unless otherwise agreed.
              </li>
              <li>
                <span className="font-bold">Asset:</span> Any digital materials such as models, textures, music, or
                stock images used to create the final product.
              </li>
              <li>
                <span className="font-bold">Schedule:</span> The timeline agreed upon for project execution and
                delivery.
              </li>
              <li>
                <span className="font-bold">Confidential Information:</span> Any proprietary information disclosed
                by either party and marked as confidential.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Services and Ordering Process</h2>
            <p>
              Onyx Renders LLC provides high-end architectural visualization services. Our process follows these
              steps:
            </p>
            <ol className="list-decimal pl-5 mt-2 space-y-1">
              <li>The Client submits a request for proposal (RFP) via email.</li>
              <li>Onyx Renders LLC provides a detailed proposal, including scope, timeline, and fees.</li>
              <li>The Client confirms acceptance of the proposal in writing, officially initiating the project.</li>
              <li>
                An Order Form consolidating the agreement will be shared with the Client upon project commencement.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              4. Changes to Scope, Schedule, and Cancellation
            </h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                Any modifications to scope, timeline, or workflow after project initiation will incur additional fees
                and require a revised schedule.
              </li>
              <li>Clients must notify Onyx Renders LLC of any major changes as soon as possible.</li>
              <li>
                If a project is canceled or postponed by the Client within three (3) days before the start date or
                after initiation, Onyx Renders LLC reserves the right to charge for completed work and may impose a
                cancellation fee of up to 15% of the total order amount.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Project Completion and Deliverables</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>The project is considered complete upon final delivery.</li>
              <li>
                The Client has three (3) business days from delivery to raise any concerns or revision requests.
              </li>
              <li>
                If no feedback is received within this period, the order is considered fulfilled, and an invoice will
                be issued.
              </li>
            </ul>
            <p className="mt-3 font-bold">Standard Delivery Formats:</p>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>Still Images: JPG (minimum 2560 ×1440 resolution)</li>
              <li>Animations: MP4 (1920×1080 resolution)</li>
              <li>VR Content: As per agreed technical specifications</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Payment Terms</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Onyx Renders LLC reserves the right to request upfront payments before starting a project.</li>
              <li>The standard payment term is fifteen (15) days from the invoice date.</li>
              <li>All payments must be made via wire transfer.</li>
              <li>
                Late payments may incur penalties, and Onyx Renders LLC reserves the right to involve debt collection
                agencies if necessary.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Intellectual Property and Licensing</h2>
            <p className="font-bold">Client's Intellectual Property:</p>
            <ul className="list-disc pl-5 mt-1 mb-3 space-y-1">
              <li>Any materials provided by the Client (models, references, music, etc.) remain their property.</li>
              <li>
                The Client guarantees they hold all necessary rights for provided materials and indemnifies Onyx
                Renders LLC against any third-party claims.
              </li>
            </ul>
            <p className="font-bold">Onyx Renders LLC's Intellectual Property:</p>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>Any materials created by Onyx Renders LLC remain the company's intellectual property.</li>
              <li>
                Upon full payment, Onyx Renders LLC grants the Client a limited, irrevocable, non-exclusive,
                non-transferable, royalty-free license to use the final deliverables.
              </li>
              <li>Work files and raw assets are not included unless a separate licensing agreement is arranged.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Attribution and Publicity</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                Onyx Renders LLC retains the right to credit its work and may use delivered products for promotional
                purposes unless otherwise agreed in writing.
              </li>
              <li>The Client agrees to provide credit to Onyx Renders LLC where applicable.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Confidentiality</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                Both parties agree to protect all confidential information and only disclose it to personnel necessary
                for project execution.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Limitation of Liability</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                Onyx Renders LLC's liability is limited to the total amount paid by the Client for the specific
                project.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">11. Force Majeure</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                Neither party shall be held liable for delays caused by circumstances beyond their reasonable control
                (e.g., natural disasters, power outages, unforeseen technical failures).
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">12. Governing Law and Dispute Resolution</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>These Terms and Conditions are governed by the laws of the State of Texas, United States.</li>
              <li>
                Any disputes shall first be attempted to be resolved amicably. If no resolution is reached, disputes
                will be subject to the exclusive jurisdiction of Texas courts.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">13. Termination</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                Clauses concerning Intellectual Property, Confidentiality, Liability, and Governing Law shall survive
                any termination of business relations.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">14. Amendments</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                Onyx Renders LLC reserves the right to update these Terms and Conditions at any time. Clients will be
                notified of significant changes.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">15. Non-Waiver</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Failure to enforce any provision of these Terms does not constitute a waiver of that right.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">16. Assignment and Transfer</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                The Client may not assign or transfer rights under this agreement without prior written consent from
                Onyx Renders LLC.
              </li>
            </ul>
          </section>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 text-center text-gray-600 text-sm">
          <p>For inquiries regarding these Terms and Conditions, please contact Onyx Renders LLC at:</p>
          <Link href='mailto:info@onyxrenders.com' className="mt-1 font-bold">info@onyxrenders.com</Link>
        </div>
      </div>
    </div>
  )
}

