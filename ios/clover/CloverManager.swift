//
//  CloverSwift.swift
//  Hpmerchant_Production
//
//  Created by Duyen Hang on 28/07/2021.
//  Copyright © 2021 Facebook. All rights reserved.
//

import Foundation
import CloverConnector

@objc public protocol CloverManagerDelegate {
  func paymentSuccess(response: NSDictionary)
  func paymentFail(errorMessage: String)
  func voidSuccess(response: NSDictionary)
  func voidFail(errorMessage: String)
  func refundSuccess(response: NSDictionary)
  func refundFail(errorMessage: String)
  func pairingCode(string: String)
  func pairingSuccess(token: String)
  func closeoutSuccess(response: NSDictionary)
  func closeoutFail(errorMessage: String)
  func onDeviceReady()
  func onConfirmPayment()
  func printInProcess()
//  func printDone(message: String)
  func deviceDisconnected()
}
@objc public class  CloverManager : DefaultCloverConnectorListener, PairingDeviceConfiguration {

  var myCloverConnector:ICloverConnector?
  var confirmPaymentRequest: ConfirmPaymentRequest?
  public var printJobStatusDict = [String : (PrintJobStatusResponse) -> Void]()
  fileprivate var token:String?
  @objc public var cloverDelegate: CloverManagerDelegate?
  @objc public var urlSetting: String?
  var printers: [CLVModels.Printer.Printer]?

  fileprivate let PAIRING_AUTH_TOKEN_KEY:String = "PAIRING_AUTH_TOKEN"

  @objc public func connect(_ url:String, appId: String, appName: String, posSerial: String, token: String) {
    self.myCloverConnector?.dispose()
        // load from previous pairing, or nil will force/require
        // a new pairing with the device
    self.urlSetting = url
      let config = WebSocketDeviceConfiguration(endpoint: url,
          remoteApplicationID: appId,
          posName: appName, posSerial: posSerial,
          pairingAuthToken: token.isEmpty ? nil : token,
          pairingDeviceConfiguration: self)

    self.myCloverConnector = CloverConnectorFactory.createICloverConnector(config: config)
    self.myCloverConnector?.addCloverConnectorListener(self)
    self.myCloverConnector?.initializeConnection()
    }

  @objc public func doSale(paymentInfo: NSDictionary) {
    // if onDeviceReady has been called
    let amount = Int(paymentInfo.value(forKey: "amount") as! String) ?? 0
    let externalId = paymentInfo.value(forKey: "externalId") as! String
    let tipModeString = paymentInfo.value(forKey: "tipMode") as! String
    
    let saleRequest = SaleRequest(amount: amount, externalId: externalId)
    
    // configure other properties of SaleRequest
    saleRequest.tipMode = SaleRequest.TipMode(rawValue: tipModeString)
    saleRequest.autoAcceptSignature = true
    
    self.myCloverConnector?.sale(saleRequest)
  }
  
  @objc public func voidPayment(paymentInfo: NSDictionary) {
    let orderId = paymentInfo.value(forKey: "orderId") as! String
    let paymentId = paymentInfo.value(forKey: "paymentId") as! String
    let voidRequest = VoidPaymentRequest(orderId: orderId, paymentId: paymentId, voidReason: .USER_CANCEL)
    self.myCloverConnector?.voidPayment(voidRequest)
  }
  
  @objc public func refundPayment(paymentInfo: NSDictionary) {
    let orderId = paymentInfo.value(forKey: "orderId") as! String
    let paymentId = paymentInfo.value(forKey: "paymentId") as! String
    let refundRequest = RefundPaymentRequest(orderId: orderId, paymentId: paymentId, fullRefund: true)
    self.myCloverConnector?.refundPayment(refundRequest)
  }
  
  @objc func queryPayment(externalPaymentId: String) {
      
      let retrievePaymentRequest = RetrievePaymentRequest(externalPaymentId)
      self.myCloverConnector?.retrievePayment(retrievePaymentRequest)
  }
  
  @objc func closeout() {
      let closeoutRequest = CloseoutRequest(allowOpenTabs: true, batchId: nil)
      self.myCloverConnector?.closeout(closeoutRequest)
  }
  
