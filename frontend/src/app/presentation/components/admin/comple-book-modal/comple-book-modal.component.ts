import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output, type OnInit, inject } from '@angular/core';
import { ErrorMessageComponent } from '@presentation/components/error-message/error-message.component';
import { AdminCardComponent } from '../admin-card/admin-card.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DefaultButtonComponent } from '@presentation/components/default-button/default-button.component';
import { SpinnerComponent } from '@presentation/components/app-spinner/spinner.component';
import { GENRES, Genre, LANGUAGES, Language } from 'app/data/models/book';
import { BooksService } from 'app/data/services/books/books.service';
import { AddState } from 'app/data/models/Admin';
import { delay, of } from 'rxjs';
import { ToastComponent } from '@presentation/components/toast/toast.component';
import { ToastService } from 'app/data/services/toast/Toast.service';

@Component({
  selector: 'comple-book-modal',
  standalone: true,
  imports: [
    CommonModule,
    AdminCardComponent,
    ErrorMessageComponent,
    SpinnerComponent,
    ReactiveFormsModule,
    DefaultButtonComponent,
    ToastComponent,
  ],
  templateUrl: './comple-book-modal.component.html',
  styleUrls: [
    './comple-book-modal.component.css',
    '../../../shared/form.style.css',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompleBookModalComponent implements OnInit {
  @Output() public closeModal: EventEmitter<boolean> = new EventEmitter();
  private readonly toast = inject(ToastService);

  protected completeForm: FormGroup;
  public sending: boolean = false;
  protected GENRES: Genre[] = GENRES;
  protected LANGUAGES: Language[] = LANGUAGES;

  protected genreApplied: string = '';
  protected languageApplied: string = '';

  constructor(private builder: FormBuilder, private bookService: BooksService) {
    this.completeForm = this.createForm();
  }

  private createForm(): FormGroup {
    return this.builder.group({
      author: ['', Validators.required],
      editorial: ['', Validators.required],

      price: ['', Validators.required],
      quantity: ['', Validators.required],
      pages: ['', Validators.required],

      description: ['', Validators.required, Validators.minLength(10)],
    });
  }
  ngOnInit(): void {}

  onSubmit() {
    let sending = this.sending;

    const { author, editorial, price, pages, quantity, description } =
      this.completeForm.value;

    sending = !sending;

    this.bookService.createdBook.stateComplete.state = AddState.SENDING;

    this.bookService.createdBook.stateComplete.state = AddState.COMPLETE;
    this.bookService.createdBook.book.author = author;
    this.bookService.createdBook.book.nameEditorial = editorial;
    this.bookService.createdBook.book.price = price;
    this.bookService.createdBook.book.pages = pages;
    this.bookService.createdBook.book.quantityAvailable = quantity;
    this.bookService.createdBook.book.description = description;
    this.bookService.createdBook.book.genre = this.genreApplied;
    this.bookService.createdBook.book.language = this.languageApplied;

    this.bookService.completeBook().subscribe({
      next: (res: any) => {
        sending = !sending;
        this.bookService.createdBook.stateComplete.state = AddState.COMPLETE;
        this.closeModal.emit(true);
      },
      error: (err: any) => {
        sending = !sending;
        this.bookService.createdBook.stateComplete.state = AddState.WAITING;
        this.toast.error('Opss', 'Ha ocurrido un error en el servidor', 5);
      },
    });
  }

  public get author() {
    return this.completeForm.get('author')!;
  }

  public get editorial() {
    return this.completeForm.get('editorial')!;
  }

  public get price() {
    return this.completeForm.get('price')!;
  }
  public get pages() {
    return this.completeForm.get('pages')!;
  }

  public get quantity() {
    return this.completeForm.get('quantity')!;
  }

  public get description() {
    return this.completeForm.get('description')!;
  }
}
