import CONSTANTS from "./constants.js";
import API from "./api.js";
// import { BCconfig } from "./BCconfig.js";
import { BorderFrame } from "./BorderControl.js";

// export let BCCBASE;

export const initHooks = async () => {
    // Hooks.once("socketlib.ready", registerSocket);
    // registerSocket();

    Hooks.on("renderSettingsConfig", (app, el) => {
        // v13: el is HTMLElement on AppV2; v12 wrappers may still hand jQuery — handle both.
        const root = el instanceof HTMLElement ? el : el?.[0];
        if (!root) return;

        const colorSettings = [
            "neutralColor", "friendlyColor", "hostileColor", "controlledColor", "partyColor", "secretColor",
            "neutralColorEx", "friendlyColorEx", "hostileColorEx", "controlledColorEx", "partyColorEx", "secretColorEx",
            "actorFolderColorEx", "customDispositionColorEx",
        ];

        for (const key of colorSettings) {
            const input = root.querySelector(`[name="${CONSTANTS.MODULE_ID}.${key}"]`);
            if (!input?.parentElement) continue;
            const value = game.settings.get(CONSTANTS.MODULE_ID, key);
            const picker = document.createElement("input");
            picker.type = "color";
            picker.value = value;
            picker.dataset.edit = `${CONSTANTS.MODULE_ID}.${key}`;
            input.parentElement.appendChild(picker);
        }
    });

    if (game.settings.get(CONSTANTS.MODULE_ID, "borderControlEnabled")) {
        // setup all the hooks

        Hooks.on("renderTokenConfig", (config, html) => {
            BorderFrame.renderTokenConfig(config, html);
        });

        libWrapper.register(CONSTANTS.MODULE_ID, "Token.prototype._refreshBorder", BorderFrame.newBorder, "OVERRIDE");

        libWrapper.register(
            CONSTANTS.MODULE_ID,
            "Token.prototype._getBorderColor",
            BorderFrame.newBorderColor,
            "OVERRIDE",
        );

        // TRY TO FIX THE PERMANENT BORDER WITHOUT SUCCESS

        // libWrapper.register(
        //   CONSTANTS.MODULE_ID,
        //   "Token.prototype._refreshVisibility",
        //   BorderFrame.tokenPrototypeRefreshVisibilityHandler,
        //   "MIXED"
        // );

        // libWrapper.register(
        //   CONSTANTS.MODULE_ID,
        //   "Token.prototype.refresh",
        //   BorderFrame.tokenPrototypeRefreshHandler,
        //   "MIXED"
        // );

        // libWrapper.register(
        //   CONSTANTS.MODULE_ID,
        //   "Token.prototype._applyRenderFlags",
        //   BorderFrame.tokenApplyRenderFlagsHandler,
        //   "WRAPPER"
        // );
    }
};

export const setupHooks = async () => {
    game.modules.get(CONSTANTS.MODULE_ID).api = API;
};

export const readyHooks = () => {
    if (game.settings.get(CONSTANTS.MODULE_ID, "borderControlEnabled")) {
        Hooks.on("renderTokenHUD", (app, html, data) => {
            BorderFrame.AddBorderToggle(app, html, data);
        });

        Hooks.on("createToken", (data) => {
            let token = canvas.tokens?.get(data.id);
            if (!token.isOwner) {
                token.cursor = "default";
            }
        });

        // // Removed for conflict with others modules ?
        // canvas.tokens?.placeables.forEach((t) => {
        //   if (!t.owner) {
        //     t.cursor = "default";
        //   }
        // });

        if (game.settings.get(CONSTANTS.MODULE_ID, "zoomScaling")) {
            Hooks.on("canvasPan", BorderFrame.refreshTokens);
        }
    }
};