  func imageFromBase64(_ base64: String) -> UIImage? {
      if let url = URL(string: base64) {
          if let data = try? Data(contentsOf: url) {
              return UIImage(data: data)
          }
      }
      return nil
  }
  
  @objc public func doPrint(image: String) {
    
    var imageString = image.replacingOccurrences(of: "\n", with: "")
    imageString = imageString.replacingOccurrences(of: "\r", with: "")
  
    let imageData = Data.init(base64Encoded: imageString, options: .init(rawValue: 0))
    let imageReceipt = imageData != nil ? UIImage(data: imageData!) : nil
    
    if(imageReceipt != nil){
      let request = PrintRequest(image: imageReceipt!, printRequestId: "\(arc4random())", printDeviceId: nil)
      self.issuePrintJob(request)
    }else{
//      if(self.cloverDelegate != nil){
//        self.cloverDelegate?.printDone(message: "ERROR")
//      }
    }
  }
  
  @objc public func confirmPayment() {
    self.myCloverConnector?.acceptPayment((self.confirmPaymentRequest?.payment)!)
  }
  
  @objc public func rejectPayment() {
    self.myCloverConnector?.rejectPayment((self.confirmPaymentRequest?.payment)!, challenge: (self.confirmPaymentRequest?.challenges![0])!)
  }

    // PairingDeviceConfiguration
  public func onPairingCode(_ pairingCode: String) {
        // display pairingCode to user, to be entered on the Clover Mini
    if(cloverDelegate != nil){
      cloverDelegate?.pairingCode(string: pairingCode)
    }
  }

  public func onPairingSuccess(_ authToken: String) {
        // pairing is successful
        // save this authToken to pass in to the config for future connections
        // so pairing will happen automatically
      if(cloverDelegate != nil){
        cloverDelegate?.pairingSuccess(token: authToken)
      }
    }
  
  @objc public func cancelTransaction() {
    self.myCloverConnector?.resetDevice()
  }
  
  //*---------Print----------*//
  
  func retrievePrinters(completion: ((_ response:RetrievePrintersResponse) -> Void)?) {
      let request = RetrievePrintersRequest(printerCategory: nil)
      self.myCloverConnector?.retrievePrinters(request)
  }
  
  public override func onRetrievePrintersResponse(_ retrievePrintersResponse: RetrievePrintersResponse) {
      guard retrievePrintersResponse.success == true else {
          
//        if(self.cloverDelegate != nil){
//          self.cloverDelegate?.printDone(message: "Error retrieving printers")
//        }
          return
      }
      
      if let printerList = retrievePrintersResponse.printers {
        if (printerList.count > 0) {
          self.printers = printerList
        }
      }
      
  }
  
  /// Private wrapper around print call that issues the request, configures the app and UI for printing, and sets up a callback for status
  ///
  /// - Parameter request: PrintRequest object containing the information needed to begin a print job
  private func issuePrintJob(_ request: PrintRequest) {
          //kick off the print request
         self.myCloverConnector?.print(request)
          
          //the rest of this scope works to monitor the print job. This can only be done if a printRequestID exists
//          guard let printRequestId = request.printRequestId else { return }
          
          //setup the UI for async waiting on the print job
          if(cloverDelegate != nil){
            cloverDelegate?.printInProcess()
          }
          
//          self.queryPrintStatus(printRequestId)
  }
  
  private func queryPrintStatus(_ printRequestId: String) {
      //this closure is kept on the listener, catches the first status update for this printRequestId (after it hits the Mini's printer spool), and then polls until the print job is done
    self.printJobStatusDict[printRequestId] = { [weak self] (response:PrintJobStatusResponse) -> Void in
          DispatchQueue.main.async {
              if response.status == .IN_QUEUE || response.status == .PRINTING { //since we're not done, perform another query after a short delay
                    DispatchQueue.main.asyncAfter(deadline: .now() + 0.5, execute: {
                    let request = PrintJobStatusRequest(printRequestId)
                    self?.myCloverConnector?.retrievePrintJobStatus(request)
                  })
              } else {
                  UIApplication.shared.isIdleTimerDisabled = false
                  self?.printJobStatusDict.removeValue(forKey: printRequestId)
              }
          }
      }
  }
  
