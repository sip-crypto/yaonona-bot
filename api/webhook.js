export default async function handler(req, res) {
  const events = req.body.events;

  if (events && events.length > 0) {
    console.log("User said:", events[0].message?.text);
  }

  res.status(200).send("ok");
}
