import { Card } from "./ui/Card";

export function ContactCTA() {
  return (
    <Card
      variant="elevated"
      elevation={2}
      className="p-6 bg-gradient-to-br from-primary-container to-secondary-container"
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
        <div>
          <h3 className="text-title-lg text-on-primary-container">
            Nejste si jistí, co vybrat?
          </h3>
          <p className="text-body-md text-on-primary-container/80 mt-1 max-w-md">
            Pomohu vám vybrat hosting podle reálných potřeb projektu — bez
            překvapení na faktuře.
          </p>
        </div>
        <a
          href="mailto:martin.baranek@outlook.com?subject=Kalkula%C4%8Dka%20hostingu%20-%20konzultace"
          className="
            md-state-layer
            inline-flex items-center justify-center gap-2
            rounded-full px-6 py-3
            bg-primary text-on-primary
            text-label-lg shadow-elev-1
            hover:shadow-elev-2 transition-shadow duration-200
            shrink-0
          "
        >
          Chci konzultaci →
        </a>
      </div>
    </Card>
  );
}