  @objc public func openCashDrawer(){
    let cashDrawerRequest = OpenCashDrawerRequest("Cash Back", deviceId: nil)
    self.myCloverConnector?.openCashDrawer(cashDrawerRequest)
  }

  //-------Clover Connection Listener ---------//
  /*
   * Response to a closeout.
   */
  open override func onCloseoutResponse ( _ closeoutResponse:CloseoutResponse ){
    DispatchQueue.main.async { [weak self] in
        let dateFormatter = DateFormatter()
        if closeoutResponse.success {
          let responseDict: NSDictionary = [
//            "paymentId": response.paymentId ?? ""
            "id": closeoutResponse.batch?.id ?? "",
            "merchantId": closeoutResponse.batch?.merchantId ?? "",
            "firstGatewayTxId": closeoutResponse.batch?.firstGatewayTxId ?? "",
            "lastGatewayTxId": closeoutResponse.batch?.lastGatewayTxId ?? "",
          
          /// The number of transactions being batched
            "txCount": closeoutResponse.batch?.txCount ?? 0,
          /// Total amount closed
            "totalBatchAmount": closeoutResponse.batch?.totalBatchAmount ?? 0,
          /// List of devices in batch
            "devices": closeoutResponse.batch?.devices ?? 0,
            "state": closeoutResponse.batch?.state?.rawValue ?? "",
            "batchType": closeoutResponse.batch?.batchType?.rawValue ?? "",
          /// Created time of batch
            "createdTime": dateFormatter.string(from: closeoutResponse.batch?.createdTime ?? Date()),
          /// Modified time of batch
            "modifiedTime": dateFormatter.string(from: closeoutResponse.batch?.modifiedTime ?? Date()),
          /// Details split based on card / employees
          /// Number of public tips.
            "openTips": closeoutResponse.batch?.batchDetails?.openTips ?? 0,
          /// Number of public tabs.
            "openTabs": closeoutResponse.batch?.batchDetails?.openTabs ?? 0,
          ]
          if (self?.cloverDelegate != nil) {
            self?.cloverDelegate?.closeoutSuccess(response: responseDict)
          }
        } else {
          let message = "ERROR " + (closeoutResponse.reason ?? "")
          if (self?.cloverDelegate != nil) {
            self?.cloverDelegate?.closeoutFail(errorMessage: message)
          }
        }
    }
  }
  
  public override func onPrintJobStatusResponse(_ printJobStatusResponse:PrintJobStatusResponse) {
      DispatchQueue.main.async {
//          if(self.cloverDelegate != nil){
//            self.cloverDelegate?.printDone(message: printJobStatusResponse.status.rawValue)
//          }
      }
  }
  
