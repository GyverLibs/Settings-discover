import { Component } from "@alexgyver/component";
import { lang } from "./lang";

export default class Device {
    timer = null;
    hold_trsh = 1000;
    ip = null;
    mac = '';

    constructor(parent, mac, name, ip) {
        Component.make('div', {
            context: this,
            var: 'root',
            class: 'device inactive',
            parent: parent,
            children: [
                {
                    tag: 'div',
                    children: [
                        {
                            tag: 'span',
                            var: 'name',
                            class: 'name',
                        },
                        {
                            tag: 'span',
                            var: 'ipmac',
                            class: 'ipmac',
                        },
                    ]
                },
                {
                    tag: 'div',
                    class: 'icon arrow',
                },
            ],
            events: {
                click: () => {
                    if (this.ip && !this.$root.classList.contains('inactive')) window.open(`http://${this.ip}/`);
                    console.log('click');
                },
                contextmenu: (e) => {
                    if (confirm(lang.remove + ' ' + name + '?')) {
                        this.$root.dispatchEvent(new CustomEvent("remove", {
                            detail: { mac: this.mac },
                            bubbles: true,
                        }));
                        this.$root.remove();
                    }
                    e.preventDefault();
                    e.stopPropagation();
                }
            }
        });

        this.mac = mac;
        this.update(name, ip);
    }

    update(name, ip) {
        this.ip = ip;
        this.$name.textContent = name;
        this.$ipmac.textContent = ip + ' [' + this.mac + ']';
    }
}