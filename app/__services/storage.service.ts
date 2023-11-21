import * as CryptoJS from 'crypto-js';

class StorageService {
    environment = (process.env.NODE_ENV === "production")
    secretKey = process.env.SECRET_KEY || 'SECRET_KEY'

    /**
     * This service has the goal to encrypt any data passed to it.
     * @param {string} key - The string to set as key for storing to localStorage. Key should not contain white spaces.
     * @param {string | number | object | boolean} data - Data is either string | number | object | boolean.
     * @param {boolean} keepSessionAlive - Used to set user session type if Local Storage (keep alive) or Session Storage (session is destroyed page is refreshed).
     */
    encryptAny(key: string, data: string | number | object | boolean, // keepSessionAlive: boolean = false
    ): void | string {
        /**
         * Check if value is null
         */
        if (key == null || data == null) {
            if (!this.environment) console.error('Null key are not supported');
            return;
        }
        if (RegExp(/\s/).test(key)) {
            if (!this.environment) console.error("Key can't have empty spaces");
            return;
        }
        if (data == null) {
            if (!this.environment) console.error('Null values are not supported as data');
            return;
        }

        let encryptedData: string = '';

        /**
         * Switch between the type of data to encrypt the right way
         */
        switch (typeof data) {
            case 'string':
                encryptedData = CryptoJS.AES.encrypt(data, this.secretKey).toString();
                break;

            case 'number':
            case 'boolean':
                encryptedData = CryptoJS.AES.encrypt(data.toString(), this.secretKey).toString();
                break;

            case 'object':
                encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), this.secretKey).toString();
                break;

            case 'undefined':
            default:
                if (!this.environment) console.error('data type: ', typeof data, ' is not supported!');
                break;
        }

        localStorage.setItem(key, encryptedData);
        return;
    }


    /**
     * @author Nsama David
     * @description This function encrypts a string and returns the encrypted String.
     * @param {string} payload
     * @returns {string} string
     */
    hashString(payload: string | number): string {
        let b64 = CryptoJS.AES.encrypt(payload.toString(), this.secretKey).toString();
        let e64 = CryptoJS.enc.Base64.parse(b64);
        let eHex = e64.toString(CryptoJS.enc.Hex);
        return eHex;
    };

    /**
     * @author Nsama David
     * @description This function returns the original string that has been encrypted
     * @param {string} hashedString
     * @returns {string} string
     */
    returnHashStringValue(hashedString: string): string {
        let reb64 = CryptoJS.enc.Hex.parse(hashedString);
        let bytes = reb64.toString(CryptoJS.enc.Base64);
        let decrypt = CryptoJS.AES.decrypt(bytes, this.secretKey);
        let plain = decrypt.toString(CryptoJS.enc.Utf8);
        return plain;
    };


    /**
     * This service has the goal to decrypt any data passed to it.
     * @param {string} key
     * @param {boolean} isObject
     * @returns {any}
     */
    decryptAny(key: string, isObject: boolean = false): any {
        /**
         * Check if value is null
         */
        if (key == null) {
            if (!this.environment) {
                console.error('Null values are not supported');
            }
            return;
        }

        /**
         * Check if key exist in localStorage
         */
        if (localStorage.getItem(key) == null) {
            if (!this.environment) {
                console.error('No such key: ' + key + ' exist in the localStore!');
            }
            return;
        }

        let data: any = localStorage.getItem(key);

        let bytes: CryptoJS.lib.WordArray;

        let decryptedData: any;

        /**
         * Check if isObject is true then decrypt and return an object
         */
        if (isObject) {
            bytes = CryptoJS.AES.decrypt(data, this.secretKey);
            try {
                decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
                return decryptedData;
            } catch (error: any) {
                if (!this.environment) console.error(bytes.toString(CryptoJS.enc.Utf8) + ': is not an object!');
            }
        } else {
            bytes = CryptoJS.AES.decrypt(data, this.secretKey);
            decryptedData = bytes.toString(CryptoJS.enc.Utf8);
        }

        /**
         * Check if decryptedData is 'true' or 'false'
         */
        if (decryptedData == 'true') {
            return true;
        } else if (decryptedData == 'false') {
            return false;
        }

        /**
         * Check if decryptedData is a numeric value
         */
        if (this.isNumeric(decryptedData)) {
            return Number(decryptedData);
        }

        // If decryptedData is not bool or numeric then it's a normal string
        return decryptedData;
    }

    /**
     * Check if value entered is a numeric value.
     * @param {any} n - Could be of any type.
     * @returns {boolean} bool - A boolean value.
     */
    isNumeric(n: any): boolean {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    /**
     * Clears the browser storage.
     */
    clearStorage(): void {
        localStorage.clear();
        sessionStorage.clear();
    }

}

export const storageService = new StorageService();