  /*
   * Response to a payment be voided.
   */
  public override func  onVoidPaymentResponse ( _ response:VoidPaymentResponse ) -> Void {
      DispatchQueue.main.async { [weak self] in
          guard let self = self else { return }
          if response.success {
            let responseDict: NSDictionary = [
              "paymentId": response.paymentId ?? "",
              "transactionNumber": response.transactionNumber ?? "",
              "voidReason": response.voidReason ?? "",
              "orderId": response.payment?.order?.id ?? "",

              /// Device which processed the transaction for this payment
                "device": response.payment?.device ?? "",

              /// The tender type associated with this payment, e.g. credit card, cash, etc.
                "tender": response.payment?.tender?.label ?? "",

              /// Total amount paid
                "amount": response.payment?.amount ?? 0,

              /// Amount paid in tips
                "tipAmount": response.payment?.tipAmount ?? 0,

              /// Amount paid in tax
                "taxAmount": response.payment?.taxAmount ?? 0,

              /// Amount given back in a cash back transaction
                "cashbackAmount": response.payment?.cashbackAmount ?? 0,

              /// Amount of cash given by the customer
                "cashTendered": response.payment?.cashTendered ?? "",

                "externalPaymentId": response.payment?.externalPaymentId ?? "",
              
             // The employee who processed the payment
              "employee": response.payment?.employee ?? "",

              /// Time payment was recorded on server
              "createdTime": response.payment?.createdTime ?? "",

              "clientCreatedTime": response.payment?.clientCreatedTime ?? "",

              /// Last modified time of the payment
              "modifiedTime": response.payment?.modifiedTime ?? "",

              "offline": response.payment?.offline ?? "",

              "result": response.payment?.result ?? "",

              /// Information about the card used for credit/debit card payments
              "paymentRef": response.payment?.cardTransaction?.paymentRef ?? "",
              "creditRef": response.payment?.cardTransaction?.creditRef ?? "",
              "cardType": response.payment?.cardTransaction?.cardType ?? "",
              "entryType": response.payment?.cardTransaction?.entryType ?? "",
              "first6": response.payment?.cardTransaction?.first6 ?? "",
              "last4": response.payment?.cardTransaction?.last4 ?? "",
              "type_": response.payment?.cardTransaction?.type_ ?? "",
              "authCode": response.payment?.cardTransaction?.authCode ?? "",
              "referenceId": response.payment?.cardTransaction?.referenceId ?? "",
              "transactionNo": response.payment?.cardTransaction?.transactionNo ?? "",
              "state": response.payment?.cardTransaction?.state ?? "",
              "cardholderName": response.payment?.cardTransaction?.cardholderName ?? "",
              "token": response.payment?.cardTransaction?.token ?? "",
              "expirationDate": response.payment?.cardTransaction?.vaultedCard?.expirationDate ?? "",
              
                                  
              /// Amount record as a service charge
              "serviceCharge": response.payment?.serviceCharge ?? "",

              "taxRates": response.payment?.taxRates ?? "",

              "refunds": response.payment?.refunds ?? "",

              "note": response.payment?.note ?? "",

              "lineItemPayments": response.payment?.lineItemPayments ?? "",

              /// If voided, the reason why (when available)
              "voidReason": response.payment?.voidReason ?? "",

              /// Dynamic Currency Conversion information
              "dccInfo": response.payment?.dccInfo ?? "",

              /// Per transaction settings for the payment
              "transactionSettings": response.payment?.transactionSettings ?? "",

              /// German region-specific information
              "germanInfo": response.payment?.germanInfo ?? "",

              /// Tracking information for the app that created this payment.
              "appTracking": response.payment?.appTracking ?? "",

              /// Additional charges associated with this transaction (Canada INTERAC)
              "additionalCharges": response.payment?.additionalCharges ?? "",
              
              "transactionInfo": response.payment?.transactionInfo ?? "",
              
              "increments": response.payment?.increments ?? ""
            ]
            
            if(self.cloverDelegate != nil){
              self.cloverDelegate?.voidSuccess(response: responseDict)
            }
          } else {
            let errorMessage = "Void failed: " + String(describing: response.result)
            if(self.cloverDelegate != nil){
              self.cloverDelegate?.voidFail(errorMessage: errorMessage)
            }
          }
      }
  }
  
