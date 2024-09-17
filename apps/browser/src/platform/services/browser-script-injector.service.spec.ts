import { mock } from "jest-mock-extended";

import { LogService } from "@bitwarden/common/platform/abstractions/log.service";
import { PlatformUtilsService } from "@bitwarden/common/platform/abstractions/platform-utils.service";

import { BrowserApi } from "../browser/browser-api";

import {
  CommonScriptInjectionDetails,
  Mv3ScriptInjectionDetails,
} from "./abstractions/script-injector.service";
import { BrowserScriptInjectorService } from "./browser-script-injector.service";

describe("ScriptInjectorService", () => {
  const tabId = 1;
  const combinedManifestVersionFile = "content/autofill-init.js";
  const mv2SpecificFile = "content/autofill-init-mv2.js";
  const mv2Details = { file: mv2SpecificFile };
  const mv3SpecificFile = "content/autofill-init-mv3.js";
  const mv3Details: Mv3ScriptInjectionDetails = { file: mv3SpecificFile, world: "MAIN" };
  const sharedInjectDetails: CommonScriptInjectionDetails = {
    runAt: "document_start",
  };
  const manifestVersionSpy = jest.spyOn(BrowserApi, "manifestVersion", "get");
  let scriptInjectorService: BrowserScriptInjectorService;
  jest.spyOn(BrowserApi, "executeScriptInTab").mockImplementation();
  jest.spyOn(BrowserApi, "isManifestVersion");
  const platformUtilsService = mock<PlatformUtilsService>();
  const logService = mock<LogService>();

  beforeEach(() => {
    scriptInjectorService = new BrowserScriptInjectorService(platformUtilsService, logService);
  });

  describe("inject", () => {
    describe("injection of a single script that functions in both manifest v2 and v3", () => {
      it("injects the script in manifest v2 when given combined injection details", async () => {
        manifestVersionSpy.mockReturnValue(2);

        await scriptInjectorService.inject({
          tabId,
          injectDetails: {
            file: combinedManifestVersionFile,
            frame: "all_frames",
            ...sharedInjectDetails,
          },
        });

        expect(BrowserApi.executeScriptInTab).toHaveBeenCalledWith(tabId, {
          ...sharedInjectDetails,
          allFrames: true,
          file: combinedManifestVersionFile,
        });
      });

      it("injects the script in manifest v3 when given combined injection details", async () => {
        manifestVersionSpy.mockReturnValue(3);

        await scriptInjectorService.inject({
          tabId,
          injectDetails: {
            file: combinedManifestVersionFile,
            frame: 10,
            ...sharedInjectDetails,
          },
        });

        expect(BrowserApi.executeScriptInTab).toHaveBeenCalledWith(
          tabId,
          { ...sharedInjectDetails, frameId: 10, file: combinedManifestVersionFile },
          { world: "ISOLATED" },
        );
      });
    });

    describe("injection of mv2 specific details", () => {
      describe("given the extension is running manifest v2", () => {
        it("injects the mv2 script injection details file", async () => {
          manifestVersionSpy.mockReturnValue(2);

          await scriptInjectorService.inject({
            mv2Details,
            tabId,
            injectDetails: sharedInjectDetails,
          });

          expect(BrowserApi.executeScriptInTab).toHaveBeenCalledWith(tabId, {
            ...sharedInjectDetails,
            frameId: 0,
            file: mv2SpecificFile,
          });
        });
      });

      describe("given the extension is running manifest v3", () => {
        it("injects the common script injection details file", async () => {
          manifestVersionSpy.mockReturnValue(3);

          await scriptInjectorService.inject({
            mv2Details,
            tabId,
            injectDetails: { ...sharedInjectDetails, file: combinedManifestVersionFile },
          });

          expect(BrowserApi.executeScriptInTab).toHaveBeenCalledWith(
            tabId,
            {
              ...sharedInjectDetails,
              frameId: 0,
              file: combinedManifestVersionFile,
            },
            { world: "ISOLATED" },
          );
        });

        it("throws an error if no common script injection details file is specified", async () => {
          manifestVersionSpy.mockReturnValue(3);

          await expect(
            scriptInjectorService.inject({
              mv2Details,
              tabId,
              injectDetails: { ...sharedInjectDetails, file: null },
            }),
          ).rejects.toThrow("No file specified for script injection");
        });
      });
    });

    describe("injection of mv3 specific details", () => {
      describe("given the extension is running manifest v3", () => {
        it("injects the mv3 script injection details file", async () => {
          manifestVersionSpy.mockReturnValue(3);

          await scriptInjectorService.inject({
            mv3Details,
            tabId,
            injectDetails: sharedInjectDetails,
          });

          expect(BrowserApi.executeScriptInTab).toHaveBeenCalledWith(
            tabId,
            { ...sharedInjectDetails, frameId: 0, file: mv3SpecificFile },
            { world: "MAIN" },
          );
        });
      });

      describe("given the extension is running manifest v2", () => {
        it("injects the common script injection details file", async () => {
          manifestVersionSpy.mockReturnValue(2);

          await scriptInjectorService.inject({
            mv3Details,
            tabId,
            injectDetails: { ...sharedInjectDetails, file: combinedManifestVersionFile },
          });

          expect(BrowserApi.executeScriptInTab).toHaveBeenCalledWith(tabId, {
            ...sharedInjectDetails,
            frameId: 0,
            file: combinedManifestVersionFile,
          });
        });

        it("throws an error if no common script injection details file is specified", async () => {
          manifestVersionSpy.mockReturnValue(2);

          await expect(
            scriptInjectorService.inject({
              mv3Details,
              tabId,
              injectDetails: { ...sharedInjectDetails, file: "" },
            }),
          ).rejects.toThrow("No file specified for script injection");
        });
      });
    });
  });
});
