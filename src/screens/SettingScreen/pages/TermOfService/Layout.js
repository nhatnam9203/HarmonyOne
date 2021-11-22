import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTranslation } from "react-i18next";
import { SingleScreenLayout } from '@shared/layouts';
import { fonts, colors } from "@shared/themes";
import NavigationService from '@navigation/NavigationService'

export const Layout = ({

}) => {

  const [t] = useTranslation();

  return (
    <View style={styles.container}>
      <SingleScreenLayout
        pageTitle={t('Terms of Service')}
        isRight={false}
        isScrollLayout={false}
        containerStyle={{ paddingVertical: 0 }}
      >
        <ScrollView style={styles.content}>
          <Text style={styles.title}>HarmonyPay - Staff app</Text>
          <Text style={styles.title}>Term of Services</Text>

          <Text style={[styles.contentTerms, { fontWeight: "bold", fontSize: scaleFont(15), marginTop : scaleHeight(24) }]}>
            Effective: May 1, 2020
          </Text>
          <Text style={styles.contentTerms}>
            THESE MERCHANT USER TERMS OF SERVICE (“TERMS OF SERVICE”)
            FORM A BINDING AGREEMENT BETWEEN YOU (“YOU,” “YOUR”) AND
            HARMONY PAY, INC. (“HARMONY PAY,” “WE,” “US,” “OUR”)
            PLEASE READ THESE TERMS OF SERVICE CAREFULLY, BECAUSE BY DOWNLOADING,
            ACCESSING OR USING THE HARMONY PAY APPLICATION (“HARMONY PAY APP”),
            PRODUCTS AND/OR SERVICES (COLLECTIVELY, THE “SERVICES”) YOU ARE ACKNOWLEDGING
            THAT YOU HAVE READ, UNDERSTOOD AND AGREE TO BE BOUND BY THESE TERMS OF SERVICE AND
            HARMONY PAY’S PRIVACY POLICY (“PRIVACY POLICY”). IF YOU DO NOT AGREE TO THESE TERMS OF
            SERVICE OR HARMONY PAY’S PRIVACY POLICY YOU MAY NOT DOWNLOAD, ACCESS OR USE THE SERVICES.
          </Text>
          <Text style={styles.contentTerms}>
            FROM TIME TO TIME WE MAY UPDATE OR MODIFY THESE TERMS OF SERVICE
            IN OUR DISCRETION. WE MAY PROVIDE NOTICE TO YOU OF THE UPDATED TERMS
            OF SERVICE BY EMAIL, AND/OR AN ON-SCREEN NOTIFICATION THROUGH
            THE SERVICES. THE UPDATED TERMS OF SERVICE WILL BECOME EFFECTIVE AS
            OF THE EFFECTIVE DATE INDICATED IN THE TERMS OF SERVICE (“EFFECTIVE DATE”).
            ANY USE OF THE SERVICES AFTER THE EFFECTIVE DATE MEANS YOU HAVE ACCEPTED
            THE UPDATED TERMS. YOUR SOLE AND EXCLUSIVE REMEDY IN THE EVENT YOU DO NOT
            ACCEPT THE UPDATED TERMS OF SERVICE IS TO CEASE YOUR ACCESS TO AND USE OF THE SERVICES.
          </Text>
          {/* --------- Row ------- */}
          <View style={{ alignItems: 'center', marginVertical: scaleWidth(10) }} >
            <Text style={[styles.contentTerms, { fontWeight: "bold", fontSize: scaleFont(15) }]}>
              DESCRIPTION OF SERVICES
            </Text>
          </View>
          <Text style={styles.contentTerms}>
            Harmony Pay is a payment facilitator that allows you to accept
            credit and debit cards from customers for the payment for
            goods and services. We are not a bank and do not offer banking services.
            Our Payment Services allow you to accept payments from any US-issued
            and most non-US issued credit, debit, prepaid, or gift cards (“Cards”)
            bearing the trademarks of Visa Inc. (“Visa”), MasterCard International Inc.
            (“MasterCard”), American Express Travel Related Services Company, Inc.
            (“American Express”), and DFS Services, LLC (“Discover”), (collectively, the “Networks”).
            You are not required to accept any card brand as a condition of receiving the Payment Services.
            We may remove or add Cards that we accept at any time without prior notice.
            Harmony Pay is not a party to the transactions processed.
            Harmony Pay is an independent contractor. Harmony Pay does not assume liability
            over the transactions processed. We may conduct fraud and other background checks.
            We may delay the processing of a transaction that appear suspicious or involve fraud
            or other misconduct. We may also decline the processing of a transactions that is
            illegal or violate these Terms or Harmony Pay policies.
          </Text>
          {/* --------- Row ------- */}
          <View style={{ alignItems: 'center', marginVertical: scaleWidth(10) }} >
            <Text style={[styles.contentTerms, { fontWeight: "bold", fontSize: scaleWidth(15) }]}>
              Use of the Platform
            </Text>
          </View>
          <Text style={styles.contentTerms}>
            You may only access and use the Services if you are an authorized user
            of a Harmony Pay customer (“Merchant”) pursuant to these Terms. Harmony
            Pay grants you a limited, revocable, non-exclusive, non-transferable
            license to access and use the applicable Services during the course of your
            relationship with Merchant, solely and exclusively for Merchant’s internal business purposes.
          </Text>
          <Text style={styles.contentTerms}>
            You agree to use the Platform only for the management and operation of Merchant’s
            business pursuant to the terms and conditions of these Terms and not directly or
            indirectly: (a) reverse engineer, decompile, disassemble or otherwise attempt to
            discover the source code, object code or underlying structure, ideas or algorithms
            of the Services; (b) modify, translate, or create derivative works based on the Services;
            or copy (except for archival purposes), rent, lease, distribute, pledge, assign, or
            otherwise transfer or encumber rights to the Services; (c) use or access the Services to
            build or support, and/or assist a third party in building or supporting, products or services
            competitive with the Services; (d) remove or obscure any proprietary notices or labels
            from the Services; (e) use the Services for any fraudulent undertaking or in any manner
            that could damage, disable, overburden, impair or otherwise interfere with Harmony Pay's
            provisioning of the Services; (f) violate or breach any operating procedures, requirements
            or guidelines regarding Merchant’s use of the Services that are posted on or through the
            Harmony Pay App or otherwise provided or made available to Merchant; (g) alter, distribute,
            license, resell, transfer, assign, rent, lease, timeshare or otherwise commercially exploit
            the Services to any third- party or provide it as a service bureau; (h) conduct any penetration
            or vulnerability testing on the Services or network; or (i) copy any features, functions, text or
            graphics of the Services, including without limitation, the structure, sequence or organization of
            the user interface.
          </Text>
          {/* --------- Row ------- */}
          <View style={{ alignItems: 'center', marginVertical: scaleWidth(10) }} >
            <Text style={[styles.contentTerms, { fontWeight: "bold", fontSize: scaleFont(15) }]}>
              Fees
            </Text>
          </View>
          <Text style={styles.contentTerms}>
            You will be charged and agree to pay the following fees to use the Service,
            and all applicable taxes or other governmental assessments based on your use of the Service.
          </Text>

          <Text style={[styles.contentTerms]}>
            We will charge you a fee of 2.0% of the total amount of each transaction processed. In the event the fees charged to us by
            the credit card companies to process your transaction exceeds the 2% fee we assessed,
            <Text style={[styles.contentTerms, { color: "#000" }]}>
              {` we will charge you the excess imposed by the credit card company without regard to whether this Agreement has expired or been terminated, rescinded or cancelled.`}
            </Text>
          </Text>

          <Text style={styles.contentTerms}>
            Fees:_____________________________________
          </Text>
          <Text style={styles.contentTerms}>
            If you dispute any amounts you are charged, you must notify Harmony Pay
            in writing within 30 days of incurring the charge that you dispute. If you notify
            Harmony Pay after 30 days, you agree Harmony Pay has no obligation to effect any adjustments or refunds.
          </Text>

          {/* --------- Row ------- */}
          <View style={{ alignItems: 'center', marginVertical: scaleWidth(10) }} >
            <Text style={[styles.contentTerms, { fontWeight: "bold", fontSize: scaleFont(15), textAlign : "center" }]}>
              OWNERSHIP OF CONTENT, USE OF TRADEMARKS
            </Text>
          </View>
          <Text style={styles.contentTerms}>
            Harmony Pay owns or has license to all rights, title, interest,
            copyright and other worldwide intellectual property and trade secret
            rights in and to the Services (including all derivatives or improvements thereof).
          </Text>
          <Text style={styles.contentTerms}>
            User Content - You, (or Merchant, if applicable) retain all rights, title and interest
            in and to any text, graphics, videos, images or other data that you upload to the Services
            (“User Content”). You grant to Harmony Pay a non-exclusive, royalty-free, fully paid-up,
            worldwide license to access, use, copy, modify (including the right to create derivative works of),
            display and transmit User Content solely for the purpose of our providing the Services and in accordance
            with our Privacy Policy. You are solely responsible for the accuracy, quality, content and legality of
            User Content, the means by which User Content is acquired, and any transfer of User Content outside of
            the Services by you, Merchant or any third-party authorized by you. You represent, warrant and covenant
            that you have all rights necessary to upload the User Content to the Services and to otherwise have such
            User Content used or shared, as applicable, in relation to the Services.
          </Text>
          <Text style={styles.contentTerms}>
            Third-Party Content - Through your use of the Services you may be presented
            with material provided by third-parties, not owned or controlled by us,
            from our partners, and/or from other users of the Services, including but not
            limited to software, text, graphics, videos, images, or advertising content
            (collectively referred to as “Third-Party Content”). All Third-Party Content and the Services
            are protected by United States and foreign intellectual property laws. Unauthorized use of
            the Services and/or Third-Party Content may result in violation of copyright, trademark,
            and other laws. You have no rights in or to the Services or Third-Party Content, and you
            will not use, copy or display the Services or Third-Party Content except as permitted under
            these Terms of Service. No other use of the Services or Third-Party Content is permitted without
            our prior written consent. You must retain all copyright and other proprietary notices contained
            in the Services and Third-Party Content. You may not sell, transfer, assign, license, sublicense,
            or modify the Third-Party Content or reproduce, display, publicly perform, make a derivative version
            of, distribute, or otherwise use the Third-Party Content in any way for any public or commercial purpose
            other than as permitted hereunder. The use or posting of any of the Third-Party Content on any other platform,
            or in a networked computer environment for any purpose is expressly prohibited. If you violate any part
            of these Terms of Service, your right to access and/or use the Third-Party Content and Services will
            automatically terminate.
          </Text>
          <Text style={styles.contentTerms}>
            We do not review, pre-screen or filter all User Content, or Third-Party Content, but we do reserve
            the right to refuse to accept, or delete any User Content or Third-Party Content in our sole discretion.
            In addition, we have the right (but not the obligation) in our sole discretion to reject or delete any content
            that we reasonably consider to be in violation of these Terms of Service or applicable law. We do not guarantee
            the accuracy, integrity or quality of any Third-Party Content, regardless of whether such products or services
            are designated as “certified,” “validated” or the like. Any interaction or exchange of information or data between
            you and any third-party is solely between you and such third-party. You should take precautions when downloading
            files from any platform to protect your computer from viruses and other destructive programs. If you decide to
            access any Third-Party Content, you fully assume the risk of doing so. Under no circumstances will Harmony Pay be
            liable in any way for any Third-Party Content, including liability for any errors or omissions in any Third-Party
            Content or for any loss or damage of any kind incurred as a result of the use of any Third-Party Content posted,
            emailed or otherwise transmitted via the Services.
          </Text>
          <Text style={styles.contentTerms}>
            Each user must: (a) provide true, accurate, current and complete information on the Harmony Pay App’s
            registration form (collectively, the "Registration Data") and (b) maintain and promptly update
            the Registration Data as necessary. If, after investigation, we have reasonable grounds to suspect
            that any user's information is untrue, inaccurate, not current or incomplete, we may suspend or
            terminate that user's account and prohibit any and all current or future use of the Services
            (or any portion thereof) by that user other than as expressly provided herein. Each user is wholly
            responsible for maintaining the confidentiality and security of his/her username and password, and
            is wholly liable for all activities occurring thereunder. Harmony Pay cannot and will not be liable
            for any loss or damage arising from a user's failure to comply with this Terms, including any loss or
            damage arising from any user's failure to (a) immediately notify Harmony Pay of any unauthorized use
            of his or her password or account or any other breach of security, or (b) exit and close his or her account
            at the end of each session.
          </Text>
          <Text style={styles.contentTerms}>
            The trademarks, service marks, and logos of Harmony Pay (the “Harmony Pay Trademarks”) used
            and displayed on the Services are registered and unregistered trademarks or service marks of Harmony Pay.
            Other Harmony Pay product and service names located in the Services may be trademarks or service marks owned
            by third-parties (the “Third-Party Trademarks”, and, collectively with the Harmony Pay Trademarks, the “Trademarks”).
            Nothing in this Agreement should be construed as granting, by implication, estoppel, or otherwise, any license or
            right to use any Trademark displayed in the Services without the prior written consent of Harmony Pay specific for
            each such use. The Trademarks may not be used to disparage Harmony Pay or the applicable third-party, Harmony
            Pay’s or third-party’s products or services, or in any manner that may damage any goodwill in the Trademarks.
            Except as described herein, the use of any Trademarks is prohibited without Harmony Pay’s prior written consent.
            All goodwill generated from the use of any Harmony Pay Trademark or Third-Party Trademark will inure to Harmony
            Pay’s, or the applicable Third Party’s benefit, as applicable.
          </Text>

          <View style={{ height : 200 }} />
        </ScrollView>
      </SingleScreenLayout>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  content: {
    flex: 1,
    padding: scaleWidth(16),
    paddingTop: scaleHeight(16),
  },

  title: {
    fontSize: scaleFont(23),
    color: colors.ocean_blue,
    fontFamily: fonts.MEDIUM,
  },

  contentTerms: {
    fontSize: scaleFont(13),
    color: "#000000",
    marginTop: scaleHeight(12),
    fontWeight : "400"
  }
});
