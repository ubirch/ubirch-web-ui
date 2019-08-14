export class ErrorMessage {
    public id: string;
    public message: Map<string, string>;
    constructor(id: string, message: string | Map<string, string>) {
        this.id = id;
        if (typeof message === 'string') {
            const messageMap: Map<string, string> = new Map();
            messageMap.set('default', message);
            this.message = messageMap;
        } else {
            if (!message.get('default')) {
                console.warn(`Missing default error string for error ${{id}}`);
            }
            this.message = message;
        }
    }
}

export const ERROR_MESSAGE = {
    networkUnreachable: new ErrorMessage('networkUnreachable',
        new Map([
            ['default', 'Server currently unreachable'],
            ['de', 'Die Infrastruktur schein momentan nicht erreichbar zu sein...'],
            ['en', 'Server currently unreachable']
        ])),
    loginExpired: new ErrorMessage('loginExpired',
        new Map([
            ['default', 'Login expired - please login again'],
            ['de', 'Sie waren zu lange inaktiv, ihr Login ist abgelaufen. Bitte melden Sie sich erneut an!'],
            ['en', 'Login expired - please login again']
        ])),
    loadListOfItemStubsFailed: new ErrorMessage('loadListOfItemStubsFailed',
        new Map([
            ['default', 'Loading list items failed'],
            ['de', 'Beim Laden der Einträge für die Liste ist ein Fehler aufgetreten.'],
            ['en', 'Loading list items failed']
        ])),
};
