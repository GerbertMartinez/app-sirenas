const { withDangerousMod } = require('@expo/config-plugins');
const fs = require('fs');
const path = require('path');

module.exports = function withAlarmSound(config) {
    return withDangerousMod(config, [
        'android',
        async (config) => {
            const src = path.join(config.modRequest.projectRoot, 'assets/sounds/alerta.wav');
            const dst = path.join(
                config.modRequest.platformProjectRoot,
                'app/src/main/res/raw/alerta.wav'
            );

            fs.mkdirSync(path.dirname(dst), { recursive: true });
            fs.copyFileSync(src, dst);

            return config;
        },
    ]);
};