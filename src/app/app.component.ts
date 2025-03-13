import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { APIService } from './api.service';
import { DetailModalComponent } from './detail-modal/detail-modal.component';
import { Lote } from './lote.model';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatCardModule,
    MatListModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatDialogModule,
    CommonModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  title = 'loteo-caracoles';
  videoUrl: SafeResourceUrl;
  photoUrl: SafeUrl;
  // Signals para estado reactivo
  lotes = signal<Lote[]>([]);
  filter = signal<string>('');
  isMobile = signal<boolean>(false);

  // Computed para filtrar lotes automáticamente
  lotesFiltrados = computed(() => {
    const filterValue = this.filter().toLowerCase();
    return this.lotes().filter(lote =>
      String(lote.id).toLowerCase().includes(filterValue) ||
      String(lote.manzana).toLowerCase().includes(filterValue) ||
      lote.superficie?.toString().includes(filterValue) ||
      lote.precio?.toString().includes(filterValue) ||
      String(lote.calle).toLowerCase().includes(filterValue) ||
      String(lote.estado).toLowerCase().includes(filterValue)
    );
  });

  // Static FAQs
  public faqs = [
    {
      pregunta: '¿Es un buen lugar para una casa de fin de semana?',
      respuesta: 'Sí, con acceso a Ruta 4, entorno natural, y servicios cercanos, es perfecto para relajarte los fines de semana.',
    },
    {
      pregunta: '¿Se financia?',
      respuesta: 'No, pero aceptamos permuta por vehículos.',
    },
    {
      pregunta: '¿Cuándo puedo empezar a construir?',
      respuesta: 'Inmediatamente, toda la documentación en regla y servicios disponibles.',
    },
    {
      pregunta: '¿Tiene bajada de luz?',
      respuesta: 'Solo el lote con la casa tiene hecha la bajada, pero la línea pasa por todo el frente de la ruta, cada quién debe poner el pilar y pedir la bajada una vez adquirido el lote.',
    },
    {
      pregunta: '¿Tiene conexión de agua?',
      respuesta: 'Todos los lotes tienen conexión de agua de red, cada quién deberá tramitar su titularidad una vez adquirido el lote.',
    },
  ];

  constructor(
    private apiService: APIService,
    public dialog: MatDialog,
    private breakpointObserver: BreakpointObserver,
    public sanitizer: DomSanitizer
  ) {
    const youtubeId = 'ISU97qNFwq0'; // Reemplaza con el ID real del video
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${youtubeId}`
    );

    // Reemplaza esta URL con la que obtuviste de Google Photos
    const googlePhotoUrl = 'https://lh3.googleusercontent.com/...';
    this.photoUrl = this.sanitizer.bypassSecurityTrustUrl(googlePhotoUrl);

  }

  ngOnInit(): void {
    this.loadLotes();
    this.setupBreakpointObserver();
  }

  getSafePhotoUrl(foto: string): SafeUrl {
    // Aquí deberías reemplazar con la URL directa que obtuviste
    return this.sanitizer.bypassSecurityTrustUrl(foto);
  }

  private loadLotes(): void {
    this.apiService.getLotes().subscribe({
      next: (data) => {
        // console.log('(°-°) getLotes', data);
        // Convertimos los datos en instancias de Lote
        const lotesMapped = data.map((lote: Partial<Lote> | undefined) => new Lote(lote));
        this.lotes.set(lotesMapped);
      },
      error: (err) => {
        console.error('Error al cargar los lotes:', err);
        this.lotes.set([]); // En caso de error, seteamos un arreglo vacío
      }
    });
  }

  private setupBreakpointObserver(): void {
    this.breakpointObserver.observe([Breakpoints.Handset])
      .subscribe(result => {
        this.isMobile.set(result.matches);
      });
  }

  abrirModal(loteId: string, event: MouseEvent): void {
    const path = event.composedPath();
    if (path.some((el: any) => el.className?.includes('mat-raised-button'))) {
      return;
    }

    const lote = this.lotes().find(l => l.id === loteId);
    if (lote) {
      this.dialog.open(DetailModalComponent, {
        data: { lote, images: lote.fotos },
        width: '100vw !important',
        panelClass: 'custom-dialog-panel',
        height: '100vw !important'
      });
    }
  }

  abrirWhatsApp(loteNombre?: string, event?: MouseEvent): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    const mensaje = loteNombre
      ? `Hola, estoy interesado en el ${loteNombre}. ¿Podrías darme más información?`
      : 'Hola, estoy interesado en un lote para mi casa de fin de semana. ¿Podrías darme más información?';
    window.open(
      `https://wa.me/3764165357?text=${encodeURIComponent(mensaje)}`,
      '_blank'
    );
  }
}