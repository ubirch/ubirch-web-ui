export class DeviceImportResult {
    accepted: number;
    failure: number;
    failures: string[];
    status: boolean;
    success: number;

    constructor(
        props: {
            accepted: number;
            failure: number;
            failures: string[];
            status: boolean;
            success: number;
        },
    ) {
        Object.assign(this, props);
    }
}
