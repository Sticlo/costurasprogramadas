import {
  Component,
  computed,
  DestroyRef,
  effect,
  ElementRef,
  inject,
  PLATFORM_ID,
  signal,
  viewChild,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CONTACT_PHONE_DISPLAY, getProductBySlug, whatsappGeneralUrl } from '../../data/products';

interface ChatPart {
  text: string;
  href?: string;
  internal?: boolean;
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  parts: ChatPart[];
  /** Messages generated in the browser (greeting, errors) are not sent to the model. */
  local?: boolean;
}

const SITE_ORIGIN = 'https://costurasprogramadas.web.app';
const URL_PATTERN = /(https?:\/\/[^\s]+)/g;
const STORAGE_KEY = 'cp-chat';
const MOBILE_QUERY = '(max-width: 640px)';
const GREETING =
  'Hola, soy el asistente virtual de Costuras Programadas. Pregúnteme lo que necesite sobre nuestras máquinas, servicio técnico o envíos.';

const PAGE_LABELS: Record<string, string> = {
  '/': 'Ir al inicio',
  '/catalogo': 'Ver el catálogo',
  '/soluciones': 'Ver soluciones a fallas',
  '/nosotros': 'Conocer la empresa',
  '/contacto': 'Ir a contacto',
};

function internalLabel(path: string): string {
  const clean = path.replace(/\/+$/, '') || '/';
  const slug = clean.match(/^\/catalogo\/([^/?#]+)/)?.[1];
  const product = slug ? getProductBySlug(slug) : undefined;
  if (product) return `Ver ${product.name}`;
  if (/^\/soluciones\/[^/?#]+/.test(clean)) return 'Ver la guía paso a paso';
  return PAGE_LABELS[clean] ?? `costurasprogramadas.web.app${path}`;
}

function toParts(text: string): ChatPart[] {
  return text
    .split(URL_PATTERN)
    .filter(Boolean)
    .flatMap((chunk): ChatPart[] => {
      if (!/^https?:\/\//.test(chunk)) return [{ text: chunk }];
      const trailing = chunk.match(/[.,;:!?)]+$/)?.[0] ?? '';
      const url = trailing ? chunk.slice(0, -trailing.length) : chunk;
      const internal = url.startsWith(SITE_ORIGIN);
      const href = internal ? url.slice(SITE_ORIGIN.length) || '/' : url;
      const parts: ChatPart[] = [{ text: internal ? internalLabel(href) : url, href, internal }];
      if (trailing) parts.push({ text: trailing });
      return parts;
    });
}

function message(role: ChatMessage['role'], content: string, local = false): ChatMessage {
  return { role, content, parts: toParts(content), local };
}

@Component({
  selector: 'app-floating-actions',
  imports: [RouterLink],
  templateUrl: './floating-actions.html',
  styleUrl: './floating-actions.css',
  host: {
    '(document:pointerdown)': 'onDocumentPointer($event)',
    '(document:keydown.escape)': 'closePanel()',
  },
})
export class FloatingActions {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  protected readonly panelOpen = signal(false);
  protected readonly unread = signal(false);
  protected readonly phone = CONTACT_PHONE_DISPLAY;
  protected readonly whatsapp = whatsappGeneralUrl();

  protected readonly messages = signal<ChatMessage[]>([message('assistant', GREETING, true)]);
  protected readonly draft = signal('');
  protected readonly sending = signal(false);
  protected readonly hasUserMessages = computed(() =>
    this.messages().some((m) => m.role === 'user'),
  );

  protected readonly quickPrompts = [
    '¿Qué máquina me sirve para empezar en casa?',
    'Hago ropa deportiva, ¿qué me recomiendan?',
    '¿Tienen servicio técnico y repuestos?',
    '¿Hacen envíos a todo Colombia?',
  ];

  private readonly list = viewChild<ElementRef<HTMLElement>>('list');
  private readonly input = viewChild<ElementRef<HTMLTextAreaElement>>('input');

  constructor() {
    if (!this.isBrowser) return;

    this.restore();
    effect(() => {
      const saved = {
        messages: this.messages().map(({ role, content, local }) => ({ role, content, local })),
        draft: this.draft(),
      };
      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
      } catch {
        /* storage unavailable (private mode) */
      }
    });

    this.trackKeyboard();
  }

  openAiPanel(): void {
    if (this.panelOpen()) {
      this.closePanel();
      return;
    }
    this.panelOpen.set(true);
    this.unread.set(false);
    setTimeout(() => {
      this.scrollToEnd('auto');
      if (!this.isMobile()) this.input()?.nativeElement.focus({ preventScroll: true });
    });
  }

  closePanel(): void {
    this.panelOpen.set(false);
  }

  onDocumentPointer(event: PointerEvent): void {
    if (!this.panelOpen()) return;
    const target = event.target as Node | null;
    if (target && !this.host.nativeElement.contains(target)) this.closePanel();
  }

  onLinkClick(): void {
    if (this.isMobile()) this.closePanel();
  }

  resetChat(): void {
    this.messages.set([message('assistant', GREETING, true)]);
    this.draft.set('');
  }

  onEnter(event: Event): void {
    if ((event as KeyboardEvent).shiftKey) return;
    event.preventDefault();
    this.send(this.draft());
  }

  submit(event: Event): void {
    event.preventDefault();
    this.send(this.draft());
  }

  async send(text: string): Promise<void> {
    const content = text.trim();
    if (!content || this.sending()) return;

    this.messages.update((list) => [...list, message('user', content)]);
    this.draft.set('');
    this.sending.set(true);
    this.scrollToEnd();

    const history = this.messages()
      .filter((m) => !m.local)
      .map(({ role, content }) => ({ role, content }));

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
      });
      const data = (await response.json().catch(() => ({}))) as { reply?: string; error?: string };

      if (response.ok && data.reply) {
        this.messages.update((list) => [...list, message('assistant', data.reply!)]);
      } else {
        this.messages.update((list) => [
          ...list,
          message('assistant', this.fallback(response.status === 429 ? data.error : undefined), true),
        ]);
      }
    } catch {
      this.messages.update((list) => [...list, message('assistant', this.fallback(), true)]);
    } finally {
      this.sending.set(false);
      if (!this.panelOpen()) this.unread.set(true);
      this.scrollToEnd();
    }
  }

  private restore(): void {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw) as {
        messages?: { role: ChatMessage['role']; content: string; local?: boolean }[];
        draft?: string;
      };
      if (saved.messages?.length) {
        this.messages.set(saved.messages.map((m) => message(m.role, m.content, m.local)));
      }
      if (saved.draft) this.draft.set(saved.draft);
    } catch {
      /* ignore corrupted storage */
    }
  }

  /** Keeps the mobile sheet above the on-screen keyboard. */
  private trackKeyboard(): void {
    const viewport = window.visualViewport;
    if (!viewport) return;
    const root = document.documentElement;
    const update = () => {
      const keyboard = Math.max(0, window.innerHeight - viewport.height - viewport.offsetTop);
      root.style.setProperty('--chat-vh', `${viewport.height}px`);
      root.style.setProperty('--chat-kb', `${keyboard}px`);
    };
    update();
    viewport.addEventListener('resize', update);
    viewport.addEventListener('scroll', update);
    inject(DestroyRef).onDestroy(() => {
      viewport.removeEventListener('resize', update);
      viewport.removeEventListener('scroll', update);
    });
  }

  private isMobile(): boolean {
    return this.isBrowser && window.matchMedia(MOBILE_QUERY).matches;
  }

  private fallback(reason?: string): string {
    return `${reason ?? 'No pude responder en este momento.'} Escríbanos por WhatsApp al ${this.phone} y con gusto le ayudamos.`;
  }

  private scrollToEnd(behavior: ScrollBehavior = 'smooth'): void {
    setTimeout(() => {
      const el = this.list()?.nativeElement;
      if (el) el.scrollTo({ top: el.scrollHeight, behavior });
    });
  }
}
