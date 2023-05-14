import { Component, OnInit } from "@angular/core";
import { CartService } from "../../cart/cart.service";
import { BehaviorSubject, Observable } from "rxjs";
import { AuthService } from "../auth-service.service";
import { Cart } from "../../cart/card.interface";
import { CardStoreService } from "../card-store.service";
import { map } from "rxjs/operators";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  totalCount$ = this.cardStoreService.totalInCart$;
  isLogged$ = this.authService.auth$;


  constructor(private readonly cardStoreService: CardStoreService, private readonly authService: AuthService) {
  }

  ngOnInit(): void {
    if (localStorage.getItem("USERID")) {
      this.authService.setAuth(true);
      this.cardStoreService.loadProducts();
      this.cardStoreService.loadData();
    } else {
      this.authService.setAuth(false);
    }
  }

  logout() {
    localStorage.removeItem("USERID");
    localStorage.removeItem("CARDID");
    this.authService.setAuth(false);
    this.cardStoreService.clearData();
  }
}
