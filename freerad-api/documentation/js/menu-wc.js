'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">freerad-api documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-6790985d1abddf2b58ca5295af718f8c602068996ffa3a434ec6d8e4520ab3adae4a489990a3cf204889f3306e8ed32939e68ee2848c5ba73b37914288ce7fad"' : 'data-bs-target="#xs-controllers-links-module-AppModule-6790985d1abddf2b58ca5295af718f8c602068996ffa3a434ec6d8e4520ab3adae4a489990a3cf204889f3306e8ed32939e68ee2848c5ba73b37914288ce7fad"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-6790985d1abddf2b58ca5295af718f8c602068996ffa3a434ec6d8e4520ab3adae4a489990a3cf204889f3306e8ed32939e68ee2848c5ba73b37914288ce7fad"' :
                                            'id="xs-controllers-links-module-AppModule-6790985d1abddf2b58ca5295af718f8c602068996ffa3a434ec6d8e4520ab3adae4a489990a3cf204889f3306e8ed32939e68ee2848c5ba73b37914288ce7fad"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-6790985d1abddf2b58ca5295af718f8c602068996ffa3a434ec6d8e4520ab3adae4a489990a3cf204889f3306e8ed32939e68ee2848c5ba73b37914288ce7fad"' : 'data-bs-target="#xs-injectables-links-module-AppModule-6790985d1abddf2b58ca5295af718f8c602068996ffa3a434ec6d8e4520ab3adae4a489990a3cf204889f3306e8ed32939e68ee2848c5ba73b37914288ce7fad"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-6790985d1abddf2b58ca5295af718f8c602068996ffa3a434ec6d8e4520ab3adae4a489990a3cf204889f3306e8ed32939e68ee2848c5ba73b37914288ce7fad"' :
                                        'id="xs-injectables-links-module-AppModule-6790985d1abddf2b58ca5295af718f8c602068996ffa3a434ec6d8e4520ab3adae4a489990a3cf204889f3306e8ed32939e68ee2848c5ba73b37914288ce7fad"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CoaModule.html" data-type="entity-link" >CoaModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-CoaModule-9e5c47740d2f45c46b5a3a8f4f994bef8676fbd741ed473ed5caa11d7b09d16d113c331c56a16abc202481efc00d6f7d7ccb3b2c830bdd3cc33053870ca3d28f"' : 'data-bs-target="#xs-controllers-links-module-CoaModule-9e5c47740d2f45c46b5a3a8f4f994bef8676fbd741ed473ed5caa11d7b09d16d113c331c56a16abc202481efc00d6f7d7ccb3b2c830bdd3cc33053870ca3d28f"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CoaModule-9e5c47740d2f45c46b5a3a8f4f994bef8676fbd741ed473ed5caa11d7b09d16d113c331c56a16abc202481efc00d6f7d7ccb3b2c830bdd3cc33053870ca3d28f"' :
                                            'id="xs-controllers-links-module-CoaModule-9e5c47740d2f45c46b5a3a8f4f994bef8676fbd741ed473ed5caa11d7b09d16d113c331c56a16abc202481efc00d6f7d7ccb3b2c830bdd3cc33053870ca3d28f"' }>
                                            <li class="link">
                                                <a href="controllers/CoaController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CoaController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-CoaModule-9e5c47740d2f45c46b5a3a8f4f994bef8676fbd741ed473ed5caa11d7b09d16d113c331c56a16abc202481efc00d6f7d7ccb3b2c830bdd3cc33053870ca3d28f"' : 'data-bs-target="#xs-injectables-links-module-CoaModule-9e5c47740d2f45c46b5a3a8f4f994bef8676fbd741ed473ed5caa11d7b09d16d113c331c56a16abc202481efc00d6f7d7ccb3b2c830bdd3cc33053870ca3d28f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CoaModule-9e5c47740d2f45c46b5a3a8f4f994bef8676fbd741ed473ed5caa11d7b09d16d113c331c56a16abc202481efc00d6f7d7ccb3b2c830bdd3cc33053870ca3d28f"' :
                                        'id="xs-injectables-links-module-CoaModule-9e5c47740d2f45c46b5a3a8f4f994bef8676fbd741ed473ed5caa11d7b09d16d113c331c56a16abc202481efc00d6f7d7ccb3b2c830bdd3cc33053870ca3d28f"' }>
                                        <li class="link">
                                            <a href="injectables/CoaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CoaService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/RadusergroupService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RadusergroupService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/NasModule.html" data-type="entity-link" >NasModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-NasModule-d7fccc4f4eca3d89d8860d11b5ce70f057a547115518e694f4a5bea5c36649771fda7987d0667c0378bc8225ae82906ae2846c9f6a3b5159da466ef320a387ad"' : 'data-bs-target="#xs-controllers-links-module-NasModule-d7fccc4f4eca3d89d8860d11b5ce70f057a547115518e694f4a5bea5c36649771fda7987d0667c0378bc8225ae82906ae2846c9f6a3b5159da466ef320a387ad"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-NasModule-d7fccc4f4eca3d89d8860d11b5ce70f057a547115518e694f4a5bea5c36649771fda7987d0667c0378bc8225ae82906ae2846c9f6a3b5159da466ef320a387ad"' :
                                            'id="xs-controllers-links-module-NasModule-d7fccc4f4eca3d89d8860d11b5ce70f057a547115518e694f4a5bea5c36649771fda7987d0667c0378bc8225ae82906ae2846c9f6a3b5159da466ef320a387ad"' }>
                                            <li class="link">
                                                <a href="controllers/NasController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NasController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-NasModule-d7fccc4f4eca3d89d8860d11b5ce70f057a547115518e694f4a5bea5c36649771fda7987d0667c0378bc8225ae82906ae2846c9f6a3b5159da466ef320a387ad"' : 'data-bs-target="#xs-injectables-links-module-NasModule-d7fccc4f4eca3d89d8860d11b5ce70f057a547115518e694f4a5bea5c36649771fda7987d0667c0378bc8225ae82906ae2846c9f6a3b5159da466ef320a387ad"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-NasModule-d7fccc4f4eca3d89d8860d11b5ce70f057a547115518e694f4a5bea5c36649771fda7987d0667c0378bc8225ae82906ae2846c9f6a3b5159da466ef320a387ad"' :
                                        'id="xs-injectables-links-module-NasModule-d7fccc4f4eca3d89d8860d11b5ce70f057a547115518e694f4a5bea5c36649771fda7987d0667c0378bc8225ae82906ae2846c9f6a3b5159da466ef320a387ad"' }>
                                        <li class="link">
                                            <a href="injectables/NasService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NasService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/NodesModule.html" data-type="entity-link" >NodesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-NodesModule-ddfe3a42c3aeb6e5f3338f1f874c8fe8c739030ef23f0ba3ea1d57b392021d5d0966d6c5a27d004562b737888cb3b8255a15bf88cb4186039895a11752aa997e"' : 'data-bs-target="#xs-controllers-links-module-NodesModule-ddfe3a42c3aeb6e5f3338f1f874c8fe8c739030ef23f0ba3ea1d57b392021d5d0966d6c5a27d004562b737888cb3b8255a15bf88cb4186039895a11752aa997e"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-NodesModule-ddfe3a42c3aeb6e5f3338f1f874c8fe8c739030ef23f0ba3ea1d57b392021d5d0966d6c5a27d004562b737888cb3b8255a15bf88cb4186039895a11752aa997e"' :
                                            'id="xs-controllers-links-module-NodesModule-ddfe3a42c3aeb6e5f3338f1f874c8fe8c739030ef23f0ba3ea1d57b392021d5d0966d6c5a27d004562b737888cb3b8255a15bf88cb4186039895a11752aa997e"' }>
                                            <li class="link">
                                                <a href="controllers/NodesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NodesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-NodesModule-ddfe3a42c3aeb6e5f3338f1f874c8fe8c739030ef23f0ba3ea1d57b392021d5d0966d6c5a27d004562b737888cb3b8255a15bf88cb4186039895a11752aa997e"' : 'data-bs-target="#xs-injectables-links-module-NodesModule-ddfe3a42c3aeb6e5f3338f1f874c8fe8c739030ef23f0ba3ea1d57b392021d5d0966d6c5a27d004562b737888cb3b8255a15bf88cb4186039895a11752aa997e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-NodesModule-ddfe3a42c3aeb6e5f3338f1f874c8fe8c739030ef23f0ba3ea1d57b392021d5d0966d6c5a27d004562b737888cb3b8255a15bf88cb4186039895a11752aa997e"' :
                                        'id="xs-injectables-links-module-NodesModule-ddfe3a42c3aeb6e5f3338f1f874c8fe8c739030ef23f0ba3ea1d57b392021d5d0966d6c5a27d004562b737888cb3b8255a15bf88cb4186039895a11752aa997e"' }>
                                        <li class="link">
                                            <a href="injectables/NodesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NodesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PlanModule.html" data-type="entity-link" >PlanModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PlanModule-a7c0da9b8cb8c5654dff6c91144fe8383c3344f7f43faa7b7144292a4cc86239f5b46d9b39ab61af3c1dcb7500e04f3b0615c49c7faa08c8522e3278ccdd21b2"' : 'data-bs-target="#xs-controllers-links-module-PlanModule-a7c0da9b8cb8c5654dff6c91144fe8383c3344f7f43faa7b7144292a4cc86239f5b46d9b39ab61af3c1dcb7500e04f3b0615c49c7faa08c8522e3278ccdd21b2"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PlanModule-a7c0da9b8cb8c5654dff6c91144fe8383c3344f7f43faa7b7144292a4cc86239f5b46d9b39ab61af3c1dcb7500e04f3b0615c49c7faa08c8522e3278ccdd21b2"' :
                                            'id="xs-controllers-links-module-PlanModule-a7c0da9b8cb8c5654dff6c91144fe8383c3344f7f43faa7b7144292a4cc86239f5b46d9b39ab61af3c1dcb7500e04f3b0615c49c7faa08c8522e3278ccdd21b2"' }>
                                            <li class="link">
                                                <a href="controllers/PlanController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PlanController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PlanModule-a7c0da9b8cb8c5654dff6c91144fe8383c3344f7f43faa7b7144292a4cc86239f5b46d9b39ab61af3c1dcb7500e04f3b0615c49c7faa08c8522e3278ccdd21b2"' : 'data-bs-target="#xs-injectables-links-module-PlanModule-a7c0da9b8cb8c5654dff6c91144fe8383c3344f7f43faa7b7144292a4cc86239f5b46d9b39ab61af3c1dcb7500e04f3b0615c49c7faa08c8522e3278ccdd21b2"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PlanModule-a7c0da9b8cb8c5654dff6c91144fe8383c3344f7f43faa7b7144292a4cc86239f5b46d9b39ab61af3c1dcb7500e04f3b0615c49c7faa08c8522e3278ccdd21b2"' :
                                        'id="xs-injectables-links-module-PlanModule-a7c0da9b8cb8c5654dff6c91144fe8383c3344f7f43faa7b7144292a4cc86239f5b46d9b39ab61af3c1dcb7500e04f3b0615c49c7faa08c8522e3278ccdd21b2"' }>
                                        <li class="link">
                                            <a href="injectables/PlanService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PlanService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/RadcheckModule.html" data-type="entity-link" >RadcheckModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-RadcheckModule-480659fc7dd5221e59996e899e616f7d1ba2878cc66e9307285d21dceabf05865d038915e21cd8ff26786604fd05bdf4eaf897aeedd4b973534d8c100be5cfcb"' : 'data-bs-target="#xs-controllers-links-module-RadcheckModule-480659fc7dd5221e59996e899e616f7d1ba2878cc66e9307285d21dceabf05865d038915e21cd8ff26786604fd05bdf4eaf897aeedd4b973534d8c100be5cfcb"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-RadcheckModule-480659fc7dd5221e59996e899e616f7d1ba2878cc66e9307285d21dceabf05865d038915e21cd8ff26786604fd05bdf4eaf897aeedd4b973534d8c100be5cfcb"' :
                                            'id="xs-controllers-links-module-RadcheckModule-480659fc7dd5221e59996e899e616f7d1ba2878cc66e9307285d21dceabf05865d038915e21cd8ff26786604fd05bdf4eaf897aeedd4b973534d8c100be5cfcb"' }>
                                            <li class="link">
                                                <a href="controllers/RadcheckController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RadcheckController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-RadcheckModule-480659fc7dd5221e59996e899e616f7d1ba2878cc66e9307285d21dceabf05865d038915e21cd8ff26786604fd05bdf4eaf897aeedd4b973534d8c100be5cfcb"' : 'data-bs-target="#xs-injectables-links-module-RadcheckModule-480659fc7dd5221e59996e899e616f7d1ba2878cc66e9307285d21dceabf05865d038915e21cd8ff26786604fd05bdf4eaf897aeedd4b973534d8c100be5cfcb"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-RadcheckModule-480659fc7dd5221e59996e899e616f7d1ba2878cc66e9307285d21dceabf05865d038915e21cd8ff26786604fd05bdf4eaf897aeedd4b973534d8c100be5cfcb"' :
                                        'id="xs-injectables-links-module-RadcheckModule-480659fc7dd5221e59996e899e616f7d1ba2878cc66e9307285d21dceabf05865d038915e21cd8ff26786604fd05bdf4eaf897aeedd4b973534d8c100be5cfcb"' }>
                                        <li class="link">
                                            <a href="injectables/RadcheckService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RadcheckService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/RadusergroupModule.html" data-type="entity-link" >RadusergroupModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-RadusergroupModule-9c615851245caafbbee35b521f7000e8aa7931493de431163b4fb0ed804add01cbac1c35c6fa745f691c1636352a09f6df7faaa9dbaae736aa705098723e17d3"' : 'data-bs-target="#xs-controllers-links-module-RadusergroupModule-9c615851245caafbbee35b521f7000e8aa7931493de431163b4fb0ed804add01cbac1c35c6fa745f691c1636352a09f6df7faaa9dbaae736aa705098723e17d3"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-RadusergroupModule-9c615851245caafbbee35b521f7000e8aa7931493de431163b4fb0ed804add01cbac1c35c6fa745f691c1636352a09f6df7faaa9dbaae736aa705098723e17d3"' :
                                            'id="xs-controllers-links-module-RadusergroupModule-9c615851245caafbbee35b521f7000e8aa7931493de431163b4fb0ed804add01cbac1c35c6fa745f691c1636352a09f6df7faaa9dbaae736aa705098723e17d3"' }>
                                            <li class="link">
                                                <a href="controllers/RadusergroupController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RadusergroupController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-RadusergroupModule-9c615851245caafbbee35b521f7000e8aa7931493de431163b4fb0ed804add01cbac1c35c6fa745f691c1636352a09f6df7faaa9dbaae736aa705098723e17d3"' : 'data-bs-target="#xs-injectables-links-module-RadusergroupModule-9c615851245caafbbee35b521f7000e8aa7931493de431163b4fb0ed804add01cbac1c35c6fa745f691c1636352a09f6df7faaa9dbaae736aa705098723e17d3"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-RadusergroupModule-9c615851245caafbbee35b521f7000e8aa7931493de431163b4fb0ed804add01cbac1c35c6fa745f691c1636352a09f6df7faaa9dbaae736aa705098723e17d3"' :
                                        'id="xs-injectables-links-module-RadusergroupModule-9c615851245caafbbee35b521f7000e8aa7931493de431163b4fb0ed804add01cbac1c35c6fa745f691c1636352a09f6df7faaa9dbaae736aa705098723e17d3"' }>
                                        <li class="link">
                                            <a href="injectables/RadusergroupService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RadusergroupService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ServicesModule.html" data-type="entity-link" >ServicesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ServicesModule-c79a7370bbbd75db6ce4416a11fe8d560cf2920e2eb832cef2029e843af6e2492e29d3de5a24c58a931a0a12044efd0c057d5814380a68c11c73e5f6cd9dda89"' : 'data-bs-target="#xs-controllers-links-module-ServicesModule-c79a7370bbbd75db6ce4416a11fe8d560cf2920e2eb832cef2029e843af6e2492e29d3de5a24c58a931a0a12044efd0c057d5814380a68c11c73e5f6cd9dda89"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ServicesModule-c79a7370bbbd75db6ce4416a11fe8d560cf2920e2eb832cef2029e843af6e2492e29d3de5a24c58a931a0a12044efd0c057d5814380a68c11c73e5f6cd9dda89"' :
                                            'id="xs-controllers-links-module-ServicesModule-c79a7370bbbd75db6ce4416a11fe8d560cf2920e2eb832cef2029e843af6e2492e29d3de5a24c58a931a0a12044efd0c057d5814380a68c11c73e5f6cd9dda89"' }>
                                            <li class="link">
                                                <a href="controllers/ServicesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ServicesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ServicesModule-c79a7370bbbd75db6ce4416a11fe8d560cf2920e2eb832cef2029e843af6e2492e29d3de5a24c58a931a0a12044efd0c057d5814380a68c11c73e5f6cd9dda89"' : 'data-bs-target="#xs-injectables-links-module-ServicesModule-c79a7370bbbd75db6ce4416a11fe8d560cf2920e2eb832cef2029e843af6e2492e29d3de5a24c58a931a0a12044efd0c057d5814380a68c11c73e5f6cd9dda89"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ServicesModule-c79a7370bbbd75db6ce4416a11fe8d560cf2920e2eb832cef2029e843af6e2492e29d3de5a24c58a931a0a12044efd0c057d5814380a68c11c73e5f6cd9dda89"' :
                                        'id="xs-injectables-links-module-ServicesModule-c79a7370bbbd75db6ce4416a11fe8d560cf2920e2eb832cef2029e843af6e2492e29d3de5a24c58a931a0a12044efd0c057d5814380a68c11c73e5f6cd9dda89"' }>
                                        <li class="link">
                                            <a href="injectables/ServicesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ServicesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SystemsModule.html" data-type="entity-link" >SystemsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-SystemsModule-8a7ee7385e16ebe732d4e8ee19562555bdbd24389544378ffc87f91ba74778b5e0079b94c94dabf0c8a7587d2bd144d6af7e54543eb293724983305a9ad5c241"' : 'data-bs-target="#xs-controllers-links-module-SystemsModule-8a7ee7385e16ebe732d4e8ee19562555bdbd24389544378ffc87f91ba74778b5e0079b94c94dabf0c8a7587d2bd144d6af7e54543eb293724983305a9ad5c241"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-SystemsModule-8a7ee7385e16ebe732d4e8ee19562555bdbd24389544378ffc87f91ba74778b5e0079b94c94dabf0c8a7587d2bd144d6af7e54543eb293724983305a9ad5c241"' :
                                            'id="xs-controllers-links-module-SystemsModule-8a7ee7385e16ebe732d4e8ee19562555bdbd24389544378ffc87f91ba74778b5e0079b94c94dabf0c8a7587d2bd144d6af7e54543eb293724983305a9ad5c241"' }>
                                            <li class="link">
                                                <a href="controllers/SystemsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SystemsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-SystemsModule-8a7ee7385e16ebe732d4e8ee19562555bdbd24389544378ffc87f91ba74778b5e0079b94c94dabf0c8a7587d2bd144d6af7e54543eb293724983305a9ad5c241"' : 'data-bs-target="#xs-injectables-links-module-SystemsModule-8a7ee7385e16ebe732d4e8ee19562555bdbd24389544378ffc87f91ba74778b5e0079b94c94dabf0c8a7587d2bd144d6af7e54543eb293724983305a9ad5c241"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SystemsModule-8a7ee7385e16ebe732d4e8ee19562555bdbd24389544378ffc87f91ba74778b5e0079b94c94dabf0c8a7587d2bd144d6af7e54543eb293724983305a9ad5c241"' :
                                        'id="xs-injectables-links-module-SystemsModule-8a7ee7385e16ebe732d4e8ee19562555bdbd24389544378ffc87f91ba74778b5e0079b94c94dabf0c8a7587d2bd144d6af7e54543eb293724983305a9ad5c241"' }>
                                        <li class="link">
                                            <a href="injectables/SystemsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SystemsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserInfoModule.html" data-type="entity-link" >UserInfoModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UserInfoModule-54e589143f7c6365517afb64056930c2d24f940fb32c3f186870449d2ebdbfc6075fe7c27573a2034023759f7c3714a91b95ce3906c0a6274c87a23306760c6f"' : 'data-bs-target="#xs-controllers-links-module-UserInfoModule-54e589143f7c6365517afb64056930c2d24f940fb32c3f186870449d2ebdbfc6075fe7c27573a2034023759f7c3714a91b95ce3906c0a6274c87a23306760c6f"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UserInfoModule-54e589143f7c6365517afb64056930c2d24f940fb32c3f186870449d2ebdbfc6075fe7c27573a2034023759f7c3714a91b95ce3906c0a6274c87a23306760c6f"' :
                                            'id="xs-controllers-links-module-UserInfoModule-54e589143f7c6365517afb64056930c2d24f940fb32c3f186870449d2ebdbfc6075fe7c27573a2034023759f7c3714a91b95ce3906c0a6274c87a23306760c6f"' }>
                                            <li class="link">
                                                <a href="controllers/UserInfoController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserInfoController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UserInfoModule-54e589143f7c6365517afb64056930c2d24f940fb32c3f186870449d2ebdbfc6075fe7c27573a2034023759f7c3714a91b95ce3906c0a6274c87a23306760c6f"' : 'data-bs-target="#xs-injectables-links-module-UserInfoModule-54e589143f7c6365517afb64056930c2d24f940fb32c3f186870449d2ebdbfc6075fe7c27573a2034023759f7c3714a91b95ce3906c0a6274c87a23306760c6f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserInfoModule-54e589143f7c6365517afb64056930c2d24f940fb32c3f186870449d2ebdbfc6075fe7c27573a2034023759f7c3714a91b95ce3906c0a6274c87a23306760c6f"' :
                                        'id="xs-injectables-links-module-UserInfoModule-54e589143f7c6365517afb64056930c2d24f940fb32c3f186870449d2ebdbfc6075fe7c27573a2034023759f7c3714a91b95ce3906c0a6274c87a23306760c6f"' }>
                                        <li class="link">
                                            <a href="injectables/UserInfoService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserInfoService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ZoneModule.html" data-type="entity-link" >ZoneModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ZoneModule-22d2e3b1a31a612bb3eb5996cd5a6885bdf9d3d0f9dfb304aa5b7dbb91ad10e7f4bd373fd0ae082040eb3fc0fd216a6fa9c0ac72436ebf79b53dca9bf1781eb4"' : 'data-bs-target="#xs-controllers-links-module-ZoneModule-22d2e3b1a31a612bb3eb5996cd5a6885bdf9d3d0f9dfb304aa5b7dbb91ad10e7f4bd373fd0ae082040eb3fc0fd216a6fa9c0ac72436ebf79b53dca9bf1781eb4"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ZoneModule-22d2e3b1a31a612bb3eb5996cd5a6885bdf9d3d0f9dfb304aa5b7dbb91ad10e7f4bd373fd0ae082040eb3fc0fd216a6fa9c0ac72436ebf79b53dca9bf1781eb4"' :
                                            'id="xs-controllers-links-module-ZoneModule-22d2e3b1a31a612bb3eb5996cd5a6885bdf9d3d0f9dfb304aa5b7dbb91ad10e7f4bd373fd0ae082040eb3fc0fd216a6fa9c0ac72436ebf79b53dca9bf1781eb4"' }>
                                            <li class="link">
                                                <a href="controllers/ZoneController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ZoneController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ZoneModule-22d2e3b1a31a612bb3eb5996cd5a6885bdf9d3d0f9dfb304aa5b7dbb91ad10e7f4bd373fd0ae082040eb3fc0fd216a6fa9c0ac72436ebf79b53dca9bf1781eb4"' : 'data-bs-target="#xs-injectables-links-module-ZoneModule-22d2e3b1a31a612bb3eb5996cd5a6885bdf9d3d0f9dfb304aa5b7dbb91ad10e7f4bd373fd0ae082040eb3fc0fd216a6fa9c0ac72436ebf79b53dca9bf1781eb4"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ZoneModule-22d2e3b1a31a612bb3eb5996cd5a6885bdf9d3d0f9dfb304aa5b7dbb91ad10e7f4bd373fd0ae082040eb3fc0fd216a6fa9c0ac72436ebf79b53dca9bf1781eb4"' :
                                        'id="xs-injectables-links-module-ZoneModule-22d2e3b1a31a612bb3eb5996cd5a6885bdf9d3d0f9dfb304aa5b7dbb91ad10e7f4bd373fd0ae082040eb3fc0fd216a6fa9c0ac72436ebf79b53dca9bf1781eb4"' }>
                                        <li class="link">
                                            <a href="injectables/NasService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NasService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ZoneService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ZoneService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/CoaController.html" data-type="entity-link" >CoaController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/NasController.html" data-type="entity-link" >NasController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/NodesController.html" data-type="entity-link" >NodesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/PlanController.html" data-type="entity-link" >PlanController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/RadcheckController.html" data-type="entity-link" >RadcheckController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/RadusergroupController.html" data-type="entity-link" >RadusergroupController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ServicesController.html" data-type="entity-link" >ServicesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/SystemsController.html" data-type="entity-link" >SystemsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UserInfoController.html" data-type="entity-link" >UserInfoController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ZoneController.html" data-type="entity-link" >ZoneController</a>
                                </li>
                            </ul>
                        </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#entities-links"' :
                                'data-bs-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/Nas.html" data-type="entity-link" >Nas</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Plan.html" data-type="entity-link" >Plan</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Radacct.html" data-type="entity-link" >Radacct</a>
                                </li>
                                <li class="link">
                                    <a href="entities/RadCheck.html" data-type="entity-link" >RadCheck</a>
                                </li>
                                <li class="link">
                                    <a href="entities/RadGroupReply.html" data-type="entity-link" >RadGroupReply</a>
                                </li>
                                <li class="link">
                                    <a href="entities/RadUserGroup.html" data-type="entity-link" >RadUserGroup</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Service.html" data-type="entity-link" >Service</a>
                                </li>
                                <li class="link">
                                    <a href="entities/System.html" data-type="entity-link" >System</a>
                                </li>
                                <li class="link">
                                    <a href="entities/UserInfo.html" data-type="entity-link" >UserInfo</a>
                                </li>
                                <li class="link">
                                    <a href="entities/ZonaCliente.html" data-type="entity-link" >ZonaCliente</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Zone.html" data-type="entity-link" >Zone</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/ChangePlanDto.html" data-type="entity-link" >ChangePlanDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CoaDto.html" data-type="entity-link" >CoaDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateNodeDto.html" data-type="entity-link" >CreateNodeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePlanDto.html" data-type="entity-link" >CreatePlanDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateServiceDto.html" data-type="entity-link" >CreateServiceDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateSystemDto.html" data-type="entity-link" >CreateSystemDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/NasDto.html" data-type="entity-link" >NasDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/NasDtoUpdate.html" data-type="entity-link" >NasDtoUpdate</a>
                            </li>
                            <li class="link">
                                <a href="classes/RadCheckDto.html" data-type="entity-link" >RadCheckDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/RadCheckUpdateDto.html" data-type="entity-link" >RadCheckUpdateDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/RadUserGroupDto.html" data-type="entity-link" >RadUserGroupDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/RadUserGroupUpdateDto.html" data-type="entity-link" >RadUserGroupUpdateDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateNodeDto.html" data-type="entity-link" >UpdateNodeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatePlanDto.html" data-type="entity-link" >UpdatePlanDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateServiceDto.html" data-type="entity-link" >UpdateServiceDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateSystemDto.html" data-type="entity-link" >UpdateSystemDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserDto.html" data-type="entity-link" >UserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserUpdateDto.html" data-type="entity-link" >UserUpdateDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ZoneDto.html" data-type="entity-link" >ZoneDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ZoneUpadateDto.html" data-type="entity-link" >ZoneUpadateDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CoaService.html" data-type="entity-link" >CoaService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NasService.html" data-type="entity-link" >NasService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NodesService.html" data-type="entity-link" >NodesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PlanService.html" data-type="entity-link" >PlanService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RadcheckService.html" data-type="entity-link" >RadcheckService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RadusergroupService.html" data-type="entity-link" >RadusergroupService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ServicesService.html" data-type="entity-link" >ServicesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SystemsService.html" data-type="entity-link" >SystemsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserInfoService.html" data-type="entity-link" >UserInfoService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ZoneService.html" data-type="entity-link" >ZoneService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});