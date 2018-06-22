router.post("/reservations", function(req, res) {
  console.log("body", req.body);
  res.send("reservation faite");
});
