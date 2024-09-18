import { importProvidersFrom } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ActivatedRoute, Params } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { Meta, StoryObj, applicationConfig, moduleMetadata } from "@storybook/angular";
import { of } from "rxjs";

import { AccountApiService } from "@bitwarden/common/auth/abstractions/account-api.service";
import { ClientType } from "@bitwarden/common/enums";
import {
  Environment,
  EnvironmentService,
  Region,
  Urls,
} from "@bitwarden/common/platform/abstractions/environment.service";
import { PlatformUtilsService } from "@bitwarden/common/platform/abstractions/platform-utils.service";
import {
  AsyncActionsModule,
  ButtonModule,
  DialogModule,
  FormFieldModule,
  LinkModule,
  SelectModule,
  ToastOptions,
  ToastService,
  TypographyModule,
} from "@bitwarden/components";

// FIXME: remove `/apps` import from `/libs`
// eslint-disable-next-line import/no-restricted-paths
import { PreloadedEnglishI18nModule } from "../../../../../../apps/web/src/app/core/tests";

import { RegistrationStartComponent } from "./registration-start.component";

export default {
  title: "Auth/Registration/Registration Start",
  component: RegistrationStartComponent,
} as Meta;

const decorators = (options: {
  isSelfHost?: boolean;
  queryParams?: Params;
  clientType?: ClientType;
  defaultRegion?: Region;
}) => {
  return [
    moduleMetadata({
      imports: [
        RouterTestingModule,
        DialogModule,
        ReactiveFormsModule,
        FormFieldModule,
        SelectModule,
        ButtonModule,
        LinkModule,
        TypographyModule,
        AsyncActionsModule,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { queryParams: of(options.queryParams || {}) },
        },
      ],
    }),
    applicationConfig({
      providers: [
        importProvidersFrom(BrowserAnimationsModule),
        importProvidersFrom(PreloadedEnglishI18nModule),
        {
          provide: EnvironmentService,
          useValue: {
            environment$: of({
              getRegion: () => options.defaultRegion || Region.US,
            } as Partial<Environment>),
            availableRegions: () => [
              { key: Region.US, domain: "vault.matbao.support", urls: {} },
            ],
            setEnvironment: (region: Region, urls?: Urls) => Promise.resolve({}),
          } as Partial<EnvironmentService>,
        },
        {
          provide: PlatformUtilsService,
          useValue: {
            isSelfHost: () => options.isSelfHost || false,
            getClientType: () => options.clientType || ClientType.Web,
          } as Partial<PlatformUtilsService>,
        },
        {
          provide: ToastService,
          useValue: {
            showToast: (options: ToastOptions) => {},
          } as Partial<ToastService>,
        },
        {
          provide: AccountApiService,
          useValue: {
            registerSendVerificationEmail: () => Promise.resolve(null),
          } as Partial<AccountApiService>,
        },
      ],
    }),
  ];
};

type Story = StoryObj<RegistrationStartComponent>;

export const WebUSRegionExample: Story = {
  render: (args) => ({
    props: args,
    template: `
      <auth-registration-start></auth-registration-start>
      `,
  }),
  decorators: decorators({
    clientType: ClientType.Web,
    queryParams: {},
    defaultRegion: Region.US,
  }),
};

export const WebEURegionExample: Story = {
  render: (args) => ({
    props: args,
    template: `
      <auth-registration-start></auth-registration-start>
      `,
  }),
  decorators: decorators({
    clientType: ClientType.Web,
    queryParams: {},
    defaultRegion: Region.US,
  }),
};

export const WebUSRegionQueryParamsExample: Story = {
  render: (args) => ({
    props: args,
    template: `
      <auth-registration-start></auth-registration-start>
      `,
  }),
  decorators: decorators({
    clientType: ClientType.Web,
    defaultRegion: Region.US,
    queryParams: { email: "jaredWasHere@bitwarden.com", emailReadonly: "true" },
  }),
};

export const DesktopUSRegionExample: Story = {
  render: (args) => ({
    props: args,
    template: `
      <auth-registration-start></auth-registration-start>
      `,
  }),
  decorators: decorators({
    clientType: ClientType.Desktop,
    defaultRegion: Region.US,
    isSelfHost: false,
  }),
};

export const DesktopEURegionExample: Story = {
  render: (args) => ({
    props: args,
    template: `
      <auth-registration-start></auth-registration-start>
      `,
  }),
  decorators: decorators({
    clientType: ClientType.Desktop,
    defaultRegion: Region.US,
    isSelfHost: false,
  }),
};

export const DesktopSelfHostExample: Story = {
  render: (args) => ({
    props: args,
    template: `
      <auth-registration-start></auth-registration-start>
      `,
  }),
  decorators: decorators({
    clientType: ClientType.Desktop,
    isSelfHost: true,
    defaultRegion: Region.SelfHosted,
  }),
};

export const BrowserExtensionUSRegionExample: Story = {
  render: (args) => ({
    props: args,
    template: `
      <auth-registration-start></auth-registration-start>
      `,
  }),
  decorators: decorators({
    clientType: ClientType.Browser,
    defaultRegion: Region.US,
    isSelfHost: false,
  }),
};

export const BrowserExtensionEURegionExample: Story = {
  render: (args) => ({
    props: args,
    template: `
      <auth-registration-start></auth-registration-start>
      `,
  }),
  decorators: decorators({
    clientType: ClientType.Browser,
    defaultRegion: Region.US,
    isSelfHost: false,
  }),
};

export const BrowserExtensionSelfHostExample: Story = {
  render: (args) => ({
    props: args,
    template: `
      <auth-registration-start></auth-registration-start>
      `,
  }),
  decorators: decorators({
    clientType: ClientType.Browser,
    isSelfHost: true,
    defaultRegion: Region.SelfHosted,
  }),
};
