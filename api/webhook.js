export default async function handler(req, res) {
  const events = req.body.events;

  if (events && events.length > 0) {
    const replyToken = events[0].replyToken;
    const userText = events[0].message?.text;

    const aiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer K8tYcnPGzm3c8ReE+dHJH544y5/z//Q76wYHdFHoF2bHS/O4IunpRmyKn8Ms28pf21QLd5ofDiLFiCPosmxhywN9dyPBSpB9kxFpcm8gMz1t77MZY3dUa0eZaP3z1VaLZPHMnAaPNwliYUsnkkwkAAdB04t89/1O/w1cDnyilFU=`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "คุณคือ AI ที่ช่วยวิเคราะห์การซื้อสินค้าออนไลน์ ให้คะแนน สรุปข้อเสีย และเตือนความเสี่ยง"
          },
          {
            role: "user",
            content: userText
          }
        ]
      })
    });

    const data = await aiResponse.json();
    const aiText = data.choices[0].message.content;

    await fetch("https://api.line.me/v2/bot/message/reply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer YOUR_LINE_TOKEN`
      },
      body: JSON.stringify({
        replyToken,
        messages: [{ type: "text", text: aiText }]
      })
    });
  }

  res.status(200).send("ok");
}
