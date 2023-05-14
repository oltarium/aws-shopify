import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-bucket-count-controls',
  templateUrl: './bucket-count-controls.component.html',
  styleUrls: ['./bucket-count-controls.component.scss'],
  exportAs: 'countControls',
})
export class BucketCountControlsComponent {
  @Input() count!: number;
  @Input() available!: number;
  @Input() productName!: string;

  @Output() increment = new EventEmitter<void>();
  @Output() decrement = new EventEmitter<void>();

  @ViewChild('addBtn', { read: ElementRef })
  addBtn!: ElementRef<HTMLButtonElement>;

  focusAddBtn(): void {
    this.addBtn.nativeElement.focus();
  }
}
