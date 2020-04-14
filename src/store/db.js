import lowdb from "lowdb";
import shortid from "shortid";
import FileSync from "lowdb/adapters/FileSync";

const adapter = new FileSync("data.json", {
  defaultValue: {}
});

const db = lowdb(adapter);

export default {
  async readDatabase() {
    return db.getState();
  },
  async addSailor(payload) {
    if (!db.has("sailors").value()) {
      db.set("sailors", [])
        .write();
    }
    return db.get("sailors")
      .push({ uuid: shortid.generate(), ...payload, records: [] })
      .write();
  },
  async updateSailor({ uuid, form }) {
    return db.get("sailors")
      .find({ uuid })
      .update(form)
      .write();
  },
  deleteSailor(payload) {
    db.get("sailors")
      .remove({ uuid: payload })
      .write();
  },
  addRecord({ uuid, form }) {
    return db.get("sailors")
      .find({ uuid })
      .get("records")
      .push({ id: shortid.generate(), ...form })
      .write();
  },
  async saveCommandDefaults(payload) {
    if (!db.has("commandInfo").value()) {
      db.set("commandInfo", {})
        .write();
    }
    return db.get("commandInfo")
      .assign(payload)
      .write();
  },
};
