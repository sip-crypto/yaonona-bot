export default async function handler(req, res) {
  try {

    const events = req.body.events;

    if (!events || events.length === 0) {
      return res.status(200).send("no events");
    }

    const replyToken = events[0].replyToken;
    const userText = events[0].message?.text || "สวัสดี";

    const aiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "คุณคือ AI วิเคราะห์สินค้าออนไลน์ บอกข้อดี ข้อเสีย และให้คะแนน"
          },
          {
            role: "user",
            content: userText
          }
        ]
      })
    });

    const data = await aiResponse.json();

    console.log("AI RAW:", data);

    let aiText = "AI error";

    if (data.choices && data.choices.length > 0) {
      aiText = data.choices[0].message.content;
    } else {
      aiText = JSON.stringify(data);
    }

    await fetch("https://api.line.me/v2/bot/message/reply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.LINE_TOKEN}`
      },
      body: JSON.stringify({
        replyToken,
        messages: [{ type: "text", text: aiText }]
      })
    });

    res.status(200).send("ok");

  } catch (err) {
    console.log("ERROR:", err);
    res.status(500).send("server error");
  }
}
// redeploy trigger
