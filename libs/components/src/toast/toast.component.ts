import { Component, EventEmitter, Input, Output } from "@angular/core";

import { IconButtonModule } from "../icon-button";
import { SharedModule } from "../shared";

export type ToastVariant = "success" | "error" | "info" | "warning";

const variants: Record<ToastVariant, { icon: string; bgColor: string }> = {
  success: {
    icon: "bwi-check",
    bgColor: "tw-bg-success-600",
  },
  error: {
    icon: "bwi-error",
    bgColor: "tw-bg-danger-600",
  },
  info: {
    icon: "bwi-info-circle",
    bgColor: "tw-bg-info-600",
  },
  warning: {
    icon: "bwi-exclamation-triangle",
    bgColor: "tw-bg-warning-600",
  },
};

@Component({
  selector: "bit-toast",
  templateUrl: "toast.component.html",
  standalone: true,
  imports: [SharedModule, IconButtonModule],
})
export class ToastComponent {
  @Input() variant: ToastVariant = "info";

  /**
   * The message to display
   *
   * Pass an array to render multiple paragraphs.
   **/
  @Input({ required: true })
  message: string | string[];

  /** An optional title to display over the message. */
  @Input() title: string;

  /**
   * The percent width of the progress bar, from 0-100
   **/
  @Input() progressWidth = 0;

  /** Emits when the user presses the close button */
  @Output() onClose = new EventEmitter<void>();

  protected get iconClass(): string {
    return variants[this.variant].icon;
  }

  protected get bgColor(): string {
    return variants[this.variant].bgColor;
  }

  protected get messageArray(): string[] {
    return Array.isArray(this.message) ? this.message : [this.message];
  }
}
