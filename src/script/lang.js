const lang_base = {
    ru: {
        help: `
Настрой маску подсети как в роутере (по умолч. 255.255.255.0) и жми обновить
- Кнопка обновить: сканировать и найти новые устройства
- Клик по устройству: открыть вебморду
- Удерживать устройство: удалить его из списка`,
        update: 'Обновите библиотеку Settings на устройстве',
        remove: 'Удалить',
    },
    en: {
        help: `
Set subnet as in your router (default 255.255.255.0) and press refresh
- Refresh button: scan and find new devices
- Click device: open it
- Hold device: remove it`,
        update: 'Update Settings library on device',
        remove: 'Remove',
    }
};

export let lang = lang_base.en;

export function setLang(code) {
    lang = lang_base[code];
}