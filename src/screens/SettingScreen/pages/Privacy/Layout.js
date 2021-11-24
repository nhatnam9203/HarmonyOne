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
        pageTitle={t('Privacy policy')}
        isRight={false}
        isScrollLayout={false}
        containerStyle={{ paddingVertical: 0 }}
      >
        <ScrollView style={styles.content}>
          <Text style={styles.title}>HarmonyPay - Staff app</Text>
          <Text style={styles.title}>Privacy.</Text>

            <Text style={[styles.contentTerms, { fontWeight: "bold", fontSize: scaleFont(15),  marginTop : scaleHeight(24) , textAlign : "center" }]}>
              Privacy
            </Text>
          <Text style={styles.contentTerms}>
            Harmony Pay’s Privacy Policy describes what information we collect from you and other users of
            the Services, and how we use User Content and other information obtained through the Services.
            We encourage you to read the Privacy Policy carefully as it forms a binding part of these Terms of Service,
            and contains important information about your rights.
          </Text>
          {/* --------- Row ------- */}
            <Text style={[styles.contentTerms, { fontWeight: "bold", fontSize: scaleFont(15), textAlign : "center" }]}>
              Limitation of Liability and Disclaimer of Warranties
            </Text>
          <Text style={styles.contentTerms}>
            EXCEPT FOR THE EXPRESS WARRANTIES SET FORTH HEREIN, HARMONY PAY AND ITS THIRD-PARTY PROVIDERS HEREBY
            DISCLAIM ALL EXPRESS OR IMPLIED WARRANTIES WITH REGARD TO THE SERVICES, INCLUDING BUT NOT LIMITED TO
            ANY IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, NON- INFRINGEMENT
            AND QUALITY. HARMONY PAY AND ITS THIRD-PARTY PROVIDERS MAKE NO REPRESENTATIONS OR WARRANTIES REGARDING
            THE RELIABILITY, AVAILABILITY, TIMELINESS, SUITABILITY, ACCURACY OR COMPLETENESS OF THE SERVICES OR THE
            RESULTS YOU MAY OBTAIN BY USING THE SERVICES. WITHOUT LIMITING THE GENERALITY OF THE FOREGOING, HARMONY
            PAY AND ITS THIRD-PARTY PROVIDERS DO NOT REPRESENT OR WARRANT THAT (A) THE OPERATION OR USE OF THE SERVICES
            WILL BE TIMELY, UNINTERRUPTED OR ERROR-FREE; OR (B) THE QUALITY OF THE SERVICES WILL MEET YOUR REQUIREMENTS.
            YOU ACKNOWLEDGE THAT NEITHER HARMONY PAY NOR ITS THIRD- PARTY PROVIDERS CONTROL THE TRANSFER OF DATA OVER
            COMMUNICATIONS FACILITIES, INCLUDING THE INTERNET, AND THAT THE SERVICES MAY BE SUBJECT TO LIMITATIONS,
            DELAYS, AND OTHER PROBLEMS INHERENT IN THE USE OF SUCH COMMUNICATIONS FACILITIES. HARMONY PAY IS NOT
            RESPONSIBLE FOR ANY DELAYS, DELIVERY FAILURES, OR OTHER DAMAGE RESULTING FROM SUCH PROBLEMS. WITHOUT LIMITING
            THE FOREGOING, HARMONY PAY DOES NOT WARRANT OR GUARANTEE THAT ANY OR ALL SECURITY ATTACKS WILL BE DISCOVERED,
            REPORTED OR REMEDIED, OR THAT THERE WILL NOT BE ANY SECURITY BREACHES BY THIRD PARTIES. EXCEPT WHERE EXPRESSLY
            PROVIDED OTHERWISE BY HARMONY PAY, THE SERVICES ARE PROVIDED TO MERCHANT ON AN "AS IS" BASIS.
          </Text>
          <Text style={styles.contentTerms}>
            IN NO EVENT WILL HARMONY PAY BE LIABLE UNDER ANY CONTRACT, NEGLIGENCE,
            STRICT LIABILITY OR OTHER THEORY, FOR ANY DIRECT, INDIRECT, SPECIAL,
            PUNITIVE, INCIDENTAL OR CONSEQUENTIAL DAMAGES, LOST PROFITS, OR DAMAGES RESULTING
            FROM LOST DATA OR BUSINESS INTERRUPTION RESULTING FROM OR IN CONNECTION WITH THE
            USE OR INABILITY TO USE THE SERVICES, EVEN IF HARMONY PAY HAS BEEN ADVISED OF THE
            POSSIBILITY OF SUCH DAMAGES AND EVEN IF A REMEDY SET FORTH HEREIN HAS FAILED ITS ESSENTIAL PURPOSE.
            TO THE MAXIMUM EXTENT PERMITTED BY LAW HARMONY PAY’S AGGREGATE LIABILITY TO YOU
            OR ANY THIRD PARTIES IN ANY CIRCUMSTANCE IS LIMITED TO ONE HUNDRED DOLLARS ($100).
          </Text>
          <Text style={styles.contentTerms}>
            Some states do not allow exclusion of implied warranties or limitation of
            liability for incidental or consequential damages, so the above limitations
            or exclusions may not apply to you. IN SUCH STATES, THE LIABILITY OF THE HARMONY
            PAY PARTIES WILL BE LIMITED TO THE MAXIMUM EXTENT PERMITTED BY LAW.
          </Text>
          {/* --------- Row ------- */}
            <Text style={[styles.contentTerms, { fontWeight: "bold", fontSize: scaleFont(15), textAlign : "center" }]}>
              Indemnification
            </Text>
          <Text style={styles.contentTerms}>
            You agree to defend, indemnify and hold harmless Harmony Pay and its directors,
            officers, employees, affiliates and agents from and against any claims, actions or demands,
            including, without limitation, reasonable legal and accounting fees, arising or resulting from your
            breach of these Terms of Service or your access to, use or misuse of the Third-Party Content or Services.
            Harmony Pay will provide notice to you of any such claim, suit, or proceeding. Harmony Pay reserves the right
            to assume the exclusive defense and control of any matter which is subject to indemnification under this Section.
            In such case, you agree to cooperate with any reasonable requests assisting Harmony Pay’s defense of such matter.
          </Text>
          {/* --------- Row ------- */}
            <Text style={[styles.contentTerms, { fontWeight: "bold", fontSize: scaleFont(15), textAlign : "center" }]}>
              Termination of the Agreement
            </Text>
          <Text style={styles.contentTerms}>
            Harmony Pay reserves the right, in its sole discretion, to restrict, suspend, or terminate
            these Terms of Service and your access to all or any part of the Services or User Content
            at any time and for any reason without prior notice or liability. Harmony Pay reserves the
            right to change, suspend, or discontinue all or any part of the Services at any time without
            prior notice or liability.
          </Text>
          <Text style={styles.contentTerms}>
            The terms related to the Use of the Platform, Limitation of Liability and Disclaimer of Warranties,
            Indemnification, Termination of Agreement and Miscellaneous terms will survive the termination of these
            Terms of Service.
          </Text>
          {/* --------- Row ------- */}
            <Text style={[styles.contentTerms, { fontWeight: "bold", fontSize: scaleFont(15), textAlign : "center" }]}>
              Arbitration
            </Text>
          <Text style={styles.contentTerms}>
            Agreement to Arbitrate - This Section is referred to as the Arbitration Agreement.
            You agree that any and all disputes or claims that have arisen or may arise between
            you and Harmony Pay, whether arising out of or relating to these Terms of Service or
            in connection with your use of the Services, shall be resolved exclusively through final
            and binding arbitration, rather than a court, in accordance with the terms of this Arbitration Agreement,
            except that you may assert individual claims in small claims court, if your claims qualify.
            You agree that, by agreeing to these Terms of Service, you and Harmony Pay are each waiving
            the right to a trial by jury or to participate in a class action. Your rights will be determined by a
            neutral arbitrator, not a judge or jury. The Federal Arbitration Act governs the interpretation and
            enforcement of this Arbitration Agreement. Notwithstanding the foregoing, this Arbitration Agreement
            shall not preclude either party from pursuing a court action for the sole purpose of obtaining a temporary
            restraining order or preliminary injunction in circumstances in which such relief is appropriate, provided
            that any other relief shall be pursued through an arbitration proceeding pursuant to this Arbitration Agreement.
          </Text>
          <Text style={styles.contentTerms}>
            Prohibition of Class and Representative Actions and Non-Individualized Relief - You and Harmony Pay
            agree that each may bring claims against the other only on an individual basis and not as plaintiff
            or class member in any purported class or representative action or proceeding. Unless both you and Harmony
            Pay agree otherwise, the arbitrator may not consolidate or join more than one person’s or party’s claims
            and may not otherwise preside over any form of a consolidated, representative, or class proceeding. Also,
            the arbitrator may award relief (including monetary, injunctive, and declaratory relief) only in favor of
            the individual party seeking relief and only to the extent necessary to provide relief necessitated by that
            party’s individual claim(s).
          </Text>
          <Text style={styles.contentTerms}>
            Pre-Arbitration Dispute Resolution - Harmony Pay is always interested in resolving disputes amicably and efficiently,
            and most participant concerns can be resolved quickly and to the participant’s satisfaction by emailing Harmony Pay’s
            support team at ___________@HarmonyPayment.com. If such efforts prove unsuccessful, a party who intends to seek arbitration
            must first send to the other, by certified mail, a written Notice of Dispute (“Notice”). The Notice to Harmony Pay
            should be sent to Harmony Pay at 35246 US HWY 19 N. Suite 189, Palm Harbor, FL 34684 Att: Dispute (“Notice Address”).
            The Notice must (i) describe the nature and basis of the claim or dispute and (ii) set forth the specific relief sought.
            If you and Harmony Pay do not resolve the claim within sixty (60) calendar days after the Notice is received, you or
            Harmony Pay may commence an arbitration proceeding. During the arbitration, the amount of any settlement offer made by
            Harmony Pay or you shall not be disclosed to the arbitrator until after the arbitrator determines the amount, if any,
            to which you or Harmony Pay is entitled.
          </Text>
          <Text style={styles.contentTerms}>
            Arbitration Procedures - Arbitration will be conducted by a neutral arbitrator in accordance with the American Arbitration
            Association’s (“AAA”) rules and procedures, including the AAA’s Commercial Arbitration Rules (collectively, the “AAA Rules”),
            as modified by this Arbitration Agreement. If there is any inconsistency between any term of the AAA Rules and any term of
            this Arbitration Agreement, the applicable terms of this Arbitration Agreement will control unless the arbitrator determines
            that the application of the inconsistent Arbitration Agreement terms would not result in a fundamentally fair arbitration.
            All issues are for the arbitrator to decide, including, but not limited to, issues relating to the scope, enforceability,
            and arbitrability of this Arbitration Agreement. The arbitrator can award the same damages and relief on an individual basis
            that a court can award to an individual under these Terms of Service and applicable law. Decisions by the arbitrator are
            enforceable in court and may be overturned by a court only for very limited reasons. Unless you and Harmony Pay agree otherwise,
            any arbitration hearings will take place in a reasonably convenient location for both parties with due consideration of their
            ability to travel and other pertinent circumstances. If the parties are unable to agree on a location, the determination shall
            be made by AAA. If your claim is for $10,000 or less, Harmony Pay agrees that you may choose whether the arbitration will be
            conducted solely on the basis of documents submitted to the arbitrator, through a telephonic hearing or by an in-person hearing
            as established by the AAA Rules. If your claim exceeds $10,000, the right to a hearing will be determined by the AAA Rules.
            Regardless of the manner in which the arbitration is conducted, the arbitrator shall issue a reasoned written decision sufficient
            to explain the essential findings and conclusions on which the award is based.
          </Text>
          <Text style={styles.contentTerms}>
            Costs of Arbitration - Payment of all filing, administration, and arbitrator fees (collectively, the “Arbitration Fees”)
            will be governed by the AAA Rules, unless otherwise provided in this Arbitration Agreement. Any payment of attorneys’
            fees will be governed by the AAA Rules.
          </Text>
          <Text style={styles.contentTerms}>
            Confidentiality - All aspects of the arbitration proceeding, and any ruling, decision, or award by the arbitrator,
            will be strictly confidential for the benefit of all parties.
          </Text>
          <Text style={styles.contentTerms}>
            Severability - If a court or the arbitrator decides that any term or provision of this Arbitration Agreement,
            other than the Prohibition of Class and Representative Actions and Non-Individualized Relief, is invalid or unenforceable,
            the parties agree to replace such term or provision with a term or provision that is valid and enforceable and that comes
            closest to expressing the intention of the invalid or unenforceable term or provision,
            and this Arbitration Agreement shall be enforceable as so modified. If a court or the arbitrator decides that
            any of the provisions regarding the Prohibition of Class and Representative Actions and Non-Individualized Relief is
            invalid or unenforceable, then the entirety of this Arbitration Agreement shall be null and void.
            The remainder of these Terms of Service will continue to apply.
          </Text>
          {/* --------- Row ------- */}
            <Text style={[styles.contentTerms, { fontWeight: "bold", fontSize: scaleFont(15), textAlign : "center" }]}>
              Compliance with Laws
            </Text>
          <Text style={styles.contentTerms}>
            You agree to comply with all federal, state, local and foreign laws, rules and regulations applicable
            to you and Merchant’s business in relation to your use of the Services, including any applicable tax laws
            and regulations, the then-current version of the Payment Card Industry Data Security Standards and the by-laws,
            and any and all other rules, policies and procedures of VISA, MasterCard, Discover and/or other card networks as
            in effect from time to time.
          </Text>
          <Text style={styles.contentTerms}>
            The United States controls the export of products and information. You expressly agree to comply with such restrictions
            and not to export or re-export any part of the Services to countries or persons prohibited under the export control laws.
            By accessing, using or downloading the Services, you are expressly agreeing that you are not in a country where such export
            is prohibited or are a person or entity for which such export is prohibited. You are solely responsible for compliance with
            the laws of your specific jurisdiction regarding the import, export or re-export of the Services.
          </Text>
          {/* --------- Row ------- */}
            <Text style={[styles.contentTerms, { fontWeight: "bold", fontSize: scaleFont(15), textAlign : "center" }]}>
              Consent to Electronic Communication
            </Text>
          <Text style={styles.contentTerms}>
            You consent to receiving commercial electronic messages, including e-mail messages, SMS and text messages,
            and telephone calls, from Harmony Pay, its affiliates and its third party sales contractors and/or agents.
          </Text>
          {/* --------- Row ------- */}
            <Text style={[styles.contentTerms, { fontWeight: "bold", fontSize: scaleFont(15), textAlign : "center" }]}>
              Miscellaneous
            </Text>
          <Text style={styles.contentTerms}>
            Any action, claim, or dispute related to these Terms of Service will be governed by the laws of the State of Florida,
            excluding its conflicts of law provisions, and controlling U.S. federal law. If any provision of these Terms of
            Service Agreement is found to be invalid by any court having competent jurisdiction, the invalidity of such provision
            will not affect the validity of the remaining provisions of these Terms of Service, which will remain in full force and
            effect. Failure of Harmony Pay to act on or enforce any provision of these Terms of Service will not be construed as a
            waiver of that provision or any other provision herein. No waiver will be effective against Harmony Pay unless made in
            writing, and no such waiver will be construed as a waiver in any other or subsequent instance.
            Except as expressly agreed by Harmony Pay and you, these Terms of Service constitute the entire agreement between
            you and Harmony Pay with respect to the subject matter hereof, and supersedes all previous or contemporaneous agreements,
            whether written or oral, between you and Harmony Pay with respect to the subject matter.
            The section headings are provided merely for convenience and will not be given any legal import.
            These Terms of Service will inure to the benefit of our successors and assigns. You may not assign these Terms of Service
            without our prior written consent. Any information submitted or provided by you to the Services might be publicly
            accessible. Important and private information should be protected by you.
          </Text>
          <View style={{ height: 200 }} />
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
    fontSize: scaleFont(14),
    color: "#000000",
    marginTop: scaleHeight(12),
    fontWeight: "400",
  }
});
