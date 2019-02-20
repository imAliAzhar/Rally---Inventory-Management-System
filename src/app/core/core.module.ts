import { AuthGuard } from "./auth.guard";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AuthService } from "./auth.service";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from "@angular/fire/firestore";

@NgModule({
  imports: [CommonModule, AngularFireAuthModule, AngularFirestoreModule],
  providers: [AuthService, AuthGuard],
  declarations: []
})
export class CoreModule {}
