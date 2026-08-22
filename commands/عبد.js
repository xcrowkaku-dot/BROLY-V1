"use strict";

const FLAG = "🇦🇱";

module.exports = {
  name: "عبد",
  aliases: ["عبدني"],
  description: "تغيير كنية العضو الذي ترد على رسالته.",
  usage: "عبد (بالرد على رسالة العضو) 🇦🇱",
  category: "Fun",
  groupOnly: true,
  adminOnly: true,

  async execute({ api, event }) {
    const { threadID, messageID, messageReply } = event;
    if (!messageReply) {
      return api.sendMessage(`⚠️ يجب الرد على رسالة العضو ثم كتابة عبد ${FLAG}`, threadID, messageID);
    }

    const targetID = messageReply.senderID;
    if (String(targetID) === String(api.getCurrentUserID())) {
      return api.sendMessage(`😅 لا يمكن تعيين البوت خادماً! ${FLAG}`, threadID, messageID);
    }

    try {
      await new Promise((resolve, reject) => {
        api.changeNickname("خآدم الغࢪبآان", threadID, targetID, error => error ? reject(error) : resolve());
      });
      return api.sendMessage(`حڪم عليڪ القاضي ڪاڪو بالإستعباد لما تبقى لك فهذا الغروب ${FLAG}`, threadID, messageID);
    } catch {
      return api.sendMessage(`❌ فشل تغيير الكنية. تأكد أن البوت يملك صلاحية التعديل. ${FLAG}`, threadID, messageID);
    }
  },
};