import json, uuid, hmac, hashlib, requests
import time
def create_momo_payment(amount, order_id):
    endpoint = "https://test-payment.momo.vn/v2/gateway/api/create"

    partnerCode = "MOMO"
    accessKey = "F8BBA842ECF85"
    secretKey = "K951B6PE1waDMi640xX08PD3vg6EkVlz"

    requestId = str(uuid.uuid4())
    orderInfo = "Thanh toan don hang"
    redirectUrl = "http://127.0.0.1:5500/front-end/page/cart.html"
    ipnUrl = "https://webhook.site/xxxxxx"
    requestType = "payWithMethod"
    extraData = ""

    amount = str(amount)

    rawSignature = (
        "accessKey=" + accessKey +
        "&amount=" + amount +
        "&extraData=" + extraData +
        "&ipnUrl=" + ipnUrl +
        "&orderId=" + order_id +
        "&orderInfo=" + orderInfo +
        "&partnerCode=" + partnerCode +
        "&redirectUrl=" + redirectUrl +
        "&requestId=" + requestId +
        "&requestType=" + requestType
    )

    signature = hmac.new(
    secretKey.encode("utf-8"),
    rawSignature.encode("utf-8"),
    hashlib.sha256
        ).hexdigest()

    data = {
        "partnerCode": partnerCode,
        "partnerName": "Test",
        "storeId": "MomoTestStore",
        "requestId": requestId,
        "amount": int(amount),
        "orderId": order_id,
        "orderInfo": orderInfo,
        "redirectUrl": redirectUrl,
        "ipnUrl": ipnUrl,
        "lang": "vi",
        "extraData": extraData,
        "requestType": requestType,
        "signature": signature
    }

    res = requests.post(
        endpoint,
        data=json.dumps(data),
        headers={"Content-Type": "application/json"}
    )

    return res.json()
