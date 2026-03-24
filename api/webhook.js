export default async function handler(req, res) {
  const events = req.body.events;

  if (events && events.length > 0) {
    const replyToken = events[0].replyToken;
    const userText = events[0].message?.text;

    await fetch("https://api.line.me/v2/bot/message/reply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer K8tYcnPGzm3c8ReE+dHJH544y5/z//Q76wYHdFHoF2bHS/O4IunpRmyKn8Ms28pf21QLd5ofDiLFiCPosmxhywN9dyPBSpB9kxFpcm8gMz1t77MZY3dUa0eZaP3z1VaLZPHMnAaPNwliYUsnkkwkAAdB04t89/1O/w1cDnyilFU=`
      },
      body: JSON.stringify({
        replyToken: replyToken,
        messages: [
          {
            type: "text",
            text: `คุณพิมพ์ว่า: ${userText}`
          }
        ]
      })
    });
  }

  res.status(200).send("ok");
}
export default async function handler(req, res) {
  const events = req.body.events;

  if (events && events.length > 0) {
    const replyToken = events[0].replyToken;
    const userText = events[0].message?.text;

    const aiText = `กำลังวิเคราะห์: ${userText}`;

    await fetch("https://api.line.me/v2/bot/message/reply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer YOUR_ACCESS_TOKEN`
      },
      body: JSON.stringify({
        replyToken,
        messages: [
          {
            type: "text",
            text: aiText
          }
        ]
      })
    });
  }

  res.status(200).send("ok");
}
