const xlsx = require("xlsx");
const DocModel = require("../models/doc.model.js");
const uploadModel = require("../models/upload.model.js");

async function uploadDoc(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file received", success: false });
        }

        // ⭐ Use Excel file name as fileId
        const fileId = req.file.originalname;

        const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = xlsx.utils.sheet_to_json(firstSheet);

        if (data.length === 0) {
            return res.status(400).json({ message: "Excel file is empty", success: false });
        }

        // extract users
        const users = data.map(row => ({
            name: row.name || row.Name || "",
            contact: row.contact || row.Contact || "",
            email: row.email || row.Email || "",
            fileId: fileId   // ⭐ store fileId with each row
        }));

        for (let user of users) {
            if (!user.name || !user.contact || !user.email) {
                return res.status(400).json({
                    message: "Missing required fields in some rows",
                    success: false
                });
            }
        }

        const userEmailList = users.map(u => u.email);

        // ⭐ Delete only rows belonging to THIS Excel file
        await DocModel.deleteMany({
            fileId: fileId,
            email: { $nin: userEmailList }
        });

        // ⭐ Insert/Update rows for this fileId only
        for (let u of users) {
            await DocModel.findOneAndUpdate(
                { email: u.email, fileId: fileId },
                u,
                { upsert: true, new: true }
            );
        }

        // upload record logic
        let uploadRecord = await uploadModel.findOne({});

        if (!uploadRecord) {
            uploadRecord = await uploadModel.create({ count: 1 });
        } else {
            if (uploadRecord.count >= 3000) {
                return res.status(400).json({
                    message: "Upload limit exceeded",
                    success: false
                });
            }
            uploadRecord.count += 1;
            await uploadRecord.save();
        }

        return res.status(200).json({
            message: "Excel synced successfully",
            fileId: fileId,
            success: true
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = { uploadDoc };
