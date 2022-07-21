const express = require("express");
const router = express.Router();
const Note = require("../noteModel");

router.route("/").post((req, res) => {
  const title = req.body.title;
  const content = req.body.content;
  const newNote = new Note({
    title,
    content,
  });

  newNote.save();
});

// router.put("/:id", async (req, res) => {
//     try {
//         const note = await Note.findOneAndUpdate(
//             { _id: req.params.id },
//             req.body
//         );
//         res.send(note);
//     } catch (error) {
//         res.send(error);
//     }
// });

router.delete("/notes/:id", async (req, res) => {
      try {
        await Note.findByIdAndDelete(req.params.id);
        res.send("deleted message" + req.params.id)
        
      } catch (err) {
        res.status(500).send({ error: err.message });
      }
    });

router.route("/notes").get((req, res) => {
  Note.find().then((foundNotes) => res.json(foundNotes));
});

module.exports = router;
