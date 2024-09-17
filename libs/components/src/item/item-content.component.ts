import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "bit-item-content, [bit-item-content]",
  standalone: true,
  imports: [CommonModule],
  templateUrl: `item-content.component.html`,
  host: {
    class:
      "fvw-target tw-outline-none tw-text-main hover:tw-text-main tw-no-underline hover:tw-no-underline tw-text-base tw-py-2 tw-px-4 tw-bg-transparent tw-w-full tw-border-none tw-flex tw-gap-4 tw-items-center tw-justify-between",
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemContentComponent {}
