import { ScrollingModule } from "@angular/cdk/scrolling";
import { NgModule } from "@angular/core";

import { PasswordCalloutComponent } from "@bitwarden/auth/angular";

import { LooseComponentsModule } from "../../../shared";
import { SharedOrganizationModule } from "../shared";

import { BulkConfirmComponent } from "./components/bulk/bulk-confirm.component";
import { BulkEnableSecretsManagerDialogComponent } from "./components/bulk/bulk-enable-sm-dialog.component";
import { BulkRemoveComponent } from "./components/bulk/bulk-remove.component";
import { BulkRestoreRevokeComponent } from "./components/bulk/bulk-restore-revoke.component";
import { BulkStatusComponent } from "./components/bulk/bulk-status.component";
import { UserDialogModule } from "./components/member-dialog";
import { ResetPasswordComponent } from "./components/reset-password.component";
import { MembersRoutingModule } from "./members-routing.module";
import { MembersComponent } from "./members.component";

@NgModule({
  imports: [
    SharedOrganizationModule,
    LooseComponentsModule,
    MembersRoutingModule,
    UserDialogModule,
    PasswordCalloutComponent,
    ScrollingModule,
  ],
  declarations: [
    BulkConfirmComponent,
    BulkEnableSecretsManagerDialogComponent,
    BulkRemoveComponent,
    BulkRestoreRevokeComponent,
    BulkStatusComponent,
    MembersComponent,
    ResetPasswordComponent,
  ],
})
export class MembersModule {}