  public override func onRefundPaymentResponse(_ refundPaymentResponse: RefundPaymentResponse) {
      DispatchQueue.main.async { [weak self] in
          guard let self = self else { return }
        let dateFormatter = DateFormatter()
          if refundPaymentResponse.success {
            let responseDict: NSDictionary = [
                "orderId": refundPaymentResponse.orderId ?? "",
                "paymentId": refundPaymentResponse.paymentId ?? "",
                "id": refundPaymentResponse.refund?.id ?? "",
                /// The order with which the refund is associated
                "orderRef": refundPaymentResponse.refund?.orderRef ?? "",
                /// Device which processed the transaction for this refund
                "deviceSerial": refundPaymentResponse.refund?.device?.serial ?? "",
                /// Total amount refunded, including tax
                "amount": refundPaymentResponse.refund?.amount ?? 0,
                /// Tax amount refunded
                "taxAmount": refundPaymentResponse.refund?.taxAmount ?? 0,
                /// Tip amount refunded
                "tipAmount": refundPaymentResponse.refund?.tipAmount ?? 0,
                /// The time when the refund was recorded on the server
                "createdTime": dateFormatter.string(from: refundPaymentResponse.refund?.createdTime ?? Date()),
              /// The tender type associated with this payment, e.g. credit card, cash, etc.
                "voided": refundPaymentResponse.refund?.voided ?? false,
                "voidReason": refundPaymentResponse.refund?.voidReason ?? "",
                "first6": refundPaymentResponse.refund?.cardTransaction?.first6 ?? "",
                /// The last four digits of the card number
                "last4": refundPaymentResponse.refund?.cardTransaction?.last4 ?? "",
                "cardType": refundPaymentResponse.refund?.cardTransaction?.cardType ?? "",
                /// Authorization code (if successful)
                "cardTransactionAuthCode": refundPaymentResponse.refund?.cardTransaction?.authCode ?? "",
                "cardTransactionReferenceId": refundPaymentResponse.refund?.cardTransaction?.referenceId ?? "",
                "cardTransactionNo": refundPaymentResponse.refund?.cardTransaction?.transactionNo ?? "",
                "cardholderName": refundPaymentResponse.refund?.cardTransaction?.cardholderName ?? "",
                "cardTransactionToken": refundPaymentResponse.refund?.cardTransaction?.token ?? ""
              ]
              if(self.cloverDelegate != nil){
                self.cloverDelegate?.refundSuccess(response: responseDict)
              }
          } else {
              var failMessage = "Refund failed"
              if let failureMessage = refundPaymentResponse.message {
                failMessage = failureMessage
              }
              if(self.cloverDelegate != nil){
                self.cloverDelegate?.refundFail(errorMessage: failMessage)
              }
          }
      }
  }

    // called when device is disconnected
  public override func onDeviceDisconnected() {
    print("onDeviceDisconnected")
    
    if(cloverDelegate != nil){
          cloverDelegate?.deviceDisconnected()
        }
    
    
  }

    // called when device is connected, but not ready for requests
  public override func onDeviceConnected() {}

    // called when device is ready to take requests. Note: May be called more than once
  public override func onDeviceReady(_ info:MerchantInfo){
    if(cloverDelegate != nil){
      cloverDelegate?.onDeviceReady()
    }
  }

    // required if Mini wants the POS to verify a signature
  public override func onVerifySignatureRequest(_ signatureVerifyRequest: VerifySignatureRequest) {
        //present signature to user, then
        // acceptSignature(...) or rejectSignature(...)
    self.myCloverConnector?.acceptSignature(signatureVerifyRequest)
  }

    // required if Mini wants the POS to verify a payment
  public override func onConfirmPaymentRequest(_ request: ConfirmPaymentRequest) {
        //present 1 or more challenges to user, then
//        myCloverConnector?.acceptPayment(request.payment!)
        // or
        // myCloverConnector?.rejectPayment(...)
    self.confirmPaymentRequest = request
    if (cloverDelegate != nil) {
      cloverDelegate?.onConfirmPayment()
    }
  }

