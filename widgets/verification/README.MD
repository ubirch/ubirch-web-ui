# Ubirch Verification Widget

## Example

Live-Demo:

https://console.demo.ubirch.com/libs/verification/verification.html

You can find an example with full documentation here:

https://github.com/ubirch/ubirch-verify-widget


## Configuration

Widget configuration should be done on Ubirch side before deploy.

 - `verify_api_url` - URL to send verification request
 - `seal_icon_url` - URL to seal icon
 - `no_seal_icon_url` - URL to no-seal icon
 - `console_verify_url` - URL to console web app verification page
 - `assets_url_prefix` - absolute path to widget's assets

### assets_url_prefix

The widget will be used as external script, so, all the URLs it will add to the document will be handled relatively:

`/assets/some-image.jpg`

will became

`www.my-website.com/assets/some-image.jpg`

instead of using the Ubirch's website.

To avoid it, you need to specify the absolute path to the console resources. Use `assets_url_prefix` field for it.

## Usage

These configuration should be made on customer's side.

1. Add the script to the website
    ```
    <script src="{{Ubirch URL}}/verification.js"></script>;
    ```

2. Create an `UbirchVerification`</code>` instance:

    ```
    const ubirchVerification = new UbirchVerification({
        algorithm: 'sha512',
        elementSelector: '#verification-widget'
    });
    ```

    Where:

    - `algorithm` is hashing algorithm you need (possible values: `sha256`, `sha512`)
    - `elementSelector` is widget's host element selector, e.g. `#verification-widget`

3. Call methods:

    - `verifyJSON` if you need to verify JSON: `ubirchVerification.verifyJSON({{ your JSON }});`
    - `verifyHash` if you need to verify JSON: `ubirchVerification.verifyHash({{ your hash }});`
