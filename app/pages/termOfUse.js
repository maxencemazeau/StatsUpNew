import { ArrowLeft } from '@tamagui/lucide-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { Text, YStack, Separator } from 'tamagui';

const TermsOfUse = () => {

    const router = useRouter()

    return (
        <View style={{ height: "94%", paddingLeft: 20, paddingRight: 20, paddingTop: 40 }}>
            <ScrollView>
                <YStack space="$4">
                    <Pressable onPress={() => router.push("loginAndSignUp/signUp")}>
                        <ArrowLeft color={"black"} />
                    </Pressable>
                    <Text fontWeight="bold" fontSize="$6" color={"black"}>
                        StatsUp Terms of Use
                    </Text>
                    <Text fontStyle="italic" fontSize="$3" color={"black"}>
                        Last updated: 2024-09-23
                    </Text>

                    <Separator />

                    <Text fontWeight="bold" color={"black"}>
                        1. Acceptance of the Terms
                    </Text>
                    <Text color={"black"}>
                        By accessing the StatsUp application, you acknowledge that you have read and understood these terms of use, and you agree to be bound by them. If you do not accept these terms, you should not use the application.
                    </Text>

                    <Separator />

                    <Text fontWeight="bold" color={"black"}>
                        2. Use of the Application
                    </Text>
                    <Text color={"black"}>
                        You agree to use the application only for lawful purposes and in accordance with these terms. You must not:
                        {'\n'}- Use the application in an illegal or fraudulent manner.
                        {'\n'}- Reproduce, distribute, modify, or copy any content from the application without authorization.
                        {'\n'}- Disrupt or attempt to disrupt the proper functioning of the application.
                    </Text>

                    <Separator />

                    <Text fontWeight="bold" color={"black"}>
                        3. Intellectual Property
                    </Text>
                    <Text color={"black"}>
                        All content, features, and software associated with StatsUp, including logos, graphics, text, images, and other elements, are protected by intellectual property laws and belong to Hestenn or its licensors.
                    </Text>

                    <Separator />

                    <Text fontWeight="bold" color={"black"}>
                        4. Account Creation
                    </Text>
                    <Text color={"black"}>
                        To use certain features of the application, you will need to create an account. You are responsible for the security of your login credentials and the confidentiality of your personal information.
                    </Text>

                    <Separator />

                    <Text fontWeight="bold" color={"black"}>
                        5. Personal Data
                    </Text>
                    <Text color={"black"}>
                        By using the application, you agree that some of your personal data may be collected and processed in accordance with our [Privacy Policy](#).
                    </Text>

                    <Separator />

                    <Text fontWeight="bold" color={"black"}>
                        6. Limitation of Liability
                    </Text>
                    <Text color={"black"}>
                        Hestenn cannot be held responsible for any direct or indirect damage resulting from the use or inability to use the application. You agree that your use of the application is at your own risk.
                    </Text>

                    <Separator />

                    <Text fontWeight="bold" color={"black"}>
                        7. Changes to the Terms of Use
                    </Text>
                    <Text color={"black"}>
                        We reserve the right to modify these terms of use at any time. If changes are made, we will notify you by posting a new version on the application. It is your responsibility to regularly review these terms.
                    </Text>

                    <Separator />

                    <Text fontWeight="bold" color={"black"}>
                        8. Termination
                    </Text>
                    <Text color={"black"}>
                        We reserve the right to suspend or terminate your access to the application at any time and for any reason, including for violating these terms of use.
                    </Text>

                    <Separator />

                    <Text fontWeight="bold" color={"black"}>
                        9. Governing Law
                    </Text>
                    <Text color={"black"}>
                        These terms of use are governed by French and European law, particularly the GDPR. Any dispute relating to these terms will be subject to the exclusive jurisdiction of the French courts.
                    </Text>

                    <Separator />

                    <Text fontWeight="bold" color={"black"}>
                        10. Contact
                    </Text>
                    <Text color={"black"}>
                        For any questions or inquiries regarding these terms of use, please contact us at: hestenn.company@gmail.com
                    </Text>
                </YStack>
            </ScrollView>
        </View>
    );
};

export default TermsOfUse;