    // override other callback methods
  public override func onSaleResponse(_ response:SaleResponse) {
    
        if response.success {
          let dateFormatter = DateFormatter()
            // sale successful and payment is in the response (response.payment)
          let responseDict: NSDictionary = ["id": response.payment?.id ?? "",
          // The order with which the payment is associated
          "orderId": response.payment?.order?.id ?? "",

          /// Device which processed the transaction for this payment
          "device": response.payment?.device?.id ?? "",
          "deviceId": response.payment?.device?.id ?? "",

          /// The tender type associated with this payment, e.g. credit card, cash, etc.
            "tender": response.payment?.tender?.label ?? "",

          /// Total amount paid
            "amount": response.payment?.amount ?? 0,

          /// Amount paid in tips
            "tipAmount": response.payment?.tipAmount ?? 0,

          /// Amount paid in tax
            "taxAmount": response.payment?.taxAmount ?? 0,

          /// Amount given back in a cash back transaction
            "cashbackAmount": response.payment?.cashbackAmount ?? 0,

          /// Amount of cash given by the customer
            "cashTendered": response.payment?.cashTendered ?? "",

            "externalPaymentId": response.payment?.externalPaymentId ?? "",
          
         // The employee who processed the payment
          "employee": response.payment?.employee ?? "",

          /// Time payment was recorded on server
          "createdTime": dateFormatter.string(from: response.payment?.createdTime ?? Date()),

          "clientCreatedTime": response.payment?.clientCreatedTime ?? "",

          /// Last modified time of the payment
          "modifiedTime": response.payment?.modifiedTime ?? "",

          "offline": response.payment?.offline ?? "",

          "result": response.payment?.result ?? "",

          /// Information about the card used for credit/debit card payments
          "paymentRef": response.payment?.cardTransaction?.paymentRef ?? "",
          "creditRef": response.payment?.cardTransaction?.creditRef ?? "",
          "cardType": response.payment?.cardTransaction?.cardType ?? "",
          "entryType": response.payment?.cardTransaction?.entryType ?? "",
          "first6": response.payment?.cardTransaction?.first6 ?? "",
          "last4": response.payment?.cardTransaction?.last4 ?? "",
          "type_": response.payment?.cardTransaction?.type_ ?? "",
          "authCode": response.payment?.cardTransaction?.authCode ?? "",
          "referenceId": response.payment?.cardTransaction?.referenceId ?? "",
          "transactionNo": response.payment?.cardTransaction?.transactionNo ?? "",
          "state": response.payment?.cardTransaction?.state ?? "",
          "cardholderName": response.payment?.cardTransaction?.cardholderName ?? "",
          "token": response.payment?.cardTransaction?.token ?? "",
          "expirationDate": response.payment?.cardTransaction?.vaultedCard?.expirationDate ?? "",
          
                              
          /// Amount record as a service charge
          "serviceCharge": response.payment?.serviceCharge ?? "",

          "taxRates": response.payment?.taxRates ?? "",

          "refunds": response.payment?.refunds ?? "",

          "note": response.payment?.note ?? "",

          "lineItemPayments": response.payment?.lineItemPayments ?? "",

          /// If voided, the reason why (when available)
          "voidReason": response.payment?.voidReason ?? "",

          /// Dynamic Currency Conversion information
          "dccInfo": response.payment?.dccInfo ?? "",

          /// Per transaction settings for the payment
          "transactionSettings": response.payment?.transactionSettings ?? "",

          /// German region-specific information
          "germanInfo": response.payment?.germanInfo ?? "",

          /// Tracking information for the app that created this payment.
          "appTracking": response.payment?.appTracking ?? "",

          /// Additional charges associated with this transaction (Canada INTERAC)
          "additionalCharges": response.payment?.additionalCharges ?? "",
          
          "transactionInfo": response.payment?.transactionInfo ?? "",
          
          "increments": response.payment?.increments ?? ""
          ]
          
          if(cloverDelegate != nil){
            cloverDelegate?.paymentSuccess(response: responseDict)
          }
        } else {
            // sale failed or was canceled
            var errorMessage = ""
            if response.result == .CANCEL {
              errorMessage = "Sale Canceled"
            } else if response.result == .FAIL {
              errorMessage = "Sale Failed"
            } else {
              errorMessage = response.result.rawValue
            }
            cloverDelegate?.paymentFail(errorMessage: errorMessage)
        }
    
      self.myCloverConnector?.showWelcomeScreen()
    }

  public override func onAuthResponse(_ response:AuthResponse) {}
  public override func onPreAuthResponse(_ response:PreAuthResponse) {}

    // will provide UI information about the activity on the Mini,
    // and may provide input options for the POS to select some
    // options on behalf of the customer
  public override func onDeviceActivityStart(_ deviceEvent:CloverDeviceEvent){
    print("onDeviceActivityStart", deviceEvent)
  } // see CloverConnectorListener.swift for example of calling invokeInputOption from this callback
  public override func onDeviceActivityEnd(_ deviceEvent:CloverDeviceEvent){
    print("onDeviceActivityEnd", deviceEvent)
  }
  
  public override func onDeviceError( _ deviceError: CloverDeviceErrorEvent ) {
  }
  
  public override func onRetrieveDeviceStatusResponse(_ response: RetrieveDeviceStatusResponse) {
    
  }
  
  public override func onInvalidStateTransitionResponse(_ response: InvalidStateTransitionResponse) {
    print("onInvalidStateTransitionResponse", response)
  }
  
  public override func onDisplayReceiptOptionsResponse(_ response: DisplayReceiptOptionsResponse) {
    print("onDisplayReceiptOptionsResponse", response)
  }
}
