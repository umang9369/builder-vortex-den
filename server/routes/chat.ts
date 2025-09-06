import type { RequestHandler } from "express";

function generateReply(input: string): string {
  const text = input.toLowerCase();
  if (/मौसम|weather|बारिश|तापमान/.test(text)) {
    return "आपके क्षेत्र में आज बादल छाए रहेंगे, तेज़ धूप दोपहर में होगी और हल्की हवा चलेगी। सिंचाई शाम को करें और खुले में रखा अनाज ढक कर रखें।";
  }
  if (/भाव|कीमत|मंडी|price/.test(text)) {
    return "आज के अनुमानित मंडी भाव: गेहूं ₹2120-2250/q, धान ₹1900-2050/q, सरसों ₹5300-5600/q. अपने नज़दीकी मंडी के भाव ज़रूर जाँचें।";
  }
  if (/बीमारी|रोग|disease|कीट|pest|पत्ता|leaf/.test(text)) {
    return "पत्तियों पर धब्बे दिखें तो पहले फोटो साफ़ रोशनी में लें। हल्का संक्रमण हो तो 2% नीम तेल का छिड़काव करें। गंभीर होने पर स्थानीय कृषि विशेषज्ञ से संपर्क करें।";
  }
  if (/खाद|उर्वरक|fertilizer/.test(text)) {
    return "खाद डालने का सही समय सुबह/शाम ठंडे समय में है। यूरिया की मात्रा संतुलित रखें और सिंचाई के साथ दें। मिट्टी परीक्षण के अनुसार डोज़ तय करें।";
  }
  return `आपने पूछा: "${input}"\nमेरे सुझाव: पहले समस्या की फोटो/स्थान साझा करें। मैं मौसम, मंडी भाव, और रोग पहचान में मदद कर सकता हूँ।`;
}

export const handleChat: RequestHandler = (req, res) => {
  const message = (req.body?.message as string) || "";
  const answer = generateReply(message);
  res.json({ answer });
};
