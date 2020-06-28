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
  async addSailor(form) {
    if (!db.has("sailors").value()) {
      db.set("sailors", [])
        .write();
    }
    try {
      const uuid = shortid.generate();
      db.get("sailors")
        .push({ uuid, ...form, records: [] })
        .write();
      return { uuid };
    } catch (error) {
      return { error };
    }
  },
  async updateSailor({ uuid, form }) {
    return db.get("sailors")
      .find({ uuid })
      .update(form)
      .write();
  },
  async deleteSailor(payload) {
    return db.get("sailors")
      .remove({ uuid: payload })
      .write();
  },
  async addRecord({ uuid, form }) {
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
