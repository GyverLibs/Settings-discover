import { Component } from '@alexgyver/component';
import { getIPs, getLocalIP, getMaskList } from './network';
import Device from './device';
import { lang } from './lang';

export default class App {
    localIP = null;
    devices = {};
    devices_obj = {};

    constructor() {
        Component.make('div', {
            context: this,
            parent: document.body,
            var: 'root',
            class: 'main',
            children: [
                {
                    tag: 'div',
                    class: 'header',
                    children: [
                        {
                            tag: 'div',
                            children: [
                                {
                                    tag: 'div',
                                    class: 'row',
                                    children: [
                                        {
                                            tag: 'div',
                                            class: 'icon search',
                                            events: {
                                                click: () => this.search(),
                                            }
                                        },
                                        {
                                            tag: 'span',
                                            text: 'Settings',
                                        },
                                    ]
                                },
                                {
                                    tag: 'span',
                                    class: 'percent',
                                    var: 'percent',
                                },
                            ]
                        },
                        {
                            tag: 'div',
                            children: [
                                {
                                    tag: 'span',
                                    class: 'ip',
                                    var: 'ip_label',
                                    text: 'IP unset',
                                },
                                {
                                    tag: 'select',
                                    var: 'subnet',
                                    class: 'subnet',
                                    events: {
                                        change: () => {
                                            localStorage.setItem('cidr', this.$subnet.value);
                                        }
                                    }
                                }
                            ]
                        },
                    ]
                },
                {
                    tag: 'div',
                    class: 'devices',
                    var: 'devices',
                }
            ]
        });

        // auto scheme
        document.body.classList = (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
            document.body.classList = event.matches ? 'dark' : 'light';
        });

        // remove
        this.$root.addEventListener('remove', (e) => {
            delete this.devices[e.detail.mac];
            delete this.devices_obj[e.detail.mac];
            localStorage.setItem('devices', JSON.stringify(this.devices));
        });

        // lang
        switch (navigator.language || navigator.userLanguage) {
            case 'ru-RU':
            case 'ru':
                this.lang = lang.ru;
                break;
            default:
                this.lang = lang.en;
                break;
        }

        // load
        this.load();
    }

    async load() {
        // first
        setTimeout(() => {
            if (!localStorage.hasOwnProperty('first')) {
                localStorage.setItem('first', 'true');
                alert(this.lang.help);
            }
        }, 100);

        // cidr
        this.$subnet.innerHTML = getMaskList().map((mask, i) => `<option value="${i}">${mask}</option>`).join('');
        if (localStorage.hasOwnProperty('cidr')) {
            this.$subnet.value = localStorage.getItem('cidr');
        } else {
            this.$subnet.value = '24';
        }

        // ip
        this.localIP = await getLocalIP();
        if (this.localIP) {
            this.$ip_label.innerText = this.localIP;
        } else {
            this.$ip_label.innerText = "IP error";
            return;
        }

        // known
        let ips = [];
        if (localStorage.hasOwnProperty('devices')) {
            this.devices = JSON.parse(localStorage.getItem('devices'));
        }
        for (const [mac, device] of Object.entries(this.devices)) {
            this.devices_obj[mac] = new Device(this.$devices, mac, device.name, device.ip);
            ips.push(device.ip);
        }
        discover(ips, (dev) => this.addDevice(dev));
    }

    addDevice(dev) {
        let changed = false;
        if (dev.mac in this.devices) {
            this.devices_obj[dev.mac].$root.classList = 'device';
            let ex = this.devices[dev.mac];
            if (ex.ip != dev.ip || ex.name != dev.name) {
                this.devices_obj[dev.mac].update(dev.name, dev.ip);
                ex.ip = dev.ip;
                ex.name = dev.name;
                changed = true;
            }
        } else {
            this.devices[dev.mac] = { name: dev.name, ip: dev.ip };
            this.devices_obj[dev.mac] = new Device(this.$devices, dev.mac, dev.name, dev.ip);
            this.devices_obj[dev.mac].$root.classList = 'device';
            changed = true;
        }
        if (changed) localStorage.setItem('devices', JSON.stringify(this.devices));
    }

    search() {
        discover(getIPs(this.localIP, this.$subnet.value),
            (dev) => this.addDevice(dev),
            (perc) => this.$percent.textContent = perc + '%',
            () => this.$percent.textContent = '');
    }
}

async function discover(ips, onDiscover, onProcess, onEnd) {
    const delay = 40;
    const timeout = 2500;

    for (let ip in ips) {
        setTimeout(async () => {
            if (onProcess) onProcess(Math.round(ip / ips.length * 100));
            if (ip == ips.length - 1) if (onEnd) onEnd();

            try {
                let res = await fetch(`http://${ips[ip]}/settings?action=discover`, { signal: AbortSignal.timeout(timeout) });
                if (res && res.ok) {
                    res = await res.json();
                    res.ip = ips[ip];
                    if (onDiscover && res.type && res.type === 'discover') onDiscover(res);
                }
            } catch { }
        }, delay * ip);
    }
}