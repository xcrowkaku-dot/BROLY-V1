"use strict";

const FLAG = "🇦🇱";

module.exports = {
  name: "كراشي",
  aliases: ["crush"],
  description: "اختيار كراش عشوائي من أعضاء المجموعة.",
  usage: "كراشي 🇦🇱",
  category: "Fun",
  groupOnly: true,

  async execute({ api, event }) {
    const { threadID, messageID, senderID } = event;
    let threadInfo;
    try {
      threadInfo = await api.getThreadInfo(threadID);
    } catch {
      return api.sendMessage(`❌ فشل في جلب معلومات المجموعة! ${FLAG}`, threadID, messageID);
    }

    const botID = String(api.getCurrentUserID());
    const members = (threadInfo.participantIDs || []).filter(id =>
      String(id) !== botID && String(id) !== String(senderID)
    );
    if (!members.length) {
      return api.sendMessage(`😅 لا يوجد عضو مناسب ليكون كراش! ${FLAG}`, threadID, messageID);
    }

    const randomID = members[Math.floor(Math.random() * members.length)];
    let crushName = "شخص غامض";
    try {
      const info = await api.getUserInfo([randomID]);
      crushName = info[randomID]?.name || crushName;
    } catch {}

    const messages = [
      `💘 القاضي كاكو حكم!\nكراشك هو/هي: @${crushName} 😏🔥`,
      `🐦‍⬛ الغراب شاف في عيونك...\nكراشك السري هو/هي: @${crushName} 💋`,
      `👀 ما تكذب على نفسك!\nكراشك هو/هي: @${crushName} 😂❤️`,
      `💀 انكشف السر!\nكراشك هو/هي: @${crushName} 🫵😈`,
      `🎯 الغراب ما يخطئ!\nكراشك هو/هي: @${crushName} 🖤🔥`,
    ];
    const body = `${messages[Math.floor(Math.random() * messages.length)]} ${FLAG}`;

    return api.sendMessage({
      body,
      mentions: [{ tag: `@${crushName}`, id: randomID }],
    }, threadID, messageID);
  },
};