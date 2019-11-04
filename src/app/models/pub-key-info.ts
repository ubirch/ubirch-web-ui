export class PubKeyInfo {
    public hwDeviceId: string;
    public pubKey: string;
    public pubKeyId: string;
    public algorithm: string;
    public created: string;
    public validNotBefore: string;
    public validNotAfter: string;
    public signed: boolean;

    /**
     *
     * @param jsonPubKey PubKey in form of:
     *  "hwDeviceId": "4150473037-547268290-3238389072-173590267",
     *  "pubKey": "MC0wCAYDK2VkCgEBAyEAovEmQJuiWdrb5hV/mhG1SF9Vul7tRveYZ74Mk+Okjhg=",
     *  "algorithm": "ECC_ED25519",
     *  "created": "2017-08-03T09:51:36.000Z",
     *  "validNotBefore": "2017-08-03T09:51:36.000Z",
     *  "validNotAfter": "2018-02-03T09:51:36.000Z"
     */
    constructor(jsonPubKey) {
        if (jsonPubKey) {
            if (jsonPubKey.pubKeyInfo) {
                this.hwDeviceId = jsonPubKey.pubKeyInfo.hwDeviceId;
                this.pubKey = jsonPubKey.pubKeyInfo.pubKey;
                this.pubKeyId = jsonPubKey.pubKeyInfo.pubKeyId;
                this.algorithm = jsonPubKey.pubKeyInfo.algorithm;
                this.created = jsonPubKey.pubKeyInfo.created;
                this.validNotBefore = jsonPubKey.pubKeyInfo.validNotBefore;
                this.validNotAfter = jsonPubKey.pubKeyInfo.validNotAfter;
            }
            this.signed = this.verifySignature(jsonPubKey);
        } else {
            console.log('Tried to create pubKey from nothing');
        }
    }

    /**
     * check if pubKey has signature added (no verification of signature performed)
     * @param key pubKey in JSON format responded from ubirch key server
     */
    private verifySignature(key: any): boolean {
        if (key.signature) {
            return true;
        } else {
            return false;
        }
    }

}
