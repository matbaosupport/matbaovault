import {
  OrganizationAuthRequestService,
  OrganizationAuthRequestApiService,
} from "@bitwarden/bit-common/admin-console/auth-requests";
import { ServiceContainer as OssServiceContainer } from "@bitwarden/cli/service-container/service-container";

/**
 * Instantiates services and makes them available for dependency injection.
 * Any Bitwarden-licensed services should be registered here.
 */
export class ServiceContainer extends OssServiceContainer {
  organizationAuthRequestApiService: OrganizationAuthRequestApiService;
  organizationAuthRequestService: OrganizationAuthRequestService;

  constructor() {
    super();
    this.organizationAuthRequestApiService = new OrganizationAuthRequestApiService(this.apiService);
    this.organizationAuthRequestService = new OrganizationAuthRequestService(
      this.organizationAuthRequestApiService,
      this.cryptoService,
      this.organizationUserApiService,
    );
  }
}
