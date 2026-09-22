import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { FloatingActions } from '../../components/floating-actions/floating-actions';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, Header, Footer, FloatingActions],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {}
