import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

type IconName =
  | 'book'
  | 'bookmark'
  | 'calendar'
  | 'check-circle'
  | 'clipboard-list'
  | 'home'
  | 'info'
  | 'layers'
  | 'log-in'
  | 'lock'
  | 'save'
  | 'trash'
  | 'user';

const ICON_PATHS: Record<IconName, string[]> = {
  book: [
    'M4 5.5C5.2 4.7 6.8 4.3 8.5 4.3C10 4.3 11.2 4.7 12 5.5C12.8 4.7 14 4.3 15.5 4.3C17.2 4.3 18.8 4.7 20 5.5V18.2C18.8 17.4 17.2 17 15.5 17C14 17 12.8 17.4 12 18.2C11.2 17.4 10 17 8.5 17C6.8 17 5.2 17.4 4 18.2V5.5Z',
    'M12 5.5V18.2'
  ],
  bookmark: ['M6 4h12v17l-6-4l-6 4V4Z'],
  calendar: [
    'M7 3v4',
    'M17 3v4',
    'M4 8h16',
    'M5 5h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z'
  ],
  'check-circle': ['M4 12a8 8 0 1 0 16 0a8 8 0 1 0-16 0', 'M9 12l2 2l4-5'],
  'clipboard-list': [
    'M9 4h6l1 2h3v15H5V6h3l1-2Z',
    'M9 11h6',
    'M9 15h6',
    'M8 11h.01',
    'M8 15h.01'
  ],
  home: ['M3 10.5L12 3l9 7.5', 'M5 9.5V20h14V9.5', 'M9 20v-6h6v6'],
  info: ['M12 17v-6', 'M12 7h.01', 'M4 12a8 8 0 1 0 16 0a8 8 0 1 0-16 0'],
  layers: ['M12 3l9 5l-9 5l-9-5l9-5Z', 'M3 12l9 5l9-5', 'M3 16l9 5l9-5'],
  'log-in': ['M10 17l5-5l-5-5', 'M15 12H3', 'M15 5h4a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-4'],
  lock: ['M7 10V8a5 5 0 0 1 10 0v2', 'M6 10h12v10H6V10Z'],
  save: ['M5 4h11l3 3v13H5V4Z', 'M8 4v6h8V4', 'M8 20v-6h8v6'],
  trash: ['M4 7h16', 'M10 11v6', 'M14 11v6', 'M6 7l1 14h10l1-14', 'M9 7V4h6v3'],
  user: ['M12 12a4 4 0 1 0 0-8a4 4 0 0 0 0 8Z', 'M4 21a8 8 0 0 1 16 0']
};

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <svg
      aria-hidden="true"
      focusable="false"
      [attr.width]="size"
      [attr.height]="size"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path *ngFor="let path of paths" [attr.d]="path"></path>
    </svg>
  `,
  styles: [`
    :host {
      display: inline-flex;
      flex: 0 0 auto;
      line-height: 0;
      vertical-align: -0.125em;
    }

    svg {
      display: block;
    }
  `]
})
export class IconComponent {
  @Input() name: IconName = 'book';
  @Input() size = 20;

  get paths(): string[] {
    return ICON_PATHS[this.name];
  }
}
